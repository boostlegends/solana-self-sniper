/* eslint-disable import/no-extraneous-dependencies */
import {
  Connection,
  PublicKey,
  TransactionInstruction,
  VersionedTransaction,
  AddressLookupTableAccount,
} from '@solana/web3.js';
import * as Raydium from '@raydium-io/raydium-sdk';

interface PoolParams {
  tokenMint: PublicKey;
  baseMint: PublicKey; // usually USDC
  owner: PublicKey;
  initialTokenAmount: bigint;
  initialBaseAmount: bigint;
}

export async function buildCreatePoolInstructions(
  connection: Connection,
  params: PoolParams,
): Promise<{ instructions: TransactionInstruction[]; lookupTables: AddressLookupTableAccount[] }> {
  // NOTE: The real Raydium SDK call is more elaborate; this is a simplified placeholder.
  const { tokenMint, baseMint, owner, initialTokenAmount, initialBaseAmount } = params;

  const { instructions, addressLookupTables } = await Raydium.Liquidity.makeCreatePoolV4InstructionSimple({
    connection,
    programId: Raydium.MAINNET_PROGRAM_ID.AmmV4,
    marketId: Raydium.MARKET_STATE_LAYOUT_V3.decimals, // placeholder
    owner,
    baseMint,
    quoteMint: tokenMint,
    baseAmount: initialBaseAmount,
    quoteAmount: initialTokenAmount,
  } as any);

  return { instructions, lookupTables: addressLookupTables };
}

export function buildAddLiquidityIx(): TransactionInstruction {
  // TODO: implement using Raydium SDK
  throw new Error('Not implemented');
}

export function buildSwapIx(): TransactionInstruction {
  // TODO: implement using Raydium SDK
  throw new Error('Not implemented');
}

export async function buildVersionedTx(
  connection: Connection,
  payer: PublicKey,
  instructions: TransactionInstruction[],
  lookupTables: AddressLookupTableAccount[] = [],
): Promise<VersionedTransaction> {
  const { blockhash } = await connection.getLatestBlockhashAndContext();
  const messageV0 = new Raydium.VersionedMessage({
    payerKey: payer,
    recentBlockhash: blockhash,
    instructions,
    addressLookupTableAccounts: lookupTables,
  });
  return new VersionedTransaction(messageV0);
}
