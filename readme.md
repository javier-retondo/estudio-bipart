# API with TypeScript, Express and Sequelize

## Overview

**API for Bipart Account Studio** is designed to help developers build secure and scalable APIs quickly. This project serves as a foundation for creating MVPs with minimal setup and maximum efficiency.

### Features:

- **TypeScript** for strong typing and better maintainability.
- **Express.js** as the web framework.
- **Docker Compose** for simplified environment setup.
- **Redis** for caching to optimize performance.
- **Husky** and **ESLint** for code quality and consistency.
- **CLI tool** for generating essential components like modules, CRUDs, and APIs.
- Built-in **documentation system** with support for public and admin routes.

---

## Getting Started

### Prerequisites

Ensure the following tools are installed:

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)
- [Redis](https://redis.io/)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/javier-retondo/estudio-bipart.git
   cd estudio-bipart-backend
   ```

2. Create a .env file in the root directory with the following structure:

   ```env
      PORT=3010
      SECRET_KEY=

      DB_NAME=
      DB_USER=
      DB_PASS=
      DB_HOST=
      DB_PORT=
      API_BASE_URL_V1=

      NODE_ENV=development

      REDIS_PASSWORD=""
      REDIS_PORT=6379
      REDIS_HOST=
      REDIS_DATABASE=0
   ```

3. Start the project using Docker Compose:

- For Development:
   ```bash
   docker-compose up --build
   ```

* For Production:
   ```bash
   docker build -t estudio-bipart-backend .
   docker run estudio-bipart-backend
   ```

---

### CLI Commands

The project includes a CLI tool to speed up API development. Commands include:

1. Generate a Module:

```bash
npm run generate-model <name>
```

2. Generate API:

```bash
npm run generate-api
```

---

### Commands

| Command                                                                           | Description                                                             |
| --------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `npm run dev`                                                                     | Start the server in development mode with Nodemon.                      |
| `npm run build`                                                                   | Build the project using TypeScript.                                     |
| `npm run test`                                                                    | Run tests with Jest.                                                    |
| `npm run lint`                                                                    | Lint the code using ESLint.                                             |
| `npm run format`                                                                  | Format the code with Prettier.                                          |
| `npm run pretty`                                                                  | Format TypeScript files with Prettier.                                  |
| `npm run prepare`                                                                 | Install Husky for pre-commit hooks.                                     |
| `npm run pre-commit`                                                              | Run lint-staged before committing changes.                              |
| `npm run generate-api`                                                            | Generate an API component with routes, controllers, DTOs, and services. |
| `npm run generate-model <ModelName>`                                              | Generate models in the DAO folder.                                      |
| `npm run seed`                                                                    | Seed and update default data.                                           |
| `npm run syncModels`                                                              | Sync all models into database (default alter: true, force: false).      |
| `npm run syncModels -- <ModelName> --alter (-a) --force (-f) --associations (-A)` | Sync all models into database with options.                             |
| `npm run encrypt <Data>`                                                          | Encrypt data -> output format `<dataEncrypted/iv hex>`.                 |
| `npm run decrypt <DataEncrypted>`                                                 | Decrypt data -> input format `<dataEncrypted/iv hex>`                   |

---

### Project Structure

```plaintext
src/
├── api/               # API routes
│   ├── admin/         # Protected routes (e.g., admin dashboard)
│   └── public/        # Public routes (e.g., e-commerce)
├── config/            # Configuration files
│   ├── database.ts    # Database connection
│   ├── environment.ts # Environment variable handling
│   ├── redisManager.ts# Redis connection and management
│   └── storeProcedures/ # DB stored procedures
├── dao/               # Data Access Objects (models)
├── middlewares/       # Express middlewares
├── utils/             # Utility functions
├── app.ts             # Server class with configurations
└── server.ts          # Server instance
documentation/
├── admin.json         # Admin route documentation
└── public.json        # Public route documentation

```
