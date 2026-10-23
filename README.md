# NH Cargo Kft. – weboldal

Kétnyelvű (magyar / angol) céges weboldal az NH Cargo Kft. számára.
Technológia: [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com), **statikus kimenettel**, a tartalom szerkesztéséhez [Decap CMS](https://decapcms.org) admin felülettel (`/admin/`, GitHub-belépéssel). Minden ingyenes csomagon fut (Render, GitHub; az ajánlatkérő űrlap a cég Microsoft 365-ével küld) – lásd `ADMIN_TERV.md`.

- Magyar (alapértelmezett): `/`
- Angol: `/en/`

---

## 1. Telepítés és futtatás

Előfeltétel: **Node.js 22.23.4 vagy újabb** (ajánlott: 24 LTS) – <https://nodejs.org>

**Legegyszerűbb mód (Windows):** kattintson duplán az `inditas.bat` fájlra – első alkalommal telepíti a függőségeket, majd elindítja a weboldalt és megnyitja a böngészőben (<http://localhost:4321>).

Parancssorból:

```bash
npm install        # függőségek telepítése (egyszer kell)
npm run dev        # fejlesztői szerver: http://localhost:4321
npm run build      # éles változat elkészítése a dist/ mappába
npm run preview    # az elkészült dist/ megtekintése helyben
npm test           # a dist/ ellenőrzése: title/description hossz, canonical, OG, hreflang,
                   # egy H1, címsorszintek, képek alt/width/height, törött belső linkek
```

A GitHub Actions minden pushnál lefuttatja az `npm test`-et; ha hibát talál, az előnézet nem frissül.

---

## 2. Projektstruktúra

```
public/                     Változatlanul kimásolt fájlok
  admin/                    ★ Admin felület (Decap CMS): index.html, magyar feliratok
                            (a Decap csomagot a build tölti le a vendor/ mappába)
  favicon.svg, icon-*.png   Favicon és alkalmazásikonok
  og-default.jpg            Alapértelmezett megosztási kép (Facebook, LinkedIn stb.)
  logo.png                  Logó a strukturált adatokhoz (schema.org)
cms-auth/                   GitHub-belépés az adminhoz (kis Node-szolgáltatás, Render Free)
scripts/                    copy-decap.mjs (Decap letöltése), check-site.mjs (npm test)
src/
  cms/
    content/*.json          ★ Az adminban szerkesztett tartalom (szövegek, SEO, képek, cégadatok)
    schema.ts               Mi szerkeszthető az adminban (mezők, karakterkorlátok)
    fields.ts               Mezőtípusok: admin-űrlap + build közbeni ellenőrzés egy helyen
    index.ts                A tartalom betöltése és ellenőrzése
  assets/images/            Fotók = az admin médiatára (build közben WebP-re optimalizálva)
  assets/brand/             A hivatalos logó (SVG)
  components/               Újrahasznosítható elemek
    Header, Footer, Hero, ServiceCard, FeatureCard, ImageSlot, CertBadges,
    CTA, ContactForm, MapEmbed, Logo, Icon, SectionHeading, LegalContent,
    Breadcrumbs, CookieConsent
  data/
    site.ts                 Cégadatok (a cms/content/site.json-ból), űrlap-végpont
    images.ts               Fotók feloldása (a cms/content/images.json-ból) és forrásaik
    content.ts              Oldalszerkezet: elemek sorrendje, ikonjai, képei
    icons.ts                Ikonkészlet (SVG)
    seo.ts                  Strukturált adatok (Organization, LocalBusiness, Service, Breadcrumb)
  i18n/
    hu.ts, en.ts            Felületi szövegek: menü, űrlap, süti-ablak (HU / EN)
    legal.ts                ★ Impresszum, Adatkezelési és Süti tájékoztató (HU + EN)
    index.ts                Felületi szövegek + admin-tartalom összefésülése
    config.ts               Nyelvek és URL-ek (pl. /szolgaltatasok/ ↔ /en/services/)
    types.ts                A szövegek kötelező szerkezete
  layouts/BaseLayout.astro  Közös keret: <head>, SEO, hreflang, schema.org
  views/                    Az egyes oldalak felépítése (nyelvfüggetlen)
  pages/                    Útvonalak – vékony fájlok (+ robots.txt.ts, admin/config.json.ts)
  scripts/consent.ts        Süti-hozzájárulás tárolása (localStorage)
  styles/global.css         Színpaletta, betűtípusok, alapstílusok
```

---

## 3. Szövegek szerkesztése

**Az oldalak tartalmát az admin felületen kell szerkeszteni:** <https://www.nhcargo.hu/admin/> – útmutató: **[ADMIN_UTMUTATO.md](ADMIN_UTMUTATO.md)**.

| Mit szeretne módosítani? | Hol? |
| --- | --- |
| Oldalak szövegei (Főoldal, Szolgáltatások + aloldalak, Rólunk, Fenntarthatóság, Kapcsolat), ajánlatkérés sáv, lábléc-leírás | admin → **Oldalak** (`src/cms/content/*.json`) |
| Title, meta description, megosztási kép | admin → **SEO és képek → SEO** |
| Fotók és alternatív szövegeik | admin → **SEO és képek → Képek** |
| Telefonszám, e-mail, címek, cégjegyzékszám, adószám, LinkedIn | admin → **Cégadatok** |
| Menü, űrlap, süti-ablak feliratai | kódban: `src/i18n/hu.ts`, `src/i18n/en.ts` |
| Impresszum, Adatkezelési és Süti tájékoztató | kódban: `src/i18n/legal.ts` |
| Menüpontok / oldalak URL-je | kódban: `src/i18n/config.ts` |

A tartalmat a build ellenőrzi (`src/cms/schema.ts`): kötelező mezők, a title max. 60, a description max. 155 karakter, létező kép. Hibás tartalomnál a build megáll, és pontosan megmondja, melyik fájl melyik mezője hibás – az éles oldalon a korábbi verzió marad.

**Új szerkeszthető mező** felvétele: `src/cms/schema.ts` (a mező), `src/i18n/types.ts` (a típus), a JSON-fájlok (érték mindkét nyelven) és a felhasználó komponens. Az admin űrlapja ebből automatikusan frissül.

A két felületi nyelvi fájl (`hu.ts`, `en.ts`) szerkezete azonos – ha az egyikbe új szöveget vesz fel, a másikba is fel kell venni.

A `legal.ts` fájlban:
- `[[ ... ]]` – **sárgán kiemelt, kitöltendő** helyőrző
- `**szöveg**` – félkövér
- `[szöveg](https://...)` – hivatkozás

Ha egy jogi oldalon már nincs `[[ ]]` helyőrző, a „Sablonszöveg” figyelmeztetés automatikusan eltűnik.

---

## 4. Képek cseréje

Az adminban: **SEO és képek → Képek** (részletesen: `ADMIN_UTMUTATO.md`, 5. pont). A feltöltött kép a `src/assets/images/` mappába kerül, WebP formátumban, metaadatok nélkül.

- **Rólunk oldal saját fotói** (Fejléc, Csapat / iroda, Hűtős szerelvények, Raktár): amíg a mező üres, az **éles oldalon** egy meglévő fotó áll a helyén (Fejléc és Csapat: *Rólunk – nyitókép*, Hűtős szerelvények: *Főoldal – Rólunk rész*, Raktár: *Cross-docking*); **helyben és az előnézeteken** szaggatott keretes **„Kép helye”** doboz jelzi, hova kell saját fotó (`src/data/aboutImages.ts`). Jelenleg a Csapat helyén a logó (`rolunk-csapat.png`), a Raktár helyén stockfotó (`rolunk-raktar.jpg`) van.
- A képeket az Astro build közben automatikusan reszponzív **WebP** formátumra alakítja, és késleltetve (lazy load) tölti be. A jelenlegi stockfotók forrása és licence a `src/data/images.ts` fájlban szerepel.
- A Minőségirányítás résznél az ISO 9001, ISO 14001 és IFS jelvény a weboldal **saját grafikája** (`src/components/CertBadges.astro`), nem a hivatalos logó: az ISO nem engedi a saját logója használatát. A tanúsító szervezettől kapott hivatalos tanúsítási jellel lecserélhető.

**Logó:** a hivatalos vektoros logó: `src/assets/brand/nh-cargo-logo.svg`. Ezt használja a fejléc és a lábléc (`src/components/Logo.astro`). Ha a fájlt azonos néven lecseréli, mindenhol frissül. A favicon és az alkalmazásikonok (`public/favicon.svg`, `icon-*.png`, `apple-touch-icon.png`), a megosztási kép (`public/og-default.jpg`), az admin logója (`public/admin/logo.svg`), valamint a `src/assets/images/rolunk-csapat.png` ugyanebből a logóból készült; ezeket logócsere esetén újra kell generálni.

---

## 5. A kapcsolati / ajánlatkérő űrlap

Az ajánlatkérő űrlap az **`info@nhcargo.hu`** címre küld, külső űrlapszolgáltató nélkül:

```
böngésző ──▶ nhcargo-cms-auth /ajanlatkeres (Render, Frankfurt) ──▶ Microsoft 365 (Graph) ──▶ info@nhcargo.hu
```

- **Kliensoldalon** (`src/components/ContactForm.astro`): ellenőrzés, sikeres és hibás állapot, rejtett „honeypot” mező; JavaScript nélkül is működik. Amikor valaki elkezdi kitölteni, az oldal felébreszti az alvó háttérszolgáltatást.
- **Szerveroldalon** (`cms-auth/contact.mjs`): mezőellenőrzés és tisztítás, csak a `www.nhcargo.hu` felől fogad (CORS), IP-címenként 10 percenként 5 beküldés, spamszűrés (honeypot, kitöltési idő), max. 20 kB; e-mail sima szövegként, a válaszcím a kitöltő címe. Nem tárol és nem naplóz személyes adatot.
- **Beállítás:** a Microsoft 365-ben egy alkalmazást kell regisztrálni, amely csak az `info@nhcargo.hu` nevében küldhet – lépésenként: **[M365_BEALLITAS.md](M365_BEALLITAS.md)**. Az azonosítókat a Render `nhcargo-cms-auth` szolgáltatásán kell megadni (`MS_TENANT_ID`, `MS_CLIENT_ID`, `MS_CLIENT_SECRET`).
- **Címzett módosítása:** Render → `nhcargo-cms-auth` → `MAIL_TO` (több cím vesszővel).
- Amíg a Microsoft 365 nincs beállítva, a küldés hibaüzenetet ad (a telefonszám és az e-mail-cím ott van mellette).

---

## 6. Sütik, térkép, GDPR

- **Süti-hozzájárulás kezelő** (`src/components/CookieConsent.astro`, `src/scripts/consent.ts`): saját megoldás, külső szolgáltató nélkül. Az „Elfogadom” és az „Elutasítom” egyformán hangsúlyos, kategóriánként is lehet dönteni, és a döntés a lábléc „Süti beállítások” linkjén bármikor módosítható. A döntést a böngésző helyi tárolója őrzi 12 hónapig (`nhc-consent`).
- **Kategóriák:** „Szükséges” (mindig aktív) és „Külső tartalmak (Google Térkép)”. Analitika és marketing süti **nincs** a weboldalon.
- **Google Térkép:** csak „Külső tartalmak” hozzájárulással vagy a „Térkép betöltése” gombra kattintva töltődik be; előtte semmilyen kérés nem megy a Google felé.
- **Betűtípusok:** helyben hosztolva (Fontsource), nincs Google Fonts kérés.
- **Jogi oldalak:** Impresszum, Adatkezelési tájékoztató, Süti tájékoztató – mind **sablon**, „JOGI ELLENŐRZÉS SZÜKSÉGES” jelöléssel (`src/i18n/legal.ts`). Jóváhagyás után a figyelmeztetés a `src/components/LegalContent.astro` fájlban (`legalReviewed = true`) kapcsolható ki.
- **Adatfeldolgozók listája:** `ADATFELDOLGOZOK.md` (nem jelenik meg az oldalon).
- **Ha később analitikát vezet be:** új kategória kell a hozzájárulás-kezelőbe (lásd a `consent.ts` fejlécét), a CSP-be (`astro.config.mjs`) és a Süti tájékoztatóba.

---

## 7. SEO

- Oldalanként és nyelvenként egyedi `title` (max. 60 karakter) és `description` (max. 155 karakter) – `src/i18n/hu.ts` / `en.ts` → `meta`
- Kulcsszavas szolgáltatás-aloldalak: `/belfoldi-fuvarozas/`, `/cross-docking/`, `/nemzetkozi-fuvarozas/` (angolul `/en/domestic-transport/`, `/en/cross-docking/`, `/en/international-transport/`), morzsamenüvel
- Canonical URL, `hreflang` (hu / en / x-default), Open Graph és Twitter Card; a megosztási kép oldalanként az oldal saját fotójából készül (1200×630)
- Strukturált adatok (`src/data/seo.ts`): Organization + LocalBusiness, Service a szolgáltatásokhoz, BreadcrumbList az aloldalakon
- `sitemap-index.xml` és `robots.txt` automatikusan, a domainből generálva (`astro.config.mjs` → `SITE_URL`, alapértelmezés: `https://www.nhcargo.hu`)
- Előnézeti build (`PUBLIC_NOINDEX=true`, pl. GitHub Pages): minden oldal `noindex`, a robots.txt zárt

---

## 8. Közzététel (deploy)

Az éles weboldal a **Renderen** fut (`render.yaml`, biztonsági fejlécekkel) – a teljes leírás: **[DEPLOY.md](DEPLOY.md)**.

A `main` ágra feltöltött változtatásokból a GitHub Actions egy **előnézetet** is készít a GitHub Pagesen (`noindex`): <https://gergokun-create.github.io/nhcargo-website/>.

---

## 9. Kitöltendő helyőrzők és teendők (TODO)

| # | Teendő | Hol? |
| --- | --- | --- |
| 1 | **Microsoft 365** alkalmazás az ajánlatkérő űrlaphoz + a Render környezeti változói | `M365_BEALLITAS.md` |
| 2 | **GitHub OAuth App** + a belépési szolgáltatás környezeti változói | `DEPLOY.md`, 3. pont |
| 3 | **Közösségi adószám** (ha van) és a **képviselő (ügyvezető)** neve | admin → Cégadatok |
| 4 | A nyilvántartó **cégbíróság** ellenőrzése (Cg. 13 → Budapest Környéki Törvényszék Cégbírósága) | admin → Cégadatok |
| 5 | Jogi szövegek **hatálybalépési dátuma**, az e-mailben érkező megkeresések **megőrzési ideje** | `src/i18n/legal.ts`, `ADATFELDOLGOZOK.md` |
| 6 | **Jogi ellenőrzés** – utána a figyelmeztetés kikapcsolása | `src/i18n/legal.ts`, `src/components/LegalContent.astro` |
| 7 | Hivatalos **tanúsítási jelek** (ISO 9001, ISO 14001, IFS) a tanúsítótól | `src/components/CertBadges.astro` |
| 8 | Saját fotók: csapat / iroda, flotta, M0 raktár | admin → SEO és képek → Képek → Rólunk oldal saját fotói |
| 9 | A szolgáltatás-aloldalak szövegének **bővítése** (jelenleg kb. 160–210 szó / oldal) | admin → Oldalak → Szolgáltatások |
