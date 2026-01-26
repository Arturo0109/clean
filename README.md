# Text Correction App

A full-stack application for text correction using NestJS (backend) and Next.js (frontend).

## Prerequisites

-   Node.js >= 18.0.0

## Easy Installation (Windows)

We have provided a PowerShell script to automate the installation of dependencies for both the backend and frontend.

1.  Open PowerShell in the project root.
2.  Run the following command:

    ```powershell
    .\install_dependencies.ps1
    ```

This script will:
- Check your Node.js version.
- Install backend dependencies.
- Generate the Prisma Client.
- Install frontend dependencies.

## Manual Installation

If you prefer to install manually:

### Backend
```bash
cd backend
npm install
npx prisma generate
npm run start:dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
