/**
 * Editable content – what the admin (/admin/) shows and the build validates.
 * Each entry is one JSON file in src/cms/content/. Translated files hold
 * { "hu": {...}, "en": {...} }; field names follow src/i18n/types.ts.
 *
 * Texts that are part of the interface (menu, form labels, cookie banner) and
 * the legal pages stay in code: src/i18n/{hu,en}.ts and src/i18n/legal.ts.
 */
import {
  hero,
  image,
  list,
  obj,
  sectionIntro,
  stats,
  str,
  strList,
  text,
  titleText,
  type ContentFile,
} from './fields';

const TITLE_MAX = 60;
const DESCRIPTION_MAX = 155;

const pageSeo = (name: string, label: string) =>
  obj(
    name,
    label,
    [
      str('title', 'Title (böngészőfül, Google-találat címe)', { max: TITLE_MAX }),
      text('description', 'Meta description (Google-találat leírása)', { max: DESCRIPTION_MAX }),
      image('ogImage', 'Megosztási kép (OG-kép)', {
        required: false,
        hint: 'Facebook, LinkedIn stb. előnézeti képe, 1200×630-ra vágva. Üresen: az oldal saját nyitóképe.',
      }),
    ],
    { collapsed: true },
  );

const photo = (name: string, label: string) =>
  obj(name, label, [image('file', 'Kép'), str('alt', 'Alternatív szöveg (mit ábrázol a kép)')], { collapsed: true });

const aboutPhoto = (name: string, label: string) =>
  obj(
    name,
    label,
    [
      image('file', 'Kép', { required: false, hint: 'Üresen: élesben egy meglévő fotó, az előnézeten „Kép helye” jelölés jelenik meg.' }),
      str('alt', 'Alternatív szöveg (mit ábrázol a kép)'),
    ],
    { collapsed: true },
  );

const points = list('points', 'Pontok', [str('title', 'Cím'), text('text', 'Szöveg')], {
  summary: '{{fields.title}}',
  min: 1,
});

const service = (name: string, label: string) =>
  obj(
    name,
    label,
    [
      str('title', 'Rövid név (kártyán, menüben)'),
      str('pageTitle', 'Oldal főcíme (H1)'),
      text('short', 'Rövid leírás (kártyán)'),
      text('lead', 'Bevezető (az aloldal tetején)'),
      points,
    ],
    { collapsed: true },
  );

export const contentFiles: ContentFile[] = [
  {
    name: 'home',
    label: 'Főoldal',
    i18n: true,
    fields: [
      obj('hero', 'Nyitórész', [
        str('eyebrow', 'Felirat a cím felett'),
        str('title', 'Főcím (H1)'),
        text('subtitle', 'Alcím'),
        strList('chips', 'Címkék', { min: 1 }),
        stats('stats', 'Számok', { min: 1 }),
      ]),
      obj(
        'about',
        'Rólunk rész',
        [
          str('eyebrow', 'Felirat a cím felett'),
          str('title', 'Cím'),
          strList('paragraphs', 'Bekezdések', { min: 1, multiline: true }),
          titleText('mission', 'Küldetésünk doboz'),
          titleText('contactPerson', 'Kapcsolattartó doboz'),
        ],
        { collapsed: true },
      ),
      sectionIntro('why', '„Miért mi?” rész – bevezető'),
      obj(
        'whyItems',
        '„Miért mi?” rész – elemek',
        [
          titleText('experience', 'Tapasztalat'),
          titleText('contact', 'Kapcsolattartó'),
          titleText('temperature', 'Hőmérséklet'),
          titleText('fleet', 'Flotta'),
          titleText('europe', 'Európa'),
          titleText('tracking', 'Nyomon követés'),
        ],
        { collapsed: true },
      ),
      sectionIntro('services', 'Szolgáltatások rész – bevezető'),
      sectionIntro('fleet', 'Flotta és minőség rész', [
        list('cards', 'Kártyák', [str('title', 'Cím'), text('text', 'Szöveg')], { summary: '{{fields.title}}', min: 1 }),
      ]),
      obj(
        'sustainability',
        'Fenntarthatóság rész',
        [str('eyebrow', 'Felirat a cím felett'), str('title', 'Cím'), text('text', 'Szöveg'), str('cta', 'Gomb felirata')],
        { collapsed: true },
      ),
    ],
  },
  {
    name: 'services',
    label: 'Szolgáltatások',
    description: 'A Szolgáltatások oldal és a három szolgáltatás-aloldal szövegei.',
    i18n: true,
    fields: [
      hero(),
      obj('items', 'Szolgáltatások', [
        service('domestic', 'Belföldi fuvarozás'),
        service('crossdock', 'Cross-docking és raktározás'),
        service('international', 'Nemzetközi fuvarozás'),
      ]),
      str('related', 'Felirat: további szolgáltatások (aloldalak alján)'),
      titleText('question', 'Kérdése van? doboz (aloldalakon)'),
      obj(
        'process',
        'Így dolgozunk rész',
        [
          str('eyebrow', 'Felirat a cím felett'),
          str('title', 'Cím'),
          obj('steps', 'Lépések', [
            titleText('request', '1. Ajánlatkérés'),
            titleText('offer', '2. Ajánlat'),
            titleText('organise', '3. Szervezés'),
            titleText('delivery', '4. Kiszállítás'),
          ]),
        ],
        { collapsed: true },
      ),
    ],
  },
  {
    name: 'about',
    label: 'Rólunk',
    i18n: true,
    fields: [
      hero(),
      obj('intro', 'Cégbemutatkozás', [str('title', 'Cím'), text('text', 'Szöveg'), stats('stats', 'Számok', { min: 1 })], {
        collapsed: true,
      }),
      titleText('activity', 'Fő tevékenységünk'),
      obj(
        'fleet',
        'Járműflotta',
        [str('title', 'Cím'), text('text', 'Szöveg'), strList('types', 'Járműtípusok'), strList('badges', 'Minősítések')],
        { collapsed: true },
      ),
      obj('results', 'Eredményeink', [str('eyebrow', 'Felirat a cím felett'), str('title', 'Cím'), stats('items', 'Számok')], {
        collapsed: true,
      }),
      obj(
        'quality',
        'Minőségirányítás',
        [
          str('title', 'Cím'),
          text('text', 'Szöveg'),
          list('certs', 'Tanúsítványok', [str('name', 'Név'), text('text', 'Leírás')], { summary: '{{fields.name}}' }),
        ],
        { collapsed: true },
      ),
      titleText('warehouse', 'Raktározás és átrakás'),
      obj('duty', 'Ügyelet', [str('title', 'Cím'), text('text', 'Szöveg'), strList('hours', 'Időpontok')], { collapsed: true }),
      titleText('strength', 'Legnagyobb erősségünk'),
      titleText('goals', 'Jövőbeli céljaink'),
    ],
  },
  {
    name: 'sustainability',
    label: 'Fenntarthatóság',
    i18n: true,
    fields: [
      hero(),
      obj(
        'intro',
        'Bevezető',
        [str('eyebrow', 'Felirat a cím felett'), str('title', 'Cím'), strList('paragraphs', 'Bekezdések', { min: 1, multiline: true })],
        { collapsed: true },
      ),
      str('pillarsTitle', 'Pillérek – cím'),
      obj(
        'pillars',
        'Pillérek',
        [
          titleText('routes', 'Útvonaltervezés'),
          titleText('fuels', 'Üzemanyagok'),
          titleText('technology', 'Technológia'),
          titleText('emptyRuns', 'Üresjáratok'),
        ],
        { collapsed: true },
      ),
      titleText('closing', 'Záró rész'),
    ],
  },
  {
    name: 'contact',
    label: 'Kapcsolat',
    description: 'A Kapcsolat oldal szövegei. A telefonszám, e-mail és címek a „Cégadatok” alatt vannak.',
    i18n: true,
    fields: [hero()],
  },
  {
    name: 'common',
    label: 'Közös elemek (CTA, lábléc)',
    i18n: true,
    fields: [
      obj('cta', 'Ajánlatkérés sáv (oldalak alján)', [str('title', 'Cím'), text('text', 'Szöveg'), str('primary', 'Gomb felirata')]),
      text('footerTagline', 'Lábléc – cégleírás'),
    ],
  },
  {
    name: 'seo',
    label: 'SEO (title, description, OG-kép)',
    description: 'Oldalanként a keresőkben és megosztáskor megjelenő cím, leírás és kép.',
    i18n: true,
    fields: [
      pageSeo('home', 'Főoldal'),
      pageSeo('services', 'Szolgáltatások'),
      pageSeo('domestic', 'Belföldi fuvarozás'),
      pageSeo('crossdock', 'Cross-docking és raktározás'),
      pageSeo('international', 'Nemzetközi fuvarozás'),
      pageSeo('about', 'Rólunk'),
      pageSeo('sustainability', 'Fenntarthatóság'),
      pageSeo('contact', 'Kapcsolat'),
      pageSeo('imprint', 'Impresszum'),
      pageSeo('privacy', 'Adatkezelési tájékoztató'),
      pageSeo('cookies', 'Süti tájékoztató'),
    ],
  },
  {
    name: 'images',
    label: 'Képek',
    description: 'A képet a nyelvektől függetlenül egyszer kell kiválasztani; az alternatív szöveg nyelvenként külön van.',
    i18n: true,
    fields: [
      obj('photos', 'Fotók', [
        photo('heroTrucks', 'Főoldal – nyitókép'),
        photo('reeferTruck', 'Főoldal – Rólunk rész'),
        photo('windTurbines', 'Főoldal és Fenntarthatóság – szélturbinák'),
        photo('countryRoadTruck', 'Belföldi fuvarozás'),
        photo('dockDoors', 'Cross-docking és raktározás'),
        photo('sunnyRoadTruck', 'Nemzetközi fuvarozás + ajánlatkérés sáv háttere'),
        photo('truckParking', 'Szolgáltatások – nyitókép'),
        photo('logisticsHall', 'Kapcsolat – nyitókép'),
        photo('countryRoad', 'Fenntarthatóság – nyitókép'),
        photo('reeferTrailers', 'Rólunk – nyitókép (ha nincs saját fejléckép)'),
      ]),
      obj('about', 'Rólunk oldal saját fotói', [
        aboutPhoto('fejlec', 'Fejléc háttérkép (1920 × 1080 px)'),
        aboutPhoto('csapat', 'Csapat / iroda (1600 × 1200 px)'),
        aboutPhoto('flotta', 'Hűtős szerelvények (1600 × 1200 px)'),
        aboutPhoto('raktar', 'Hűtött raktár az M0 mentén (1600 × 1200 px)'),
      ]),
    ],
  },
  {
    name: 'site',
    label: 'Cégadatok',
    description: 'Fejléc, lábléc, Kapcsolat oldal, Impresszum és a Google-nak szóló strukturált adatok.',
    i18n: false,
    fields: [
      str('name', 'Cégnév'),
      str('shortName', 'Rövid név'),
      str('phone', 'Telefonszám', { hint: 'Nemzetközi formában, pl. +36 70 902 5961' }),
      str('email', 'E-mail-cím'),
      obj('office', 'Iroda (a térképen ez jelenik meg)', [
        str('postalCode', 'Irányítószám'),
        str('city', 'Település'),
        str('street', 'Utca, házszám'),
      ]),
      obj('seat', 'Székhely', [str('postalCode', 'Irányítószám'), str('city', 'Település'), str('street', 'Utca, házszám')]),
      obj('registration', 'Cégjegyzék adatai', [
        str('companyNumber', 'Cégjegyzékszám'),
        str('taxNumber', 'Adószám'),
        str('euVatNumber', 'Közösségi adószám', { required: false, hint: 'Üresen: kitöltendőként jelenik meg az Impresszumban.' }),
        str('registryCourt', 'Nyilvántartó cégbíróság'),
        str('representative', 'Képviselő (ügyvezető)', {
          required: false,
          hint: 'Üresen: kitöltendőként jelenik meg az Impresszumban.',
        }),
      ]),
      obj('dataProtectionContact', 'Adatkezelési kapcsolattartó', [str('name', 'Név'), str('email', 'E-mail-cím')]),
      str('linkedin', 'LinkedIn-oldal címe', { required: false }),
    ],
  },
];
