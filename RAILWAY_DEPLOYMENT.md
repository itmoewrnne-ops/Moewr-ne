# 🚂 Railway Deployment Guide

Complete guide to deploy your Ministry website to Railway.

---

## 📋 Prerequisites

- ✅ GitHub account
- ✅ Railway account (free tier available)
- ✅ Your code pushed to GitHub

---

## Step 1: Push to GitHub

### 1.1 Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `ministry-website` (or any name you prefer)
3. Description: "Ministry of Water, Energy and Natural Resources Website"
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license
6. Click **"Create repository"**

### 1.2 Push Your Code

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push your code
git push -u origin main
```

**Replace:**
- `YOUR_USERNAME` with your GitHub username
- `YOUR_REPO_NAME` with your repository name

---

## Step 2: Deploy to Railway

### 2.1 Create Railway Account

1. Go to https://railway.app
2. Click **"Start a New Project"**
3. Sign up with GitHub (recommended) or email

### 2.2 Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Authorize Railway to access your GitHub (if first time)
4. Select your repository (`ministry-website` or whatever you named it)
5. Railway will automatically detect Next.js and start deploying

### 2.3 Configure Environment Variables

**⚠️ IMPORTANT: Set these before the first deployment completes!**

1. Click on your project
2. Go to **"Variables"** tab
3. Add these environment variables:

```
DATABASE_URL=file:./prisma/dev.db
JWT_SECRET=your-random-secret-key-minimum-32-characters-long
NODE_ENV=production
```

**Generate JWT_SECRET:**
- Windows PowerShell:
  ```powershell
  [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
  ```
- Mac/Linux:
  ```bash
  openssl rand -base64 32
  ```

### 2.4 Configure Build Settings

1. Go to **"Settings"** tab
2. Under **"Build Command"**, set:
   ```
   npm run build
   ```
3. Under **"Start Command"**, set:
   ```
   npm start
   ```
4. Under **"Root Directory"**, leave empty (or set to `/`)

### 2.5 Wait for Deployment

- Railway will automatically:
  1. Install dependencies (`npm install`)
  2. Generate Prisma client
  3. Run migrations
  4. Build the project
  5. Start the server

- Watch the **"Deployments"** tab for progress
- First deployment takes 3-5 minutes

---

## Step 3: Setup Database

### 3.1 Seed the Database

After deployment completes:

1. Go to your project dashboard
2. Click **"Deployments"** tab
3. Click on the latest deployment
4. Click **"View Logs"** or open **"Terminal"**
5. Run:
   ```bash
   npx prisma db seed
   ```

**Or use Railway's CLI:**

1. Install Railway CLI:
   ```bash
   npm i -g @railway/cli
   ```
2. Login:
   ```bash
   railway login
   ```
3. Link your project:
   ```bash
   railway link
   ```
4. Run seed:
   ```bash
   railway run npx prisma db seed
   ```

### 3.2 Verify Database

Check if admin user was created:
```bash
railway run npx prisma studio
```

Or check via Railway dashboard → Terminal

---

## Step 4: Access Your Website

### 4.1 Get Your Domain

1. Go to **"Settings"** tab
2. Scroll to **"Domains"** section
3. Railway provides a default domain: `your-project-name.up.railway.app`
4. Click **"Generate Domain"** if not already generated
5. Your site is live at that URL!

### 4.2 Custom Domain (Optional)

1. In **"Domains"** section, click **"Custom Domain"**
2. Enter your domain name
3. Follow Railway's DNS instructions
4. Wait for DNS propagation (5-30 minutes)

---

## Step 5: Test Your Deployment

### 5.1 Test Public Site

Visit your Railway domain:
- Example: `https://ministry-website.up.railway.app`
- Should see the homepage

### 5.2 Test Admin Login

1. Go to: `https://your-domain.up.railway.app/admin/login`
2. Login with:
   - Email: `admin@mow.gov`
   - Password: `password123`

### 5.3 Change Admin Password

**⚠️ IMPORTANT: Change the default password after first login!**

---

## 🔧 Troubleshooting

### Build Fails

**Check logs:**
1. Go to **"Deployments"** → Latest deployment → **"View Logs"**
2. Look for error messages

**Common issues:**
- Missing environment variables → Add them in **"Variables"** tab
- Prisma errors → Check `DATABASE_URL` is set correctly
- Build timeout → Railway free tier has limits, upgrade if needed

### Database Issues

**Reset database:**
```bash
railway run npx prisma migrate reset
railway run npx prisma db seed
```

**Check database:**
```bash
railway run npx prisma studio
```

### Site Not Loading

1. Check deployment status (should be "Active")
2. Check logs for errors
3. Verify environment variables are set
4. Try redeploying: **"Deployments"** → **"Redeploy"**

### Can't Login

1. Verify database is seeded:
   ```bash
   railway run npx prisma db seed
   ```
2. Check `JWT_SECRET` is set in environment variables
3. Check logs for authentication errors

---

## 📝 Important Notes

### Database Persistence

- Railway's free tier: Database persists between deployments
- Database file is stored in Railway's filesystem
- **Backup regularly** if using free tier

### File Uploads

- Uploaded files go to `public/uploads/`
- These persist on Railway's filesystem
- Consider using cloud storage (AWS S3, Cloudinary) for production

### Environment Variables

**Never commit these to GitHub:**
- `.env` file
- `JWT_SECRET`
- Database passwords

**Railway stores them securely** in the Variables tab.

### Updates

To update your site:
1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```
3. Railway automatically redeploys!

---

## 🎯 Quick Reference

### Railway Dashboard URLs

- **Projects**: https://railway.app/dashboard
- **Your Project**: https://railway.app/project/YOUR_PROJECT_ID
- **Deployments**: https://railway.app/project/YOUR_PROJECT_ID/deployments
- **Variables**: https://railway.app/project/YOUR_PROJECT_ID/variables
- **Settings**: https://railway.app/project/YOUR_PROJECT_ID/settings

### Useful Commands

```bash
# Login to Railway
railway login

# Link project
railway link

# View logs
railway logs

# Run commands
railway run npm run build
railway run npx prisma db seed

# Open shell
railway shell
```

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Railway project created
- [ ] Environment variables set (`DATABASE_URL`, `JWT_SECRET`)
- [ ] Build settings configured
- [ ] Deployment successful
- [ ] Database seeded
- [ ] Public site accessible
- [ ] Admin login works
- [ ] Admin password changed

---

## 🆘 Need Help?

- **Railway Docs**: https://docs.railway.app
- **Railway Discord**: https://discord.gg/railway
- **Check deployment logs** for specific errors

---

**Your website should now be live on Railway! 🎉**

