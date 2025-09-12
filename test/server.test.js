const { test } = require('node:test');
const assert = require('node:assert');
const { createApp } = require('../server');

test('GET / serves index.html', async (t) => {
    const server = createApp().listen(0);
    t.after(() => server.close());
    const port = server.address().port;
    const res = await fetch(`http://localhost:${port}/`);
    const text = await res.text();
    assert.strictEqual(res.status, 200);
    assert.match(text, /<html/i);
});

test('GET /nonexistent returns 404', async (t) => {
    const server = createApp().listen(0);
    t.after(() => server.close());
    const port = server.address().port;
    const res = await fetch(`http://localhost:${port}/no-file`);
    const text = await res.text();
    assert.strictEqual(res.status, 404);
    assert.match(text, /File not found/);
});
