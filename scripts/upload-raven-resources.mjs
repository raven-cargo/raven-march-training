#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const dropDir = path.join(projectRoot, 'raven-cargo-course', 'resources-drop');
const envPath = path.join(projectRoot, '.env.local');
const defaultBaseUrl = 'https://agentic-ai-course-hazel.vercel.app';
const resumableChunkSize = 6 * 1024 * 1024;

const resourceModules = new Map(Object.entries({
  '01': {
    id: '01',
    title: 'The Paradigm Shift',
    summary: 'the shift from autocomplete to agentic AI engineering',
    keywords: ['paradigm shift']
  },
  '02': {
    id: '02',
    title: 'Claude Code Foundations',
    summary: 'Claude Code setup, workflow, and core interaction patterns',
    keywords: ['claude code foundations']
  },
  '03': {
    id: '03',
    title: 'Prompt Engineering',
    summary: 'prompt structure, constraints, and iteration loops',
    keywords: ['prompt engineering']
  },
  '04': {
    id: '04',
    title: 'Agentic Reasoning',
    summary: 'reading traces, recognizing patterns, and intervening well',
    keywords: ['agentic reasoning', 'agent thinking']
  },
  '05': {
    id: '05',
    title: 'Skills and Commands',
    summary: 'skills, slash commands, and reusable workflows',
    keywords: ['skills and commands', 'skills']
  },
  '06': {
    id: '06',
    title: 'MCP Architecture',
    summary: 'MCP primitives, schemas, and transport design',
    keywords: ['mcp architecture']
  },
  '07': {
    id: '07',
    title: 'Building MCP Servers',
    summary: 'designing and implementing production MCP servers',
    keywords: ['building mcp servers']
  },
  '08': {
    id: '08',
    title: 'Multi-Agent Workflows',
    summary: 'task decomposition, coordination, and orchestration',
    keywords: ['multi-agent workflows', 'multi-agent guidance', 'multi agent']
  },
  '09': {
    id: '09',
    title: 'Security',
    summary: 'permissions, prompt injection defense, and approval gates',
    keywords: ['security']
  },
  '10': {
    id: '10',
    title: 'Capstone',
    summary: 'pipeline design, observability, and production rollout',
    keywords: ['capstone']
  }
}));

const mimeTypes = {
  '.aac': 'audio/aac',
  '.csv': 'text/csv',
  '.gif': 'image/gif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.json': 'application/json',
  '.m4a': 'audio/mp4',
  '.md': 'text/markdown',
  '.mov': 'video/quicktime',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.ppt': 'application/vnd.ms-powerpoint',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain',
  '.wav': 'audio/wav',
  '.webm': 'video/webm',
  '.webp': 'image/webp'
};

function parseArgs(argv) {
  const args = {
    baseUrl: '',
    dryRun: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === '--dry-run') args.dryRun = true;
    if (value === '--base-url' && argv[index + 1]) {
      args.baseUrl = argv[index + 1];
      index += 1;
    }
  }

  return args;
}

function parseEnvText(source) {
  const env = {};
  for (const line of source.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) continue;
    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

async function loadEnvFile(filePath) {
  try {
    const source = await fs.readFile(filePath, 'utf8');
    const entries = parseEnvText(source);
    for (const [key, value] of Object.entries(entries)) {
      if (!process.env[key]) process.env[key] = value;
    }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}

function normalizeBaseUrl(value) {
  return String(value || defaultBaseUrl).replace(/\/+$/, '');
}

function slugText(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function titleCaseWords(value) {
  return String(value || '')
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function fileExtension(fileName) {
  return path.extname(String(fileName || '')).toLowerCase();
}

function contentTypeFor(fileName) {
  return mimeTypes[fileExtension(fileName)] || 'application/octet-stream';
}

function mediaKindFor(fileName, contentType) {
  const ext = fileExtension(fileName);
  const type = String(contentType || '').toLowerCase();

  if (type.startsWith('video/') || ['.mp4', '.mov', '.webm'].includes(ext)) return 'video';
  if (type.startsWith('image/') || ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'].includes(ext)) return 'image';
  if (type.startsWith('audio/') || ['.mp3', '.wav', '.m4a', '.aac'].includes(ext)) return 'audio';
  if (ext === '.pdf') return 'pdf';
  return 'file';
}

function assetLabelFor(fileName, contentType) {
  const kind = mediaKindFor(fileName, contentType);
  if (kind === 'video') return 'Video';
  if (kind === 'pdf') return 'Slide Deck';
  if (kind === 'audio') return 'Audio';
  if (kind === 'image') return 'Image';
  const ext = fileExtension(fileName).replace('.', '').toUpperCase();
  return ext ? `${ext} Resource` : 'Course Resource';
}

function inferModule(fileName, modules) {
  const normalized = slugText(path.basename(fileName, fileExtension(fileName)));
  const explicitMatch = normalized.match(/\b(?:module|video|mod|m|v)\s*0?(\d{1,2})\b/);
  if (explicitMatch) {
    const moduleId = explicitMatch[1].padStart(2, '0');
    if (modules.has(moduleId)) return modules.get(moduleId);
  }

  for (const module of modules.values()) {
    if ((module.keywords || []).some((term) => normalized.includes(slugText(term)))) {
      return module;
    }
  }

  return null;
}

function makeTitle(moduleInfo, assetLabel, fileName) {
  if (moduleInfo && /^\d+$/.test(moduleInfo.id)) {
    return `Module ${moduleInfo.id} · ${moduleInfo.title} ${assetLabel}`;
  }
  return titleCaseWords(path.basename(fileName, fileExtension(fileName)).replace(/[-_]+/g, ' '));
}

function makeDescription(moduleInfo, assetLabel) {
  if (moduleInfo && /^\d+$/.test(moduleInfo.id)) {
    return `${assetLabel} for Module ${moduleInfo.id} on ${moduleInfo.summary}.`;
  }
  return `${assetLabel} for the Raven 2-day course.`;
}

function makeCategory(moduleInfo, assetLabel) {
  if (moduleInfo && /^\d+$/.test(moduleInfo.id)) {
    return `Module ${moduleInfo.id} ${assetLabel}`;
  }
  return `Course ${assetLabel}`;
}

async function readJson(url, options) {
  const response = await fetch(url, options);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || payload.message || `Request failed for ${url}`);
  }
  return payload;
}

async function fetchExistingFileNames(baseUrl) {
  const payload = await readJson(`${baseUrl}/api/raven-course/resources`);
  return new Set((payload.items || []).map((item) => String(item.file_name || '')).filter(Boolean));
}

function directStorageOrigin(value) {
  const url = new URL(value);
  if (url.hostname.endsWith('.supabase.co') && !url.hostname.includes('.storage.')) {
    url.hostname = url.hostname.replace('.supabase.co', '.storage.supabase.co');
  }
  url.pathname = '';
  url.search = '';
  url.hash = '';
  return url.toString().replace(/\/$/, '');
}

function encodeTusMetadata(entries) {
  return Object.entries(entries)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${key} ${Buffer.from(String(value)).toString('base64')}`)
    .join(',');
}

async function uploadResumable(session, fileBuffer, contentType) {
  const endpoint = `${directStorageOrigin(session.fileUrl || session.uploadUrl)}/storage/v1/upload/resumable`;
  const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const firstChunk = fileBuffer.subarray(0, Math.min(resumableChunkSize, fileBuffer.length));
  const createResponse = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Tus-Resumable': '1.0.0',
      'Upload-Length': String(fileBuffer.length),
      'Upload-Offset': '0',
      'Upload-Metadata': encodeTusMetadata({
        bucketName: session.bucket,
        objectName: session.storagePath,
        contentType: contentType || 'application/octet-stream',
        cacheControl: '3600'
      }),
      Authorization: `Bearer ${secretKey}`,
      apikey: secretKey,
      'x-upsert': 'false',
      'Content-Type': 'application/offset+octet-stream'
    },
    body: firstChunk
  });

  if (!createResponse.ok) {
    const text = await createResponse.text().catch(() => '');
    throw new Error(text || 'Failed to start resumable upload.');
  }

  const location = createResponse.headers.get('location');
  if (!location) {
    throw new Error('Resumable upload did not return a location.');
  }

  const uploadUrl = new URL(location, endpoint).toString();
  let offset = Number(createResponse.headers.get('upload-offset') || firstChunk.length);
  for (; offset < fileBuffer.length; offset += resumableChunkSize) {
    const chunk = fileBuffer.subarray(offset, Math.min(offset + resumableChunkSize, fileBuffer.length));
    const chunkResponse = await fetch(uploadUrl, {
      method: 'PATCH',
      headers: {
        'Tus-Resumable': '1.0.0',
        'Upload-Offset': String(offset),
        'Content-Type': 'application/offset+octet-stream',
        Authorization: `Bearer ${secretKey}`,
        apikey: secretKey
      },
      body: chunk
    });

    if (!chunkResponse.ok) {
      const text = await chunkResponse.text().catch(() => '');
      throw new Error(text || 'Resumable chunk upload failed.');
    }
  }
}

async function uploadBinary(session, fileBuffer, contentType) {
  if (fileBuffer.length > resumableChunkSize && session.token) {
    await uploadResumable(session, fileBuffer, contentType);
    return;
  }

  const response = await fetch(session.uploadUrl, {
    method: 'PUT',
    headers: { 'content-type': contentType },
    body: fileBuffer
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || 'Direct upload failed.');
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  await loadEnvFile(envPath);

  const baseUrl = normalizeBaseUrl(args.baseUrl || process.env.RAVEN_RESOURCE_API_BASE || process.env.RAVEN_COURSE_SITE_URL);
  const resourceToken = process.env.RAVEN_RESOURCE_WRITE_TOKEN || process.env.RAVEN_SUBMISSIONS_WRITE_TOKEN || '';
  const modules = resourceModules;
  const existingFileNames = await fetchExistingFileNames(baseUrl);

  const files = (await fs.readdir(dropDir, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && !entry.name.startsWith('.'))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));

  if (!files.length) {
    console.log(`No files found in ${dropDir}`);
    return;
  }

  console.log(`Using resource drop folder: ${dropDir}`);
  console.log(`Target API base: ${baseUrl}`);
  console.log(args.dryRun ? 'Mode: dry run' : 'Mode: upload');

  for (const fileName of files) {
    const filePath = path.join(dropDir, fileName);
    const contentType = contentTypeFor(fileName);
    const moduleInfo = inferModule(fileName, modules);
    const assetLabel = assetLabelFor(fileName, contentType);
    const metadata = {
      title: makeTitle(moduleInfo, assetLabel, fileName),
      description: makeDescription(moduleInfo, assetLabel),
      category: makeCategory(moduleInfo, assetLabel),
      kind: mediaKindFor(fileName, contentType),
      contentType
    };

    console.log(`\n${fileName}`);
    console.log(`  title: ${metadata.title}`);
    console.log(`  category: ${metadata.category}`);
    console.log(`  description: ${metadata.description}`);

    if (existingFileNames.has(fileName)) {
      console.log('  skipped (already uploaded)');
      continue;
    }

    if (args.dryRun) continue;

    const fileBuffer = await fs.readFile(filePath);
    const headers = {
      'content-type': 'application/json'
    };
    if (resourceToken) headers['x-raven-resource-token'] = resourceToken;

    const uploadSession = await readJson(`${baseUrl}/api/raven-course/upload`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        kind: 'resource',
        fileName,
        contentType,
        fileSize: fileBuffer.length
      })
    });

    await uploadBinary(uploadSession, fileBuffer, contentType);

    await readJson(`${baseUrl}/api/raven-course/resources`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        title: metadata.title,
        description: metadata.description,
        category: metadata.category,
        source: 'course',
        kind: metadata.kind,
        file_url: uploadSession.fileUrl,
        file_name: uploadSession.fileName,
        storage_path: uploadSession.storagePath,
        content_type: contentType
      })
    });

    console.log('  uploaded');
    existingFileNames.add(fileName);
  }
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
