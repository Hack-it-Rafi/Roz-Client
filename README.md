# Roz Frontend

This is the frontend for the **Roz** platform. It runs on port **5173** and is dependent on both the **Roz Backend** and the **Roz Agent**.

## Getting Started

### 1. Clone and Start the Backend

```bash
git clone https://github.com/Hack-it-Rafi/Roz-Backend
cd Roz-Backend
npm i
node app.js
```

### 2. Clone and Start the Roz Agent

```bash
git clone https://github.com/Hack-it-Rafi/Roz
cd Roz
cp .env.example .env
pnpm i
pnpm build
pnpm start
```

### 3. Start the Frontend

```bash
git clone https://github.com/Hack-it-Rafi/Roz-Client
cd Roz-Client
pnpm i
pnpm run dev
```
The frontend will be available at http://localhost:5173.

## Notes
- Ensure both the backend and Roz agent are running before starting the frontend.
- Update the .env file in the Roz agent directory as needed to match your environment.