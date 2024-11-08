# Onchain Agent Demo

<img width="1512" alt="Screenshot 2024-11-07 at 9 26 56 AM" src="https://github.com/user-attachments/assets/f67a3472-dad1-46ad-869d-22a9cb97ceaa">


A web app that enables onchain interactions through a conversational UI using AgentKit, a collaboration between [CDP SDK](https://docs.cdp.coinbase.com/) and [OnchainKit](https://onchainkit.xyz).

## Overview

This project features a Next.js frontend designed to work seamlessly with [CDP's AgentKit backend](https://github.com/coinbase/onchain-agent-demo-backend). Together, they enable the creation of an AI agent capable of performing onchain operations on Base. The agent uses GPT-4 for natural language understanding and AgentKit for onchain interactions.

## Key Features

- **AI-Powered Chat Interface**: Interactive chat interface for natural language interactions onchain
- **Onchain Operations**: Ability to perform various blockchain operations through Agentkit:
  - Deploy and interact with ERC-20 tokens
  - Create and manage NFTs
  - Check wallet balances
  - Request funds from faucet
- **Real-time Updates**: Server-Sent Events (SSE) for streaming responses
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Wallet Integration**: Secure wallet management through CDP Agentkit

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Development**: TypeScript, Biome for formatting/linting

## Prerequisites

- [Bun](https://bun.sh) for package management

## Environment Setup

Create a `.env.local` file with the following variables:

```bash
NEXT_PUBLIC_API_URL= # The base URL for API requests. This must be set to the endpoint of your backend service.
```

## Installation

1. Install dependencies:
```bash
bun i
```

2. Start the development server:
```bash
bun dev
```

This will concurrently start both the Next.js frontend.

## Development

- Format code: `bun run format`
- Lint code: `bun run lint`
- Run CI checks: `bun run ci:check`

## License

See [LICENSE.md](LICENSE.md) for details.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.
