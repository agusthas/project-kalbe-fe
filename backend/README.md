# Backend

## Running Locally

1. Install dependencies
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in the values for the database connection (**Leave DATABASE_URL as is**)
3. Initialize and seed the database
   ```bash
   npm run db:fresh
   ```
4. Start the server (default url: http://localhost:3001)
   ```bash
   npm run start
   ```
