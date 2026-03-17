# AGENTS.md - Developer Guide for tanstack-spa-starter

## Overview

This is a TanStack Start (SPA) application using:
- **React 19** with TypeScript
- **TanStack Router** (file-based routing)
- **TanStack Query** for data fetching
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
│   ├── layout/       # Layout components
│   └── ui/           # shadcn-like UI components
├── contexts/         # React contexts (theme, auth)
├── features/         # Feature-based modules (auth, products)
├── hooks/            # Custom React hooks
├── lib/
│   ├── api/          # API client (ky)
│   ├── auth.ts       # Auth utilities
│   ├── form/         # Form utilities
│   ├── tanstack-query/  # Query client setup
│   └── utils.ts      # cn() utility for className merging
├── routes/           # TanStack Router file-based routes
├── store/            # Zustand stores
├── types/            # Shared TypeScript types
├── constants/        # App constants
├── env.ts            # Environment variable validation (Zod)
├── router.tsx        # Router configuration
├── routeTree.gen.ts  # Auto-generated route tree
└── styles.css        # Global styles + Tailwind
```

---

## Naming Conventions

### Files
- **All files**: kebab-case (e.g., `button.tsx`, `user-profile.tsx`, `utils.ts`, `auth-api.ts`)
- **Routes**: kebab-case (e.g., `login.tsx`, `users-list.tsx`)
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
└── products/
    ├── components/   # Product-specific components
    ├── hooks/       # Product-specific hooks
    ├── types.ts     # Product types
    └── index.ts     # Public exports
```

---

## State Management

### TanStack Query (Server State)
- Use for all server data fetching
- Configure query client in `src/lib/tanstack-query/query-client.ts`

### Zustand (Client State)
- Use for client-only global state
- Store files in `src/store/`

---

## API Client

- Uses **ky** for HTTP requests
- API utilities in `src/lib/api/`
- Configure base URL and interceptors in the API setup

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

## Additional Notes

- Demo routes in `src/routes/demo/` can be deleted
- Use `createFileRoute` from `@tanstack/react-router` for new routes
- Environment variables must use `VITE_` prefix for client-side access
- Route tree is auto-generated; do not edit `routeTree.gen.ts` manually
