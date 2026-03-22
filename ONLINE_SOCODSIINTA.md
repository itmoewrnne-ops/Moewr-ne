# Sida Loo Saaro Website-ka Online (moewr-ne.so)

## Option 1: Vercel (Bilaash – Recommended)

### Tallaabo 1: Abuur Database (Neon)
1. Gali **https://neon.tech** → Sign up
2. **New Project** → magac: moewr
3. **Connection string** copy (postgresql://...)

### Tallaabo 2: Vercel Deploy
1. Gali **https://vercel.com** → Sign in (GitHub)
2. **Add New** → **Project**
3. Dooro **itmoewrnne-ops** / **Moewr-ne**
4. **Environment Variables** ku dar:
   - `DATABASE_URL` = Neon connection string
   - `JWT_SECRET` = waxaad ku qor kartaa: `moewr-secret-key-2024-min-32-characters`
5. **Deploy** taabo

### Tallaabo 3: Database Tables
1. Computer-kaaga terminal fur
2. `cd` project folder
3. `.env` fur, DATABASE_URL = Neon URL geli
4. Run: `npx prisma db push`
5. Vercel → **Redeploy** taabo

### Tallaabo 4: Domain
1. Vercel Project → **Settings** → **Domains**
2. **Add** → `moewr-ne.so`
3. DNS (domain registrar): **CNAME** `moewr-ne.so` → `cname.vercel-dns.com`

---

## Option 2: Bog Fudud cPanel (Haddii aad keliya HTML rabto)

1. cPanel **File Manager** fur
2. Soco **public_html**
3. **moewr** folder fur → **public** → **index-cpanel.html** copy
4. **public_html** ku paste → magaciisa beddel **index.html**
5. DNS: A Record u beddel si uu u tuso cPanel IP (weydii Recent IT)

---

## Xulasho

| Option | Lacag | Shaqada |
|--------|-------|---------|
| **Vercel** | Bilaash | Website buuxda |
| **cPanel** | Hosting-kaaga | Bog fudud kaliya |
