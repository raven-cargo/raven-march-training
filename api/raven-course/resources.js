const {
  getConfig,
  hasBackend,
  parseJsonBody,
  resourceTokenIsValid,
  selectRows,
  insertRow,
  sendJson
} = require('./_supabase');

module.exports = async function handler(req, res) {
  const config = getConfig();

  if (req.method === 'GET') {
    if (!hasBackend()) {
      return sendJson(res, 200, {
        backend: 'local',
        coreItems: [],
        items: []
      });
    }

    try {
      const rows = await selectRows(config.resourcesTable, 'select=*&order=created_at.asc');
      return sendJson(res, 200, {
        backend: 'supabase',
        coreItems: [],
        items: rows
      });
    } catch (error) {
      return sendJson(res, error.statusCode || 500, { error: error.message });
    }
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  if (!resourceTokenIsValid(req, config)) {
    return sendJson(res, 401, { error: 'Resource write token is missing or invalid.' });
  }

  if (!hasBackend()) {
    return sendJson(res, 503, { error: 'Supabase backend not configured' });
  }

  try {
    const body = await parseJsonBody(req);
    if (!body.title) {
      return sendJson(res, 400, { error: 'Resource title is required.' });
    }

    const row = await insertRow(config.resourcesTable, {
      title: body.title || '',
      description: body.description || '',
      category: body.category || 'Uploaded Resource',
      source: body.source || 'core',
      kind: body.kind || 'upload',
      file_url: body.file_url || '',
      file_name: body.file_name || '',
      storage_path: body.storage_path || '',
      content_type: body.content_type || '',
      created_at: new Date().toISOString()
    });

    return sendJson(res, 201, { item: row });
  } catch (error) {
    return sendJson(res, error.statusCode || 500, { error: error.message });
  }
};
