/**
 * JOGI OLDALAK SZÖVEGEI (Impresszum, Adatvédelmi tájékoztató) – HU + EN.
 *
 * Formázás a szövegekben:
 *   [[ ... ]]        → sárgán kiemelt, KITÖLTENDŐ helyőrző
 *   [szöveg](url)    → hivatkozás
 *
 * FONTOS: ezek sablonszövegek, nem minősülnek jogi tanácsnak.
 * A végleges szöveget ajánlott jogi szakértővel ellenőriztetni.
 */
import { site, formatAddress } from '../data/site';
import type { Lang } from './config';

export type LegalBlock = string | { list: string[] } | { table: [string, string][] };
export type LegalSection = { title: string; blocks: LegalBlock[] };
export type LegalPage = { title: string; updated: string; sections: LegalSection[] };

/** Wraps "TODO: ..." values from site.ts into a highlighted placeholder. */
const v = (value: string) => (value.startsWith('TODO') ? `[[${value.replace(/^TODO:\s*/, '')}]]` : value);

const seat = formatAddress(site.seat);
const office = formatAddress(site.office);
const r = site.registration;

const imprintHu: LegalPage = {
  title: 'Impresszum',
  updated: 'Hatályos: [[ÉÉÉÉ. HH. NN.]]',
  sections: [
    {
      title: 'A szolgáltató adatai',
      blocks: [
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
            ['E-mail', `[${site.email}](mailto:${site.email})`],
          ],
        },
      ],
    },
    {
      title: 'Tárhelyszolgáltató',
      blocks: [
        'Az elektronikus kereskedelmi szolgáltatásokról szóló 2001. évi CVIII. törvény 4. § f) pontja alapján:',
        {
          table: [
            ['Név', '[[tárhelyszolgáltató neve]]'],
            ['Cím', '[[tárhelyszolgáltató címe]]'],
            ['E-mail', '[[tárhelyszolgáltató e-mail-címe]]'],
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
  updated: 'Effective: [[DD/MM/YYYY]]',
  sections: [
    {
      title: 'Service provider',
      blocks: [
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
            ['Email', `[${site.email}](mailto:${site.email})`],
          ],
        },
      ],
    },
    {
      title: 'Hosting provider',
      blocks: [
        'In accordance with Section 4 (f) of Hungarian Act CVIII of 2001 on electronic commerce services:',
        {
          table: [
            ['Name', '[[hosting provider name]]'],
            ['Address', '[[hosting provider address]]'],
            ['Email', '[[hosting provider email]]'],
          ],
        },
      ],
    },
    {
      title: 'Copyright',
      blocks: [
        'The content of this website – including texts, logo and graphic elements – is the intellectual property of NH Cargo Kft. and may not be used without prior written permission.',
        'Stock photos used on this website are sourced from Unsplash and Pexels and used under the [Unsplash License](https://unsplash.com/license) and the [Pexels License](https://www.pexels.com/license/).',
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

const privacyHu: LegalPage = {
  title: 'Adatvédelmi tájékoztató',
  updated: 'Hatályos: [[ÉÉÉÉ. HH. NN.]]',
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
            ['E-mail', `[${site.email}](mailto:${site.email})`],
            ['Telefon', site.phone.display],
            ['Adatvédelmi kapcsolattartó', '[[név és elérhetőség, ha van kijelölt személy]]'],
          ],
        },
        'Az adatkezelő a személyes adatokat az Európai Parlament és a Tanács (EU) 2016/679 rendelete (GDPR) és az információs önrendelkezési jogról és az információszabadságról szóló 2011. évi CXII. törvény (Infotv.) előírásainak megfelelően kezeli.',
      ],
    },
    {
      title: '2. Kapcsolatfelvétel és ajánlatkérés',
      blocks: [
        'Az ajánlatkérő űrlap kitöltésekor, illetve e-mailben vagy telefonon történő megkereséskor az alábbi adatokat kezeljük:',
        {
          list: [
            'vezeték- és keresztnév, cégnév',
            'e-mail-cím, telefonszám',
            'a szállítással kapcsolatos adatok (felrakodási és lerakodási hely, áru típusa, hőmérsékleti igény, tervezett időpont)',
            'az üzenetben megadott egyéb információk',
          ],
        },
        '**Az adatkezelés célja:** a megkeresés megválaszolása, ajánlat készítése és a kapcsolattartás.',
        '**Jogalap:** az érintett hozzájárulása (GDPR 6. cikk (1) bekezdés a) pont), illetve a szerződés megkötését megelőzően az érintett kérésére történő lépések megtétele (GDPR 6. cikk (1) bekezdés b) pont). [[Jogalapot jogi szakértővel ellenőriztetni.]]',
        '**Megőrzési idő:** [[pl. a megkeresés lezárásától számított 1 év; szerződés létrejötte esetén a számviteli jogszabályok szerinti 8 év]]',
      ],
    },
    {
      title: '3. Adatfeldolgozók',
      blocks: [
        'Az adatok kezeléséhez az alábbi adatfeldolgozókat vesszük igénybe:',
        {
          list: [
            'Tárhelyszolgáltató: [[név, cím]]',
            'Űrlapszolgáltató: [[pl. Formspree, Inc. (USA) – adattovábbítás az Európai Bizottság általános szerződési feltételei (SCC) alapján; vagy a saját tárhelyen futó PHP levelező esetén nincs külön adatfeldolgozó]]',
            'E-mail-szolgáltató: [[név, cím]]',
          ],
        },
      ],
    },
    {
      title: '4. Sütik (cookie-k) és külső szolgáltatások',
      blocks: [
        'Weboldalunk nem használ sütiket, és nem alkalmaz látogatottságmérő vagy marketingcélú eszközöket. A betűtípusokat saját szerverünkről töltjük be.',
        'A Kapcsolat oldalon elhelyezett Google Térkép kizárólag akkor töltődik be, ha Ön a „Térkép betöltése” gombra kattint. Ekkor a Google Ireland Ltd. / Google LLC sütiket helyezhet el, és adatokat (például IP-címet) kezelhet. Erről bővebben a [Google adatvédelmi irányelveiben](https://policies.google.com/privacy?hl=hu) tájékozódhat.',
      ],
    },
    {
      title: '5. Az Ön jogai',
      blocks: [
        'Az adatkezeléssel kapcsolatban Önt az alábbi jogok illetik meg:',
        {
          list: [
            'hozzáférés a személyes adatokhoz (GDPR 15. cikk)',
            'helyesbítés (16. cikk)',
            'törlés („elfeledtetéshez való jog”, 17. cikk)',
            'az adatkezelés korlátozása (18. cikk)',
            'adathordozhatóság (20. cikk)',
            'tiltakozás (21. cikk)',
            'a hozzájárulás bármikori visszavonása, amely nem érinti a visszavonás előtti adatkezelés jogszerűségét',
          ],
        },
        `Kérelmét a [${site.email}](mailto:${site.email}) címre küldheti el; arra legkésőbb egy hónapon belül válaszolunk.`,
      ],
    },
    {
      title: '6. Jogorvoslat',
      blocks: [
        'Ha úgy ítéli meg, hogy személyes adatai kezelése sérti a jogszabályokat, panaszt tehet a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH):',
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
        'A weboldal titkosított (HTTPS) kapcsolaton keresztül érhető el. Megfelelő technikai és szervezési intézkedésekkel gondoskodunk arról, hogy a személyes adatokhoz illetéktelen személyek ne férhessenek hozzá. [[A konkrét intézkedések kiegészítendők.]]',
      ],
    },
  ],
};

const privacyEn: LegalPage = {
  title: 'Privacy Policy',
  updated: 'Effective: [[DD/MM/YYYY]]',
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
            ['Email', `[${site.email}](mailto:${site.email})`],
            ['Phone', site.phone.display],
            ['Data protection contact', '[[name and contact details, if designated]]'],
          ],
        },
        'The controller processes personal data in accordance with Regulation (EU) 2016/679 (General Data Protection Regulation, GDPR) and Hungarian Act CXII of 2011 on the right to informational self-determination and freedom of information.',
      ],
    },
    {
      title: '2. Contact and quote requests',
      blocks: [
        'When you fill in the quote request form or contact us by email or phone, we process the following data:',
        {
          list: [
            'first and last name, company name',
            'email address, phone number',
            'shipment details (pickup and delivery location, cargo type, temperature requirement, preferred date)',
            'any other information you provide in your message',
          ],
        },
        '**Purpose:** responding to your enquiry, preparing a quotation and keeping in contact.',
        '**Legal basis:** your consent (Art. 6(1)(a) GDPR) and taking steps at your request prior to entering into a contract (Art. 6(1)(b) GDPR). [[Legal basis to be confirmed by a legal professional.]]',
        '**Retention period:** [[e.g. 1 year after the enquiry is closed; 8 years under accounting law if a contract is concluded]]',
      ],
    },
    {
      title: '3. Processors',
      blocks: [
        'We use the following processors:',
        {
          list: [
            'Hosting provider: [[name, address]]',
            'Form service: [[e.g. Formspree, Inc. (USA) – transfer based on the European Commission’s Standard Contractual Clauses (SCC); or no separate processor if the PHP mailer on our own hosting is used]]',
            'Email provider: [[name, address]]',
          ],
        },
      ],
    },
    {
      title: '4. Cookies and third-party services',
      blocks: [
        'This website does not use cookies and does not use any analytics or marketing tools. Fonts are served from our own server.',
        'The Google Map on the Contact page is only loaded when you click the “Load map” button. Google Ireland Ltd. / Google LLC may then set cookies and process data such as your IP address. For details, please see the [Google Privacy Policy](https://policies.google.com/privacy).',
      ],
    },
    {
      title: '5. Your rights',
      blocks: [
        'You have the following rights regarding the processing of your personal data:',
        {
          list: [
            'access to your personal data (Art. 15 GDPR)',
            'rectification (Art. 16)',
            'erasure (“right to be forgotten”, Art. 17)',
            'restriction of processing (Art. 18)',
            'data portability (Art. 20)',
            'objection (Art. 21)',
            'withdrawal of consent at any time, without affecting the lawfulness of processing before the withdrawal',
          ],
        },
        `Please send your request to [${site.email}](mailto:${site.email}); we will respond within one month at the latest.`,
      ],
    },
    {
      title: '6. Remedies',
      blocks: [
        'If you believe that the processing of your personal data infringes the law, you may lodge a complaint with the Hungarian National Authority for Data Protection and Freedom of Information (NAIH):',
        {
          table: [
            ['Address', '1055 Budapest, Falk Miksa utca 9–11., Hungary'],
            ['Postal address', '1363 Budapest, Pf. 9.'],
            ['Website', '[www.naih.hu](https://www.naih.hu)'],
          ],
        },
        'You may also bring proceedings before the competent court, including the court of your place of residence.',
      ],
    },
    {
      title: '7. Data security',
      blocks: [
        'This website is served over an encrypted (HTTPS) connection. We take appropriate technical and organisational measures to protect personal data against unauthorised access. [[Specific measures to be added.]]',
      ],
    },
  ],
};

export const legal: Record<'imprint' | 'privacy', Record<Lang, LegalPage>> = {
  imprint: { hu: imprintHu, en: imprintEn },
  privacy: { hu: privacyHu, en: privacyEn },
};
