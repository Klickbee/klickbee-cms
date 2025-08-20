<p align="center">
<img src="https://i.ibb.co/rgvcjN4/Frame-17.png" alt="Logo" border="0" width="400">
</p>
<h1 align="center">Klickbee CMS</h1>

<p align="center"><strong>The open-source CMS we always wanted. Monolithic. Visual. Built for speed.</strong></p>

<p align="center">
  <img alt="License" src="https://img.shields.io/badge/license-AGPLv3-green?style=flat-square">
  <img alt="Build" src="https://img.shields.io/badge/build-passing-brightgreen?style=flat-square">
  <img alt="Version" src="https://img.shields.io/badge/version-MVP-blue?style=flat-square">
  <img alt="Made by Stralya" src="https://img.shields.io/badge/made%20by-Stralya-4B5563?style=flat-square">
</p>

---

### 🧠 What is Klickbee CMS?

**Klickbee CMS** is a monolithic, open-source CMS designed to make developers fast and clients autonomous. Built with
Next.js & React, it integrates:

- A page builder interface
- Custom Post Types (CPT)
- Static & dynamic routing
- A clean admin UI
- And a dead-simple deployment model

Built for SaaS, portfolios, and high-perf websites.

---

### 🛋️ Architecture

#### FO (Front)

```
front/
├── static/[slug]
├── content/[cpt-type]/[cpt-slug]
```

#### BO (Admin)

```
/admin/[generated_key]/
├── auth
    ├── login
    ├── password-reset
    ├── password-reset-request
├── manage/
│   ├── content/[cpt-type]
│   ├── static/[slug]
│   ├── settings
│   └── contact
```

---

### 🚀 MVP Features

| Feature  | Description                                  |
|----------|----------------------------------------------|
| Pages    | Static pages: about, contact, etc.           |
| Content  | CPT system with full CRUD                    |
| Settings | Email, metadata, admin identity setup        |
| Builder  | Visual page builder (Webstudio.io or custom) |
| Sitemap  | Auto-generated sitemap                       |
| Contact  | Message system for contact requests          |
| Multi-BO | Admin UI in FR/EN                            |

---

### 👉 Admin UI Structure

- Contenu
	- CPT (collection + entries)
- Pages (static)
- Contact (requests)
- Réglages (admin setup, mail, i18n)

---

### 🌍 Features Coming Next

- 2D internal linking (smart mesh)
- AI-powered page generation
- Multilang frontend (i18n)
- Google Analytics & Search Console integration
- Broken link management

---

### 🧦 Stack

| Tech         | Description               |
|--------------|---------------------------|
| Next.js      | App Router + API routes   |
| React        | Modern UI interactions    |
| Prisma ORM   | PostgreSQL/SQLite support |
| Zustand      | Admin state management    |
| Tailwind CSS | Utility styling           |
| shadcn/ui    | Headless UI components    |
| better-auth  | Authentication package    |

---

### 🚀 Getting Started

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

Then open [localhost:3000](http://localhost:3000), and enjoy!

---

### 🧹 Code Quality & Git Hooks

This project uses [**Biome**](https://biomejs.dev/) for linting, formatting, and code assist features, combined with [**Lefthook**](https://github.com/evilmartians/lefthook) to automate checks at Git commit time.

#### 📦 Main Tools

- [`biome`](https://biomejs.dev/): All-in-one linter, formatter, and static checker for JavaScript/TypeScript.
- [`lefthook`](https://github.com/evilmartians/lefthook): Fast and powerful Git hooks manager.
- [`commitlint`](https://commitlint.js.org/): Ensures commit messages follow a consistent convention.

---

#### 🔧 Available Scripts

```json
"scripts": {
  "check": "biome check --write .",
  "format": "biome format --write .",
  "format:check": "biome format .",
  "lint": "biome lint --write .",
  "typecheck": "tsc --noEmit"
}
```

| Script                 | Description                                                                          |
|------------------------|--------------------------------------------------------------------------------------|
| `npm run check`        | Performs linting, formatting, and applies assist actions like import sorting (write) |
| `npm run format`       | Formats all files according to Biome rules (write)                                   |
| `npm run format:check` | Formats all files according to Biome rules (check)                                   |
| `npm run lint`         | Applies Biome linting rules (write)                                                  |
| `npm run typecheck`    | Type-checks the codebase using TypeScript without emitting files                     |

> ⚠️ The assist rules defined in `biome.json` (such as `organizeImports`, `useSortedKeys`, etc.) under the `assist.actions.source` section **are only applied when running** `npm run check`.

---

#### 🪝 Git Hooks with Lefthook

[Lefthook](https://github.com/evilmartians/lefthook) is used to run automated checks before each commit and after writing a commit message.

##### 🔁 Pre-commit Hook

Triggered before every `git commit`, it runs the following checks:

| Task            | Command Executed                                                                 |
|-----------------|----------------------------------------------------------------------------------|
| ✅ Biome Check  | `biome check` on staged files                                                    |
| 🧠 Type Check   | `tsc --noEmit` on `.ts` and `.tsx` files                                         |
| 🧪 Unit Tests   | `vitest run`                                                                     |

##### 📝 Commit Message Hook

Triggered after the commit message is written:

```bash
npx commitlint --edit
```

This ensures that your commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

---

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=stralya-company/klickbee-cms&type=Date)](https://www.star-history.com/#stralya-company/klickbee-cms&Date)

---

### 🚧 Contributing

Klickbee CMS is built in the open. Feedback, ideas, PRs welcome.

See [`CONTRIBUTING.md`](./CONTRIBUTING.md)

---

## License

This project is licensed under the [GNU Affero General Public License v3.0](./LICENSE).

---

### 🌐 Maintained by [Stralya](https://github.com/stralya-company)

We build tools for digital creators.

- ✉️ contact@stralya.com
- 💬 [Discord](https://discord.gg/SmBxh4wPrv)
- 💬 [Reddit](https://www.reddit.com/r/klickbee_cms/)
- 🌎 [stralya.com](https://stralya.com) *(coming soon)*

---

<p align="center">
  <em>Klickbee CMS. The CMS you'd build if you had time to build one.</em>
</p>
