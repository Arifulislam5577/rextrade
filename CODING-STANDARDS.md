# Coding Standards

A reusable engineering standard for TypeScript and Next.js projects. Drop this into any repository as `CODING-STANDARDS.md`, or paste it into `CLAUDE.md` and add project-specific rules beneath it.

Nothing here is project-specific. Every rule is either enforced by tooling or checkable in review.

---

## 1. Absolute rules

Never broken. If a task appears to require breaking one, stop and raise it rather than proceeding.

### 1.1 No comments in code

No `//`, no `/* */`, no JSDoc in source files. Explanation belongs in documentation, not in code.

If code needs a comment to be understood, the problem is the code — fix the code, don't paper over it. Never say in a comment what a variable name can say.

Exceptions: `eslint-disable` and `@ts-expect-error`. Every use of either must be justified in the PR description.

### 1.2 No `any`

No `any`, no `@ts-ignore`, no non-null `!` assertions, no `as` casts used to silence the compiler. Use `unknown` plus a type guard, or fix the type.

`strict`, `noUncheckedIndexedAccess`, and `noImplicitOverride` stay on for the life of the project.

### 1.3 Business logic never lives in a route handler, page, or component

Handlers and pages are transport. They authenticate, parse input, call one function from `lib/`, and format the response. Twenty lines is the ceiling.

Database queries, third-party SDK calls, and external requests belong in `lib/`. This is what makes logic testable, reusable across transports, and portable to a different framework without a rewrite.

### 1.4 Every external input is parsed at the boundary

Request bodies, query params, route params, webhook payloads, environment variables, and third-party responses. Parse with a schema; the parsed output is the only thing that flows onward.

Parse, don't validate. A boolean check leaves you with an untyped value; a schema gives you a typed one.

### 1.5 Never trust the client for anything the server can determine

Prices, roles, ownership, IDs of other users' resources, timestamps that matter. If the server can look it up, the server looks it up. A request body containing a value the server owns is a bug, not a convenience.

### 1.6 Secrets never reach the client

No secret in a client component, a `NEXT_PUBLIC_` variable, an API response, or an error message. Environment variables are read in exactly one module and nowhere else.

### 1.7 Errors never leak internals

Client-facing errors carry a safe message and a status code. Stack traces, database errors, and raw third-party payloads are logged server-side and never serialised into a response.

### 1.8 No wrapper components around framework primitives

Import and use `next/image`, `next/link`, `next/form`, and native elements directly. Do not create `AppImage`, `CustomImage`, `LinkWrapper`, `Container`, `Section`, `Box`, `Flex`, `Stack`, `Text`, or `Heading`.

A wrapper that renders a single primitive and forwards props adds an indirection, a second set of prop types, a place for defaults to drift, and one more file to open before you understand what renders. It buys nothing.

A component earns its place only when it adds real behaviour — variants, state, composition, accessibility wiring. `button.tsx` with size and intent variants is legitimate. `container.tsx` returning `<div className={className}>{children}</div>` is not.

**The test:** if removing the component and inlining its output changes nothing but an import, delete the component.

### 1.9 Semantic HTML

Markup describes meaning, not appearance.

- **Exactly one `<h1>` per page.** Heading levels descend without skipping. Never choose a heading level for its font size — that is what utility classes are for.
- Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`. Exactly one `<main>` per page.
- Every `<section>` is labelled: a heading inside it, or `aria-labelledby` / `aria-label`.
- Interactive elements are `<button>` and `<a>`. Never attach `onClick` to a `<div>` or `<span>`.
- Lists are `<ul>` / `<ol>` / `<dl>`. A grid of cards is a list.
- Every form control has a `<label htmlFor>`. Placeholders are not labels.
- Every image has `alt`. Decorative images get `alt=""`, never a missing attribute.
- Dates and durations use `<time>`.

### 1.10 Page section structure

Every top-level block on a page follows the same three layers: semantic section, then container, then content.

The container is utility classes, not a component (rule 1.8). Define it once in the global stylesheet — a class, not an abstraction:

```css
@utility main-container {
  @apply mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8;
}
```

```tsx
<section className="border-b border-neutral-200 py-24">
  <div className="main-container">
    <h2 className="text-3xl font-semibold">Section heading</h2>
    <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">…</ul>
  </div>
</section>
```

- The `<section>` owns vertical rhythm, background, and borders — anything full-bleed.
- `main-container` owns max width and horizontal padding only. Nothing else goes in it.
- Content starts inside the container. Never put a grid or flex layout directly on the `<section>`.
- Never inline `mx-auto w-full max-w-7xl px-4 …` by hand.

### 1.11 Server Components by default

`'use client'` is added at the leaf that needs interactivity, never at a page or layout. If a page is a client component, the architecture is wrong.

### 1.12 No browser storage for credentials

Tokens and session identifiers live in `httpOnly`, `secure`, `sameSite` cookies. Anything readable by JavaScript is readable by an XSS payload.

---

## 2. TypeScript

- No `any`, no `enum` (use `as const` objects or union types), no namespaces.
- Prefer `type` for object shapes and unions; use `interface` only when declaration merging is needed.
- Infer types from schemas rather than declaring them twice: `type Input = z.infer<typeof inputSchema>`.
- Function return types are explicit on anything exported from `lib/`. Inferred is fine for local helpers.
- Discriminated unions over optional-field soup. `{ ok: true; data: T } | { ok: false; error: E }`, not `{ ok: boolean; data?: T; error?: E }`.
- `readonly` on arrays and props that are never mutated.
- `satisfies` instead of type annotations when you want inference plus checking.

```ts
export const priceBands = {
  starter: 1900,
  standard: 2900,
  pro: 4900,
} as const satisfies Record<string, number>

export type PriceBand = keyof typeof priceBands
```

---

## 3. Naming

- **Booleans read as assertions:** `isPublished`, `hasAccess`, `canEdit`, `shouldRetry`.
- **Functions are verbs:** `resolveAccess`, `buildInvoice`, `parseWebhook`. Not `accessResolver`, not `invoiceData`.
- **Handlers are `handleX`; props that receive them are `onX`.**
- **No abbreviations** except `id`, `url`, `api`, `db`, `ui`. Not `tmpl`, `usr`, `cfg`, `btn`.
- **Schemas end in `Schema`;** inferred types drop it: `checkoutSchema` → `CheckoutInput`.
- **Constants are `SCREAMING_SNAKE_CASE`** only for true compile-time literals. Config objects are `camelCase`.
- **Avoid `data`, `info`, `item`, `obj`, `temp`, `result`** as standalone names. Say what it is.
- **Negative names are banned:** `isDisabled` not `isNotEnabled`. Double negatives in conditions are a review failure.

---

## 4. Files and folders

**Kebab-case, without exception** — including models, components, and utilities. `reset-password.ts`, `entitlement-card.tsx`, `refresh-token.ts`.

Exported symbols keep their natural casing: `refresh-token.ts` exports `RefreshToken`; `entitlement-card.tsx` exports `EntitlementCard`.

Mixed casing is banned because macOS and Windows have case-insensitive filesystems while Linux does not. An import that resolves locally will fail the CI build, and the failure only surfaces after you push.

**No barrel files.** An `index.ts` that re-exports a folder breaks tree-shaking, creates import cycles, and hides where things come from. Import the concrete path.

**Absolute imports only.** `@/lib/auth/session`, never `../../../lib/auth/session`. Enforced by lint.

**One primary export per file.** If a file exports three unrelated things, it is three files.

**Colocate by feature, not by type,** below the top level. `components/checkout/` beats scattering checkout pieces across `components/forms/`, `components/cards/`, and `components/modals/`.

---

## 5. File ordering

Imports, separated by blank lines, in this order:

1. Node builtins (`node:crypto`)
2. External packages
3. `@/lib`
4. `@/components`
5. `@/hooks`
6. `@/types`
7. Relative
8. Styles

Within a module: types and interfaces, then constants, then the primary export, then helpers used only by it. The thing a reader came for appears before its supporting cast.

Within a component: hooks, derived values, handlers, early returns, then JSX.

---

## 6. React and Next.js

- **Named exports everywhere.** Default exports only where the framework requires them: `page.tsx`, `layout.tsx`, `route.ts`, `error.tsx`, `loading.tsx`, `not-found.tsx`, `middleware.ts`.
- **Props are destructured in the signature** with an inline or named type. No `props.x` access.
- **No `React.FC`.** Plain function declarations.
- **Early return over nested ternaries.** A ternary inside a ternary is a review failure.
- **No `useEffect` for derived state.** Compute during render. `useEffect` is for synchronising with something outside React.
- **Keys are stable IDs,** never array indices.
- **Every fetch has a loading and an error state.** A component that only handles the happy path is unfinished.
- **`error.tsx`, `loading.tsx`, and `not-found.tsx` exist** for every route segment that fetches.
- **Middleware runs on the Edge runtime.** Never import a database driver or Node-only module there.
- **Server Actions validate their input** exactly like an API route. They are a public endpoint.

---

## 7. Styling

- **Utility classes only.** No CSS Modules, no styled-components, no inline `style` for anything expressible as a utility.
- **Design tokens are declared once** in the global stylesheet (`@theme` in Tailwind v4). No `tailwind.config.ts` unless a plugin forces it.
- **No arbitrary values** (`w-[437px]`, `text-[#3b82f6]`) when a token exists. If you need a new value, add a token.
- **Class order is decided by `prettier-plugin-tailwindcss`.** Never reorder by hand.
- **Conditional classes go through a `cn()` helper** (`clsx` + `tailwind-merge`), never string concatenation.
- **Responsive is mobile-first.** Base styles are the small screen; `sm:`, `md:`, `lg:` add to it.
- **Dark mode via CSS variables,** not duplicated `dark:` classes on every element.

---

## 8. Data and validation

- One schema per boundary, all in `lib/validations/`, never inline in a route file. Forms and handlers share the same schema.
- Parse environment variables once at boot in a single module and export the typed result. `process.env` is read nowhere else.
- Money is integer minor units, never floats. Field names end in `Cents` or the currency's minor unit.
- Dates are `Date` objects in UTC. Format only at render time.
- Never interpolate user input into a query operator position.

---

## 9. API conventions

One response shape, everywhere:

```ts
export type ApiResponse<T> =
  { ok: true; data: T } | { ok: false; error: { code: string; message: string } }
```

- Status codes are meaningful: 400 validation, 401 unauthenticated, 403 unauthorised, 404 missing, 409 conflict, 429 rate limited, 500 unexpected.
- `error.code` is a stable machine-readable string (`INVALID_CREDENTIALS`). `error.message` is human-readable and safe to display.
- Collection endpoints always paginate. No unbounded list endpoint ships.
- Anything that sends email, costs money, or writes to a third party is rate limited.
- Any endpoint that can be retried is idempotent, or records an idempotency key.

---

## 10. Error handling

- A single `AppError` class carrying `code`, `message`, and `status`. Everything thrown deliberately is an `AppError`.
- One error-to-response mapper. Route handlers never build error responses by hand.
- `async/await` only. No `.then()` chains.
- Never swallow an error silently. If it is genuinely ignorable, log it.
- Log with structured context (`{ userId, route, code }`), not string interpolation.
- Never log secrets, tokens, passwords, or full request bodies.

---

## 11. Security baseline

Check before every merge.

- Passwords hashed with bcrypt cost 12 or higher, never logged
- Session tokens stored hashed at rest, rotated on use
- Rate limits on login, signup, password reset, and any email-sending endpoint
- Webhook signatures verified against the raw body
- Authorisation checked server-side on every request, not hidden in the UI
- File storage private; access only via short-lived presigned URLs
- Security headers and a CSP configured
- No secret present in the client bundle
- Dependencies audited before release

---

## 12. Git

Conventional Commits: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `test:`, `perf:`, `style:`.

- Branch names: `feat/short-description`, `fix/short-description`.
- One logical change per commit. Formatting-only changes are their own commit.
- PR description states what changed, why, and how it was verified.
- Every `eslint-disable` and `@ts-expect-error` in the diff is justified in the description.
- `main` is always deployable.

---

## 13. Drop-in configuration

### `prettier.config.mjs`

```js
export default {
  semi: false,
  singleQuote: true,
  jsxSingleQuote: false,
  printWidth: 100,
  tabWidth: 2,
  trailingComma: 'all',
  arrowParens: 'always',
  bracketSpacing: true,
  plugins: ['prettier-plugin-tailwindcss'],
}
```

### `eslint.config.mjs`

Rules that enforce the standards above, added to your framework preset:

```js
rules: {
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/consistent-type-imports': 'error',
  '@typescript-eslint/no-non-null-assertion': 'error',
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  'unicorn/filename-case': ['error', { case: 'kebabCase' }],
  'import/order': [
    'error',
    { 'newlines-between': 'always', alphabetize: { order: 'asc' } },
  ],
  'no-restricted-imports': ['error', { patterns: ['../*'] }],
  'no-console': ['error', { allow: ['warn', 'error'] }],
  'no-nested-ternary': 'error',
  'eqeqeq': ['error', 'always'],
  'prefer-const': 'error',
}
```

Plus `jsx-a11y` recommended, which catches most of rule 1.9 automatically.

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "verbatimModuleSyntax": true,
    "paths": { "@/*": ["./*"] }
  }
}
```

### `package.json` scripts

```json
{
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "typecheck": "tsc --noEmit",
  "format": "prettier --write ."
}
```

---

## 14. What tooling cannot catch

These stay review items. Lint will not save you.

- One `<h1>` per page and correct heading order — a cross-file concern
- Whether a component is a pass-through wrapper (rule 1.8)
- Whether logic leaked into a route handler (rule 1.3)
- Whether a name actually describes the thing
- Whether an error message leaks internals
- Whether authorisation was checked, not just authentication
- Whether a comment was replaced by better code, or just deleted
