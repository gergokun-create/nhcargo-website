# NH Cargo Kft. – weboldal

Kétnyelvű (magyar / angol) céges weboldal az NH Cargo Kft. számára.
Technológia: [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com), **statikus kimenettel** – a lefordított oldal bármilyen tárhelyre (osztott tárhely, Netlify, Vercel stb.) feltölthető, szerveroldali futtatókörnyezet nélkül.

- Magyar (alapértelmezett): `/`
- Angol: `/en/`

---

## 1. Telepítés és futtatás

Előfeltétel: **Node.js 20 vagy újabb** (ajánlott: aktuális LTS) – <https://nodejs.org>

**Legegyszerűbb mód (Windows):** kattintson duplán az `inditas.bat` fájlra – első alkalommal telepíti a függőségeket, majd elindítja a weboldalt és megnyitja a böngészőben (<http://localhost:4321>).

Parancssorból:

```bash
npm install        # függőségek telepítése (egyszer kell)
npm run dev        # fejlesztői szerver: http://localhost:4321
npm run build      # éles változat elkészítése a dist/ mappába
npm run preview    # az elkészült dist/ megtekintése helyben
```

---

## 2. Projektstruktúra

```
public/                     Változatlanul kimásolt fájlok
  favicon.svg, icon-*.png   Favicon és alkalmazásikonok
  og-default.jpg            Alapértelmezett megosztási kép (Facebook, LinkedIn stb.)
  logo.png                  Logó a strukturált adatokhoz (schema.org)
src/
  assets/images/            Fotók (build közben WebP-re optimalizálva)
  assets/brand/             A hivatalos logó (SVG)
  components/               Újrahasznosítható elemek
    Header, Footer, Hero, ServiceCard, FeatureCard, ImageSlot, CertBadges,
    CTA, ContactForm, MapEmbed, Logo, Icon, SectionHeading, LegalContent,
    Breadcrumbs, CookieConsent
  data/
    site.ts                 ★ Cégadatok, elérhetőségek, űrlap-végpont, LinkedIn
    images.ts               ★ Képek listája (és forrásuk)
    content.ts              Oldalszerkezet: elemek sorrendje, ikonjai, képei
    icons.ts                Ikonkészlet (SVG)
    seo.ts                  Strukturált adatok (Organization, LocalBusiness, Service, Breadcrumb)
  i18n/
    hu.ts                   ★ Összes MAGYAR szöveg
    en.ts                   ★ Összes ANGOL szöveg
    legal.ts                ★ Impresszum, Adatkezelési és Süti tájékoztató (HU + EN)
    config.ts               Nyelvek és URL-ek (pl. /szolgaltatasok/ ↔ /en/services/)
    types.ts                A szövegfájlok kötelező szerkezete
  layouts/BaseLayout.astro  Közös keret: <head>, SEO, hreflang, schema.org
  views/                    Az egyes oldalak felépítése (nyelvfüggetlen)
  pages/                    Útvonalak – vékony fájlok, csak a nyelvet adják át (+ robots.txt.ts)
  scripts/consent.ts        Süti-hozzájárulás tárolása (localStorage)
  styles/global.css         Színpaletta, betűtípusok, alapstílusok
```

---

## 3. Szövegek szerkesztése

Minden szöveg **külön fájlban** van, a kódtól elválasztva:

| Mit szeretne módosítani? | Fájl |
| --- | --- |
| Magyar szövegek (minden oldal, menü, űrlap, meta leírások) | `src/i18n/hu.ts` |
| Angol szövegek | `src/i18n/en.ts` |
| Impresszum, Adatvédelmi tájékoztató | `src/i18n/legal.ts` |
| Telefonszám, e-mail, címek, cégjegyzékszám, adószám, LinkedIn | `src/data/site.ts` |
| Menüpontok / oldalak URL-je | `src/i18n/config.ts` |

A két nyelvi fájl (`hu.ts`, `en.ts`) szerkezete azonos – ha az egyikbe új szöveget vesz fel, a másikba is fel kell venni (különben a build hibát jelez, ami szándékos védelem).

A `legal.ts` fájlban:
- `[[ ... ]]` – **sárgán kiemelt, kitöltendő** helyőrző
- `**szöveg**` – félkövér
- `[szöveg](https://...)` – hivatkozás

Ha egy jogi oldalon már nincs `[[ ]]` helyőrző, a „Sablonszöveg” figyelmeztetés automatikusan eltűnik.

---

## 4. Képek cseréje

### A „Rólunk” oldal képei (helyőrzők)

A `/rolunk/` (angolul `/en/about/`) oldalon szaggatott keretes **„Kép helye”** dobozok jelzik, hova kerülnek a saját fotók. Feltöltéshez nem kell kódot módosítani: elég a képet a **`src/assets/images/rolunk/`** mappába másolni az alábbi fájlnevek egyikével (jpg, jpeg, png vagy webp):

| Fájlnév | Hol jelenik meg | Javasolt méret |
| --- | --- | --- |
| `fejlec.jpg` | az oldal tetején lévő háttérkép (amíg nincs, stockfotó látszik) | 1920 × 1080 px |
| `csapat.jpg` | Cégbemutatkozás mellett (most a logó van itt: `csapat.png` – saját fotó feltöltésekor azt törölje) | 1600 × 1200 px |
| `flotta.jpg` | Fő tevékenységünk / Járműflotta mellett | 1600 × 1200 px |
| `raktar.jpg` | Raktározás és átrakás / Ügyelet mellett (most stockfotó, a Pexelsről) | 1600 × 1200 px |

A Minőségirányítás résznél az ISO 9001, ISO 14001 és IFS jelvény a weboldal **saját grafikája** (`src/components/CertBadges.astro`), nem a hivatalos logó: az ISO nem engedi a saját logója használatát. A tanúsító szervezettől kapott hivatalos tanúsítási jellel lecserélhető.

A kép a következő buildnél (vagy `npm run dev` alatt azonnal) a doboz helyére kerül. A képek alternatív szövegei a `hu.ts` / `en.ts` fájl `about.slots` részében vannak.

### A többi kép

1. Tegye az új fotót a `src/assets/images/` mappába (JPG vagy PNG, legalább 1600 px széles).
2. Vagy írja felül a meglévő fájlt **azonos néven**, vagy módosítsa az importot a `src/data/images.ts` fájlban.
3. Frissítse a kép alternatív szövegét (`alt`) a `src/i18n/hu.ts` és `src/i18n/en.ts` fájl `alt` részében – ez az akadálymentesség és a SEO miatt fontos.

A képeket az Astro build közben automatikusan reszponzív **WebP** formátumra alakítja, és késleltetve (lazy load) tölti be. A jelenlegi fotók az [Unsplash](https://unsplash.com) oldalról származnak (szabadon felhasználhatók, a forrás a `src/data/images.ts` fájlban szerepel).

**Logó:** a hivatalos vektoros logó: `src/assets/brand/nh-cargo-logo.svg`. Ezt használja a fejléc és a lábléc (`src/components/Logo.astro`). Ha a fájlt azonos néven lecseréli, mindenhol frissül. A favicon és az alkalmazásikonok (`public/favicon.svg`, `icon-*.png`, `apple-touch-icon.png`), a megosztási kép (`public/og-default.jpg`), valamint a Rólunk oldal „Csapat / iroda” képe (`src/assets/images/rolunk/csapat.png`) ugyanebből a logóból készült; ezeket logócsere esetén újra kell generálni.

---

## 5. A kapcsolati / ajánlatkérő űrlap beállítása

Az űrlap ügyféloldali ellenőrzéssel, sikeres és hibás állapottal, valamint spamvédelemmel (rejtett „honeypot” mező) rendelkezik. A beküldés helye a `src/data/site.ts` fájl `formEndpoint` értéke. **Amíg ez nincs beállítva, az űrlap hibaüzenetet ad küldéskor.**

### A) Formspree (ajánlott – bármilyen tárhelyen működik)

1. Regisztráljon a <https://formspree.io> oldalon (az ingyenes csomag havi 50 üzenetig elegendő).
2. Hozzon létre egy új űrlapot, címzettnek adja meg: `info@nhcargo.hu`.
3. Másolja ki az űrlap végpontját, pl. `https://formspree.io/f/abcdwxyz`.
4. Írja be a `src/data/site.ts` fájlba:
   ```ts
   formEndpoint: ... || 'https://formspree.io/f/abcdwxyz',
   ```
   vagy hozzon létre egy `.env` fájlt (minta: `.env.example`):
   ```
   PUBLIC_FORM_ENDPOINT=https://formspree.io/f/abcdwxyz
   ```
5. `npm run build`, majd töltse fel újra az oldalt.

A Formspree a `_gotcha` nevű honeypot mezőt automatikusan felismeri, a `_subject` mező pedig az e-mail tárgya lesz.

> A végleges megoldás (Formspree vagy saját háttérrendszer adatbázissal és automatikus törléssel) az admin felület döntésétől függ – lásd `ADATFELDOLGOZOK.md`, 3. pont. Bármelyiket választja, frissítse az Adatkezelési tájékoztató megfelelő részét (`src/i18n/legal.ts`).

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
| 1 | **Űrlap** háttérrendszerének kiválasztása és beállítása (Formspree vagy saját) | admin-döntés; `src/data/site.ts` → `formEndpoint` / Render környezeti változó |
| 2 | **Közösségi adószám** (ha van) és a **képviselő (ügyvezető)** neve | `src/data/site.ts` → `registration` |
| 3 | A nyilvántartó **cégbíróság** ellenőrzése (Cg. 13 → Budapest Környéki Törvényszék Cégbírósága) | `src/data/site.ts` |
| 4 | **Tárhelyszolgáltató** neve, címe, e-mail-címe (Ektv. 4. §) – Render | `src/i18n/legal.ts` → Impresszum |
| 5 | Jogi szövegek **hatálybalépési dátuma**, **megőrzési idők**, **adatfeldolgozók**, adattovábbítás jogalapja | `src/i18n/legal.ts`, `ADATFELDOLGOZOK.md` |
| 6 | **Jogi ellenőrzés** – utána a figyelmeztetés kikapcsolása | `src/i18n/legal.ts`, `src/components/LegalContent.astro` |
| 7 | Hivatalos **tanúsítási jelek** (ISO 9001, ISO 14001, IFS) a tanúsítótól | `src/components/CertBadges.astro` |
| 8 | Saját fotók: csapat / iroda, flotta, M0 raktár | `src/assets/images/rolunk/` |
| 9 | A szolgáltatás-aloldalak szövegének **bővítése** (jelenleg kb. 170–190 szó / oldal) | `src/i18n/hu.ts` / `en.ts` → `services.items` |
