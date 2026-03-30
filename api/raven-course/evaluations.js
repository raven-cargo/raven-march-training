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

  // GET requires instructor token — evaluations are NOT public
  if (req.method === 'GET') {
    const token = req.headers['x-raven-eval-token'] || '';
    const expectedToken = process.env.RAVEN_EVAL_READ_TOKEN || '';

    if (!expectedToken || token !== expectedToken) {
      return sendJson(res, 403, { error: 'Evaluation results require instructor access.' });
    }

    if (!hasBackend()) {
      return sendJson(res, 200, { backend: 'local', items: [] });
    }

    try {
      const items = await selectRows(config.evaluationsTable || 'raven_course_evaluations', 'select=*&order=created_at.desc');
      return sendJson(res, 200, { backend: 'supabase', items: items });
    } catch (error) {
      return sendJson(res, error.statusCode || 500, { error: error.message });
    }
  }

  // POST is open — any student can submit
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  if (!hasBackend()) {
    return sendJson(res, 503, { error: 'Supabase backend not configured' });
  }

  try {
    const body = await parseJsonBody(req);

    // Require at least one rating
    const hasRating = body.rating_instructor || body.rating_relevance || body.rating_materials;
    if (!hasRating) {
      return sendJson(res, 400, { error: 'Please provide at least one star rating.' });
    }

    const row = await insertRow(config.evaluationsTable || 'raven_course_evaluations', {
      name: body.name || 'Anonymous',
      rating_instructor: parseInt(body.rating_instructor, 10) || null,
      rating_relevance: parseInt(body.rating_relevance, 10) || null,
      rating_materials: parseInt(body.rating_materials, 10) || null,
      instructor_comments: body.instructor_comments || '',
      relevance_comments: body.relevance_comments || '',
      materials_comments: body.materials_comments || '',
      overall_comments: body.overall_comments || '',
      recommend: body.recommend || '',
      created_at: new Date().toISOString()
    });

    return sendJson(res, 201, { item: row });
  } catch (error) {
    return sendJson(res, error.statusCode || 500, { error: error.message });
  }
};
