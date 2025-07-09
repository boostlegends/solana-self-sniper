/* eslint-disable import/no-extraneous-dependencies */
import { VersionedTransaction } from '@solana/web3.js';
// @ts-ignore – no typings published yet
// eslint-disable-next-line import/no-unresolved
import { SearcherClient, BundleMessage } from '@jito-foundation/jito-ts';

export interface BundleResponse {
  uuid: string;
  slot: number;
}

export class JitoClientWrapper {
  private client: SearcherClient;

  constructor(endpoint: string, authKeypairBuffer: Uint8Array) {
    this.client = new SearcherClient(endpoint, authKeypairBuffer);
  }

  async sendBundle(transactions: VersionedTransaction[]): Promise<BundleResponse> {
    const bundle = new BundleMessage({ transactions });
    const res = await this.client.sendBundle(bundle);
    return { uuid: res.uuid, slot: res.slot };
  }
}
