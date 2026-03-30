const fs = require('fs');
const path = require('path');

function firstEnv() {
  for (let index = 0; index < arguments.length; index += 1) {
    const value = process.env[arguments[index]];
    if (value) return value;
  }
  return '';
}

function normalizeUrl(value) {
  return String(value || '').replace(/\/+$/, '');
}

function getConfig() {
  return {
    url: normalizeUrl(firstEnv('SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_URL', 'PUBLIC_SUPABASE_URL')),
    serviceRoleKey: firstEnv('SUPABASE_SECRET_KEY', 'SUPABASE_SERVICE_ROLE_KEY', 'SUPABASE_SERVICE_ROLE', 'SUPABASE_SERVICE_KEY'),
    submissionsTable: process.env.SUPABASE_RAVEN_SUBMISSIONS_TABLE || 'raven_course_submissions',
    resourcesTable: process.env.SUPABASE_RAVEN_RESOURCES_TABLE || 'raven_course_resources',
    submissionsBucket: process.env.SUPABASE_RAVEN_SUBMISSIONS_BUCKET || 'raven-course-submissions',
    resourcesBucket: process.env.SUPABASE_RAVEN_RESOURCES_BUCKET || 'raven-course-resources',
    evaluationsTable: process.env.SUPABASE_RAVEN_EVALUATIONS_TABLE || 'raven_course_evaluations',
    resourceWriteToken: process.env.RAVEN_RESOURCE_WRITE_TOKEN || process.env.RAVEN_SUBMISSIONS_WRITE_TOKEN || ''
  };
}

function missingSupabaseConfig(config) {
  const current = config || getConfig();
  const missing = [];

  if (!current.url) {
    missing.push('SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL)');
  }
  if (!current.serviceRoleKey) {
    missing.push('SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY)');
  }

  return missing;
}

function hasSupabaseConfig(config) {
  return missingSupabaseConfig(config).length === 0;
}

function hasBackend() {
  return hasSupabaseConfig(getConfig());
}

function defaultHeaders(config, extra) {
  const current = config || getConfig();
  return Object.assign(
    {
      apikey: current.serviceRoleKey,
      Authorization: 'Bearer ' + current.serviceRoleKey
    },
    extra || {}
  );
}

function json(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function sendJson(res, status, payload) {
  return json(res, status, payload);
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string' && req.body) return JSON.parse(req.body);

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

async function parseJsonBody(req) {
  return readBody(req);
}

function sanitizeSegment(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'item';
}

function makeStoragePath(kind, fileName) {
  const ext = path.extname(String(fileName || '')).toLowerCase();
  const stem = path.basename(String(fileName || 'upload'), ext);
  return [
    kind === 'resource' ? 'resources' : 'submissions',
    new Date().toISOString().slice(0, 10),
    Date.now() + '-' + sanitizeSegment(stem) + ext
  ].join('/');
}

function encodeStoragePath(filePath) {
  return String(filePath)
    .split('/')
    .map(encodeURIComponent)
    .join('/');
}

function publicStorageUrl(config, bucket, objectPath) {
  const current = config || getConfig();
  return current.url + '/storage/v1/object/public/' + bucket + '/' + encodeStoragePath(objectPath);
}

async function createSignedUpload(config, bucket, objectPath) {
  const current = config || getConfig();
  const data = await supabaseRequest(current, '/storage/v1/object/upload/sign/' + encodeURIComponent(bucket) + '/' + encodeStoragePath(objectPath), {
    method: 'POST'
  });

  const signedPath = data.signedURL || data.signedUrl || '';
  const token = data.token || '';
  let uploadUrl = '';

  if (signedPath) {
    uploadUrl = signedPath.indexOf('http') === 0 ? signedPath : current.url + signedPath;
  } else if (token) {
    uploadUrl = current.url + '/storage/v1/object/upload/sign/' + encodeURIComponent(bucket) + '/' + encodeStoragePath(objectPath) + '?token=' + encodeURIComponent(token);
  }

  return {
    token: token,
    path: data.path || objectPath,
    signedUrl: signedPath,
    uploadUrl: uploadUrl
  };
}

function resourceTokenIsValid(req, config) {
  const current = config || getConfig();
  if (!current.resourceWriteToken) return true;
  const headerToken = req.headers['x-raven-resource-token'];
  return Boolean(headerToken && headerToken === current.resourceWriteToken);
}

async function supabaseRequest(config, route, options) {
  const current = config || getConfig();
  const response = await fetch(current.url + route, Object.assign({}, options, {
    headers: defaultHeaders(current, options && options.headers)
  }));

  if (!response.ok) {
    const text = await response.text().catch(function () { return ''; });
    const error = new Error(text || ('Supabase request failed: ' + response.status));
    error.statusCode = response.status;
    throw error;
  }

  const contentType = response.headers.get('content-type') || '';
  if (contentType.indexOf('application/json') >= 0) {
    return response.json();
  }
  return response.text();
}

async function selectRows(table, query) {
  return supabaseRequest(getConfig(), '/rest/v1/' + table + '?' + query, { method: 'GET' });
}

async function insertRow(table, row) {
  const items = await supabaseRequest(getConfig(), '/rest/v1/' + table, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Prefer: 'return=representation'
    },
    body: JSON.stringify(row)
  });
  return Array.isArray(items) ? items[0] : items;
}

async function uploadFile(bucket, objectPath, contentType, base64Data) {
  await supabaseRequest(getConfig(), '/storage/v1/object/' + encodeURIComponent(bucket) + '/' + encodeStoragePath(objectPath), {
    method: 'POST',
    headers: {
      'Content-Type': contentType || 'application/octet-stream',
      'x-upsert': 'true'
    },
    body: Buffer.from(base64Data, 'base64')
  });

  return {
    objectPath: objectPath,
    publicUrl: publicStorageUrl(getConfig(), bucket, objectPath)
  };
}

function loadStaticResources() {
  const manifestPath = path.join(__dirname, '..', '..', 'raven-cargo-course', 'data', 'raven-course-manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  return { items: manifest.builtInResources || [] };
}

module.exports = {
  getConfig,
  missingSupabaseConfig,
  hasSupabaseConfig,
  hasBackend,
  json,
  sendJson,
  readBody,
  parseJsonBody,
  makeStoragePath,
  publicStorageUrl,
  createSignedUpload,
  resourceTokenIsValid,
  supabaseRequest,
  selectRows,
  insertRow,
  uploadFile,
  loadStaticResources
};
