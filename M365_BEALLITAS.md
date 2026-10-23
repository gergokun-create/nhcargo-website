# Microsoft 365 beállítás – ajánlatkérő űrlap → info@nhcargo.hu

Az ajánlatkérő űrlapot a weboldal saját háttérszolgáltatása (`nhcargo-cms-auth`, Render) fogadja, és a **cég Microsoft 365-ével** küldi el e-mailben az `info@nhcargo.hu` címre (Microsoft Graph, `sendMail`). Ehhez a Microsoft 365-ben egy **alkalmazást** kell regisztrálni, amely **kizárólag az `info@nhcargo.hu` nevében küldhet levelet** – más postafiókhoz nem fér hozzá, leveleket olvasni nem tud.

Időigény: kb. 15–20 perc. A beállítás után a jogosultság **30 perc – 2 óra** alatt lép életbe.

---

## Ami kell hozzá

- Microsoft 365 **globális rendszergazda** (vagy: *Alkalmazás-rendszergazda* az Entra-ban + *Exchange-rendszergazda* / *Organization Management*)
- Az `info@nhcargo.hu` postafiók létezik (felhasználói vagy megosztott postafiók – mindkettő jó)
- Windows PowerShell az Exchange Online modullal (C. lépés)

A lépések során **négy értéket** kell kimásolni (pl. egy jegyzetbe, amelyet a végén töröl):

| Érték | Hol lesz rá szükség |
| --- | --- |
| Alkalmazás (ügyfél-) azonosító – *Application (client) ID* | Render: `MS_CLIENT_ID`, PowerShell |
| Címtár (bérlő-) azonosító – *Directory (tenant) ID* | Render: `MS_TENANT_ID` |
| Titkos ügyfélkód **értéke** – *Client secret Value* | Render: `MS_CLIENT_SECRET` (**titkos!**) |
| Vállalati alkalmazás objektumazonosítója – *Enterprise application Object ID* | PowerShell |

---

## A) Alkalmazás regisztrálása (Microsoft Entra)

1. Nyissa meg: <https://entra.microsoft.com> → bal oldalt **Alkalmazások → Alkalmazásregisztrációk** (*Applications → App registrations*) → **Új regisztráció** (*New registration*).
2. Adatok:
   - **Név:** `NH Cargo weboldal – ajánlatkérés`
   - **Támogatott fióktípusok:** *Csak ebben a szervezeti címtárban* (*Accounts in this organizational directory only – Single tenant*)
   - **Átirányítási URI:** üresen hagyandó
   - → **Regisztrálás** (*Register*)
3. Az alkalmazás **Áttekintés** (*Overview*) oldaláról másolja ki:
   - **Alkalmazás (ügyfél-) azonosító** (*Application (client) ID*)
   - **Címtár (bérlő-) azonosító** (*Directory (tenant) ID*)
4. **Tanúsítványok és titkos kódok** (*Certificates & secrets*) → **Titkos ügyfélkódok** (*Client secrets*) → **Új titkos ügyfélkód** (*New client secret*):
   - Leírás: `Render`, Lejárat: **24 hónap** → **Hozzáadás**
   - Másolja ki az **Érték** (*Value*) oszlopot – **nem** a „Titkos kód azonosítója” (*Secret ID*) oszlopot. Az érték **csak most** látható; ha elnavigál, újat kell készíteni.
   - **Írja be a naptárba a lejárat dátumát** (lásd F. pont).
5. **API-engedélyek** (*API permissions*): itt **NE adjon** *Microsoft Graph → Mail.Send* alkalmazásengedélyt. Az a cég **összes** postafiókjára szólna. A küldési jogot a C. lépés adja meg, csak az `info@nhcargo.hu`-ra. (Az alapból ott lévő *User.Read – delegált* engedély maradhat vagy törölhető.)

## B) A vállalati alkalmazás objektumazonosítója

1. Entra → **Alkalmazások → Vállalati alkalmazások** (*Enterprise applications*) → keresse meg: `NH Cargo weboldal – ajánlatkérés`.
2. Az **Áttekintés** oldalon másolja ki az **Objektumazonosítót** (*Object ID*).

> Fontos: ez **más** szám, mint az Alkalmazásregisztrációk oldalán látható objektumazonosító. Az Exchange-hez a **Vállalati alkalmazások** oldaliét kell használni.

## C) Küldési jog csak az info@nhcargo.hu postafiókra (Exchange Online)

A Microsoft által ajánlott módszer: *RBAC for Applications* (ez váltja az *Application Access Policy*-t). Nyisson egy **PowerShell** ablakot, és futtassa sorban (a `<…>` részeket cserélje ki a kimásolt értékekre):

```powershell
# Egyszer kell telepíteni (ha még nincs meg)
Install-Module ExchangeOnlineManagement -Scope CurrentUser

# Bejelentkezés rendszergazdaként
Connect-ExchangeOnline -UserPrincipalName <rendszergazda@nhcargo.hu>

# 1. Az Entra-alkalmazás felvétele az Exchange-be
New-ServicePrincipal -AppId <Alkalmazás (ügyfél-) azonosító> -ObjectId <Vállalati alkalmazás objektumazonosítója> -DisplayName "NH Cargo weboldal"

# 2. Hatókör: csak az info@nhcargo.hu postafiók
New-ManagementScope -Name "NHC weboldal - info postafiok" -RecipientRestrictionFilter "PrimarySmtpAddress -eq 'info@nhcargo.hu'"

# 3. Küldési jog (Mail.Send) csak erre a hatókörre
New-ManagementRoleAssignment -App <Alkalmazás (ügyfél-) azonosító> -Role "Application Mail.Send" -CustomResourceScope "NHC weboldal - info postafiok"

# 4. Ellenőrzés – az InScope oszlopban True kell legyen
Test-ServicePrincipalAuthorization -Identity <Alkalmazás (ügyfél-) azonosító> -Resource info@nhcargo.hu

# 5. Ellenőrzés egy másik postafiókkal – itt InScope = False kell legyen
Test-ServicePrincipalAuthorization -Identity <Alkalmazás (ügyfél-) azonosító> -Resource p.horvath@nhcargo.hu

Disconnect-ExchangeOnline
```

A jogosultság a Microsoft gyorsítótára miatt **30 perc – 2 óra** múlva lép életbe (a teszt-parancs ezt nem várja meg, azonnal mutatja az eredményt).

## D) Beállítás a Renderen

Render → **nhcargo-cms-auth** szolgáltatás → **Environment**:

| Változó | Érték |
| --- | --- |
| `MS_TENANT_ID` | Címtár (bérlő-) azonosító |
| `MS_CLIENT_ID` | Alkalmazás (ügyfél-) azonosító |
| `MS_CLIENT_SECRET` | a titkos ügyfélkód **értéke** |
| `MAIL_SENDER` | `info@nhcargo.hu` (a `render.yaml` beállítja) |
| `MAIL_TO` | `info@nhcargo.hu` (a `render.yaml` beállítja; több cím vesszővel elválasztva) |

→ **Save, rebuild and deploy**. A szolgáltatás naplójában (*Logs*) ekkor ez a sor jelenik meg: `… contact form: on`.

A kimásolt értékeket tartalmazó jegyzetet ezután törölje – a titkos kód csak a Renderen legyen.

## E) Próba

1. Nyissa meg a <https://www.nhcargo.hu/kapcsolat/> oldalt, töltse ki az ajánlatkérő űrlapot saját adataival, és küldje el.
2. Az `info@nhcargo.hu` postafiókba néhány másodpercen belül megérkezik: **„Ajánlatkérés – Vezetéknév Keresztnév (Cégnév)”** tárggyal, a feladó az `info@nhcargo.hu`. A **Válasz** gomb a kitöltő e-mail-címére válaszol.
3. Ha a szolgáltatás alszik (15 perc tétlenség után), az első küldés kb. fél–egy percig tarthat – az oldal addig „Küldés…” állapotot mutat. Az oldal ezt úgy csökkenti, hogy a háttérszolgáltatást már az űrlap kitöltésének kezdetekor felébreszti.

**Ha hibaüzenet jelenik meg**, a Render → `nhcargo-cms-auth` → *Logs* mutatja az okát (a beküldött adatokat a napló nem tartalmazza):

| Napló | Ok | Teendő |
| --- | --- | --- |
| `contact form: off` | hiányzó környezeti változó | D. pont |
| `token request failed: 400/401 invalid_client` | hibás vagy lejárt titkos kód, rossz azonosító | A/3–4, D |
| `sendMail failed: 403 ErrorAccessDenied` | a C. lépés jogosultsága még nem él (max. 2 óra), vagy rossz a hatókör | várjon, ill. C/4 |
| `sendMail failed: 404 …` | a `MAIL_SENDER` postafiók nem létezik | D. pont |

## F) Karbantartás

- **A titkos kód lejár** (24 hónap). Előtte: Entra → az alkalmazás → *Tanúsítványok és titkos kódok* → új titkos kód → az értéket írja be a Renderen az `MS_CLIENT_SECRET`-be → mentés → a régi kód törlése.
- **Másik címzett** (pl. több kolléga): Render → `MAIL_TO` → vesszővel elválasztott címek. A **feladó** (`MAIL_SENDER`) csak az `info@nhcargo.hu` lehet, mert a jogosultság csak arra szól.
- **Visszavonás:** Entra → Vállalati alkalmazások → az alkalmazás → *Tulajdonságok* → *Törlés* (vagy PowerShell: `Remove-ManagementRoleAssignment`). Ezután az űrlap nem tud levelet küldeni.

## Biztonság röviden

- Az alkalmazás **csak küldeni** tud, és **csak** az `info@nhcargo.hu` nevében; leveleket nem olvashat, más postafiókhoz nem fér hozzá.
- A titkos kód csak a Render környezeti változói között van, a repóban nincs.
- A háttérszolgáltatás az üzenetet **nem tárolja**, a naplóba nem írja; az üzenet csak a postafiókban lesz meg.
- Az űrlapot csak a `www.nhcargo.hu` oldalról fogadja; szerveroldali ellenőrzés, beküldésszám-korlát (IP-címenként 10 percenként 5), spamszűrés (rejtett mező, kitöltési idő).

Forrás: Microsoft – *Role Based Access Control for Applications in Exchange Online* (learn.microsoft.com/exchange/permissions-exo/application-rbac).
