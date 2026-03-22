# 💾 Make Database Persist on Railway

## Problem
The SQLite database file (`prisma/dev.db`) is stored in the project directory, which is **ephemeral**. Every time Railway redeploys, the database is reset and you lose:
- User-created hero slides
- Uploaded content
- Any custom data

## Solution: Move Database to Volume

Since you already have a volume mounted at `/app/public/uploads`, we'll store the database there too.

### Step 1: Update DATABASE_URL in Railway

1. Go to Railway → Your Service → **Variables** tab
2. Find `DATABASE_URL`
3. Change it from:
   ```
   file:./prisma/dev.db
   ```
   To:
   ```
   file:/app/public/uploads/data/dev.db
   ```
4. Save the change

### Step 2: Update Build Script

The build script needs to create the database directory in the volume.

### Step 3: Redeploy

Railway will redeploy automatically. The database will now persist in the volume!

---

**Note:** After this change, your database will persist across redeploys, but you'll need to manually create the first database by running migrations.

