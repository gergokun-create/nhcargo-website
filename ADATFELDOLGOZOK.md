# Adatfeldolgozók és külső szolgáltatások – NH Cargo weboldal

> Belső segédlet az **Adatkezelési tájékoztató** és a **Süti tájékoztató** kitöltéséhez
> (`src/i18n/legal.ts`). Nem jelenik meg a weboldalon. Jogi ellenőrzés szükséges.
>
> Állapot: a weboldal jelenleg statikus (Astro), nincs analitika, nincs marketing süti.
> A ✱-gal jelölt sorok az admin felület / űrlap-háttér döntésétől függnek.

## 1. Személyes adatot kezelő szolgáltatások

| Szolgáltatás | Mire használjuk | Milyen adat | Hol (ország) | Mikor | Teendő |
| --- | --- | --- | --- | --- | --- |
| **Render** (Render Services, Inc.) | Tárhely – éles weboldal (www.nhcargo.hu) | Látogatók IP-címe és kérésadatai a szervernaplókban | USA (régió választható, pl. Frankfurt) ✱ | minden látogatás | Régió kiválasztása (EU ajánlott); adatfeldolgozói szerződés (DPA) elfogadása; naplómegőrzési idő ellenőrzése |
| **GitHub Pages** (GitHub, Inc.) | Tárhely – jelenlegi előnézet | Látogatók IP-címe (naplók) | USA | csak az előnézet élettartama alatt | Élesítés után az előnézet kikapcsolható |
| **Űrlapkezelés** ✱ | Ajánlatkérő űrlap | Név, e-mail, telefon, cégnév, szállítási adatok, üzenet | a választott megoldástól függ | beküldéskor | Lásd 3. pont |
| **E-mail-szolgáltató** (az `info@nhcargo.hu` és `p.horvath@nhcargo.hu` fiókok szolgáltatója) | Beérkező megkeresések | Az üzenet teljes tartalma | [[kitöltendő]] | beküldéskor / e-mailben | Szolgáltató neve, székhelye, DPA |
| **Google Maps** (Google Ireland Ltd. / Google LLC) | Térkép a Kapcsolat oldalon | IP-cím, böngészőadatok, Google sütik | EU/USA | **csak hozzájárulás vagy kattintás után** | Nincs teendő (hozzájáruláshoz kötve) |

## 2. Nem kezel személyes adatot (tájékoztatásul)

| Elem | Megjegyzés |
| --- | --- |
| Betűtípusok (Manrope, Inter) | Saját szerverről töltődnek (Fontsource csomag) – **nincs** Google Fonts kérés |
| Stockfotók (Unsplash, Pexels) | A képek a saját tárhelyen vannak, látogatáskor nincs külső kérés |
| LinkedIn | Csak egy link a láblécben; adat csak akkor jut a LinkedInhez, ha a látogató rákattint |
| Hozzájárulás tárolása | `nhc-consent` a böngésző helyi tárolójában (localStorage), 12 hónap, nem kerül a szerverre |

## 3. Az ajánlatkérő űrlap adatainak útja ✱

A végleges megoldás a 5. fázis (admin felület) döntésétől függ:

- **A) Saját háttérrendszer Renderen (javasolt):** az üzenet a saját adatbázisba kerül (EU-régió), értesítő e-mail megy az `info@nhcargo.hu` címre; megőrzés pl. **12 hónap**, utána automatikus törlés.
- **B) Formspree (Formspree, Inc., USA):** az üzenetet a Formspree tárolja és továbbítja e-mailben; adattovábbítás az EGT-n kívülre (DPF/SCC) – a tájékoztatóban fel kell tüntetni; a törlést a Formspree felületén kell kezelni.

## 4. Sütik és hasonló technológiák (Süti tájékoztatóhoz)

| Név | Típus | Kategória | Cél | Lejárat |
| --- | --- | --- | --- | --- |
| `nhc-consent` | localStorage | Szükséges | A süti-döntés megjegyzése | 12 hónap |
| Google sütik (pl. `NID`) | süti (google.com) | Külső tartalmak | Google Térkép működése | a Google szerint |
| ✱ admin munkamenet-süti | süti (HttpOnly, Secure) | Szükséges | Csak az admin felületen, bejelentkezéskor | munkamenet |
