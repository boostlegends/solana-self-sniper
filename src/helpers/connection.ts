import { Connection, Commitment } from '@solana/web3.js';

export function getConnection(rpcUrl: string, commitment: Commitment = 'confirmed'): Connection {
  return new Connection(rpcUrl, commitment);
}
