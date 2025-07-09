import { loadConfig } from './config.js';
import { getConnection } from './helpers/connection.js';

export async function startWatcher(): Promise<void> {
  const cfg = loadConfig();
  getConnection(cfg.rpcUrl, 'confirmed');

  console.log('Watcher started (placeholder)');
}
