import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createPreviewServer, SECURITY_HEADERS } from '../scripts/serve_preview.mjs';
import viteConfig from '../vite.config.js';

const EXPECTED_HSTS = 'max-age=31536000; includeSubDomains';

test('Positive: Vite server and preview configurations enforce Strict-Transport-Security and security headers', () => {
  assert.ok(viteConfig.server?.headers, 'vite.config.js server.headers must be defined');
  assert.equal(
    viteConfig.server.headers['Strict-Transport-Security'],
    EXPECTED_HSTS,
    'Vite dev server must include Strict-Transport-Security header'
  );
  assert.ok(viteConfig.preview?.headers, 'vite.config.js preview.headers must be defined');
  assert.equal(
    viteConfig.preview.headers['Strict-Transport-Security'],
    EXPECTED_HSTS,
    'Vite preview server must include Strict-Transport-Security header'
  );
});

test('Positive: Static hosting _headers configuration and HTML upgrade-insecure-requests are present', () => {
  const publicHeadersPath = path.resolve('public/_headers');
  assert.ok(fs.existsSync(publicHeadersPath), 'public/_headers must exist');
  const publicHeaders = fs.readFileSync(publicHeadersPath, 'utf8');
  assert.match(
    publicHeaders,
    /Strict-Transport-Security:\s*max-age=31536000;\s*includeSubDomains/,
    'public/_headers must configure Strict-Transport-Security'
  );

  const docsIndexPath = path.resolve('docs/index.html');
  if (fs.existsSync(docsIndexPath)) {
    const html = fs.readFileSync(docsIndexPath, 'utf8');
    assert.match(
      html,
      /<meta\s+http-equiv=["']Content-Security-Policy["']\s+content=["']upgrade-insecure-requests["']/i,
      'Generated HTML must include CSP upgrade-insecure-requests meta directive'
    );
  }
});

test('Positive & Negative: Preview HTTP server returns Strict-Transport-Security on valid routes and blocks path traversal', async () => {
  const server = createPreviewServer(path.resolve('docs'));
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();

  try {
    // Positive test: normal request returns 200 with HSTS header and valid HTML
    const res = await fetch(`http://127.0.0.1:${port}/`);
    assert.equal(res.status, 200);
    assert.equal(
      res.headers.get('strict-transport-security'),
      EXPECTED_HSTS,
      'HTTP response must include Strict-Transport-Security header'
    );
    assert.equal(
      res.headers.get('x-content-type-options'),
      SECURITY_HEADERS['X-Content-Type-Options']
    );
    const body = await res.text();
    assert.ok(body.includes('<!DOCTYPE html>') || body.includes('<!doctype html>'));

    // Negative test: verify unsafe omission of HSTS never occurs even on fallback/error responses,
    // and path traversal attempts are blocked with 403 while still enforcing HSTS.
    const traversalRes = await fetch(`http://127.0.0.1:${port}/..%2f..%2fpackage.json`);
    assert.equal(traversalRes.status, 403, 'Path traversal outside root must be blocked with 403');
    assert.equal(
      traversalRes.headers.get('strict-transport-security'),
      EXPECTED_HSTS,
      'Blocked/error responses must still enforce Strict-Transport-Security'
    );
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
