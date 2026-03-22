# Sida Loo Dejiyo Vercel (bilaash)

**MUHIIM:** Ku dar DATABASE_URL iyo JWT_SECRET KA HOR deploy-ka.

## 1. Abuur Database bilaash (Neon)

1. Gali **https://neon.tech** → Sign up (bilaash)
2. **Create Project** → magac: moewr
3. **Connection string** copy (postgresql://...)

## 2. Ku dar Vercel Environment Variables

1. Vercel → Project **Moewr-ne** → **Settings** → **Environment Variables**
2. Ku dar:
   - **DATABASE_URL** = connection string-ka Neon (postgresql://...)
   - **JWT_SECRET** = qiime gaar ah (ugu yaraan 32 xaraf)

## 3. Redeploy

1. **Deployments** → **Redeploy** (ama push changes to GitHub)

## 4. Local development

Haddii aad rabto inaad local ku shaqeyso, isticmaal Neon connection string-ka .env file-ka.
