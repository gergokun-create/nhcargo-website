# Adatfeldolgozók és külső szolgáltatások – NH Cargo weboldal

> Belső segédlet az **Adatkezelési tájékoztató** és a **Süti tájékoztató** kitöltéséhez
> (`src/i18n/legal.ts`). Nem jelenik meg a weboldalon. Jogi ellenőrzés szükséges.
>
> Állapot: statikus weboldal (Astro) + Decap CMS admin (`/admin/`, GitHub-belépéssel); nincs analitika, nincs marketing süti.
> Űrlap: Formspree Free (döntés: 2026-10-23, előfizetés nélküli megoldás – `ADMIN_TERV.md`).

## 1. Személyes adatot kezelő szolgáltatások

| Szolgáltatás | Mire használjuk | Milyen adat | Hol (ország) | Mikor | Teendő |
| --- | --- | --- | --- | --- | --- |
| **Render** (Render Services, Inc., 525 Brannan Street, Suite 300, San Francisco, CA 94107, USA; legal@render.com) | Tárhely – éles weboldal (www.nhcargo.hu) | Látogatók IP-címe és kérésadatai a szervernaplókban | USA; a statikus oldalt a Render globális CDN-je szolgálja ki | minden látogatás | A Render DPA-ja (render.com/dpa) SCC-t tartalmaz – elfogadása; naplómegőrzési idő ellenőrzése |
| **GitHub Pages** (GitHub, Inc.) | Tárhely – jelenlegi előnézet | Látogatók IP-címe (naplók) | USA | csak az előnézet élettartama alatt | Élesítés után az előnézet kikapcsolható |
| **Formspree** (Formspree, Inc.) | Ajánlatkérő űrlap fogadása, továbbítás e-mailben | Név, e-mail, telefon, cégnév, szállítási adatok, üzenet, IP-cím | USA | beküldéskor; a Formspree 30 napig tárolja | DPA / adattovábbítás jogalapja (DPF/SCC) ellenőrzése; lásd 3. pont |
| **GitHub** (GitHub, Inc.) | A weboldal kódja és tartalma (repó), az admin belépése | **Látogatói adat nincs.** A szerkesztő GitHub-fiókja, a módosítások szerzője és ideje (git-történet) | USA | szerkesztéskor | Csak a szerkesztőt érinti |
| **Render – nhcargo-cms-auth** (Render Services, Inc.) | GitHub-belépés közvetítése az adminhoz | **Látogatói adat nincs.** A szerkesztő IP-címe (naplók) | EU (Frankfurt) | admin-belépéskor | – |
| **Microsoft 365** (Microsoft Ireland Operations Limited, One Microsoft Place, South County Business Park, Leopardstown, Dublin 18, Írország) | Az `info@nhcargo.hu` és `p.horvath@nhcargo.hu` postafiók (MX: `nhcargo-hu.mail.protection.outlook.com`) | Az e-mailben érkező megkeresések teljes tartalma, a Formspree-értesítők | EU; a Microsoft az EU–USA DPF résztvevője | beküldéskor / e-mailben | A céges Microsoft 365-szerződés adatvédelmi feltételeinek (DPA) ellenőrzése |
| **Google Maps** (Google Ireland Ltd. / Google LLC) | Térkép a Kapcsolat oldalon | IP-cím, böngészőadatok, Google sütik | EU/USA | **csak hozzájárulás vagy kattintás után** | Nincs teendő (hozzájáruláshoz kötve) |

## 2. Nem kezel személyes adatot (tájékoztatásul)

| Elem | Megjegyzés |
| --- | --- |
| Betűtípusok (Manrope, Inter) | Saját szerverről töltődnek (Fontsource csomag) – **nincs** Google Fonts kérés |
| Stockfotók (Unsplash, Pexels) | A képek a saját tárhelyen vannak, látogatáskor nincs külső kérés |
| LinkedIn | Csak egy link a láblécben; adat csak akkor jut a LinkedInhez, ha a látogató rákattint |
| Hozzájárulás tárolása | `nhc-consent` a böngésző helyi tárolójában (localStorage), 12 hónap, nem kerül a szerverre |

## 3. Az ajánlatkérő űrlap adatainak útja

**Formspree Free (Formspree, Inc., USA):** a látogató böngészője közvetlenül a Formspree-nek küldi az űrlapot; a Formspree e-mailben továbbítja az `info@nhcargo.hu` címre, és a beküldést **30 napig** tárolja (az ingyenes csomag archívuma), utána törli. Havonta legfeljebb 50 beküldés.

- Az üzenetek a Formspree felületén megtekinthetők és törölhetők (formspree.io → az űrlap → Submissions).
- Adattovábbítás az EGT-n kívülre (USA): a jogalapot (DPF vagy SCC) a tájékoztatóban fel kell tüntetni – jogi ellenőrzés.
- Az e-mailben érkezett példányok megőrzési idejéről a cég dönt; a tájékoztatóban kitöltendő.

## 4. Sütik és hasonló technológiák (Süti tájékoztatóhoz)

| Név | Típus | Kategória | Cél | Lejárat |
| --- | --- | --- | --- | --- |
| `nhc-consent` | localStorage | Szükséges | A süti-döntés megjegyzése | 12 hónap |
| Google sütik (pl. `NID`) | süti (google.com) | Külső tartalmak | Google Térkép működése | a Google szerint |
| `decap-cms-user` | localStorage (csak az `/admin/` oldalon) | Szükséges | A szerkesztő GitHub-belépési tokenje; látogatóknál nem jön létre | kijelentkezésig |
| `nhc_oauth_state` | süti (HttpOnly, Secure) a belépési szolgáltatás domainjén | Szükséges | CSRF-védelem a GitHub-belépésnél; csak a szerkesztőnél | 10 perc |
