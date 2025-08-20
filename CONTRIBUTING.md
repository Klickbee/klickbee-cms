# Contributing to Klickbee CMS

We welcome contributions of all kinds — bug fixes, features, improvements, ideas, or even typo corrections.

## 🚀 Getting Started

Join our communities for real-time discussions:
- Discord: [Join Klickbee Discord](https://discord.gg/SmBxh4wPrv)
- Reddit: [r/klickbee_cms](https://www.reddit.com/r/klickbee_cms/)

1. **Fork** this repository
2. **Clone** your fork locally: `git clone https://github.com/your-username/klickbee-cms`
3. Create a new branch: `git checkout -b feature/your-feature`
4. For first launch: `npm run setup:dev` (installs dependencies, runs migrations, and starts dev server)
5. For subsequent launches: `npm run dev`
6. Make your changes
7. Commit using [Conventional Commits](https://www.conventionalcommits.org/)
8. Push and open a **Pull Request**

---

## 📁 Project Structure

```
klickbee-cms/
├── src/
│   ├── app/                → Next.js app router pages
│   ├── builder/            → Builder source code
│   ├── components/         → Global reusable components
│   ├── feature/            → Feature modules (core organization)
│   ├── generated/          → Auto-generated files
│   ├── hooks/              → Shared React hooks
│   ├── lib/                → Shared utilities and helpers
│   ├── providers/          → React context providers
│   └── __tests__/          → Test files
└── prisma/                 → Prisma schema + migrations
```

Admin and frontend are unified — monolith style — and separated logically under routes.

For detailed feature structure and architectural patterns, see [STRUCTURE.md](./STRUCTURE.md)

---

## 🧪 Running Locally

**Option 1: With npm**

1. Copy the environment file and configure it:
```sh
cp .env.example .env
# Edit .env file with your configuration
```

2. For first launch:
```sh
npm run setup:dev
```

3. For subsequent launches:
```sh
npm run dev
```

**Option 2: With Docker Compose**

1. Copy the environment file and configure it:
```sh
cp .env.example .env
# Edit .env file with your configuration
```

2. Start the development container:
```sh
docker compose up
```

3. For background mode:
```sh
docker compose up -d
```

---

## 🧹 Code Quality & Git Hooks

This project uses [**Biome**](https://biomejs.dev/) for linting, formatting, and code assist features, combined with [**Lefthook**](https://github.com/evilmartians/lefthook) to automate checks at Git commit time.

### Available Scripts

| Script                 | Description                                                                          |
|------------------------|--------------------------------------------------------------------------------------|
| `npm run check`        | Performs linting, formatting, and applies assist actions like import sorting (write) |
| `npm run format`       | Formats all files according to Biome rules (write)                                   |
| `npm run format:check` | Formats all files according to Biome rules (check)                                   |
| `npm run lint`         | Applies Biome linting rules (write)                                                  |
| `npm run typecheck`    | Type-checks the codebase using TypeScript without emitting files                     |
| `npm test`             | Runs tests with Vitest                                                               |

### Git Hooks with Lefthook

[Lefthook](https://github.com/evilmartians/lefthook) is used to run automated checks before each commit and after writing a commit message.

#### Pre-commit Hook

Triggered before every `git commit`, it runs the following checks:
- Biome Check on staged files
- Type Check on `.ts` and `.tsx` files
- Unit Tests with Vitest

#### Commit Message Hook

Ensures that your commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

---

## ✏️ Code Style Guidelines

* Use Tailwind utility classes for styling
* Use [shadcn/ui](https://ui.shadcn.dev/) components
* Prefer Zustand for global state
* Follow the feature-first modular architecture
* Use TypeScript for type safety
* Use Zod for data validation

No `pnpm` for now. Stick to `npm` unless updated.

---

## ✅ Pull Request Checklist

* [ ] Your branch is up to date with `main`
* [ ] Code runs locally without errors
* [ ] Code is formatted and linted (`npm run check`)
* [ ] Tests pass (`npm test`)
* [ ] One feature or fix per PR
* [ ] PR includes clear title and description

---

## 🤝 Code of Conduct

We follow a [Code of Conduct](./CODE_OF_CONDUCT.md) that ensures respectful and inclusive collaboration.

---

## 📬 Need help or have ideas?

- Open an issue or start a GitHub discussion
- Join our [Discord](https://discord.gg/SmBxh4wPrv)
- Post on our [Reddit community](https://www.reddit.com/r/klickbee_cms/)
- Email us at `contact@stralya.com`

Thanks for helping us make Klickbee CMS better 💜
