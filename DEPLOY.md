# Élesítés – NH Cargo weboldal (Render, www.nhcargo.hu)

> Felépítés: **statikus weboldal** (Astro) + **Decap CMS admin** (`/admin/`) + egy kis
> **belépési szolgáltatás** (`cms-auth/`). Minden ingyenes csomagon fut, adatbázis nincs:
> a tartalom a GitHub-repóban van. Részletek: `ADMIN_TERV.md`, használat: `ADMIN_UTMUTATO.md`.

| Render szolgáltatás | Mi ez | Csomag |
| --- | --- | --- |
| `nhcargo-website` | a weboldal és az admin (`www.nhcargo.hu`, `/admin/`) | Static Site (ingyenes) |
| `nhcargo-cms-auth` | GitHub-belépés az adminhoz | Free web service (15 perc tétlenség után elalszik) |

## 1. Mi kell hozzá?

- GitHub-repó: `gergokun-create/nhcargo-website` (a Render innen építi az oldalt)
- Render-fiók (<https://render.com>) – bejelentkezés GitHub-fiókkal; **Hobby** (ingyenes) munkaterület
- Hozzáférés a `nhcargo.hu` domain DNS-beállításaihoz (a domainregisztrátornál)
- Formspree-fiók (<https://formspree.io>, ingyenes) az ajánlatkérő űrlaphoz

## 2. Környezeti változók

**`nhcargo-website`** (Render → szolgáltatás → *Environment*):

| Változó | Kötelező? | Érték | Megjegyzés |
| --- | --- | --- | --- |
| `NODE_VERSION` | igen | `22` | a `render.yaml` beállítja |
| `PUBLIC_FORM_ENDPOINT` | igen, ha működjön az űrlap | pl. `https://formspree.io/f/xxxxxxx` | build közben kerül az oldalba; módosítás után **új deploy** kell |
| `CMS_AUTH_URL` | csak ha eltér | pl. `https://nhcargo-cms-auth-abcd.onrender.com` | ha a Render nem a `nhcargo-cms-auth.onrender.com` címet adta a belépési szolgáltatásnak |
| `SITE_URL` | nem | – | élesben üresen hagyandó (alapértelmezés: `https://www.nhcargo.hu`) |
| `PUBLIC_NOINDEX` | **nem szabad beállítani** élesben | – | csak előnézethez; a Render PR-előnézetei automatikusan `noindex`-ek |

**`nhcargo-cms-auth`**:

| Változó | Érték |
| --- | --- |
| `GITHUB_CLIENT_ID` | a GitHub OAuth App *Client ID*-ja (3. pont) |
| `GITHUB_CLIENT_SECRET` | a GitHub OAuth App *Client secret*-je – **titkos**, csak a Renderen |
| `ALLOWED_ORIGINS` | `https://www.nhcargo.hu,https://nhcargo-website.onrender.com` (a `render.yaml` beállítja) – csak ezeknek az oldalaknak adja át a belépési tokent |

Titkos adat nincs a repóban. Minta a helyi fejlesztéshez: `.env.example`.

## 3. Első élesítés lépései

1. **Render → New → Blueprint** → válassza ki a `nhcargo-website` repót. A Render beolvassa a `render.yaml`-t, és létrehozza a két szolgáltatást.
   Adja meg a `PUBLIC_FORM_ENDPOINT` értékét (Formspree: README 5. pont). A `GITHUB_CLIENT_*` értékeket ekkor még üresen hagyhatja – a belépési szolgáltatás addig nem indul el, a weboldalt ez nem érinti. **Apply**.
2. Ellenőrizze az ideiglenes címen (`https://nhcargo-website.onrender.com`), hogy az oldal betölt.
   Jegyezze fel a belépési szolgáltatás címét (Render → `nhcargo-cms-auth` → fent, pl. `https://nhcargo-cms-auth.onrender.com`).
3. **GitHub OAuth App** létrehozása: GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**
   - *Application name:* `NH Cargo admin`
   - *Homepage URL:* `https://www.nhcargo.hu`
   - *Authorization callback URL:* `https://nhcargo-cms-auth.onrender.com/callback` (a 2. lépésben feljegyzett cím + `/callback`)
   - **Register application** → másolja ki a *Client ID*-t, majd **Generate a new client secret** → másolja ki.
4. Render → `nhcargo-cms-auth` → *Environment*: `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` → **Save, rebuild and deploy**.
   Ha a szolgáltatás címe nem `nhcargo-cms-auth.onrender.com`, a `nhcargo-website`-nál állítsa be a `CMS_AUTH_URL`-t is, és indítson új deployt.
5. **Előnézetek:** Render → `nhcargo-website` → *Previews* → ellenőrizze, hogy a *Pull Request Previews* **Automatic** (a `render.yaml` ezt kéri). Az admin piszkozatai pull requestek; mindegyikhez előnézeti cím készül.
6. **Settings → Custom Domains** (`nhcargo-website`): adja hozzá a `www.nhcargo.hu` és a `nhcargo.hu` domaint.
   A Render a csupasz `nhcargo.hu`-t automatikusan átirányítja a `www`-re.
7. **DNS (a domainregisztrátornál)** – a Render pontosan kiírja a szükséges rekordokat, azokat használja:
   - `www` → **CNAME** → `nhcargo-website.onrender.com`
   - `nhcargo.hu` (apex) → a Render által megadott **A** rekord (vagy ALIAS/ANAME, ha a szolgáltató támogatja)
8. Várjon, amíg a Render „Verified” és „Certificate issued” állapotot mutat (néhány perc – pár óra).
   A HTTPS-tanúsítványt a Render automatikusan kiállítja és megújítja, a HTTP-t HTTPS-re irányítja.

## 4. Ellenőrzés élesítés után

- <https://www.nhcargo.hu> betölt, a `http://` és a `https://nhcargo.hu` cím a `https://www.nhcargo.hu`-ra irányít
- Biztonsági fejlécek: <https://securityheaders.com/?q=www.nhcargo.hu> – elvárt: HSTS, X-Content-Type-Options, X-Frame-Options, CSP, Referrer-Policy, Permissions-Policy
- Egy nem létező oldal (pl. `/xyz`) az egyedi 404-es oldalt mutatja
- `https://www.nhcargo.hu/robots.txt` és `https://www.nhcargo.hu/sitemap-index.xml` elérhető, a `www` domainre mutat, és az `/admin/` nem szerepel a sitemapben
- Az ajánlatkérő űrlap egy tesztüzenettel működik (az e-mail megérkezik az `info@nhcargo.hu` címre)
- Első látogatáskor megjelenik a süti-ablak; elutasítás után a Kapcsolat oldalon nem töltődik be a Google Térkép
- **Admin:** <https://www.nhcargo.hu/admin/> → *Belépés GitHub-fiókkal* → egy próbamódosítás mentése → az előnézet elkészül → *Publikálás most* → 1–2 perc múlva kint van (utána a próbamódosítást vissza lehet írni)

## 5. Frissítés (új tartalom, javítás)

- **Tartalom:** az adminban (`ADMIN_UTMUTATO.md`). Közzétételkor az admin a `main` ágra ír, a Render automatikusan újraépít.
- **Kód:** a `main` ágra feltöltött (push) változtatás után a Render **automatikusan** újraépíti és kiteszi az oldalt (Auto-Deploy). Kézzel: Render → szolgáltatás → **Manual Deploy → Deploy latest commit**.
- A build ellenőrzi a tartalmat (`src/cms/schema.ts`): hibás tartalom esetén a build megáll, és a **korábbi verzió marad online**. A hibaüzenet a Render *Events* / build naplójában olvasható (pl. `Hibás tartalom: src/cms/content/seo.json – hu.home.title: legfeljebb 60 karakter`).

**Visszaállítás korábbi verzióra:**
- Weboldal: Render → `nhcargo-website` → **Events** → egy korábbi sikeres deploy → **Rollback**.
- Tartalom: a gitben (`git revert <commit>` és push), vagy az adminban a régi szöveg visszaírásával (`ADMIN_UTMUTATO.md`, 6. pont). A Rollback után a tartalmat is vissza kell állítani, különben a következő mentés újra kiteszi a hibás változatot.

## 6. Mentés

A teljes weboldal – kód, **admin-tartalom** (`src/cms/content/*.json`) és **képek** (`src/assets/images/`) – a **GitHub-repóban** van; a git minden korábbi verziót megőriz, ez a mentés és a módosítási napló is. Adatbázis nincs, külön mentést nem igényel.

Ajánlott havonta egy külső másolat: GitHub → repó → **Code → Download ZIP**, és egy külön helyre (pl. céges meghajtóra) menteni.

Visszaállítás teljes adatvesztés esetén: új repó a ZIP tartalmából → a Render Blueprint újra (3. pont), az OAuth App callback címének frissítésével.

A beérkezett ajánlatkérések nem a repóban vannak: e-mailben érkeznek, és a Formspree 30 napig őrzi őket.

## 7. Helyi szerkesztés (fejlesztőknek)

```bash
npm install
npm run dev                  # http://localhost:4321
npx decap-server             # másik terminálban: helyi admin-háttér (a fájlokat közvetlenül írja)
```

Ezután a <http://localhost:4321/admin/> GitHub-belépés nélkül, a helyi fájlokon dolgozik (`local_backend`). A módosításokat gittel kell commitolni.

A Decap CMS verzióját a `scripts/copy-decap.mjs` rögzíti (verzió + integritás-hash).

## 8. GitHub Pages előnézet

A `.github/workflows/deploy.yml` minden pushnál előnézetet készít: <https://gergokun-create.github.io/nhcargo-website/> (`noindex`, a keresők nem indexelik). Az admin itt nem használható (a belépés csak a `www.nhcargo.hu` és a Render címén működik). Ha élesben már nincs rá szükség: GitHub → repó → Settings → Pages → **Unpublish**, és a workflow fájl törölhető.

## 9. Teendők a keresőknél (élesítés után)

1. **Google Search Console** (<https://search.google.com/search-console>): „Domain” tulajdon hozzáadása `nhcargo.hu`-ra, igazolás DNS TXT rekorddal, majd **Sitemaps** → `https://www.nhcargo.hu/sitemap-index.xml` beküldése.
2. **Bing Webmaster Tools**: a Search Console-ból importálható.
3. **Google Cégprofil** (Business Profile): az iroda (2040 Budaörs, Baross u. 165.) felvétele, weboldal: `https://www.nhcargo.hu`, telefon, nyitvatartás.
4. A megosztási előnézet ellenőrzése: <https://www.linkedin.com/post-inspector/> és a Facebook Sharing Debugger.
