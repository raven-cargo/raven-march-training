const {
  getConfig,
  hasBackend,
  parseJsonBody,
  insertRow,
  selectRows,
  sendJson
} = require('./_supabase');

// The submissions table stores a student-supplied email address (collected by
// the submission form). This endpoint is unauthenticated, so the read path must
// never return it: select an explicit column list instead of `select=*`. Every
// column below is written by the insert in this same file, so the list is
// guaranteed to match the table.
const PUBLIC_COLUMNS = [
  'name',
  'team',
  'role',
  'block_id',
  'block_title',
  'lab_id',
  'lab_title',
  'use_case_id',
  'use_case_title',
  'notes',
  'link_url',
  'file_url',
  'file_name',
  'storage_path',
  'content_type',
  'created_at'
];

const PUBLIC_SELECT = 'select=' + PUBLIC_COLUMNS.join(',');

function toPublicSubmission(row) {
  const source = row && typeof row === 'object' ? row : {};
  const safe = {};
  PUBLIC_COLUMNS.forEach(function (column) {
    if (Object.prototype.hasOwnProperty.call(source, column)) {
      safe[column] = source[column];
    }
  });
  return safe;
}

module.exports = async function handler(req, res) {
  const config = getConfig();

  if (req.method === 'GET') {
    if (!hasBackend()) {
      return sendJson(res, 200, { backend: 'local', items: [] });
    }

    try {
      const rows = await selectRows(config.submissionsTable, PUBLIC_SELECT + '&order=created_at.desc');
      const items = (Array.isArray(rows) ? rows : []).map(toPublicSubmission);
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
      notes: body.notes || '',
      link_url: body.link_url || '',
      file_url: body.file_url || '',
      file_name: body.file_name || '',
      storage_path: body.storage_path || '',
      content_type: body.content_type || '',
      created_at: new Date().toISOString()
    });

    return sendJson(res, 201, { item: toPublicSubmission(row) });
  } catch (error) {
    return sendJson(res, error.statusCode || 500, { error: error.message });
  }
};

module.exports.PUBLIC_COLUMNS = PUBLIC_COLUMNS;
module.exports.PUBLIC_SELECT = PUBLIC_SELECT;
module.exports.toPublicSubmission = toPublicSubmission;
