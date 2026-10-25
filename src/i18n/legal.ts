/**
 * JOGI OLDALAK SZÖVEGEI – Impresszum, Adatkezelési tájékoztató, Süti tájékoztató (HU + EN).
 *
 * ⚠ JOGI ELLENŐRZÉS SZÜKSÉGES – ezek SABLONOK, nem végleges jogi szövegek.
 * Az oldalakon automatikusan megjelenik a „JOGI ELLENŐRZÉS SZÜKSÉGES” figyelmeztetés.
 * A végleges szöveget jogi szakértővel kell jóváhagyatni; utána a figyelmeztetés a
 * LegalContent komponensben (`legalReviewed`) kikapcsolható.
 *
 * Formázás a szövegekben:
 *   [[ ... ]]        → sárgán kiemelt, KITÖLTENDŐ / ELLENŐRIZENDŐ rész
 *   **szöveg**       → félkövér
 *   [szöveg](url)    → hivatkozás
 *
 * A kitöltéshez szükséges adatfeldolgozó-lista: ADATFELDOLGOZOK.md (a repó gyökerében).
 */
import { site, formatAddress } from '../data/site';
import { localePath, type Lang } from './config';

export type LegalBlock = string | { list: string[] } | { table: [string, string][] };
export type LegalSection = { title: string; blocks: LegalBlock[] };
export type LegalPage = { title: string; updated: string; sections: LegalSection[] };
export type LegalKey = 'imprint' | 'privacy' | 'cookies';

/** Wraps "TODO: ..." values from site.ts into a highlighted placeholder. */
const v = (value: string) => (value.startsWith('TODO') ? `[[${value.replace(/^TODO:\s*/, '')}]]` : value);

const seat = formatAddress(site.seat);
const office = formatAddress(site.office);
const r = site.registration;
const dpo = site.dataProtectionContact;
const mail = (m: string) => `[${m}](mailto:${m})`;

/* ------------------------------------------------------------------ */
/* IMPRESSZUM                                                          */
/* ------------------------------------------------------------------ */

const imprintHu: LegalPage = {
  title: 'Impresszum',
  updated: 'Hatályos: 2026. október 26-tól',
  sections: [
    {
      title: 'A szolgáltató adatai',
      blocks: [
        'Az elektronikus kereskedelmi szolgáltatások, valamint az információs társadalommal összefüggő szolgáltatások egyes kérdéseiről szóló 2001. évi CVIII. törvény (Ektv.) 4. §-a alapján:',
        {
          table: [
            ['Cégnév', site.name],
            ['Székhely', seat],
            ['Iroda / telephely', office],
            ['Cégjegyzékszám', v(r.companyNumber)],
            ['Nyilvántartó bíróság', v(r.registryCourt)],
            ['Adószám', v(r.taxNumber)],
            ['Közösségi adószám', v(r.euVatNumber)],
            ['Képviseli', v(r.representative)],
            ['Telefon', site.phone.display],
            ['E-mail', mail(site.email)],
          ],
        },
      ],
    },
    {
      title: 'Tárhelyszolgáltató',
      blocks: [
        'Az Ektv. 4. § f) pontja alapján a tárhelyszolgáltató adatai:',
        {
          table: [
            ['Név', 'Render Services, Inc.'],
            ['Cím', '525 Brannan Street, Suite 300, San Francisco, CA 94107, USA'],
            ['E-mail', 'legal@render.com'],
          ],
        },
      ],
    },
    {
      title: 'Szerzői jogok',
      blocks: [
        'A weboldal tartalma – szövegei, logója és grafikai elemei – az NH Cargo Kft. szellemi tulajdonát képezik, azok előzetes írásos engedély nélkül nem használhatók fel.',
        'A weboldalon használt stockfotók forrása az Unsplash és a Pexels, felhasználásuk az [Unsplash licenc](https://unsplash.com/license), illetve a [Pexels licenc](https://www.pexels.com/license/) alapján történik.',
      ],
    },
    {
      title: 'Felelősségkizárás',
      blocks: [
        'A weboldalon közölt információk tájékoztató jellegűek, és nem minősülnek ajánlattételnek. Az egyedi szállítási feltételekről minden esetben személyre szabott ajánlatban tájékoztatjuk partnereinket.',
      ],
    },
  ],
};

const imprintEn: LegalPage = {
  title: 'Imprint',
  updated: 'Effective from 26 October 2026',
  sections: [
    {
      title: 'Service provider',
      blocks: [
        'In accordance with Section 4 of Hungarian Act CVIII of 2001 on electronic commerce services:',
        {
          table: [
            ['Company name', site.name],
            ['Registered seat', `${seat}, Hungary`],
            ['Office', `${office}, Hungary`],
            ['Company registration number', v(r.companyNumber)],
            ['Registry court', v(r.registryCourt)],
            ['Tax number', v(r.taxNumber)],
            ['EU VAT number', v(r.euVatNumber)],
            ['Represented by', v(r.representative)],
            ['Phone', site.phone.display],
            ['Email', mail(site.email)],
          ],
        },
      ],
    },
    {
      title: 'Hosting provider',
      blocks: [
        {
          table: [
            ['Name', 'Render Services, Inc.'],
            ['Address', '525 Brannan Street, Suite 300, San Francisco, CA 94107, USA'],
            ['Email', 'legal@render.com'],
          ],
        },
      ],
    },
    {
      title: 'Copyright',
      blocks: [
        'The content of this website – including texts, logo and graphic elements – is the intellectual property of NH Cargo Kft. and may not be used without prior written permission.',
        'Stock photos are sourced from Unsplash and Pexels and used under the [Unsplash License](https://unsplash.com/license) and the [Pexels License](https://www.pexels.com/license/).',
      ],
    },
    {
      title: 'Disclaimer',
      blocks: [
        'The information on this website is for general information purposes only and does not constitute an offer. Specific transport conditions are always set out in an individual quotation.',
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* ADATKEZELÉSI TÁJÉKOZTATÓ                                            */
/* ------------------------------------------------------------------ */

const privacyHu: LegalPage = {
  title: 'Adatkezelési tájékoztató',
  updated: 'Hatályos: 2026. október 26-tól',
  sections: [
    {
      title: '1. Az adatkezelő',
      blocks: [
        {
          table: [
            ['Név', site.name],
            ['Székhely', seat],
            ['Cégjegyzékszám', v(r.companyNumber)],
            ['Adószám', v(r.taxNumber)],
            ['E-mail', mail(site.email)],
            ['Telefon', site.phone.display],
            ['Adatkezelési kapcsolattartó', `${dpo.name}, ${mail(dpo.email)}`],
          ],
        },
        'Személyes adatait az Európai Parlament és a Tanács (EU) 2016/679 rendelete (GDPR), valamint az információs önrendelkezési jogról és az információszabadságról szóló 2011. évi CXII. törvény (Infotv.) szerint kezeljük. [[Adatvédelmi tisztviselő kijelölése szükséges-e – jogi ellenőrzés]]',
      ],
    },
    {
      title: '2. Ajánlatkérés és kapcsolatfelvétel',
      blocks: [
        'Az ajánlatkérő űrlap kitöltésekor, illetve e-mailben vagy telefonon történő megkereséskor az alábbi adatokat kezeljük:',
        {
          list: [
            'kötelező: vezeték- és keresztnév, e-mail-cím, üzenet',
            'nem kötelező: cégnév, telefonszám, felrakodási és lerakodási hely, áru típusa, hőmérsékleti igény, tervezett időpont',
          ],
        },
        '**Cél:** a megkeresés megválaszolása, árajánlat készítése, kapcsolattartás.',
        '**Jogalap:** a szerződés megkötését megelőzően az érintett kérésére történő lépések megtétele (GDPR 6. cikk (1) b) pont); jogi személy partner kapcsolattartója esetén az adatkezelő jogos érdeke (GDPR 6. cikk (1) f) pont). [[Jogalap és érdekmérlegelés – jogi ellenőrzés]]',
        '**Az adatok útja:** az űrlapon megadott adatokat a weboldal saját háttérszolgáltatása fogadja (a Render Services, Inc. szerverén, Frankfurtban, az EU-ban), ellenőrzi, és tárolás nélkül, e-mailben továbbítja az info@nhcargo.hu postafiókba a Microsoft 365 szolgáltatáson keresztül. A háttérszolgáltatás az üzenetet nem tárolja és nem naplózza. A visszaélések (tömeges beküldés) megelőzése érdekében a küldő IP-címét legfeljebb 10 percig, kizárólag a szerver memóriájában kezeljük.',
        '**Megőrzési idő:** az e-mailben érkezett megkeresést [[a beérkezéstől számított X hónapig – kitöltendő]] őrizzük meg; szerződés létrejötte esetén [[a számviteli jogszabályok szerint 8 évig – jogi ellenőrzés]].',
      ],
    },
    {
      title: '3. Adatfeldolgozók és címzettek',
      blocks: [
        'Az adatok kezeléséhez az alábbi adatfeldolgozókat vesszük igénybe (a teljes lista: [[ADATFELDOLGOZOK.md alapján véglegesítendő]]):',
        {
          list: [
            'Tárhelyszolgáltató: Render Services, Inc. (525 Brannan Street, Suite 300, San Francisco, CA 94107, USA)',
            'E-mail-szolgáltató (Microsoft 365): Microsoft Ireland Operations Limited (One Microsoft Place, South County Business Park, Leopardstown, Dublin 18, Írország)',
            'Az űrlap háttérszolgáltatásának üzemeltetése: Render Services, Inc. (lásd tárhelyszolgáltató; szerver: Frankfurt, EU)',
          ],
        },
        '**Harmadik országba történő továbbítás:** a Render Services, Inc. (USA) esetében az Európai Bizottság általános szerződési feltételei (SCC) alapján, a Render adatfeldolgozói megállapodása szerint; a Microsoft az EU–USA adatvédelmi keretrendszer (DPF) résztvevője. [[A teljes rész – jogi ellenőrzés]]',
      ],
    },
    {
      title: '4. Sütik és külső tartalmak',
      blocks: [
        `A weboldalon használt sütikről és hasonló technológiákról a [Süti tájékoztatóban](${localePath('cookies', 'hu')}) olvashat. Nem használunk analitikai vagy marketingcélú sütiket. A Google Térkép csak az Ön hozzájárulása vagy kifejezett kattintása után töltődik be.`,
      ],
    },
    {
      title: '5. Az Ön jogai',
      blocks: [
        {
          list: [
            'hozzáférés a személyes adatokhoz (GDPR 15. cikk)',
            'helyesbítés (16. cikk)',
            'törlés („elfeledtetéshez való jog”, 17. cikk)',
            'az adatkezelés korlátozása (18. cikk)',
            'adathordozhatóság (20. cikk)',
            'tiltakozás a jogos érdeken alapuló adatkezelés ellen (21. cikk)',
            'a hozzájárulás bármikori visszavonása, amely nem érinti a visszavonás előtti adatkezelés jogszerűségét',
          ],
        },
        `Kérelmét a ${mail(dpo.email)} vagy a ${mail(site.email)} címre küldheti; legkésőbb egy hónapon belül válaszolunk.`,
      ],
    },
    {
      title: '6. Jogorvoslat',
      blocks: [
        'Panaszt tehet a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH):',
        {
          table: [
            ['Cím', '1055 Budapest, Falk Miksa utca 9–11.'],
            ['Postacím', '1363 Budapest, Pf. 9.'],
            ['Weboldal', '[www.naih.hu](https://www.naih.hu)'],
          ],
        },
        'Jogai megsértése esetén bírósághoz is fordulhat; a pert – választása szerint – a lakóhelye vagy tartózkodási helye szerint illetékes törvényszék előtt is megindíthatja.',
      ],
    },
    {
      title: '7. Adatbiztonság',
      blocks: [
        'A weboldal kizárólag titkosított (HTTPS) kapcsolaton érhető el. Megfelelő technikai és szervezési intézkedésekkel védjük az adatokat az illetéktelen hozzáférés ellen. [[Konkrét intézkedések: hozzáférés-kezelés, mentések, naplózás – kiegészítendő]]',
      ],
    },
  ],
};

const privacyEn: LegalPage = {
  title: 'Privacy Policy',
  updated: 'Effective from 26 October 2026',
  sections: [
    {
      title: '1. Data controller',
      blocks: [
        {
          table: [
            ['Name', site.name],
            ['Registered seat', `${seat}, Hungary`],
            ['Company registration number', v(r.companyNumber)],
            ['Tax number', v(r.taxNumber)],
            ['Email', mail(site.email)],
            ['Phone', site.phone.display],
            ['Data protection contact', `${dpo.name}, ${mail(dpo.email)}`],
          ],
        },
        'We process personal data in accordance with Regulation (EU) 2016/679 (GDPR) and Hungarian Act CXII of 2011. [[Whether a data protection officer is required – legal review]]',
      ],
    },
    {
      title: '2. Quote requests and enquiries',
      blocks: [
        'When you use the quote request form or contact us by email or phone, we process:',
        {
          list: [
            'required: first and last name, email address, message',
            'optional: company name, phone number, pickup and delivery location, cargo type, temperature requirement, preferred date',
          ],
        },
        '**Purpose:** responding to your enquiry, preparing a quotation and keeping in contact.',
        '**Legal basis:** steps taken at your request prior to entering into a contract (Art. 6(1)(b) GDPR); for contact persons of business partners, our legitimate interest (Art. 6(1)(f) GDPR). [[Legal basis – legal review]]',
        '**How the data is handled:** the data you enter in the form is received by the website’s own backend service (on a Render Services, Inc. server in Frankfurt, EU), checked, and forwarded by email, without being stored, to the info@nhcargo.hu mailbox through Microsoft 365. The backend neither stores nor logs the message. To prevent abuse (mass submissions), the sender’s IP address is kept in the server’s memory only, for at most 10 minutes.',
        '**Retention period:** we keep enquiries received by email for [[X months from receipt – to be completed]]; if a contract is concluded, [[8 years under accounting law – legal review]].',
      ],
    },
    {
      title: '3. Processors and recipients',
      blocks: [
        {
          list: [
            'Hosting provider: Render Services, Inc. (525 Brannan Street, Suite 300, San Francisco, CA 94107, USA)',
            'Email provider (Microsoft 365): Microsoft Ireland Operations Limited (One Microsoft Place, South County Business Park, Leopardstown, Dublin 18, Ireland)',
            'Operation of the form backend: Render Services, Inc. (see hosting provider; server: Frankfurt, EU)',
          ],
        },
        '**Transfers outside the EEA:** for Render Services, Inc. (USA), on the basis of the European Commission’s Standard Contractual Clauses (SCC) under Render’s data processing addendum; Microsoft participates in the EU–US Data Privacy Framework (DPF). [[Whole section – legal review]]',
      ],
    },
    {
      title: '4. Cookies and external content',
      blocks: [
        `See our [Cookie Policy](${localePath('cookies', 'en')}). We do not use analytics or marketing cookies. Google Maps is only loaded after your consent or explicit click.`,
      ],
    },
    {
      title: '5. Your rights',
      blocks: [
        {
          list: [
            'access (Art. 15 GDPR), rectification (Art. 16), erasure (Art. 17)',
            'restriction of processing (Art. 18), data portability (Art. 20)',
            'objection to processing based on legitimate interest (Art. 21)',
            'withdrawal of consent at any time, without affecting earlier processing',
          ],
        },
        `Send your request to ${mail(dpo.email)} or ${mail(site.email)}; we respond within one month at the latest.`,
      ],
    },
    {
      title: '6. Remedies',
      blocks: [
        'You may lodge a complaint with the Hungarian National Authority for Data Protection and Freedom of Information (NAIH), 1055 Budapest, Falk Miksa utca 9–11., [www.naih.hu](https://www.naih.hu), or bring proceedings before the competent court.',
      ],
    },
    {
      title: '7. Data security',
      blocks: [
        'This website is only available over an encrypted (HTTPS) connection. We take appropriate technical and organisational measures to protect personal data. [[Specific measures to be added]]',
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* SÜTI TÁJÉKOZTATÓ                                                    */
/* ------------------------------------------------------------------ */

const cookiesHu: LegalPage = {
  title: 'Süti tájékoztató',
  updated: 'Hatályos: 2026. október 26-tól',
  sections: [
    {
      title: '1. Mik azok a sütik?',
      blocks: [
        'A sütik (cookie-k) és a hasonló technológiák (pl. a böngésző helyi tárolója) kis adatcsomagok, amelyeket a weboldal az Ön eszközén tárol. A szükséges sütik a weboldal működéséhez kellenek, minden más csak az Ön hozzájárulásával kerülhet az eszközére.',
      ],
    },
    {
      title: '2. Milyen sütiket használunk?',
      blocks: [
        '**Szükséges (mindig aktív)**',
        {
          table: [
            ['Név', 'nhc-consent (böngésző helyi tárolója, nem süti)'],
            ['Cél', 'az Ön süti-beállításainak megjegyzése'],
            ['Szolgáltató', site.name],
            ['Érvényesség', '12 hónap'],
          ],
        },
        '**Külső tartalmak – Google Térkép (csak hozzájárulással)**',
        {
          table: [
            ['Szolgáltató', 'Google Ireland Ltd. / Google LLC'],
            ['Cél', 'a Kapcsolat oldalon a térkép megjelenítése'],
            ['Sütik', '[[a Google által beállított sütik, pl. NID – a Google aktuális listája szerint]]'],
            ['További információ', '[Google adatvédelmi irányelvek](https://policies.google.com/privacy?hl=hu)'],
          ],
        },
        'Analitikai (statisztikai) és marketingcélú sütiket **nem használunk**. Ha ez a jövőben változik, előtte frissítjük ezt a tájékoztatót, és az érintett sütik csak hozzájárulás után töltődnek be.',
      ],
    },
    {
      title: '3. A hozzájárulás kezelése',
      blocks: [
        'Az első látogatáskor megjelenő ablakban elfogadhatja vagy elutasíthatja a nem szükséges sütiket, illetve kategóriánként is dönthet. Döntését bármikor megváltoztathatja a lábléc **„Süti beállítások”** linkjén. A böngészője beállításaiban a sütiket törölheti vagy letilthatja is.',
      ],
    },
    {
      title: '4. Kapcsolat',
      blocks: [`Kérdés esetén írjon a ${mail(dpo.email)} címre. Az adatkezelésről bővebben: [Adatkezelési tájékoztató](${localePath('privacy', 'hu')}).`],
    },
  ],
};

const cookiesEn: LegalPage = {
  title: 'Cookie Policy',
  updated: 'Effective from 26 October 2026',
  sections: [
    {
      title: '1. What are cookies?',
      blocks: [
        'Cookies and similar technologies (e.g. the browser’s local storage) are small pieces of data a website stores on your device. Necessary ones are required for the site to work; everything else is only used with your consent.',
      ],
    },
    {
      title: '2. Which cookies do we use?',
      blocks: [
        '**Necessary (always active)**',
        {
          table: [
            ['Name', 'nhc-consent (browser local storage, not a cookie)'],
            ['Purpose', 'remembering your cookie preferences'],
            ['Provider', site.name],
            ['Duration', '12 months'],
          ],
        },
        '**External content – Google Maps (only with consent)**',
        {
          table: [
            ['Provider', 'Google Ireland Ltd. / Google LLC'],
            ['Purpose', 'showing the map on the Contact page'],
            ['Cookies', '[[cookies set by Google, e.g. NID – as per Google’s current list]]'],
            ['More information', '[Google Privacy Policy](https://policies.google.com/privacy)'],
          ],
        },
        'We do **not** use analytics or marketing cookies.',
      ],
    },
    {
      title: '3. Managing your consent',
      blocks: [
        'You can accept or reject non-essential cookies, or choose by category, in the banner shown on your first visit. You can change your choice at any time via **“Cookie settings”** in the footer, or delete cookies in your browser settings.',
      ],
    },
    {
      title: '4. Contact',
      blocks: [`Questions: ${mail(dpo.email)}. More details: [Privacy Policy](${localePath('privacy', 'en')}).`],
    },
  ],
};

export const legal: Record<LegalKey, Record<Lang, LegalPage>> = {
  imprint: { hu: imprintHu, en: imprintEn },
  privacy: { hu: privacyHu, en: privacyEn },
  cookies: { hu: cookiesHu, en: cookiesEn },
};
