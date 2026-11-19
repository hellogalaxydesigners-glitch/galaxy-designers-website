import { config } from './config';
import { createStore } from './storage';
import { createApp } from './app';

const store = createStore();
const app = createApp(store);

const server = app.listen(config.PORT, () => {
  console.log(`Galaxy Designers server listening on http://localhost:${config.PORT}`);
  console.log(`  storage:       ${store?.name ?? 'NOT CONFIGURED – enquiries will be refused'}`);
  console.log(`  email:         ${config.emailEnabled ? 'enabled' : 'not configured'}`);
  console.log(`  CRM webhook:   ${config.CRM_WEBHOOK_URL ? 'enabled' : 'not configured'}`);
  console.log(`  Turnstile:     ${config.TURNSTILE_SECRET_KEY ? 'enabled' : 'not configured'}`);
});

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 5_000).unref();
  });
}
