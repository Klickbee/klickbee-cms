# 📦 Project Structure — Klickbee CMS

Klickbee CMS uses a **feature-first modular architecture** to keep the codebase clean, scalable, and contributor-friendly.

---

## 🗂️ Root Directory Structure

```
klickbee-cms/
├── src/
│   ├── app/                → Next.js app router pages
│   ├── components/         → Global reusable components
│   ├── feature/            → Feature modules (core organization)
│   ├── lib/                → Shared utilities and helpers
│   └── providers/          → React context providers
└── ...                     → Configuration files
```

---

## 🛡️ Feature Organization

Each feature lives in its own directory under `src/feature/`:

```
src/feature/<feature-name>/
├── actions/            → Actions for server-side logic
├── api/                → API client functions
├── client/             → Client-side logic
├── components/         → Feature-specific components
├── handlers/           → handlers for specific logic
├── languages/          → Localization files (only for translations feature)
├── lib/                → Server actions and utilities
├── options/            → React Query options
├── queries/            → React Query hooks
├── stores/             → Zustand state stores
├── schemas/            → Zod schemas
└── types/              → TypeScript types
```

**Note:** Features only include the directories they need. Not all features will have all of these directories.

### Special API Usage

For features that require API endpoints, use the `api/` directory to define your API handlers. There are three main patterns:

1. **Next.js API Route Handlers**: Export HTTP method functions (GET, POST, etc.) that will be re-exported in `src/app/api/` route files:
   ```typescript
   // src/feature/settings/api/apiSettings.ts
   export async function GET(req: NextRequest) { /* ... */ }
   export async function POST(req: NextRequest) { /* ... */ }
   
   // src/app/api/admin/settings/route.ts
   export { GET, POST } from "@/feature/settings/api/apiSettings";
   ```

2. **API Utility Functions**: Create helper functions that can be imported and used by other features:
   ```typescript
   // src/feature/translations/api/getTranslation.ts
   export async function getApiTranslation(section: string, key: string): Promise<string> { /* ... */ }
   ```

3. **Third-party API Handlers**: For features using third-party libraries that provide their own API handlers:
   ```typescript
   // src/app/api/auth/[...all]/route.ts
   import { toNextJsHandler } from "better-auth/next-js";
   import { auth } from "@/feature/auth/lib/auth";
   
   export const { POST, GET } = toNextJsHandler(auth);
   ```

This approach keeps API logic encapsulated within features while maintaining a clean route structure.

## How to Use This Structure
1. **Create a new feature**: Add a new directory under `src/feature/` with the name of your feature.
2. **Organize your code**: Place your files in the appropriate directories based on their functionality.
3. **Define your API handlers**: 
   - For Next.js API routes: Create handlers in `src/feature/<feature-name>/api/api<FeatureName><usage (optionnal)>.ts`
   - For utility functions: Create helpers in `src/feature/<feature-name>/lib/` that can be imported by other features
4. **Connect API routes**: Choose the appropriate pattern based on your needs:
   - For standard Next.js API routes:
     ```typescript
     // src/app/api/admin/<feature-name>/<usage (optionnal)>/route.ts
     export { GET, POST } from "@/feature/<feature-name>/api/api<FeatureName><usage (optionnal)>";
     ```

### Examples

**User Feature:**
```
src/feature/user/
├── lib/                → Server actions for user data
├── options/            → Query configuration
├── queries/            → React Query hooks
├── stores/             → User state management
├── schemas/            → User Zod schemas
└── types/              → User-related types
```

**Settings Feature Api Logic:**
```
src/feature/settings/
├── api/                  → API handlers for settings
     └── apiSettings.ts   → Next.js API route handlers
```
You can check the `src/app/api/admin/settings/route.ts` file for how to connect this API logic to the Next.js app router.

**Translations Feature:**
```
src/feature/translations/
├── languages/          → JSON translation files
└── lib/                → Translation utilities
```

---

## 💡 Key Architectural Patterns

* **Server Actions:** Server-side logic in `lib/` directories using Next.js server actions
* **API Handlers:** Feature-specific API endpoints in `api/` directories with corresponding route.ts files
* **Data Fetching:** React Query hooks in `queries/` with configuration in `options/`
* **State Management:** Zustand stores in `stores/` directories
* **Type Safety:** TypeScript types in `types/` directories
* **Zod Validation:** Schemas in `schemas/` directories for data validation

---

## ✅ Guidelines for New Features

1. Create a folder in `src/feature/<your-feature>`
2. Add only the directories needed for your feature's functionality:
   - `lib/` for server actions and utilities
   - `queries/` for React Query hooks
   - `options/` for React Query configuration
   - `stores/` for state management
   - `types/` for TypeScript types
   - `schemas/` for Zod schemas
   - `components/` for feature-specific UI components
3. Follow the established naming conventions:
   - `use*.ts` for React Query hooks
   - `store*.ts` for Zustand stores
   - `*Schema.ts` for Zod schemas

---

## 🧬 Shared Logic

* Shared utilities, types, or constants go in `src/lib/`
* Global components in `src/components/`

---

Let's keep it clean. Let's scale it right. 🚀
