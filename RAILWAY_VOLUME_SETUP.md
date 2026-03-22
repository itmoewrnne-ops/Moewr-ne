# 📦 Railway Volume Setup Guide (Hobby Plan)

Railway's **Hobby plan includes Volumes** with **5 GB persistent storage** per volume! Perfect for your uploads.

## Step-by-Step Setup

### Step 1: Create a Volume in Railway

1. Go to your Railway project dashboard: https://railway.app
2. Click on your project: **"alluring-reflection"**
3. Click **"+ New"** button (top right)
4. Select **"Volume"**
5. Configure the volume:
   - **Name**: `uploads-storage` (or any name you prefer)
   - **Mount Path**: `/app/public/uploads` ⚠️ **Important: Use this exact path**
   - Click **"Create"**

### Step 2: Attach Volume to Your Service

1. After creating the volume, you'll see it in your project
2. Click on your service: **"Moewr-ne"**
3. Go to **"Settings"** tab
4. Scroll down to **"Volumes"** section
5. Click **"Attach Volume"**
6. Select the volume you just created (`uploads-storage`)
7. The mount path should be: `/app/public/uploads`
8. Click **"Attach"**

### Step 3: Redeploy

1. Railway will automatically redeploy your service
2. Wait 2-3 minutes for deployment to complete
3. Your uploads will now persist! 🎉

## How It Works

- **Before**: Files uploaded to `public/uploads/` were lost on redeploy
- **After**: Files are stored in the persistent volume and survive redeploys
- **Storage**: 5 GB is plenty for images (thousands of images)
- **Path**: Files are still accessible at `/api/uploads/ministers/filename.jpg`

## Verify It's Working

1. Upload a new image in the admin panel
2. Check Railway → Your Service → **"Volumes"** tab
3. You should see the volume with storage usage
4. Files should persist even after redeploying

## Important Notes

- ✅ **5 GB per volume** - More than enough for images
- ✅ **Up to 10 volumes** - You can create separate volumes for different purposes
- ✅ **Persists across redeploys** - Your uploads won't be lost anymore!
- ⚠️ **Mount path must be `/app/public/uploads`** - This matches where your code saves files

## Troubleshooting

If uploads still don't persist:

1. **Check mount path**: Must be `/app/public/uploads` (not `/data/uploads`)
2. **Verify volume is attached**: Railway → Service → Settings → Volumes
3. **Check volume size**: Should show storage usage when files are uploaded
4. **Redeploy**: Sometimes a redeploy is needed after attaching volume

## Alternative: Cloud Storage

If you need more than 5 GB or want better performance:
- **Cloudinary**: Free tier (25 GB storage, 25 GB bandwidth/month)
- **AWS S3**: Pay-as-you-go, very scalable
- I can help set these up if needed!

---

**Your uploads will now persist forever! 🎉**

