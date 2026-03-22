# Sida Loo Saaro moewr-ne.so Online (cPanel)

**GitHub:** https://github.com/itmoewrnne-ops/Moewr-ne  
**cPanel:** https://cpanel.moewr-ne.so/

---

## Tallaabo 1: Copy index.html → public_html

Code-ka waa ku jiraa `moewr` folder (Git clone). Waa inaad copy-gareynaa bogga.

1. **cPanel** gal → **File Manager** fur
2. Soco **moewr** → **public**
3. **index-cpanel.html** ka hel
4. **Right-click** → **Copy**
5. Soco **public_html** (root-ka website-ka)
6. **Paste**
7. **Rename** `index-cpanel.html` → **index.html**
8. Haddii `index.html` hore jiro → **Delete** ka hor paste

---

## Tallaabo 2: Beddel DNS

**moewr-ne.so** hadda wuxuu ku tusayaa Railway (404). Si uu u tuso cPanel:

1. Ka soco **halka aad domain-ka iibsaday** (registrar)
2. **DNS Settings** / **Manage DNS**
3. **A Record** beddel:
   - **Name:** `@` (ama empty)
   - **Value:** IP-ka cPanel-kaaga
   - Weydii **Recent IT** / **Help Desk**: "What is the A record IP for moewr-ne.so hosting?"
4. **Save**
5. **Sug** 15 daqiiqo – 48 saac

---

## Tallaabo 3: Hubi

Ka dib DNS:
- Browser: **https://moewr-ne.so**
- Waxaa kuu muuqan doonaa: "Wasaaradda Biyaha, Tamarta iyo Khayraadka Dabiiciga ah"

---

## Xusuus

- Bog-kaan waa **HTML fudud** – ma aha website-ka buuxda (Next.js)
- Website-ka buuxda (admin, news) – u deploy **Vercel** (bilaash): [VERCEL_SETUP.md](./VERCEL_SETUP.md)
