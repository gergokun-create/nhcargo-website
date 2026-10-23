# Élesítés – NH Cargo weboldal (Render, www.nhcargo.hu)

> Jelenlegi állapot: **statikus weboldal** (Astro). Ha az admin felület / űrlap-háttér
> (5. fázis) elkészül, ez a leírás kiegészül az adatbázissal, a mentésekkel és a
> szerveres beállításokkal.

## 1. Mi kell hozzá?

- GitHub-repó: `gergokun-create/nhcargo-website` (a Render innen építi az oldalt)
- Render-fiók (<https://render.com>) – bejelentkezés GitHub-fiókkal
- Hozzáférés a `nhcargo.hu` domain DNS-beállításaihoz (a domainregisztrátornál)

## 2. Környezeti változók

| Változó | Kötelező? | Érték | Megjegyzés |
| --- | --- | --- | --- |
| `NODE_VERSION` | igen | `24` | a `render.yaml` beállítja |
| `PUBLIC_FORM_ENDPOINT` | igen, ha működjön az űrlap | pl. `https://formspree.io/f/xxxxxxx` | build közben kerül az oldalba; módosítás után **új deploy** kell |
| `SITE_URL` | nem | – | élesben üresen hagyandó (alapértelmezés: `https://www.nhcargo.hu`) |
| `PUBLIC_NOINDEX` | **nem szabad beállítani** élesben | – | csak előnézethez (`true` = keresők elől elrejtve) |

Titkos adat nincs a repóban; minden beállítás a Render felületén, a szolgáltatás **Environment** fülén adható meg. Minta: `.env.example`.

## 3. Első élesítés lépései

1. **Render → New → Blueprint** → válassza ki a `nhcargo-website` repót.
   A Render beolvassa a `render.yaml` fájlt (statikus oldal, build: `npm ci && npm run build`, kimenet: `dist`, biztonsági fejlécek).
2. Adja meg a `PUBLIC_FORM_ENDPOINT` értékét, majd **Apply**. Az első build 1–2 perc.
3. Ellenőrizze az ideiglenes címen (`https://nhcargo-website.onrender.com`), hogy az oldal betölt.
4. **Settings → Custom Domains:** adja hozzá a `www.nhcargo.hu` és a `nhcargo.hu` domaint.
   A Render a csupasz `nhcargo.hu`-t automatikusan átirányítja a `www`-re.
5. **DNS (a domainregisztrátornál)** – a Render pontosan kiírja a szükséges rekordokat, azokat használja:
   - `www` → **CNAME** → `nhcargo-website.onrender.com`
   - `nhcargo.hu` (apex) → a Render által megadott **A** rekord (vagy ALIAS/ANAME, ha a szolgáltató támogatja)
6. Várjon, amíg a Render „Verified” és „Certificate issued” állapotot mutat (néhány perc – pár óra).
   A HTTPS-tanúsítványt a Render automatikusan kiállítja és megújítja, a HTTP-t HTTPS-re irányítja.

## 4. Ellenőrzés élesítés után

- <https://www.nhcargo.hu> betölt, a `http://` és a `https://nhcargo.hu` cím a `https://www.nhcargo.hu`-ra irányít
- Biztonsági fejlécek: <https://securityheaders.com/?q=www.nhcargo.hu> – elvárt: HSTS, X-Content-Type-Options, X-Frame-Options, CSP, Referrer-Policy, Permissions-Policy
- Egy nem létező oldal (pl. `/xyz`) az egyedi 404-es oldalt mutatja
- `https://www.nhcargo.hu/robots.txt` és `https://www.nhcargo.hu/sitemap-index.xml` elérhető, és a `www` domainre mutat
- Az ajánlatkérő űrlap egy tesztüzenettel működik
- Első látogatáskor megjelenik a süti-ablak; elutasítás után a Kapcsolat oldalon nem töltődik be a Google Térkép

## 5. Frissítés (új tartalom, javítás)

A `main` ágra feltöltött (push) változtatás után a Render **automatikusan** újraépíti és kiteszi az oldalt (Auto-Deploy). Kézzel: Render → szolgáltatás → **Manual Deploy → Deploy latest commit**.

**Visszaállítás korábbi verzióra:** Render → szolgáltatás → **Events / Deploys** → egy korábbi sikeres deploy → **Rollback**. (Vagy a gitben: `git revert` és push.)

## 6. Mentés

Statikus oldalnál a teljes weboldal (kód, szövegek, képek) a **GitHub-repóban** van – ez a mentés; a git minden korábbi verziót megőriz. Ajánlott: a repó időnkénti letöltése (Code → Download ZIP) egy külön helyre.

## 7. GitHub Pages előnézet

A `.github/workflows/deploy.yml` minden pushnál előnézetet készít: <https://gergokun-create.github.io/nhcargo-website/> (`noindex`, a keresők nem indexelik). Ha élesben már nincs rá szükség: GitHub → repó → Settings → Pages → **Unpublish**, és a workflow fájl törölhető.

## 8. Teendők a keresőknél (élesítés után)

1. **Google Search Console** (<https://search.google.com/search-console>): „Domain” tulajdon hozzáadása `nhcargo.hu`-ra, igazolás DNS TXT rekorddal, majd **Sitemaps** → `https://www.nhcargo.hu/sitemap-index.xml` beküldése.
2. **Bing Webmaster Tools**: a Search Console-ból importálható.
3. **Google Cégprofil** (Business Profile): az iroda (2040 Budaörs, Baross u. 165.) felvétele, weboldal: `https://www.nhcargo.hu`, telefon, nyitvatartás.
4. A megosztási előnézet ellenőrzése: <https://www.linkedin.com/post-inspector/> és a Facebook Sharing Debugger.
