# Express Backend

A structured Express.js backend with TypeScript and MongoDB (Mongoose).

## Features

- ⚡ Express.js with TypeScript
- 🔥 TypeScript with strict mode
- 💾 MongoDB with Mongoose ODM
- 🛡️ Error handling middleware
- 🎯 Structured architecture (routes, controllers, models)
- 🔄 Hot reload with nodemon
- 🌐 CORS enabled

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts        # MongoDB connection
│   ├── controllers/           # Request handlers
│   │   └── example.controller.ts
│   ├── models/                # Mongoose models
│   │   └── example.model.ts
│   ├── routes/                 # API routes
│   │   └── example.routes.ts
│   ├── middleware/            # Custom middleware
│   │   ├── errorHandler.ts
│   │   └── notFound.ts
│   ├── types/                 # TypeScript types
│   │   └── index.ts
│   ├── utils/                 # Utility functions
│   │   └── logger.ts
│   ├── app.ts                 # Express app setup
│   └── server.ts              # Server entry point
├── .env.example               # Environment variables template
├── nodemon.json               # Nodemon configuration
├── package.json
├── tsconfig.json              # TypeScript configuration
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or cloud instance)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/myapp
```

For MongoDB Atlas (cloud), use a connection string like:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```

### Running the Server

**Development mode (with hot reload):**
```bash
npm run dev
```

**Production build:**
```bash
npm run build
npm start
```

The server will start on `http://localhost:5000` (or the PORT specified in your `.env` file).

## API Endpoints

### Health Check
- `GET /health` - Check if server is running

### Example API (CRUD operations)
- `GET /api/examples` - Get all examples
- `GET /api/examples/:id` - Get example by ID
- `POST /api/examples` - Create new example
- `PUT /api/examples/:id` - Update example
- `DELETE /api/examples/:id` - Delete example

### Example Request

**Create Example:**
```bash
curl -X POST http://localhost:5000/api/examples \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Example", "description": "This is a test"}'
```

**Get All Examples:**
```bash
curl http://localhost:5000/api/examples
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment (development/production) | `development` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/myapp` |

## Architecture

The project follows a structured MVC-like pattern:

- **Routes** (`src/routes/`) - Define API endpoints and map them to controllers
- **Controllers** (`src/controllers/`) - Handle request logic and responses
- **Models** (`src/models/`) - Define Mongoose schemas and models
- **Middleware** (`src/middleware/`) - Custom middleware for error handling, authentication, etc.
- **Config** (`src/config/`) - Configuration files (database, etc.)
- **Utils** (`src/utils/`) - Utility functions and helpers
- **Types** (`src/types/`) - TypeScript type definitions

## Error Handling

The application includes centralized error handling:

- Custom error middleware catches all errors
- Returns consistent error response format
- Includes stack traces in development mode

## MongoDB Connection

The database connection is established in `src/config/database.ts`. The connection:

- Automatically connects on server start
- Handles connection errors gracefully
- Closes connection on app termination (SIGINT)

## Learn More

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

