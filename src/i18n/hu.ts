/**
 * MAGYAR FELÜLETI SZÖVEGEK – menü, űrlap, süti-ablak és egyéb rögzített feliratok.
 * Az oldalak tartalma (szövegek, képek, SEO) az adminban szerkeszthető: /admin/
 * (fájlok: src/cms/content/*.json). Az angol megfelelők az en.ts fájlban vannak.
 * A jogi oldalak szövegei a legal.ts fájlban találhatók.
 */
import type { UiDictionary } from './types';

export const hu: UiDictionary = {
  nav: {
    home: 'Főoldal',
    about: 'Rólunk',
    services: 'Szolgáltatások',
    sustainability: 'Fenntarthatóság',
    contact: 'Kapcsolat',
    imprint: 'Impresszum',
    privacy: 'Adatkezelési tájékoztató',
    domestic: 'Belföldi fuvarozás',
    crossdock: 'Cross-docking és raktározás',
    international: 'Nemzetközi fuvarozás',
    cookies: 'Süti tájékoztató',
    quote: 'Ajánlatkérés',
    menuOpen: 'Menü megnyitása',
    menuClose: 'Menü bezárása',
    mainNav: 'Főmenü',
    skip: 'Ugrás a tartalomhoz',
    homeLink: 'NH Cargo – vissza a főoldalra',
  },

  common: {
    learnMore: 'Részletek',
    allServices: 'Összes szolgáltatás',
    requestQuote: 'Ajánlatkérés',
    ourServices: 'Szolgáltatásaink',
    contactUs: 'Kapcsolatfelvétel',
    callUs: 'Hívjon minket',
    backHome: 'Vissza a főoldalra',
    moreAbout: 'Bővebben rólunk',
  },







  contact: {
    details: {
      title: 'Elérhetőségeink',
      company: 'Cégnév',
      phone: 'Telefon',
      email: 'E-mail',
      office: 'Iroda',
      seat: 'Székhely',
    },
    map: {
      title: 'Itt talál minket',
      consent:
        'A térképet a Google Maps szolgáltatja. Betöltésekor a Google sütiket helyezhet el és adatokat kezelhet. A „Süti beállítások” között tartósan is engedélyezheti.',
      load: 'Térkép betöltése',
      open: 'Megnyitás a Google Térképen',
      iframeTitle: 'Az NH Cargo budaörsi irodájának térképe',
    },
  },

  form: {
    title: 'Ajánlatkérés',
    intro: 'A *-gal jelölt mezők kitöltése kötelező.',
    nameOrder: ['lastName', 'firstName'],
    fields: {
      firstName: 'Keresztnév',
      lastName: 'Vezetéknév',
      company: 'Cégnév',
      email: 'E-mail-cím',
      phone: 'Telefonszám',
      pickup: 'Felrakodás helye',
      pickupPlaceholder: 'pl. Budaörs, HU',
      delivery: 'Lerakodás helye',
      deliveryPlaceholder: 'pl. München, DE',
      cargoType: 'Áru típusa',
      cargoPlaceholder: 'Kérjük, válasszon',
      temperature: 'Hőmérsékleti igény',
      temperaturePlaceholder: 'pl. +2 – +8 °C',
      date: 'Tervezett időpont',
      message: 'Üzenet',
      messagePlaceholder: 'Mennyiség, raklapszám, tömeg, egyéb igények…',
      honeypot: 'Ezt a mezőt hagyja üresen',
    },
    cargoOptions: {
      frozen: 'Fagyasztott',
      chilled: 'Hűtött',
      fresh: 'Friss',
      dry: 'Száraz áru',
      special: 'Speciális rakomány',
    },
    consent: {
      before: 'Elolvastam az ',
      link: 'adatkezelési tájékoztatót',
      after: ', és hozzájárulok, hogy az NH Cargo Kft. megkeresésem megválaszolása céljából kezelje az adataimat.',
    },
    required: 'kötelező',
    submit: 'Ajánlatkérés elküldése',
    sending: 'Küldés…',
    success: {
      title: 'Köszönjük!',
      text: 'Köszönjük, hogy felvette velünk a kapcsolatot. A lehető leghamarabb válaszolunk Önnek.',
      again: 'Új üzenet küldése',
    },
    error: {
      title: 'Hiba történt',
      text: 'Üzenetét nem sikerült elküldeni. Kérjük, próbálja újra később, vagy keressen minket közvetlenül telefonon vagy e-mailben.',
    },
    validation: {
      required: 'Kérjük, töltse ki ezt a mezőt.',
      email: 'Kérjük, érvényes e-mail-címet adjon meg.',
      phone: 'Kérjük, érvényes telefonszámot adjon meg.',
      consent: 'A folytatáshoz kérjük, fogadja el az adatkezelési tájékoztatót.',
      date: 'Kérjük, ne múltbeli dátumot válasszon.',
      summary: 'Kérjük, javítsa a megjelölt mezőket.',
    },
    subject: 'Új ajánlatkérés – nhcargo.hu',
  },


  footer: {
    navTitle: 'Navigáció',
    contactTitle: 'Elérhetőség',
    legalTitle: 'Jogi információk',
    office: 'Iroda',
    seat: 'Székhely',
    rights: 'Minden jog fenntartva.',
    linkedin: 'NH Cargo a LinkedInen',
    cookieSettings: 'Süti beállítások',
  },

  legalNotice: {
    title: 'JOGI ELLENŐRZÉS SZÜKSÉGES',
    text: 'Ez az oldal sablon, nem végleges jogi szöveg. A sárgával kiemelt részeket ki kell tölteni, a teljes szöveget pedig jogi szakértővel jóvá kell hagyatni.',
  },

  notFound: {
    title: 'Az oldal nem található',
    text: 'Sajnáljuk, a keresett oldal nem létezik, vagy átköltözött.',
  },

  about: {
    placeholder: { label: 'Kép helye', file: 'Feltöltés: admin › Képek ›', size: 'Javasolt méret' },
    slots: {
      fejlec: { title: 'Fejléc háttérkép' },
      csapat: { title: 'Csapat / iroda' },
      flotta: { title: 'Hűtős szerelvények' },
      raktar: { title: 'Hűtött raktár az M0 mentén' },
    },
  },
  consent: {
    title: 'Sütik és külső tartalmak',
    text: 'A weboldal működéséhez csak a szükséges adatokat tároljuk. A Google Térkép (külső tartalom) csak az Ön hozzájárulásával töltődik be. Döntését bármikor megváltoztathatja a lábléc „Süti beállítások” linkjén.',
    accept: 'Elfogadom',
    reject: 'Elutasítom',
    settings: 'Beállítások',
    save: 'Kiválasztottak mentése',
    dialogTitle: 'Süti beállítások',
    necessary: { title: 'Szükséges', text: 'A süti-beállítások megjegyzéséhez szükséges. Mindig aktív.' },
    media: { title: 'Külső tartalmak (Google Térkép)', text: 'A Kapcsolat oldalon a térkép megjelenítése. Betöltéskor a Google sütiket helyezhet el és adatokat (pl. IP-címet) kezelhet.' },
    alwaysOn: 'Mindig aktív',
    policy: 'Süti tájékoztató',
    close: 'Bezárás',
  },
};
