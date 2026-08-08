# Lead Distribution Backend

Backend API for the Lead Distribution System.

Built with:

* Node.js
* TypeScript
* Express
* Prisma ORM
* MySQL
* Redis
* BullMQ
* PM2

---

## Requirements

Make sure the following are installed:

* Node.js 22+
* npm
* MySQL 8+
* Redis 7+
* Git

For production, PM2 is also required.

Check your versions:

```bash
node -v
npm -v
mysql --version
redis-server --version
```

---

# Installation

## 1. Clone the Repository

```bash
git clone <repository-url>
cd lead-distribution-backend
```

## 2. Install Dependencies

```bash
npm install
```

---

# Environment Configuration

Create a `.env` file in the project root:

```env
DATABASE_URL="mysql://USERNAME:PASSWORD@127.0.0.1:3306/DATABASE_NAME"

REDIS_URL="redis://127.0.0.1:6379"

PORT=8583

JWT_SECRET="your-secret-key"
```

Update the values according to your environment.

### Example

```env
DATABASE_URL="mysql://root:password@127.0.0.1:3306/lead_distribution"

REDIS_URL="redis://127.0.0.1:6379"

PORT=8583

JWT_SECRET="your-secret-key"
```

Do not commit `.env` to Git.

---

# Database Setup

Create the MySQL database first.

Example:

```sql
CREATE DATABASE lead_distribution;
```

Then update your `DATABASE_URL`.

Generate Prisma Client:

```bash
npx prisma generate
```

For local development, run migrations:

```bash
npx prisma migrate dev
```

The project contains seed data for user: 
email: admin@example.com
password: password123

```bash
npx prisma db seed
```

For production, use:

```bash
npx prisma migrate deploy
```

Do not use `prisma migrate dev` in production.

---

# Redis Setup

Redis is required for the BullMQ lead broker queue.

Make sure Redis is running:

```bash
redis-cli ping
```

Expected:

```text
PONG
```

The default configuration is:

```env
REDIS_URL="redis://127.0.0.1:6379"
```

Redis should normally remain private and should not be exposed publicly.

---

# Running the Backend

## Development

Start the API:

```bash
npm run dev
```

The API will run on:

```text
http://localhost:PORT
```

---

# BullMQ Worker

Lead broker binding is processed asynchronously using BullMQ.

Start the worker separately:

```bash
npm run worker:dev
```

You should see:

```text
Starting lead broker worker...
Redis connected
Lead broker worker is ready
```

The API and worker must both be running during development.

### Development Processes

Terminal 1:

```bash
npm run dev
```

Terminal 2:

```bash
npm run worker:dev
```

---

# Production Build

Build the TypeScript project:

```bash
npm run build
```

This generates the compiled application inside:

```text
dist/
```

The API entry point should be:

```text
dist/server.js
```

The worker entry point should be:

```text
dist/workers/lead-broker.worker.js
```

---

# Production

## Start the API

```bash
npm start
```

## Start the Worker

```bash
npm run worker
```

The API and worker are separate processes.

The API handles HTTP requests while the worker processes background lead distribution jobs.

---

# PM2

PM2 is recommended for production.

Install PM2 globally if it is not already installed:

```bash
npm install -g pm2
```

## Start the Backend

```bash
pm2 start npm --name lead-backend -- run start
```

## Start the BullMQ Worker

```bash
pm2 start npm --name lead-broker-worker -- run worker
```

## Start Redis

If Redis is installed as a system service:

```bash
pm2 start redis-server --name redis
```

If Redis is installed under a user directory:

```bash
pm2 start ~/redis/bin/redis-server \
  --name redis \
  -- \
  ~/redis/redis.conf
```

## Check Processes

```bash
pm2 status
```

Expected:

```text
lead-backend
lead-broker-worker
redis
```

## View Backend Logs

```bash
pm2 logs lead-backend
```

## View Worker Logs

```bash
pm2 logs lead-broker-worker
```

## View Redis Logs

```bash
pm2 logs redis
```

## Save PM2 Processes

After everything is working:

```bash
pm2 save
```

This allows PM2 to restore the processes after a server restart.

---

# Production Deployment

After pulling new changes:

```bash
git pull
```

Install dependencies:

```bash
npm install
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run production migrations:

```bash
npx prisma migrate deploy
```

Build the application:

```bash
npm run build
```

Restart the API:

```bash
pm2 restart lead-backend
```

Restart the worker:

```bash
pm2 restart lead-broker-worker
```

Check the processes:

```bash
pm2 status
```

Then save the updated PM2 configuration:

```bash
pm2 save
```

---