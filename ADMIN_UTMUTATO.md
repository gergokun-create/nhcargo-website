# Admin útmutató – NH Cargo weboldal

Az admin felületen a weboldal szövegei, képei, SEO-adatai és a cégadatok szerkeszthetők, programozás nélkül.

- **Cím:** <https://www.nhcargo.hu/admin/>
- **Belépés:** GitHub-fiókkal (`gergokun-create`)
- **Mentés:** minden mentés a GitHub-repóba kerül, a weboldal 1–2 perc alatt frissül.

---

## 1. Belépés

1. Nyissa meg a <https://www.nhcargo.hu/admin/> címet, és kattintson a **Belépés GitHub-fiókkal** gombra.
2. Egy kis ablak nyílik. Ha nincs bejelentkezve a GitHubra, itt kell megadnia a jelszavát és a kétlépcsős kódot.
3. **Első belépéskor** a GitHub engedélyt kér („Authorize …”): fogadja el. Az engedély csak **nyilvános repók** írására szól; a privát repóihoz nem fér hozzá.
4. Az ablak bezárul, és megjelenik az admin.

> **Lassú első belépés?** A belépést segítő szolgáltatás ingyenes csomagban fut, és 15 perc tétlenség után elalszik. Ilyenkor a felugró ablak kb. 1 percig tölt – ez normális. A nyilvános weboldalt ez nem érinti.

**Kijelentkezés:** jobb felül a profilképre kattintva → *Kijelentkezés*. Közös vagy idegen gépen használat után mindig jelentkezzen ki.

---

## 2. Mit hol talál?

| Menü | Tartalom |
| --- | --- |
| **Oldalak** | Főoldal, Szolgáltatások (és a 3 szolgáltatás-aloldal), Rólunk, Fenntarthatóság, Kapcsolat, Közös elemek (ajánlatkérés sáv, lábléc-leírás) |
| **SEO és képek → SEO** | oldalanként a title (max. 60 karakter), a meta description (max. 155 karakter) és a megosztási kép (OG-kép) |
| **SEO és képek → Képek** | melyik fotó hol jelenik meg, és mi a képek alternatív szövege; a Rólunk oldal saját fotói |
| **Cégadatok** | telefonszám, e-mail, iroda és székhely címe, cégjegyzékszám, adószám, adatkezelési kapcsolattartó, LinkedIn |

**Nem szerkeszthető az adminban** (szólni kell a fejlesztőnek): a menüpontok, az űrlap feliratai, a süti-ablak szövegei és a jogi oldalak (Impresszum, Adatkezelési és Süti tájékoztató).

---

## 3. Szöveg szerkesztése

1. Válassza ki a menüt (pl. **Oldalak**), majd az oldalt (pl. **Főoldal**).
2. A képernyő **bal oldalán a magyar**, **jobb oldalán az angol** változat látható. Mindkettőt külön kell szerkeszteni.
   - A **„Kitöltés másik nyelvből”** gomb átmásolja a másik nyelv tartalmát (felülírja a meglévőt!).
3. A szürke sávokra kattintva nyílnak ki a csoportok (pl. *Nyitórész*, *Rólunk rész*).
4. Listáknál (pl. *Számok*, *Pontok*) az **Új …** gombbal új elem vehető fel, a ⋮⋮ fogóval átrendezhetők, az ✕-szel törölhetők.

**Karakterkorlát:** ha a title 60, a description 155 karakternél hosszabb, a mező piros lesz, és a mentés nem engedi. Mentés előtt rövidítse le.

---

## 4. Mentés, előnézet, közzététel

Az admin **munkafolyamattal** dolgozik: a módosítás először piszkozat, és csak a közzététel után kerül ki a weboldalra.

1. **Mentés** (felül) → a módosítás piszkozatként elmentődik (a weboldalon még nem látszik).
2. **Előnézet:** a mentés után a Render 2–3 perc alatt felépít egy **előnézeti oldalt** a piszkozatból:
   - ha az admin felül **„Előnézet megtekintése”** gombot mutat, azzal nyitható meg;
   - egyébként: GitHub → `nhcargo-website` repó → **Pull requests** → a piszkozat (`cms/…`) → a Render által küldött link, vagy Render → `nhcargo-website` → **Previews**.
   - Az előnézet nem kerül be a keresőkbe.
3. **Állapot** → *Felülvizsgálat alatt* / *Kész* – nem kötelező, csak jelzés saját magának.
4. **Publikáció → Publikálás most** → a módosítás kikerül; a weboldal **1–2 perc** múlva frissül.

A **Munkafolyamat** menüben (felül) látható az összes közzé nem tett piszkozat.

> **Ha a módosítás nem jelenik meg:** a tartalmat a weboldal építése ellenőrzi (kötelező mezők, karakterkorlátok, létező kép). Ha valami hibás, az új verzió nem kerül ki, és **a régi marad online** – az oldal nem romlik el. A hiba oka a Render felületén (`nhcargo-website` → *Events*) olvasható; javítsa az adminban, és mentse újra.

---

## 5. Képek

### Kép cseréje

1. **SEO és képek → Képek** → nyissa ki a kívánt helyet (pl. *Főoldal – nyitókép*).
2. **Kép** mező → *Válasszon képet* (vagy *Válasszon másik képet*) → **Új feltöltés** → válassza ki a fájlt a gépéről → **Kijelöl**.
3. Írja be az **alternatív szöveget** mindkét nyelven: egy mondatban, mit ábrázol a kép (pl. „Narancssárga kamion halad egy autópályán”). Ez a vakon/gyengénlátóknak és a Google-nak fontos.
4. Mentés → közzététel (4. pont).

### Mire figyeljen

- **Formátum:** JPG, PNG vagy WebP. **Méret:** legfeljebb 10 MB.
- Feltöltéskor az admin a képet **WebP formátumra tömöríti**, és **eltávolítja a metaadatokat** (pl. GPS-koordináta). A különböző kijelzőkhöz szükséges kisebb méreteket a weboldal építése készíti el.
- **Javasolt méret:** legalább 1600 px széles (nyitóképnél 1920 px); a Rólunk oldal mezőinél a javasolt méret a mező nevében szerepel.
- A **Rólunk oldal saját fotói** (Csapat / iroda, Hűtős szerelvények, Fejléc, Raktár): ha a mező üres, az éles oldalon egy meglévő fotó áll a helyén; az **előnézeten** „Kép helye” jelölés mutatja, hogy itt még saját fotó hiányzik.
- **Megosztási kép (OG-kép):** a SEO menüben oldalanként megadható; 1200 × 630-ra vágva jelenik meg a Facebookon, LinkedInen. Üresen az oldal saját nyitóképe lesz.
- Csak olyan képet töltsön fel, amelynek felhasználási joga a cégé (saját fotó vagy szabad licencű kép).

### Kép törlése a médiatárból

Felül **Média** → jelölje ki a képet → *Kijelöltek törlése*. Csak olyan képet töröljön, amelyet már egyik mező sem használ – különben a weboldal következő építése hibát jelez (és a régi verzió marad kint).

---

## 6. Korábbi verzió visszaállítása

Minden mentés megmarad a GitHubon (ez egyben a napló is: ki, mit, mikor módosított).

1. GitHub → `gergokun-create/nhcargo-website` → **Commits** (vagy egy fájl → *History*), pl. `src/cms/content/home.json`.
2. Keresse meg a hibás módosítást (az admin mentései „Admin: …” kezdetűek), és nyissa meg.
3. A visszaállítás legegyszerűbb módja: az adminban írja vissza a régi szöveget a commitban látható piros sorok alapján, és mentse.
   - Teljes módosítás visszavonása: a commit oldalán nincs gomb; a fejlesztő egy paranccsal (`git revert`) visszavonja – vagy a Renderen *Rollback* az előző kint lévő verzióra (Render → `nhcargo-website` → *Events* → korábbi deploy → **Rollback**). A Rollback csak a weboldalt állítja vissza, az admin tartalmát nem: utána a tartalmat is javítani kell.

---

## 7. Jelszó, kétlépcsős azonosítás, hozzáférés

Az admin a **GitHub-fiókot** használja, külön admin-jelszó nincs.

- **Jelszócsere:** GitHub → jobb felül profilkép → **Settings → Password and authentication → Change password**.
- **Kétlépcsős azonosítás:** ugyanitt (*Two-factor authentication*) – legyen bekapcsolva.
- **Hozzáférés visszavonása** (pl. elveszett laptop): GitHub → **Settings → Applications → Authorized OAuth Apps** → az NH Cargo admin → *Revoke*. Utána minden gépen újra be kell lépni.
- **Új szerkesztő:** GitHub → repó → **Settings → Collaborators → Add people** (a szerkesztőnek saját GitHub-fiók kell, kétlépcsős azonosítással).

---

## 8. Beérkezett ajánlatkérések

Az ajánlatkérő űrlap üzenetei **e-mailben** érkeznek az `info@nhcargo.hu` címre (Formspree).

- Megtekintés, törlés: <https://formspree.io> → belépés → az űrlap → **Submissions**.
- A Formspree az üzeneteket **30 nap** után automatikusan törli.
- Az ingyenes csomag **havonta 50 üzenetet** fogad; a Formspree felülete mutatja, hányat használt el.
