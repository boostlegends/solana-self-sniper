import { PublicKey, VersionedTransaction } from '@solana/web3.js';
import { loadConfig } from './config.js';
import { getConnection } from './helpers/connection.js';
import { loadKeypair } from './helpers/keypair.js';
import { buildCreatePoolInstructions, buildSwapIx, buildVersionedTx } from './sdk/raydium.js';
import { JitoClientWrapper } from './sdk/jito.js';

export interface BundleResult {
  txs: VersionedTransaction[];
  bundleUuid: string;
  slot: number;
}

export async function runBundle(): Promise<BundleResult> {
  const cfg = loadConfig();
  const connection = getConnection(cfg.rpcUrl, 'confirmed');
  const payer = loadKeypair(cfg.privateKey);

  const usdcMint = new PublicKey('Es9vMFrzaCER9vDOMkMt2rt7NmexG99nmHn7f1kDp6BJ');
  const tokenMint = cfg.mint ? new PublicKey(cfg.mint) : new PublicKey('11111111111111111111111111111111');

  const { instructions, lookupTables } = await buildCreatePoolInstructions(connection, {
    tokenMint,
    baseMint: usdcMint,
    owner: payer.publicKey,
    initialTokenAmount: BigInt(cfg.initialTokenAmount),
    initialBaseAmount: BigInt(cfg.initialBaseAmount),
  });

  for (let i = 0; i < cfg.numSelfBuySwaps; i += 1) {
    const swapIx = buildSwapIx();
    instructions.push(swapIx);
  }

  const vtx = await buildVersionedTx(connection, payer.publicKey, instructions, lookupTables);
  vtx.sign([payer]);

  const jitoKey = payer.secretKey;
  const jito = new JitoClientWrapper(cfg.jitoEndpoint, jitoKey);
  const { uuid, slot } = await jito.sendBundle([vtx]);

  return { txs: [vtx], bundleUuid: uuid, slot };
}

if (import.meta.url === process.argv[1] || import.meta.url === `file://${process.argv[1]}`) {
  runBundle().then((res) => {
    console.log(JSON.stringify(res, null, 2));
  });
}
