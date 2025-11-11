# Personal OS

A starter Personal OS (Personal Operating System) template combining a TypeScript + Node backend and a Next.js + TypeScript frontend. This repository includes common features needed for building a modern personal-app product such as authentication, file upload, background services, and integration points for storage and caching.

## Project details

- Backend: Node.js, TypeScript, Express (located in the `backend/` folder)
- Frontend: Next.js, TypeScript, Tailwind CSS (located in the `frontend/` folder)
- Datastore & caching: configurable (see `backend/config/` — examples include Redis, S3, and database configuration)
- Auth & storage: authentication routes and upload endpoints are provided as a starting point
- Extra services: email service, swagger, and small utilities are included to bootstrap development

## Repository structure (high level)

- `backend/` — API server, TypeScript source, tests and config
- `frontend/` — Next.js app, components, pages, and client-side API helpers

## Getting started

Prerequisites:

- Node.js (recommended v18+)
- pnpm or npm

Backend

1. Change to the backend folder:

	cd backend

2. Install dependencies:

	pnpm install

3. Copy or create environment variables (example):

	cp .env.example .env

4. Start the development server:

	pnpm dev

Frontend

1. Change to the frontend folder:

	cd frontend

2. Install dependencies:

	pnpm install

3. Start the Next.js dev server:

	pnpm dev

Note: The exact commands may vary depending on your package manager (npm/yarn/pnpm). Check each package.json for available scripts.

## Environment

See `backend/config/` and `frontend/src/lib/env.ts` for environment variables the project expects. Add credentials (database, S3, Redis, etc.) to your local `.env` files before running.

## Testing

The backend contains Jest-based tests under `backend/src/__tests__/`. Run tests from the `backend` folder using the test script defined in `backend/package.json` (for example `pnpm test` or `npm test`).

## Contributing

- Fork the repo, create a feature branch, and open a pull request.
- Keep changes small and focused. Add tests for new behavior where applicable.

## License & contact

This project is provided as-is. Add your preferred license file if you plan to release it publicly.

For questions or help, add an issue or contact the repository owner.
