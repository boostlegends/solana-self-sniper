import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import fs from 'node:fs';

export function loadKeypair(secret: string): Keypair {
  let secretKey: Uint8Array;
  try {
    const trimmed = secret.trim();
    if (fs.existsSync(trimmed)) {
      const contents = fs.readFileSync(trimmed, 'utf-8');
      secretKey = Uint8Array.from(JSON.parse(contents) as number[]);
    } else if (trimmed.startsWith('[')) {
      secretKey = Uint8Array.from(JSON.parse(trimmed) as number[]);
    } else {
      secretKey = bs58.decode(trimmed);
    }
  } catch (err) {
    throw new Error('Invalid PRIVATE_KEY provided. Expected base58 string, JSON array, or path to keypair file.');
  }
  return Keypair.fromSecretKey(secretKey);
}
