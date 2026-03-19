# Tanstack + React SPA Starter Template

The modern way to build React SPAs.

![Preview](public/og.png)

## Quick Start

```bash
bun install
bun run mock-server.ts  # Mock backend on port 8000
bun run dev             # App on port 3000
```

## Folder Structure

```
src/
├── components/
│   ├── common/
│   │   └── form/
│   ├── layout/
│   ├── ui/
├── config/
├── constants/
├── contexts/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── field-groups/
│   │   │   ├── fields/
│   │   │   ├── forms/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── schema/
│   │   ├── services/
│   │   └── types/
│   └── products/
│       ├── components/
│       ├── services/
│       └── types/
├── hooks/
├── lib/
│   ├── api/
│   ├── form/
│   └── tanstack-query/
├── routes/
│   ├── _authed/
│   │   └── (authLayout)/
│   └── _guest/
│       └── (auth)/
├── store/
├── types/
├── utils/
├── devtools.tsx
├── env.ts
├── main.tsx
├── router.tsx
└── styles.css
```

## Built-in Features

- Auth state management
- Form handling with validation
- Route-level data fetching
- Theme support
- Document head management
- OpenGraph images
- Auth guards
- Devtools
- Mock-server for testing

## Tech Stack

- React 19 + TypeScript
- TanStack Router
- TanStack Query
- TanStack Form
- Zustand
- Ky
- Tailwind CSS v4
- shadcn/ui
- Sonner
- Zod

> Find commented code in `src/features/auth/hooks/use-sign-in-form` and `src/features/auth/hooks/use-sign-in-form` to enable real auth API requests to mock server.

---

_Built with ❤️🏝️ to save you from writing the same boilerplate again.
Start your next project today._
