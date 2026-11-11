# Tests

No bundler or test framework is installed; these use the Node built-in runner.

```bash
node --test "test/api/*.test.js"
```

- `api/submissions-privacy.test.js` — guards the unauthenticated submissions GET against
  returning the student email stored with each submission, and checks the fields the
  course UI renders still come back.
