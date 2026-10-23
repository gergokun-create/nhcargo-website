# Adatfeldolgozók és külső szolgáltatások – NH Cargo weboldal

> Belső segédlet az **Adatkezelési tájékoztató** és a **Süti tájékoztató** kitöltéséhez
> (`src/i18n/legal.ts`). Nem jelenik meg a weboldalon. Jogi ellenőrzés szükséges.
>
> Állapot: statikus weboldal (Astro) + Decap CMS admin (`/admin/`, GitHub-belépéssel); nincs analitika, nincs marketing süti.
> Űrlap: a weboldal saját háttérszolgáltatása (Render, Frankfurt) → Microsoft 365 → `info@nhcargo.hu` (döntés: 2026-10-23; `M365_BEALLITAS.md`). Külső űrlapszolgáltató nincs.

## 1. Személyes adatot kezelő szolgáltatások

| Szolgáltatás | Mire használjuk | Milyen adat | Hol (ország) | Mikor | Teendő |
| --- | --- | --- | --- | --- | --- |
| **Render** (Render Services, Inc., 525 Brannan Street, Suite 300, San Francisco, CA 94107, USA; legal@render.com) | Tárhely – éles weboldal (www.nhcargo.hu) | Látogatók IP-címe és kérésadatai a szervernaplókban | USA; a statikus oldalt a Render globális CDN-je szolgálja ki | minden látogatás | A Render DPA-ja (render.com/dpa) SCC-t tartalmaz – elfogadása; naplómegőrzési idő ellenőrzése |
| **GitHub Pages** (GitHub, Inc.) | Tárhely – jelenlegi előnézet | Látogatók IP-címe (naplók) | USA | csak az előnézet élettartama alatt | Élesítés után az előnézet kikapcsolható |
| **Render – nhcargo-cms-auth** (Render Services, Inc.) – űrlap | Az ajánlatkérő űrlap fogadása, ellenőrzése és továbbítása e-mailben (Microsoft 365) | Név, e-mail, telefon, cégnév, szállítási adatok, üzenet; IP-cím (csak memóriában, max. 10 perc, beküldésszám-korláthoz) | EU (Frankfurt) | beküldéskor; **nem tárol, nem naplóz** | A Render DPA-ja (SCC) – lásd a Render sort |
| **GitHub** (GitHub, Inc.) | A weboldal kódja és tartalma (repó), az admin belépése | **Látogatói adat nincs.** A szerkesztő GitHub-fiókja, a módosítások szerzője és ideje (git-történet) | USA | szerkesztéskor | Csak a szerkesztőt érinti |
| **Render – nhcargo-cms-auth** (Render Services, Inc.) | GitHub-belépés közvetítése az adminhoz | **Látogatói adat nincs.** A szerkesztő IP-címe (naplók) | EU (Frankfurt) | admin-belépéskor | – |
| **Microsoft 365** (Microsoft Ireland Operations Limited, One Microsoft Place, South County Business Park, Leopardstown, Dublin 18, Írország) | Az `info@nhcargo.hu` és `p.horvath@nhcargo.hu` postafiók (MX: `nhcargo-hu.mail.protection.outlook.com`) | Az e-mailben érkező megkeresések és a weboldal ajánlatkérő űrlapjának üzenetei (a weboldal ezen keresztül küldi őket) | EU; a Microsoft az EU–USA DPF résztvevője | beküldéskor / e-mailben | A céges Microsoft 365-szerződés adatvédelmi feltételeinek (DPA) ellenőrzése |
| **Google Maps** (Google Ireland Ltd. / Google LLC) | Térkép a Kapcsolat oldalon | IP-cím, böngészőadatok, Google sütik | EU/USA | **csak hozzájárulás vagy kattintás után** | Nincs teendő (hozzájáruláshoz kötve) |

## 2. Nem kezel személyes adatot (tájékoztatásul)

| Elem | Megjegyzés |
| --- | --- |
| Betűtípusok (Manrope, Inter) | Saját szerverről töltődnek (Fontsource csomag) – **nincs** Google Fonts kérés |
| Stockfotók (Unsplash, Pexels) | A képek a saját tárhelyen vannak, látogatáskor nincs külső kérés |
| LinkedIn | Csak egy link a láblécben; adat csak akkor jut a LinkedInhez, ha a látogató rákattint |
| Hozzájárulás tárolása | `nhc-consent` a böngésző helyi tárolójában (localStorage), 12 hónap, nem kerül a szerverre |

## 3. Az ajánlatkérő űrlap adatainak útja

**Saját háttérszolgáltatás + Microsoft 365:** a látogató böngészője az űrlapot a weboldal saját háttérszolgáltatásának küldi (`nhcargo-cms-auth`, Render, Frankfurt). Az ellenőrzi a mezőket (szerveroldali validáció, spamszűrés, IP-címenként 10 percenként legfeljebb 5 beküldés), majd a Microsoft Graph-on keresztül, a cég Microsoft 365-ével e-mailt küld az `info@nhcargo.hu` címre (feladó: `info@nhcargo.hu`, válaszcím: a kitöltő e-mail-címe). Beállítás: `M365_BEALLITAS.md`.

- A háttérszolgáltatás az üzenetet **nem tárolja és nem naplózza**; az IP-cím csak a memóriában van, legfeljebb 10 percig.
- Az üzenet egyetlen példánya az `info@nhcargo.hu` postafiókban van (Microsoft 365). **A megőrzési időről a cég dönt**; a tájékoztatóban kitöltendő. Automatikus törlés a Microsoft 365 adatmegőrzési szabályával (Microsoft Purview → Adatmegőrzési szabályzat) állítható be, ha szükséges.
- Új külső adatfeldolgozó nincs: a Render (tárhely) és a Microsoft (levelezés) eddig is az volt.

## 4. Sütik és hasonló technológiák (Süti tájékoztatóhoz)

| Név | Típus | Kategória | Cél | Lejárat |
| --- | --- | --- | --- | --- |
| `nhc-consent` | localStorage | Szükséges | A süti-döntés megjegyzése | 12 hónap |
| Google sütik (pl. `NID`) | süti (google.com) | Külső tartalmak | Google Térkép működése | a Google szerint |
| `decap-cms-user` | localStorage (csak az `/admin/` oldalon) | Szükséges | A szerkesztő GitHub-belépési tokenje; látogatóknál nem jön létre | kijelentkezésig |
| `nhc_oauth_state` | süti (HttpOnly, Secure) a belépési szolgáltatás domainjén | Szükséges | CSRF-védelem a GitHub-belépésnél; csak a szerkesztőnél | 10 perc |
