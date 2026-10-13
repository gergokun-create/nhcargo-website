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
  og-default.jpg            Megosztási kép (Facebook, LinkedIn stb.)
  robots.txt                Keresőrobot-szabályok
  contact.php               Opcionális PHP levelező az űrlaphoz
src/
  assets/images/            Fotók (build közben WebP-re optimalizálva)
  assets/brand/             Az eredeti logófájl
  components/               Újrahasznosítható elemek
    Header, Footer, Hero, ServiceCard, IndustryCard, FeatureCard,
    CTA, ContactForm, MapEmbed, Logo, Icon, SectionHeading, LegalContent
  data/
    site.ts                 ★ Cégadatok, elérhetőségek, űrlap-végpont, LinkedIn
    images.ts               ★ Képek listája (és forrásuk)
    content.ts              Oldalszerkezet: elemek sorrendje, ikonjai, képei
    icons.ts                Ikonkészlet (SVG)
  i18n/
    hu.ts                   ★ Összes MAGYAR szöveg
    en.ts                   ★ Összes ANGOL szöveg
    legal.ts                ★ Impresszum és Adatvédelmi tájékoztató (HU + EN)
    config.ts               Nyelvek és URL-ek (pl. /szolgaltatasok/ ↔ /en/services/)
    types.ts                A szövegfájlok kötelező szerkezete
  layouts/BaseLayout.astro  Közös keret: <head>, SEO, hreflang, schema.org
  views/                    Az egyes oldalak felépítése (nyelvfüggetlen)
  pages/                    Útvonalak – vékony fájlok, csak a nyelvet adják át
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

1. Tegye az új fotót a `src/assets/images/` mappába (JPG vagy PNG, legalább 1600 px széles).
2. Vagy írja felül a meglévő fájlt **azonos néven**, vagy módosítsa az importot a `src/data/images.ts` fájlban.
3. Frissítse a kép alternatív szövegét (`alt`) a `src/i18n/hu.ts` és `src/i18n/en.ts` fájl `alt` részében – ez az akadálymentesség és a SEO miatt fontos.

A képeket az Astro build közben automatikusan reszponzív **WebP** formátumra alakítja, és késleltetve (lazy load) tölti be. A jelenlegi fotók az [Unsplash](https://unsplash.com) oldalról származnak (szabadon felhasználhatók, a forrás a `src/data/images.ts` fájlban szerepel).

**Logó:** a fejlécben és a láblécben a mellékelt logó vektoros (SVG) újrarajzolása szerepel (`src/components/Logo.astro`), hogy minden méretben éles legyen. Az eredeti fájl: `src/assets/brand/nh-cargo-logo-original.jpg`. Ha rendelkezésre áll az eredeti vektoros logó (SVG/AI/PDF), érdemes azzal lecserélni.

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

### B) PHP levelező (osztott tárhelyhez, PHP 8+)

1. A `src/data/site.ts` fájlban állítsa be: `formEndpoint: '/contact.php'` (vagy `.env`: `PUBLIC_FORM_ENDPOINT=/contact.php`).
2. Nyissa meg a `public/contact.php` fájlt, és állítsa be:
   - `MAIL_TO` – címzett (pl. `info@nhcargo.hu`)
   - `MAIL_FROM` – feladó, **a tárhely domainjén lévő** cím (pl. `no-reply@nhcargo.hu`)
3. `npm run build` – a fájl automatikusan a `dist/` mappába kerül.

A PHP-s megoldás honeypot- és időzítéses spamszűrést is tartalmaz, és JavaScript nélkül is működik. A levélkézbesítés megbízhatósága a tárhelytől függ (SPF/DKIM beállítás) – szükség esetén kérjen SMTP-hozzáférést a szolgáltatótól, és váltson PHPMailerre.

> Bármelyik megoldást választja, frissítse az Adatvédelmi tájékoztató „Adatfeldolgozók” részét (`src/i18n/legal.ts`).

---

## 6. Térkép, sütik, GDPR

- A weboldal **nem használ sütiket**, analitikát vagy külső betűtípus-szolgáltatót (a betűk saját szerverről töltődnek), ezért **nincs szükség sütifigyelmeztetésre (cookie bannerre)**.
- A Google Térkép csak akkor töltődik be, ha a látogató a „Térkép betöltése” gombra kattint („kétkattintásos” megoldás) – addig semmilyen adat nem jut el a Google-hoz.
- **Ha később analitikát (pl. Google Analytics) vagy más sütit használó eszközt vezet be, akkor sütihozzájárulás-kezelőt is be kell építeni**, és frissíteni kell az adatvédelmi tájékoztatót.

---

## 7. SEO

- Oldalanként és nyelvenként egyedi `title` és `description` (`src/i18n/hu.ts` / `en.ts` → `meta`)
- Open Graph és Twitter megosztási adatok, alapértelmezett kép: `public/og-default.jpg`
- `hreflang` kapcsolat a magyar és angol oldalak között, `canonical` URL
- schema.org strukturált adat (`Organization` + `LocalBusiness`: cím, telefon, e-mail)
- `sitemap-index.xml` automatikusan generálva, `robots.txt` a `public/` mappában
- Egyedi 404-es oldal (kétnyelvű)

A domain (`https://nhcargo.hu`) az `astro.config.mjs`, a `src/data/site.ts` és a `public/robots.txt` fájlban van megadva – ha eltér, mindhárom helyen módosítsa.

---

## 8. Közzététel (deploy)

Előbb mindig: `npm run build` → az eredmény a **`dist/`** mappában van.

### Osztott tárhely (FTP)
Töltse fel a `dist/` mappa **tartalmát** (a rejtett `.htaccess` fájllal együtt) a tárhely gyökérkönyvtárába (általában `public_html/` vagy `www/`). A `public/.htaccess` Apache szerveren beállítja a 404-es oldalt, a gyorsítótárazást és a tömörítést; az SSL-tanúsítvány aktiválása után benne a HTTPS-átirányítás is bekapcsolható.

### Netlify
- „Add new site” → GitHub-repó kiválasztása, vagy a `dist/` mappa áthúzása a <https://app.netlify.com/drop> oldalra
- Build command: `npm run build`, Publish directory: `dist`
- A 404-es oldalt a Netlify automatikusan felismeri.

### Vercel
- „Add New Project” → repó importálása; a Vercel felismeri az Astrót
- Build command: `npm run build`, Output directory: `dist`

> A PHP-s űrlap csak PHP-t futtató tárhelyen működik; Netlify / Vercel esetén a Formspree-t használja.

---

## 9. Kitöltendő helyőrzők és teendők (TODO)

| # | Teendő | Hol? |
| --- | --- | --- |
| 1 | **Űrlap-végpont** beállítása (Formspree azonosító vagy `/contact.php`) | `src/data/site.ts` → `formEndpoint` (vagy `.env`) |
| 2 | PHP levelező esetén címzett és feladó e-mail-cím | `public/contact.php` → `MAIL_TO`, `MAIL_FROM` |
| 3 | **LinkedIn**-oldal valódi URL-je | `src/data/site.ts` → `social.linkedin` |
| 4 | **Cégjegyzékszám** | `src/data/site.ts` → `registration.companyNumber` |
| 5 | **Adószám** és **közösségi adószám** | `src/data/site.ts` → `registration.taxNumber`, `euVatNumber` |
| 6 | Nyilvántartó **cégbíróság** | `src/data/site.ts` → `registration.registryCourt` |
| 7 | **Képviselő** (ügyvezető) neve | `src/data/site.ts` → `registration.representative` |
| 8 | **Tárhelyszolgáltató** neve, címe, e-mail-címe (Ekertv. 4. §) | `src/i18n/legal.ts` → Impresszum (HU + EN) |
| 9 | Impresszum és Adatvédelmi tájékoztató **hatálybalépési dátuma** | `src/i18n/legal.ts` |
| 10 | Adatvédelmi tájékoztató: adatvédelmi kapcsolattartó, **megőrzési idő**, **adatfeldolgozók** (tárhely, űrlap-, e-mail-szolgáltató), adatbiztonsági intézkedések | `src/i18n/legal.ts` |
| 11 | A jogi szövegek (különösen a jogalap) **ellenőrzése jogi szakértővel** | `src/i18n/legal.ts` |
| 12 | **Végleges domain** megerősítése (jelenleg `https://nhcargo.hu`) | `astro.config.mjs`, `src/data/site.ts`, `public/robots.txt` |
| 13 | Eredeti **vektoros logó** beszerzése (opcionális, a mostani SVG újrarajzolás) | `src/components/Logo.astro`, `public/favicon.svg` |
| 14 | Saját fotók a flottáról / telephelyről (opcionális, a stockfotók helyett) | `src/assets/images/`, `src/data/images.ts` |
