# 📦 Project Structure — Klickbee CMS (Feature‑Driven Architecture)

Klickbee CMS follows a **Feature‑Driven Architecture (FDA)** to ensure clear separation of responsibilities, horizontal scalability, and an efficient contributor workflow.

---

## 🗂️ Root Directory Structure

```
klickbee-cms/
├── src/
│   ├── app/                → Next.js App Router (public & admin routes)
│   ├── feature/            → Core feature modules (main organization layer)
│   ├── shared/             → Cross-feature shared logic (UI, utils, hooks)
│   ├── providers/          → React context providers
│   ├── styles/             → Global styles & design tokens
│   └── types/              → Global shared TypeScript types
├── public/                 → Static assets
├── tests/                  → Integration & e2e tests
└── config/                 → Environment & build configuration
```

---

## 🧩 Feature Module Structure

Each **feature** is **self-contained** and includes only what it needs:

```
src/feature/<feature-name>/
├── api/                → API route handlers or client utilities
│   ├── api<Feature>.ts → Main feature API entry (re‑exported in /app/api)
│   └── client/         → Optional: feature‑specific API client
├── components/         → Feature‑scoped UI components
├── hooks/              → React hooks specific to this feature
├── lib/                → Server actions & internal logic
├── queries/            → React Query hooks
├── options/            → React Query configuration
├── schemas/            → Zod validation schemas
├── stores/             → Zustand client stores
├── types/              → Feature‑specific TypeScript types
└── index.ts            → Central export for the feature API & hooks
```

**Notes:**

* Features must be **plug‑and‑play**, with no hard dependencies between them.
* Follow a **functional naming convention** (e.g., `apiUser.ts`, `useUser.ts`, `userStore.ts`).
* Keep API logic encapsulated under each feature, re‑exported via `app/api/...`.

---

## 🔗 App Router Integration

Re‑export handlers from your feature into the App Router:

```ts
// src/app/api/admin/user/route.ts
export { GET, POST } from "@/feature/user/api/apiUser";
```

UI routes can consume the feature directly:

```tsx
// src/app/admin/user/page.tsx
import { useUsers } from "@/feature/user/queries/useUsers";
import { UserTable } from "@/feature/user/components/UserTable";
```

---

## 🛠 Shared Logic

| Folder              | Description                                           |
| ------------------- | ----------------------------------------------------- |
| `src/shared/ui/`    | Design system & UI primitives (buttons, modals, etc.) |
| `src/shared/lib/`   | Utilities, helpers, constants, configs                |
| `src/shared/hooks/` | Generic reusable React hooks                          |
| `src/shared/types/` | Global shared types & interfaces                      |

---

## ✅ Naming Conventions

| Type             | Prefix / Suffix | Example          |
| ---------------- | --------------- | ---------------- |
| React Query hook | `use`           | `useUserList.ts` |
| Zustand store    | `Store`         | `userStore.ts`   |
| Zod schema       | `Schema`        | `userSchema.ts`  |
| API handler      | `api`           | `apiUser.ts`     |
| Component        | PascalCase      | `UserTable.tsx`  |

---

## 💡 Feature Development Workflow

1. Create a folder under `src/feature/<feature>`.
2. Add only what you need:

	* `lib/` → server actions, internal logic
	* `queries/`, `options/` → React Query data layer
	* `stores/` → Zustand state
	* `schemas/` → validation
	* `components/` → feature UI
3. Link Next.js API routes through re‑exports in `/app/api/...`.
4. Never couple features directly — share logic via `src/shared`.

---

## 🧬 Design & Tech Patterns

* **Server Actions** → in `lib/`
* **API Handlers** → in `api/` (re‑exported under `app/api/`)
* **Data Fetching** → React Query (`queries/`, `options/`)
* **Local State** → Zustand (`stores/`)
* **Validation** → Zod (`schemas/`)
* **Typing** → TypeScript (`types/`)

---

## 🧱 Example: User Feature

```
src/feature/user/
├── api/
│   └── apiUser.ts
├── components/
│   └── UserTable.tsx
├── lib/
│   └── userActions.ts
├── queries/
│   └── useUsers.ts
├── stores/
│   └── userStore.ts
├── schemas/
│   └── userSchema.ts
├── types/
│   └── userTypes.ts
└── index.ts
```

---

Let’s keep it modular. Let’s keep it scalable. 🚀
