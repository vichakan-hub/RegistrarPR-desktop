/* RegistrarPR PWA v5 — online-only, no personal-data caching. */
'use strict';
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
const OFFLINE_PAGE = `<!doctype html><html lang="th"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#2563eb"><title>RegistrarPR - ไม่ได้เชื่อมต่อ</title><style>body{margin:0;background:#f5f7fb;color:#17263c;font-family:system-ui,sans-serif;min-height:100vh;display:grid;place-items:center}main{background:white;border:1px solid #d9e3ee;border-radius:20px;padding:28px;max-width:460px;margin:16px}h1{color:#2563eb}a{display:inline-block;background:#2563eb;color:white;text-decoration:none;padding:12px 20px;border-radius:12px}</style></head><body><main><h1>RegistrarPR</h1><h2>ไม่สามารถเชื่อมต่อเว็บไซต์ได้</h2><p>ระบบงานทะเบียนต้องใช้อินเทอร์เน็ตเพื่อยืนยันสิทธิ์และเข้าถึงข้อมูลอย่างปลอดภัย กรุณาตรวจสอบการเชื่อมต่อแล้วลองใหม่</p><a href="./">ลองเชื่อมต่ออีกครั้ง</a></main></body></html>`;
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  const scope = new URL(self.registration.scope);
  // Leave RPC, Supabase, fonts, PDF and every subresource to the browser.
  if (request.method !== 'GET' || request.mode !== 'navigate' || url.origin !== scope.origin || ![scope.pathname, scope.pathname + 'index.html'].includes(url.pathname)) return;
  // No Cache Storage: always request a fresh application document.
  event.respondWith(fetch(request, {cache:'no-store'}).catch(() => new Response(OFFLINE_PAGE, {
    status: 503,
    headers: {'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}
  })));
});
