import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = Number(process.env.PORT) || 4173;
const ROOT = path.resolve('docs');

export const SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
};

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

export function createPreviewServer(rootDir = ROOT) {
  return http.createServer((req, res) => {
    let reqPath = decodeURIComponent((req.url || '/').split('?')[0]);
    if (reqPath === '/') reqPath = '/index.html';

    // Prevent path traversal outside rootDir
    const normalizedRoot = path.resolve(rootDir);
    let filePath = path.resolve(normalizedRoot, '.' + reqPath);
    if (!filePath.startsWith(normalizedRoot)) {
      res.writeHead(403, {
        'Content-Type': 'text/plain',
        ...SECURITY_HEADERS
      });
      res.end('Forbidden');
      return;
    }

    // If path is a directory, look for index.html inside
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    // Fallback to filePath.html if exists
    if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    }

    // Fallback for SPA routing if asset not found
    if (!fs.existsSync(filePath)) {
      filePath = path.join(normalizedRoot, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain',
          ...SECURITY_HEADERS
        });
        res.end('Server Error');
        return;
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
        ...SECURITY_HEADERS
      });
      res.end(content);
    });
  });
}

const server = createPreviewServer();

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve('scripts/serve_preview.mjs')) {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Temporary Preview Server running at:`);
    console.log(`👉 http://localhost:${PORT}`);
    console.log(`👉 http://127.0.0.1:${PORT}`);
    console.log(`Serving pre-rendered static HTML & client bundle from: ${ROOT}`);
  });
}
