const {
  getConfig,
  hasBackend,
  parseJsonBody,
  insertRow,
  selectRows,
  sendJson
} = require('./_supabase');

module.exports = async function handler(req, res) {
  const config = getConfig();

  if (req.method === 'GET') {
    if (!hasBackend()) {
      return sendJson(res, 200, { backend: 'local', items: [] });
    }

    try {
      const items = await selectRows(config.submissionsTable, 'select=*&order=created_at.desc');
      return sendJson(res, 200, { backend: 'supabase', items: items });
    } catch (error) {
      return sendJson(res, error.statusCode || 500, { error: error.message });
    }
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  if (!hasBackend()) {
    return sendJson(res, 503, { error: 'Supabase backend not configured' });
  }

  try {
    const body = await parseJsonBody(req);
    if (!body.name) {
      return sendJson(res, 400, { error: 'Name is required.' });
    }

    const row = await insertRow(config.submissionsTable, {
      name: body.name || '',
      email: body.email || '',
      team: body.team || '',
      role: body.role || '',
      block_id: body.block_id || null,
      block_title: body.block_title || '',
      lab_id: body.lab_id || null,
      lab_title: body.lab_title || '',
      use_case_id: body.use_case_id || null,
      use_case_title: body.use_case_title || '',
      mission_id: body.mission_id || null,
      mission_title: body.mission_title || '',
      notes: body.notes || '',
      link_url: body.link_url || '',
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
