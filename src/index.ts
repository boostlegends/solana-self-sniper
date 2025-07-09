import { Command } from 'commander';
import { loadConfig } from './config.js';
// import { runBundle } from './bundle.js';
// import { startWatcher } from './watch.js';

const program = new Command();

program
  .name('solana-self-sniper')
  .description('Create a Raydium pool, self-buy, and mirror early snipers')
  .option('--devnet', 'Use devnet endpoints')
  .option('--bundle', 'Run liquidity creation + self-buy bundle')
  .option('--watch', 'Start sniper watcher after bundle')
  .action(async (options) => {
    const cfg = loadConfig(options.devnet ?? false);
    console.log('Loaded configuration for', cfg.devMode ? 'devnet' : 'mainnet-beta');

    if (options.bundle) {
      console.log('Running bundle...');
      // await runBundle(cfg);
    }

    if (options.watch) {
      console.log('Starting watcher...');
      // await startWatcher(cfg);
    }
  });

program.parse(); 