# GitHub Copilot Working Group - Repository Instructions

## Repository Summary

This repository hosts hands-on workshops to learn and practice GitHub Copilot. The project is a React-based web application built with TypeScript, Vite, and modern React tooling including TanStack Router and React Query.

## Technology Stack

- **Framework**: React 19.2
- **Build Tool**: Vite 7.x
- **Language**: TypeScript 5.9
- **Testing**: Vitest 4.x with Testing Library
- **Linting**: ESLint 9.x
- **State Management**: TanStack React Query
- **Routing**: TanStack React Router

## Available Commands

### Development

```bash
npm run dev
```

Starts the development server with Vite. The application will be available at `http://localhost:5173` (default Vite port).

### Build

```bash
npm run build
```

Compiles TypeScript and builds the production bundle. The build output will be in the `dist/` directory.

**Important**: Always run `npm install` before building if dependencies have changed.

Build steps:
1. TypeScript compilation (`tsc -b`)
2. Vite production build

### Testing

```bash
npm test
```

Runs tests in watch mode using Vitest.

```bash
npm run test:run
```

Runs tests once without watch mode (useful for CI/CD).

```bash
npm run test:ui
```

Opens the Vitest UI for interactive test visualization.

### Linting

```bash
npm run lint
```

Runs ESLint to check code quality and style.

```bash
npm run lint:fix
```

Runs ESLint and automatically fixes issues where possible.

### Preview

```bash
npm run preview
```

Previews the production build locally. Must run `npm run build` first.

## Project Structure

```
.
├── .github/              # GitHub configuration and workflows
├── src/                  # Source code
├── assets/              # Static assets (images, etc.)
├── index.html           # Entry HTML file
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite configuration
├── vitest.config.ts     # Vitest test configuration
├── tsconfig.json        # TypeScript configuration (base)
├── tsconfig.app.json    # TypeScript config for application
├── tsconfig.node.json   # TypeScript config for Node.js files
└── eslint.config.js     # ESLint configuration
```

## Setup Instructions

1. **Install dependencies** (required before any other command):
   ```bash
   npm install
   ```

2. **Start development**:
   ```bash
   npm run dev
   ```

3. **Run tests**:
   ```bash
   npm test
   ```

## Important Notes

- **Always run `npm install`** after cloning or when dependencies change
- The project uses **npm**, not yarn or pnpm
- Tests use **jsdom** as the test environment
- The project includes **React Compiler** (babel-plugin-react-compiler) for optimization
- **MSW (Mock Service Worker)** is available for API mocking in tests

## Validation Steps

Before submitting changes:

1. Run the linter: `npm run lint`
2. Run all tests: `npm run test:run`
3. Build the project: `npm run build`
4. Preview the build: `npm run preview`

All steps should complete without errors.
