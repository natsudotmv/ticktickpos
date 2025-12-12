# TickTick POS

A lightweight POS designed for restaurants with a fixed menu built using React, Go and PostgreSQL as the database.  

## Prerequisites

- [Go 1.25+](https://golang.org/dl/)  
- [PostgreSQL 15+](https://www.postgresql.org/download/) (for local setup)  
- [Docker](https://www.docker.com/get-started) & [Docker Compose](https://docs.docker.com/compose/install/) (optional, but highly recommended)  

## Setup Environment Variables

Create a `.env` file in the `server` folder:

```env
# PostgreSQL connection
DB_HOST=ticktickpos-postgres           # Use 'postgres' for Docker, 'localhost' for local
DB_PORT=5432
DB_USER=user
DB_PASSWORD=password
DB_NAME=ticktickpos-db
DB_SSLMODE=disable
```
Make sure this file is listed in `.gitignore` to avoid committing secrets.


## Running with Docker (Recommended)
1. Build and start containers:
```bash
docker-compose up
```
- goapp → runs the Go API with hot reload (Air)
- postgres → runs the PostgreSQL database

2. The Go API will automatically run migrations and seed the menu.
3. Verify API is running:
```bash
curl http://localhost:8080/health
```
Use `docker-compose down` to stop containers.


## Running Locally without Docker
1. Start PostgreSQL manually (install on your machine).
- Create the database and user matching your .env file:
```sql
-- Replace user/password/dbname as needed
CREATE USER user WITH PASSWORD 'password';
CREATE DATABASE "ticktickpos-db" OWNER user;
```
2. Install Go dependencies:
```bash
cd server
go mod tidy
```
3. Run the API:
```bash
go run ./cmd/api/main.go
```
- The API will automatically connect to PostgreSQL, run migrations, and seed the menu.
4. Verify API is running:
```bash
curl http://localhost:8080/health
```
## Note
- `DB_HOST` inside Docker must match the Postgres service name (`postgres`)
- When running locally, use `DB_HOST=localhost`
- The API uses `github.com/joho/godotenv `to load `.env` variables
- Air is used for hot reload during development (`docker-compose` setup)



