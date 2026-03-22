# 🔧 Fix File Uploads on Railway

## Problem
File uploads don't persist on Railway because containers are **ephemeral** - files are lost when the container restarts or redeploys.

## Solution Options

### Option 1: Railway Volumes (Recommended for Railway)

Railway Volumes provide persistent storage that survives redeploys.

#### Step 1: Create a Volume in Railway

1. Go to your Railway project dashboard
2. Click **"+ New"** → **"Volume"**
3. Name it: `uploads-storage`
4. Mount path: `/data/uploads` (or `/tmp/railway/uploads`)
5. Click **"Create"**

#### Step 2: Update Environment Variables

1. Go to Railway → Your Service → **Variables** tab
2. Add new variable:
   ```
   RAILWAY_VOLUME_MOUNT_PATH=/data/uploads
   ```
   (Use the mount path you set in Step 1)

#### Step 3: Redeploy

Railway will automatically redeploy with the volume attached.

### Option 2: Cloud Storage (Best for Production)

For production, use cloud storage services:

#### Cloudinary (Easiest - Free Tier Available)

1. **Sign up**: https://cloudinary.com (free tier: 25GB storage, 25GB bandwidth/month)

2. **Install Cloudinary SDK**:
   ```bash
   npm install cloudinary
   ```

3. **Add Environment Variables in Railway**:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Update Upload API** to use Cloudinary instead of local filesystem

#### AWS S3 (More Complex, More Control)

1. Create S3 bucket
2. Install AWS SDK: `npm install @aws-sdk/client-s3`
3. Configure credentials in Railway
4. Update upload API

### Option 3: Temporary Fix - Use External URLs

For now, you can use external image URLs (like Unsplash) instead of uploading files.

## Current Status

The upload API has been updated to:
- ✅ Support Railway Volumes (if configured)
- ✅ Better error messages
- ✅ Fallback to local filesystem

## Testing Upload

1. Try uploading an image in the admin panel
2. Check Railway logs for any errors:
   - Railway → Deployments → Latest → View Logs
3. If upload succeeds but image doesn't show:
   - Check if volume is mounted correctly
   - Verify file permissions
   - Check if Next.js is serving `/uploads/` correctly

## Next Steps

1. **Try Railway Volumes first** (easiest if available)
2. **If volumes don't work**, set up Cloudinary (recommended for production)
3. **For now**, use external image URLs until persistent storage is configured

