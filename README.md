# Express-Mono Template Repository

## Project Overview
My personal use express monolith repo. This repository is a monolith template with an Express.js backend. The frontend is flexible and allows you to choose any technology stack that fits your needs.

## Installation

### Prerequisites
- Node.js
- yarn
- Docker
- Docker Compose
- PostgreSQL

### Root Directory Setup
1. Clone the repository
   ```bash
   git clone https://github.com/bangueco/express-mono.git
   cd express-mono
   ```
2. Install docker and docker-compose (aur helper command for linux)
   ```bash
   yay docker
   yay docker-compose
   ```
3. Build docker compose image database
   ```bash
   # For first time setup
   sudo docker compose up -d
   
   # For starting the docker image
   sudo docker compose start
   ```

### Backend Setup
1. Navigate to backend direcotry:
   ```bash
   cd express-mono/backend
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Create a copy of env file
   ```bash
   cp .env.example .env
   ```
4. Edit env file according to variables (example)
   ```
   DATABASE_URL="postgresql://root:admin@localhost:5432/dev-db?schema=public"
   PORT=3000
   ACCESS_TOKEN_KEY="3l9X9aWHrNYLVqgGSbAq3daGOUdxS8yGXrqzrs1wWpE="
   REFRESH_TOKEN_KEY="cWtCuwtYogrln0OsIDUdz+USalIebzE+o/Fq4RqhNzU="
   ```
6. Start backend server
   ```bash
   yarn dev
   ```

### Frontend Setup
Just choose your favorite frontend framework, whether its React, Angular, Vue or whatever.

## Technologies Used
- Express JS
- Node JS
- PostgreSQL
- Typescript
- Prisma
- Docker
- Docker Compose
- Yarn

### Contributing
If you have further improvements or suggestions, feel free to fork this repository and open a pull request!
