# Sida Loo Dejiyo moewr-ne.so cPanel-ka

## Dhibaatada hadda: moewr-ne.so wuxuu ku tusaa Railway (404)

Domain-kaga **DNS** wuxuu ku tusayaa Railway. Si website-ku u muuqdo cPanel-kaaga, waa inaad **DNS** u beddelaa.

---

## Tallaabo 1: Ka hel IP-ka cPanel-kaaga

1. Gali cPanel: https://cpanel.moewr-ne.so/
2. Ka soco **Alerts** (dhinaca midig)
3. Alert-ka "Nameserver Error" – halkaas waxaa laguu sheegi doonaa nameservers-ka
4. **AMA** weydii **Recent IT / Help Desk**: "What is the A record IP for my hosting?"

---

## Tallaabo 2: Beddel DNS (Domain Registrar)

1. Gali halka aad domain-ka iibsaday (Namecheap, GoDaddy, etc.)
2. Dooro **moewr-ne.so** → **DNS Settings** ama **Manage DNS**
3. Ka saar **A Record** haddii ay Railway ku tusayso
4. Ku dar **A Record** cusub:
   - **Name/Host:** `@` (ama empty)
   - **Value/Points to:** IP-ka cPanel-kaaga (tallaabo 1)
   - **TTL:** 3600
5. Kaydi

---

## Tallaabo 3: Upload index.html cPanel

1. Gali **File Manager** → **public_html**
2. Ka saar **index.html** hore (haddii jiro)
3. **Upload** → dooro `index.html` ee folder-ka `deploy-to-cpanel`
4. Hubi in magaciisa yahay **index.html**

---

## Tallaabo 4: Sug

DNS waxaa qaadaa **15 daqiiqo - 48 saac**. Ka dib:

- Browser: **moewr-ne.so**
- Google: **moewr-ne.so** search garee

Website-ku waa inuu muuqdaa.

---

## Haddii aad u baahan tahay GitHub + cPanel

1. **Git Version Control** → Enable (Name + Email geli)
2. **Create** → Repository URL: `https://github.com/itmoewrnne-ops/Moewr-ne.git`
3. **Pull** si aad u soo dejiiso code-ka

**Xusuus:** Next.js ma shaqeynayo cPanel-ka (ma jiro Node.js). index.html-ka waa bog fudud. Website-ka buuxa ee Next.js waa inuu ku socdaa Railway ama Vercel.
