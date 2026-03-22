# Ministry of Water, Energy, and Natural Resources Website

This is the official website system for the Ministry of Water, Energy, and Natural Resources.

## Features

- **Public Portal**: Information about departments, services, projects, tenders, and news.
- **Admin Dashboard**: Content management system for ministry staff.

## Tech Stack

- **Framework**: Next.js 14
- **Database**: SQLite (Prisma ORM)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Getting Started

### Quick Start (Local Testing)

**📖 For detailed step-by-step instructions, see [LOCAL_TESTING_GUIDE.md](./LOCAL_TESTING_GUIDE.md)**

#### Option 1: Automated Setup (Recommended)

**Windows (PowerShell)**:
```powershell
.\setup-local.ps1
```

**Mac/Linux**:
```bash
chmod +x setup-local.sh
./setup-local.sh
```

#### Option 2: Manual Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Setup Database**:
    ```bash
    npx prisma generate
    npx prisma migrate deploy
    npx prisma db seed
    ```

3.  **Create `.env` file** in project root:
    ```env
    DATABASE_URL="file:./prisma/dev.db"
    JWT_SECRET="your-random-secret-key-minimum-32-characters-long"
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

5.  **Open Browser**:
    - Public Site: [http://localhost:3000](http://localhost:3000)
    - Admin Login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Admin Access

The seed script (`prisma/seed.ts`) creates a default admin user. Credentials are defined in the seed file – run `npx prisma db seed` after setup to create the admin account.

## Project Structure

- `app/(public)`: Public facing pages.
- `app/admin`: Admin dashboard pages.
- `components/ui`: Reusable UI components.
- `lib`: Utilities and server actions.
- `prisma`: Database schema and seed script.
