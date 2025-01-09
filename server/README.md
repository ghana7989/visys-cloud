# Visys Cloud Server

Express TypeScript backend server for Visys Cloud.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
NODE_ENV=development
API_VERSION=v1
DATABASE_URL=mongodb://localhost:27017/visys-cloud
JWT_SECRET=your-secret-key
```

## Development

Run the development server:
```bash
npm run dev
```

## Build

Build for production:
```bash
npm run build
```

## API Endpoints

- `GET /` - Welcome message
- `GET /api/health` - Health check
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user 
