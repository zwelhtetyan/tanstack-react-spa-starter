# AGENTS.md - Developer Guide for tanstack-react-spa-starter

## Overview

This is a TanStack Start (SPA) application using:
- **React 19** with TypeScript
- **TanStack Router** (file-based routing with route guards)
- **TanStack Query** for data fetching
- **TanStack Form** for form management
- **Zustand** for client state management
- **Ky** for HTTP requests
- **Zod** for runtime validation
- **Sonner** for toast notifications
- **Shadcn/ui** for UI components
- **Tailwind CSS v4** for styling
- **Biome** for linting/formatting
- **Vitest** for testing

---

## Build Commands

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server on port 3000 |
| `bun run build` | Build for production |
| `bun run preview` | Preview production build |
| `bun run test` | Run all tests with Vitest |
| `bun run test -- {file}` | Run tests in a specific file |
| `bun run test -- -t "test name"` | Run tests matching a specific name |
| `bun run test -- --watch` | Run tests in watch mode |
| `bun run ts:check` | Run TypeScript type checking |
| `bun run check` | Run Ultracite + TypeScript checks |
| `bun run fix` | Auto-fix linting issues with Ultracite |
| `bun run mock-server.ts` | Start mock backend server on port 8000 |

---

## Code Style Guidelines

### Formatting & Linting

- **Tool**: Biome (configured via `biome.json`)
- **Indentation**: Tabs
- **Quotes**: Double quotes for JavaScript/TypeScript
- **Extensions**: Uses Ultracite presets (`ultracite/biome/core`, `ultracite/biome/react`, `ultracite/biome/vitest`)
- **Console**: `console.*` calls trigger warnings (not errors)

### TypeScript Strictness

- `strict: true` enabled
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `verbatimModuleSyntax: true` (use `import type` / `import { type }`)
- Use `type` instead of `interface` for type definitions

### Path Aliases

Use `@/` prefix for imports from `src/`:
```typescript
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
```

---

## Project Structure

```
src/
├── components/
│   ├── common/       # Shared/common components
│   │   ├── app-spinner.tsx
│   │   └── form/     # Common form components
│   │       ├── subscribe-button.tsx
│   │       └── text-field.tsx
│   ├── layout/       # Layout components
│   └── ui/           # shadcn/ui components
├── config/
│   └── app-config.ts 
├── constants/
│   └── index.ts      # App constants (ACCESS_TOKEN_NAME, etc.)
├── contexts/         # React contexts
│   ├── auth-context.tsx    # Auth state management
│   ├── form-context.tsx   # TanStack Form contexts
│   └── theme-context.tsx  # Theme provider
├── features/         # Feature-based modules
│   ├── auth/
│   │   ├── components/    # Auth-specific components
│   │   │   ├── field-groups/
│   │   │   ├── fields/
│   │   │   ├── forms/
│   │   │   └── user-header.tsx
│   │   ├── hooks/         # Auth-specific hooks
│   │   ├── lib/           # Auth utilities
│   │   ├── schema/        # Zod schemas
│   │   ├── services/      # Auth API services
│   │   └── types/         # Auth types
│   └── products/
│       ├── components/    # Product components
│       ├── services/      # Product API services & query options
│       └── types/         # Product types
├── hooks/            # Custom React hooks
├── lib/
│   ├── api/          # API client
│   │   ├── hooks.ts  # KY request/response hooks
│   │   ├── index.ts  # API client setup
│   │   ├── type.ts   # ApiResponse type
│   │   └── utils.ts  # resolveResponse, resolveError
│   ├── auth.ts       # Auth check utility
│   ├── form/         # Form utilities
│   │   └── index.ts  # createFormHook setup
│   ├── tanstack-query/  # Query client setup
│   │   ├── query-client.ts
│   │   └── query-keys.ts
│   └── utils.ts      # cn() utility for className merging
├── routes/           # TanStack Router file-based routes
├── store/            # Zustand stores
│   └── auth-store.ts # Auth state store
├── types/            # Shared TypeScript types
│   ├── form.ts
│   └── index.ts      # EntityWithID, TypeID, Brand types
├── utils/            # Utility functions
│   ├── index.ts      # Common utilities
│   └── meta.ts       # Document meta utilities
├── devtools.tsx      # TanStack DevTools setup
├── env.ts            # Environment variable validation (Zod)
├── main.tsx          # App entry point
├── router.tsx        # Router configuration
├── routeTree.gen.ts  # Auto-generated route tree
└── styles.css        # Global styles + Tailwind
```

---

## Routes Structure

TanStack Router uses file-based routing with route guards:

| Route File | Path | Description | Access |
|------------|------|-------------|--------|
| `routes/index.tsx` | `/` | Home page | Public |
| `routes/_guest/(auth)/sign-in.tsx` | `/sign-in` | Login page | Guest only |
| `routes/_guest/(auth)/sign-up.tsx` | `/sign-up` | Registration page | Guest only |
| `routes/_authed/(authLayout)/products.tsx` | `/products` | Products page | Authenticated |
| `routes/_authed/(authLayout)/hello.tsx` | `/hello` | Hello page | Authenticated |

### Route Guards

- `_guest.tsx` - Redirects to `/` if user is authenticated
- `_authed.tsx` - Redirects to `/sign-in` if user is not authenticated

### Route Layouts

- `__root.tsx` - Root layout with providers
- `_authed/(authLayout)/route.tsx` - Layout for authenticated routes
- `_guest/(auth)/route.tsx` - Layout for guest/auth routes

---

## Naming Conventions

### Files
- **All files**: kebab-case (e.g., `button.tsx`, `user-profile.tsx`, `utils.ts`, `auth-api.ts`)
- **Routes**: kebab-case (e.g., `sign-in.tsx`, `sign-up.tsx`)
- **Tests**: `.test.ts` or `.test.tsx` suffix

### Variables & Functions
- **Functions/Variables**: camelCase
- **Components/Types**: PascalCase
- **Constants**: SCREAMING_SNAKE_CASE
- **Booleans**: Prefix with `is`, `has`, `should`, `can`

---

## Component Patterns

### UI Components (shadcn-style)

Use `class-variance-authority` for variants:
```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("base classes", {
  variants: {
    variant: { default: "...", outline: "..." },
    size: { default: "...", sm: "...", lg: "..." },
  },
  defaultVariants: { variant: "default", size: "default" },
});

function Button({ className, variant, size, ...props }: ButtonProps) {
  return <Primitive className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
```

### Feature Modules

Organize by feature in `src/features/`:
```
features/
└── auth/
    ├── components/   # Feature-specific components
    │   ├── field-groups/
    │   ├── fields/
    │   ├── forms/
    │   └── user-header.tsx
    ├── hooks/        # Feature-specific hooks
    ├── lib/          # Feature utilities
    ├── schema/       # Zod schemas
    ├── services/     # API services
    └── types/        # Feature types
```

---

## State Management

### TanStack Query (Server State)
- Use for all server data fetching
- Configure query client in `src/lib/tanstack-query/query-client.ts`
- Use query keys from `src/lib/tanstack-query/query-keys.ts`

### Zustand (Client State)
- Use for client-only global state
- Store files in `src/store/`

### Auth State
- `src/store/auth-store.ts` - Zustand store for auth token/user
- `src/contexts/auth-context.tsx` - React context to pass the auth state to router context to make auth is accessible in loaders 

---

## Form Management

Uses **TanStack Form** with custom setup:
- Zod schemas define validation in `features/*/schema/`
- `lib/form/index.ts` provides `createFormHook` setup
- Use `useAppForm` hook for forms
- Field components use `withFieldGroup` / `withForm` HOCs

---

## API Client

- Uses **Ky** for HTTP requests
- API utilities in `src/lib/api/`
- `lib/api/hooks.ts` - KY request/response hooks
- `lib/api/utils.ts` - resolveResponse, resolveError helpers
- Mock server available: `mock-server.ts`

---

## App notification

- Sonner for toast notifications

---

## Error Handling

- Use Zod for runtime validation (see `src/env.ts`)
- Use error boundaries for component errors
- Use TanStack Router's `defaultErrorComponent` for route errors

---

## Testing

- **Framework**: Vitest with React Testing Library
- **Setup**: jsdom for DOM simulation
- **Patterns**:
  ```tsx
  import { render, screen } from "@testing-library/react";
  import userEvent from "@testing-library/user-event";
  
  test("description", async () => {
    const user = userEvent.setup();
    render(<Component />);
    // assertions...
  });
  ```

---

## Git Hooks

- Husky + lint-staged configured
- Pre-commit runs `ultracite fix` on staged files

---

## Environment Variables

- Prefix: `VITE_` for client-side access
- `.env` file at project root
- Current variables: `VITE_API_URL` (default: `http://localhost:8000`)
- Validated in `src/env.ts` using Zod

---

## Additional Notes

- Demo routes can be customized as needed
- Use `createFileRoute` from `@tanstack/react-router` for new routes
- Route tree is auto-generated; do not edit `routeTree.gen.ts` manually
- Run `bun run mock-server.ts` to start the mock backend for development
