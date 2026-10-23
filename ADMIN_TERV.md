# Admin felület – terv (előfizetés nélkül: Decap CMS + GitHub + Render Free)

> Állapot: **jóváhagyva (2026-10-23), megvalósítva** az `admin-decap` ágon. Használat: `ADMIN_UTMUTATO.md`, élesítés: `DEPLOY.md`.
> Feltétel: ne legyen fizetős előfizetés. Csak ingyenes csomagok: GitHub, Render (Static Site + Free web service), Formspree Free.
> Ellenőrizve: 2026-10-23 (Decap CMS 3.17.1, render.com/docs, formspree.io/plans).

## 1. Felépítés

```
  látogató ─────▶ www.nhcargo.hu            Render Static Site (ingyenes) – mint most
                        ▲
                        │ automatikus újraépítés minden mentés után
  szerkesztő ───▶ www.nhcargo.hu/admin/     Decap CMS (statikus oldal, ingyenes)
                        │  mentés = commit a GitHub-repóba
                        ▼
                  GitHub-repó  ◀── belépés GitHub-fiókkal (OAuth)
                        │
                        └─ piszkozat = pull request → Render előnézeti címe (ingyenes)

  űrlap ────────▶ Formspree Free → e-mail az info@nhcargo.hu címre
```

- **Nincs adatbázis és nincs fizetős szerver.** A tartalom JSON-fájlokban van a GitHub-repóban; minden mentés egy commit, amiből a Render 1–2 perc alatt újraépíti az oldalt.
- **A nyilvános oldal ugyanolyan statikus, gyors és biztonságos marad**, mint most.
- A GitHub-belépéshez kell egy kis **„OAuth-közvetítő”** (kb. 50 soros Node-szolgáltatás) – ez a Render **Free web service**-én fut. Ingyenes, de 15 perc tétlenség után elalszik, ezért a belépés néha kb. 1 percig tart. A nyilvános oldalt ez nem érinti.

## 2. Mit lehet szerkeszteni

Magyar felület (a Decap beépített magyar fordítása), magyar és angol tartalom:

| Admin menüpont | Tartalom |
| --- | --- |
| **Oldalak** – Főoldal, Szolgáltatások, Rólunk, Fenntarthatóság, Kapcsolat | szövegek, képek, szakaszok + **SEO**: title (max. 60 kar.), meta description (max. 155 kar.), OG-kép – a korlátot a szerkesztő azonnal jelzi |
| **Szolgáltatások** (3 db) | név, leírás, szöveg, képek, SEO-mezők |
| **Cégadatok és lábléc** | telefon, e-mail, címek, cégjegyzékszám, adószám, LinkedIn, lábléc-szövegek |
| **Képek** | feltöltés: JPG/PNG/WebP, méretkorláttal; feltöltéskor **automatikus átméretezés (max. 2400 px) és WebP-tömörítés** (Decap `media_processing`), a buildnél további reszponzív méretek |

- **Előnézet mentés előtt**: a Decap „szerkesztői munkafolyamat” módjában a piszkozat egy pull request lesz; a Render ehhez **saját előnézeti címet** épít (ingyenes, mert az alapszolgáltatás ingyenes). Közzététel = „Publish” gomb.
- **Visszaállítás**: minden mentés megmarad a git-történetben. A visszaállítás a GitHubon történik (commit → „Revert”), vagy szólsz, és én megcsinálom – **az adminban nincs egygombos visszaállítás**.
- **Napló**: a git-történet pontosan mutatja, ki, mit és mikor módosított (GitHub → Commits).
- **Hibás bevitel nem töri el az oldalt**: a build ellenőrzi a tartalmat (kötelező mezők, karakterkorlátok); ha valami hibás, a build megáll, és a régi verzió marad kint.
- A mostani szövegeket egy átalakítás során áthelyezem a TS-fájlokból JSON-fájlokba, semmit nem kell újra begépelni.
- **Nem szerkeszthető** (kódban marad): menüpontok, űrlapfeliratok, süti-ablak, jogi oldalak (jogi ellenőrzés után áttehetők).

## 3. Űrlap és beérkezett üzenetek – Formspree Free

- A már beépített Formspree marad (ingyenes csomag): **havi 50 beküldés**, e-mail-értesítés az `info@nhcargo.hu` címre.
- **Üzenetek megtekintése és törlése**: a Formspree felületén (nem a Decap adminban).
- **Automatikus törlés**: a Formspree az ingyenes csomagban **30 napig** őrzi meg az üzeneteket, utána törli. Az e-mailben érkezett példányok megőrzéséről a cég dönt (a tájékoztatóba be kell írni).
- **Spamvédelem**: Formspree „Formshield” szűrő + a mi honeypot mezőnk és kitöltési idő ellenőrzése.
- Ha egy hónapban 50-nél több beküldés jönne, a többi nem érkezik meg – ilyenkor kellene fizetős csomag. Egy fuvarozó cég ajánlatkérőjénél ez valószínűleg bőven elég; a Formspree felülete mutatja a havi számot.

## 4. Biztonság – mit ad a GitHub, és mi az eltérés a feladatleírástól

| Követelmény | Megoldás |
| --- | --- |
| Erős jelszó, hash, zárolás | a GitHub-fiók belépése (a GitHub kezeli a jelszót, a hash-t és a sikertelen próbálkozások korlátozását) |
| Kétlépcsős azonosítás (TOTP) | a GitHub-fiók kétlépcsős azonosítása – **kötelezően bekapcsolandó** |
| Első admin | nincs alapértelmezett fiók és jelszó: a repó tulajdonosa (`gergokun-create`) szerkeszt; további szerkesztőt **munkatársként (collaborator)** lehet felvenni |
| Napló | git-történet (ki, mit, mikor) |
| Admin noindex | a `/admin/` `noindex`, a `robots.txt` már tiltja, a sitemapben nem szerepel |
| Biztonsági fejlécek | a nyilvános oldal fejlécei maradnak; a `/admin/` saját, a Decap működéséhez szükséges CSP-t kap |
| Mentés | a GitHub-repó a teljes tartalom (szövegek + képek) mentése, minden korábbi verzióval; ajánlott havonta egy ZIP-letöltés |

**Eltérések, amiket ingyenesen nem lehet megoldani:**
- A Decap a belépési tokent a **böngésző helyi tárolójában** tartja, nem HttpOnly sütiben, és **nincs automatikus kijelentkezés** inaktivitás után. A szerkesztő a tulajdonos saját fiókja (`gergokun-create`), ezért a kockázatot így csökkentjük:
  - a token csak **`public_repo`** jogosultságot kap (a repó nyilvános), így a privát repókhoz nem fér hozzá;
  - a fiókon legyen bekapcsolva a kétlépcsős azonosítás (GitHub → Settings → Password and authentication);
  - közös vagy idegen gépen használat után kijelentkezés;
  - a kiadott hozzáférés bármikor visszavonható: GitHub → Settings → Applications → Authorized OAuth Apps.
- **Szerveroldali validáció, rate limiting** az űrlapnál: a Formspree saját szűrése végzi; Cloudflare Turnstile az ingyenes Formspree-vel nem használható.
- **Üzenetek kezelése** a Formspree felületén, nem az adminban.
- **Egygombos visszaállítás** nincs (a GitHubon lehet).

## 5. Költség

| Tétel | Csomag | Havi díj |
| --- | --- | --- |
| Nyilvános oldal + admin (`/admin/`) | Render Static Site | 0 |
| Piszkozat-előnézetek | Render PR preview (ingyenes alapszolgáltatásnál ingyenes) | 0 |
| Belépési közvetítő | Render Free web service | 0 |
| Tartalom, mentés, napló | GitHub Free | 0 |
| Űrlap | Formspree Free (havi 50 beküldés) | 0 |
| Render munkaterület | Hobby (5 GB forgalom/hó benne) | 0 |
| **Összesen** | | **0 Ft / hó** |

Egyetlen lehetséges költség: ha a havi forgalom 5 GB fölé menne (egy ilyen méretű céges oldalnál nem valószínű), a Render 0,15 USD/GB-ot számláz.

## 6. Ütemezés (fázisonként külön commit)

1. A tartalom áthelyezése JSON-fájlokba (Astro content collections, sémaellenőrzéssel) – az oldal kinézete nem változik.
2. Decap CMS a `/admin/` alatt: magyar felület, gyűjtemények és mezők, SEO-mezők karakterkorláttal, képfeltöltés átméretezéssel.
3. OAuth-közvetítő (Render Free) + GitHub OAuth App + szerkesztői munkafolyamat és Render PR-előnézet.
4. `render.yaml` (admin CSP, közvetítő szolgáltatás), `ADMIN_UTMUTATO.md`, `DEPLOY.md`, adatkezelési tájékoztató frissítése (Formspree 30 nap), tesztek, ellenőrzés.

## 7. Amit kérek

1. **Jóváhagyás**: rendben van ez a megoldás a fenti eltérésekkel?
2. ~~Szerkesztő fiókja~~ – eldöntve: a tulajdonos saját GitHub-fiókja (`gergokun-create`) szerkeszt.
3. **Git**: ezt a munkát külön `admin-decap` ágon csinálnám, és csak a végén vinném a `main`-re, hogy a holnapi élesítést ne érintse.

**A holnapi élesítéshez:** az oldal a mostani formájában mehet ki a Renderre; az admin utána, egy frissítéssel kerül fel. A Formspree-végpontot élesítéskor be kell állítani (ingyenes regisztráció, README 5. pont).
