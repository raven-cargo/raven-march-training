'use strict';

// Regression test for the public submissions endpoint leaking student emails.
// Before the fix, the unauthenticated GET ran `select=*` against a table that
// stores the email collected by the submission form, so every row in the
// response carried a student's email address.
//
// Run with:  node --test test/api/
//
// The test stubs global.fetch, so it exercises the real handler + _supabase
// request path against a fake Supabase REST endpoint (no network, no secrets).

const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');

process.env.SUPABASE_URL = 'https://fake-project.supabase.co';
process.env.SUPABASE_SECRET_KEY = 'fake-service-role-key';

const handlerPath = path.join(__dirname, '..', '..', 'api', 'raven-course', 'submissions.js');
const handler = require(handlerPath);

// One row exactly as Supabase would return it if `select=*` were used: every
// column the POST path writes, including the email.
const STORED_ROW = {
  id: 7,
  name: 'Ada Lovelace',
  email: 'ada@raven-cargo.example',
  team: 'Ops',
  role: 'Dispatcher',
  block_id: 'm02',
  block_title: 'Module 02',
  lab_id: 'lab-02',
  lab_title: 'Lab 02 — Agent Traces',
  use_case_id: 'uc-3',
  use_case_title: 'Freight exception triage',
  notes: 'Attached the trace export.',
  link_url: 'https://example.com/writeup',
  file_url: 'https://fake-project.supabase.co/storage/v1/object/public/raven-course-submissions/x.mp4',
  file_name: 'x.mp4',
  storage_path: 'submissions/2026-11-11/x.mp4',
  content_type: 'video/mp4',
  created_at: '2026-11-11T10:00:00.000Z'
};

// Fields the submissions list in raven-cargo-course/assets/raven-course.js
// reads off each item when rendering.
const UI_FIELDS = [
  'name',
  'team',
  'role',
  'block_title',
  'use_case_title',
  'lab_id',
  'lab_title',
  'notes',
  'link_url',
  'file_url',
  'file_name',
  'content_type',
  'created_at'
];

function fakeRes() {
  return {
    statusCode: 0,
    headers: {},
    body: null,
    setHeader: function (key, value) { this.headers[key] = value; },
    end: function (payload) { this.body = payload; }
  };
}

function stubFetch(responder) {
  const calls = [];
  const original = global.fetch;
  global.fetch = async function (url, options) {
    calls.push({ url: String(url), options: options || {} });
    const payload = responder(String(url), options || {});
    return {
      ok: true,
      status: 200,
      headers: { get: function () { return 'application/json'; } },
      json: async function () { return payload; },
      text: async function () { return JSON.stringify(payload); }
    };
  };
  return {
    calls: calls,
    restore: function () { global.fetch = original; }
  };
}

test('GET /api/raven-course/submissions never returns student emails', async function () {
  // Supabase honours the requested column list; this fake is deliberately
  // sloppier and hands back the whole row, so the test also covers the
  // defence-in-depth projection in the handler.
  const fetchStub = stubFetch(function () { return [STORED_ROW]; });
  const res = fakeRes();

  try {
    await handler({ method: 'GET', headers: {} }, res);
  } finally {
    fetchStub.restore();
  }

  assert.strictEqual(res.statusCode, 200);
  const payload = JSON.parse(res.body);
  assert.strictEqual(payload.items.length, 1);

  const item = payload.items[0];
  assert.ok(!('email' in item), 'response item must not carry an email key');
  assert.ok(
    JSON.stringify(payload).indexOf('ada@raven-cargo.example') === -1,
    'no email address may appear anywhere in the response body'
  );

  // The request sent upstream must ask for explicit columns, not `select=*`.
  const requested = fetchStub.calls[0].url;
  assert.ok(requested.indexOf('select=*') === -1, 'must not request select=*: ' + requested);
  assert.ok(requested.indexOf('email') === -1, 'must not request the email column: ' + requested);
  assert.ok(requested.indexOf('order=created_at.desc') !== -1, 'ordering must be preserved');
});

test('GET keeps every submission field the UI renders', async function () {
  const fetchStub = stubFetch(function () { return [STORED_ROW]; });
  const res = fakeRes();

  try {
    await handler({ method: 'GET', headers: {} }, res);
  } finally {
    fetchStub.restore();
  }

  const item = JSON.parse(res.body).items[0];
  UI_FIELDS.forEach(function (field) {
    assert.deepStrictEqual(item[field], STORED_ROW[field], 'field preserved: ' + field);
  });
});

test('POST still stores the email but does not echo it back', async function () {
  const fetchStub = stubFetch(function () { return [STORED_ROW]; });
  const res = fakeRes();
  const req = {
    method: 'POST',
    headers: {},
    body: { name: 'Ada Lovelace', email: 'ada@raven-cargo.example', team: 'Ops' }
  };

  try {
    await handler(req, res);
  } finally {
    fetchStub.restore();
  }

  assert.strictEqual(res.statusCode, 201);

  const inserted = JSON.parse(fetchStub.calls[0].options.body);
  assert.strictEqual(inserted.email, 'ada@raven-cargo.example', 'email is still persisted');

  const item = JSON.parse(res.body).item;
  assert.ok(!('email' in item), 'created item must not echo the email back');
  assert.strictEqual(item.name, 'Ada Lovelace');
});
