const {
  createSignedUpload,
  getConfig,
  hasSupabaseConfig,
  json,
  makeStoragePath,
  missingSupabaseConfig,
  publicStorageUrl,
  resourceTokenIsValid,
  readBody
} = require('./_supabase');

module.exports = async function handler(req, res) {
  const config = getConfig();

  if (req.method !== 'POST') {
    return json(res, 405, { error: 'Method not allowed.' });
  }

  if (!hasSupabaseConfig(config)) {
    return json(res, 503, {
      error: 'Supabase env vars are not configured for uploads.',
      missing: missingSupabaseConfig(config)
    });
  }

  const body = await readBody(req);
  const kind = body.kind === 'resource' ? 'resource' : 'submission';

  if (kind === 'resource' && !resourceTokenIsValid(req, config)) {
    return json(res, 401, { error: 'Resource write token is missing or invalid.' });
  }

  if (!body.fileName) {
    return json(res, 400, { error: 'fileName is required.' });
  }

  const bucket = kind === 'resource' ? config.resourcesBucket : config.submissionsBucket;
  const storagePath = makeStoragePath(kind, body.fileName);

  try {
    const uploadSession = await createSignedUpload(config, bucket, storagePath);
    if (!uploadSession.uploadUrl) {
      return json(res, 500, { error: 'Signed upload target could not be created.' });
    }

    return json(res, 201, {
      bucket: bucket,
      storagePath: storagePath,
      fileName: body.fileName,
      fileUrl: publicStorageUrl(config, bucket, storagePath),
      uploadUrl: uploadSession.uploadUrl,
      signedPath: uploadSession.path,
      token: uploadSession.token || ''
    });
  } catch (error) {
    return json(res, error.statusCode || 500, { error: error.message });
  }
};
