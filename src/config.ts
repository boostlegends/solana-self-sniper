import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  RPC_URL: z.string().url(),
  PRIVATE_KEY: z.string(),
  JITO_ENDPOINT: z.string(),
  MINT: z.string().optional(),
  INITIAL_BASE_AMOUNT: z.string().regex(/^[0-9]+(\.[0-9]+)?$/, 'Must be a number'),
  INITIAL_TOKEN_AMOUNT: z.string().regex(/^[0-9]+(\.[0-9]+)?$/, 'Must be a number'),
  SELF_BUY_WALLETS: z.string().optional(),
  NUM_SELF_BUY_SWAPS: z.string().regex(/^\d+$/).default('1'),
  SNIPER_THRESHOLD_PCT: z.string().regex(/^\d+$/).default('10'),
  DEV_MODE: z.string().optional().default('false'),
  DISCORD_WEBHOOK_URL: z.string().optional(),
});

type Env = z.infer<typeof envSchema>;

export interface Config {
  rpcUrl: string;
  privateKey: string;
  jitoEndpoint: string;
  mint?: string;
  initialBaseAmount: number;
  initialTokenAmount: number;
  selfBuyWallets: string[];
  numSelfBuySwaps: number;
  sniperThresholdPct: number;
  devMode: boolean;
  discordWebhookUrl?: string;
}

export function loadConfig(forceDev?: boolean): Config {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.format());
    process.exit(1);
  }
  const env = parsed.data as Env;
  return {
    rpcUrl: env.RPC_URL,
    privateKey: env.PRIVATE_KEY,
    jitoEndpoint: env.JITO_ENDPOINT,
    mint: env.MINT,
    initialBaseAmount: Number(env.INITIAL_BASE_AMOUNT),
    initialTokenAmount: Number(env.INITIAL_TOKEN_AMOUNT),
    selfBuyWallets: env.SELF_BUY_WALLETS ? env.SELF_BUY_WALLETS.split(',').map((s: string) => s.trim()) : [],
    numSelfBuySwaps: Number(env.NUM_SELF_BUY_SWAPS),
    sniperThresholdPct: Number(env.SNIPER_THRESHOLD_PCT),
    devMode: forceDev ?? env.DEV_MODE === 'true',
    discordWebhookUrl: env.DISCORD_WEBHOOK_URL,
  };
} 