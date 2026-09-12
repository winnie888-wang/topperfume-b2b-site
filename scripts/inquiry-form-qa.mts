/** Local-only browser QA: replaces the email transport with an in-memory receiver.
 * No real credentials are loaded, and fetch cannot reach an external endpoint.
 * Start explicitly with tsx; this file is not imported by the website runtime.
 */
import { createServer } from 'node:http';
process.env.NODE_ENV = 'development';
process.env.VERCEL_ENV = 'development';
process.env.SITE_INDEXABLE = 'false';
process.env.INQUIRY_ENABLED = 'true';
process.env.RESEND_API_KEY = 'mock_local_qa_not_a_real_key';
process.env.INQUIRY_FROM_EMAIL = 'qa@example.invalid';
process.env.INQUIRY_TO_EMAIL = 'receiver@example.invalid';
let mode: 'success' | 'failure' | 'hold' = 'success';
let requests: any[] = [];
let pending: Array<(value: Response) => void> = [];
const response = (success: boolean) => new Response(JSON.stringify(success ? { id: 'mock-only-no-real-email' } : { message: 'Simulated email provider unavailable' }), { status: success ? 200 : 503, headers: { 'Content-Type': 'application/json' } });
globalThis.fetch = (async (url: any, init: any) => {
  if (String(url) !== 'https://api.resend.com/emails' || init?.headers?.Authorization !== 'Bearer mock_local_qa_not_a_real_key') throw new Error('External fetch blocked by local email QA');
  requests.push({ at: new Date().toISOString(), mode, payload: JSON.parse(init.body) });
  if (mode === 'hold') return new Promise<Response>(resolve => { pending.push(resolve); });
  return response(mode === 'success');
}) as typeof fetch;
const { createApp } = await import('../server/app');
const { setupVite } = await import('../server/_core/vite');
const app = createApp();
app.get('/__qa/state', (_req, res) => res.json({ mode, calls: requests.length, pending: pending.length, requests, realEmailSending: false }));
app.post('/__qa/control', (req, res) => {
  if (req.body.mode && ['success', 'failure', 'hold'].includes(req.body.mode)) mode = req.body.mode;
  if (req.body.release) { for (const resolve of pending) resolve(response(req.body.release === 'success')); pending = []; }
  if (req.body.reset && pending.length === 0) requests = [];
  res.json({ mode, calls: requests.length, pending: pending.length, realEmailSending: false });
});
const server = createServer(app);
await setupVite(app, server);
server.listen(3002, '127.0.0.1', () => console.log('Local mock-receiver QA: http://127.0.0.1:3002 — real email sending blocked.'));
