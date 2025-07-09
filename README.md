# Solana Self Sniper

This project creates a Raydium liquidity pool for your token, places self-buy swaps, and mirrors early snipers.

## Quick Start

```bash
pnpm i
cp .env.example .env  # fill in your keys and RPC URL
pnpm bundle-and-watch --devnet
```

## Devnet demo with Docker

```bash
./scripts/launch-devnet.sh    # spins validator + Jito mock
cp env.example .env           # fill PRIVATE_KEY etc.
export RPC_URL=http://localhost:8899
export JITO_ENDPOINT=http://localhost:4000
pnpm bundle-and-watch --devnet
```

More documentation coming soon. 