/**
 * MAGYAR SZÖVEGEK – a weboldal összes magyar nyelvű szövege itt szerkeszthető.
 * Az angol megfelelők az en.ts fájlban vannak, azonos szerkezetben.
 * (A jogi oldalak szövegei a legal.ts fájlban találhatók.)
 */
import type { Dictionary } from './types';

export const hu: Dictionary = {
  meta: {
    about: {
      title: 'Rólunk – cégbemutatkozás, flotta, tanúsítványok | NH Cargo',
      description:
        'Az NH Cargo Kft. nemzetközi és belföldi hűtött FTL fuvarozást végez: 30 dedikált hűtős szerelvény, TAPA- és pharma minősítés, ISO 9001, ISO 14001 és IFS tanúsítvány.',
    },
    home: {
      title: 'NH Cargo Kft. – Hűtött és fagyasztott áruszállítás Európa-szerte',
      description:
        'Megbízható hőmérséklet-szabályozott szállítás fagyasztott, hűtött és friss árukhoz. Belföldi és nemzetközi közúti fuvarozás dedikált kapcsolattartóval. Kérjen ajánlatot!',
    },
    services: {
      title: 'Szolgáltatások – belföldi, cross-docking és nemzetközi szállítás | NH Cargo',
      description:
        'Belföldi fuvarozás Magyarország egész területén, belföldi cross-docking, valamint nemzetközi közúti szállítás Európa-szerte, valós idejű nyomon követéssel.',
    },
    sustainability: {
      title: 'Fenntarthatóság – zöldebb logisztika | NH Cargo',
      description:
        'Optimalizált útvonaltervezés, alternatív üzemanyagok, modern technológia és kevesebb üresjárat: így csökkentjük a szállítás környezeti terhelését.',
    },
    contact: {
      title: 'Kapcsolat és ajánlatkérés | NH Cargo Kft.',
      description:
        'Kérjen ajánlatot hőmérséklet-szabályozott szállításra! Telefon: +36 70 902 5961, e-mail: info@nhcargo.hu. Iroda: 2040 Budaörs, Baross u. 165.',
    },
    imprint: {
      title: 'Impresszum | NH Cargo Kft.',
      description: 'Az NH Cargo Kft. cégadatai és a weboldal üzemeltetésével kapcsolatos információk.',
    },
    privacy: {
      title: 'Adatvédelmi tájékoztató | NH Cargo Kft.',
      description:
        'Tájékoztató arról, hogyan kezeli az NH Cargo Kft. a személyes adatokat a GDPR előírásainak megfelelően.',
    },
  },

  nav: {
    home: 'Főoldal',
    about: 'Rólunk',
    services: 'Szolgáltatások',
    sustainability: 'Fenntarthatóság',
    contact: 'Kapcsolat',
    imprint: 'Impresszum',
    privacy: 'Adatvédelem',
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

  alt: {
    heroTrucks: 'Kamionok haladnak egy dombok közötti autópályán szürkületben',
    truckOnRoad: 'Fehér nyerges vontató félpótkocsival halad egy zöld dombok közötti úton',
    highwayMotion: 'Elmosódott sebességű kamion egy esős autópályán',
    reeferTrailers: 'Hűtött félpótkocsik sorban a rakodórámpáknál',
    boxTruck: 'Fehér dobozos tehergépjármű egy modern ipari épület előtt',
    dockDoors: 'Kék rakodókapuk egy logisztikai központ rakodóterében',
    warehouse: 'Magas raktári polcrendszer kartondobozokkal egy logisztikai raktárban',
    windTurbines: 'Szélturbina zöld mezőgazdasági táj felett, kék égbolttal',
    highwayInterchange: 'Erdővel körülvett autópálya-csomópont madártávlatból',
    aerialTrucks: 'Kamionok és autók egy erdőn átvezető úton, felülnézetből',
  },

  home: {
    hero: {
      eyebrow: 'Hőmérséklet-szabályozott közúti szállítás · élelmiszeripar',
      title: 'Megbízható hőmérséklet-szabályozott szállítás Európa-szerte',
      subtitle:
        'Fagyasztott, hűtött vagy friss áru – szállítmányát biztonságosan, időben és pontosan a megfelelő hőmérsékleten juttatjuk célba, egyetlen dedikált kapcsolattartóval.',
      chips: ['Fagyasztott', 'Hűtött', 'Friss'],
      stats: [
        { value: '10+', label: 'év tapasztalat a logisztikában' },
        { value: '1:1', label: 'dedikált kapcsolattartó' },
        { value: 'EU', label: 'európai lefedettség' },
      ],
    },
    about: {
      eyebrow: 'Rólunk',
      title: 'Megbízható partner a hőmérséklet-szabályozott logisztikában',
      paragraphs: [
        'Az NH Cargo Kft. jelentős tapasztalattal rendelkező, megbízható partner a hőmérséklet-szabályozott szállítás területén. Csapatunk több mint tíz éve dolgozik a logisztikában, és a szakma számos területén szerzett gyakorlati tapasztalatot.',
        'Szakterületünk az élelmiszeripar hőmérséklet-szabályozott közúti szállítása. Széles körű piacismeretünknek és dedikált járműflottánknak köszönhetően Európa-szerte kínálunk szállítási megoldásokat.',
      ],
      mission: {
        title: 'Küldetésünk',
        text: 'Különleges szolgáltatást szeretnénk nyújtani minden partnerünknek, akinek fagyasztott, hűtött vagy friss áru szállítására van szüksége. Tudjuk, milyen fontos az Ön ellátási lánca, és hogy ez a legmagasabb szintű szállítási szolgáltatást követeli meg.',
      },
      contactPerson: {
        title: 'Egy dedikált kapcsolattartó',
        text: 'Minden partnerünk saját kapcsolattartót kap, aki ismeri valamennyi igényét, és megszervezi a szállítmány számára legjobb megoldást – call center és ismételt egyeztetések nélkül.',
      },
    },
    why: {
      eyebrow: 'Miért mi?',
      title: 'Miért válasszon minket?',
      intro: 'A hőmérsékletérzékeny áru nem tűri a hibát. Ezekre számíthat, ha velünk dolgozik.',
    },
    services: {
      eyebrow: 'Szolgáltatások',
      title: 'Az Ön ellátási láncára szabott szállítási megoldások',
      intro:
        'A gyors belföldi kiszállítástól a cross-dockingon át a nemzetközi fuvarozásig – megszervezzük az áruja számára legmegfelelőbb megoldást.',
    },
    fleet: {
      eyebrow: 'Flotta és minőség',
      title: '30 dedikált hűtős szerelvény, tanúsított minőségben',
      intro:
        'Saját, dedikált hűtős flottával, biztonsági és gyógyszeripari minősítéssel, valamint tanúsított irányítási rendszerekkel dolgozunk – hogy áruja minden körülmények között biztonságban legyen.',
      cards: [
        { title: '30 hűtős szerelvény', text: 'Normál, doppelstock és válaszfalas hűtős járművek, dedikáltan partnereink számára.' },
        { title: 'TAPA és pharma minősítés', text: 'Minősítés a nagy értékű és gyógyszeripari rakományok biztonságos szállításához.' },
        { title: 'GPS-alapú nyomon követés', text: 'A teljes flotta valós időben követhető, így mindig tudjuk, hol jár az áru.' },
      ],
    },
    sustainability: {
      eyebrow: 'Fenntarthatóság',
      title: 'Felelősen szállítunk',
      text: 'Optimalizált útvonaltervezéssel, alternatív üzemanyagokkal és modern technológiákkal csökkentjük a kibocsátást és növeljük a hatékonyságot – partnereinkkel együtt pedig a lehető legkevesebbre szorítjuk az üresjáratokat.',
      cta: 'Fenntarthatósági szemléletünk',
    },
  },

  why: {
    experience: {
      title: 'Több mint 10 év tapasztalat',
      text: 'Több mint egy évtizede dolgozunk a logisztikában, a szakma számos területén.',
    },
    contact: {
      title: 'Dedikált kapcsolattartó',
      text: 'Egyetlen kolléga, aki ismeri az Ön igényeit, és minden szállítást megszervez Önnek.',
    },
    temperature: {
      title: 'Hőmérséklet-szabályozott szállítás',
      text: 'Fagyasztott, hűtött és friss áru – az előírt hőmérséklet-tartományban, a felrakodástól a kiszállításig.',
    },
    fleet: {
      title: 'Saját dedikált flotta',
      text: 'Dedikált járműparkunk biztos kapacitást és egyenletes szolgáltatási minőséget jelent.',
    },
    europe: {
      title: 'Európai lefedettség',
      text: 'Széles körű piacismeret és megbízható partnerhálózat az európai szállításokhoz.',
    },
    tracking: {
      title: 'Valós idejű nyomon követés',
      text: 'Korszerű nyomkövető rendszereinknek köszönhetően mindig naprakész információval rendelkezik szállítmányáról.',
    },
  },

  services: {
    hero: {
      eyebrow: 'Szolgáltatások',
      title: 'Belföldi és nemzetközi szállítás – a szervezéstől a kiszállításig',
      subtitle:
        'Akár Magyarországon belül, akár Európa-szerte utazik az áruja, minden szállítást az Ön igényeihez, határidejéhez és a rakomány hőmérsékleti követelményeihez igazítunk.',
    },
    items: {
      domestic: {
        title: 'Belföldi szállítás',
        short: 'Gyors, rugalmas kiszállítás Magyarország bármely pontjára, kiterjedt belföldi hálózattal.',
        lead: 'Gyors, rugalmas és megbízható kiszállítás Magyarország egész területén.',
        points: [
          {
            title: 'Gyors és rugalmas szállítás',
            text: 'Az Ön igényeihez igazított, sokféle szállítási lehetőség – a rendszeres járatoktól az egyedi fuvarokig.',
          },
          {
            title: 'Kiterjedt hálózat',
            text: 'Átfogó belföldi hálózatunkkal gyorsan szállítunk az ország bármely pontjára.',
          },
          {
            title: 'Modern flotta, tapasztalt szakemberek',
            text: 'Korszerű járműveink és tapasztalt kollégáink garantálják a biztonságos és pontos kiszállítást.',
          },
          {
            title: 'Optimalizált folyamatok',
            text: 'Átgondolt logisztikai folyamataink csökkentik a szállítási költségeket és növelik a hatékonyságot.',
          },
          {
            title: 'Rugalmas szolgáltatási lehetőségek',
            text: 'Szolgáltatásainkat a különböző ügyféligényekhez és árutípusokhoz igazítjuk.',
          },
        ],
      },
      crossdock: {
        title: 'Belföldi cross-docking',
        short:
          'Az áru közvetlenül a beérkező járműről a kimenő szállítmányba kerül – rövidebb átfutás, alacsonyabb költség.',
        lead: 'Az áru közvetlenül a beérkező szállítmányból a kimenőbe kerül – felesleges raktározás nélkül.',
        points: [
          {
            title: 'Rövidebb átfutási idő',
            text: 'Az árut közvetlenül a járművek között rakjuk át, így minimálisra csökken a szállítási idő.',
          },
          {
            title: 'Nagyobb hatékonyság',
            text: 'Kevesebb mozgatási lépés, hatékonyabb logisztikai lánc.',
          },
          {
            title: 'Alacsonyabb költségek',
            text: 'Hosszú távú tárolás nélkül csökkennek a raktározási és árukezelési költségek.',
          },
          {
            title: 'Gyorsabb kiszállítás',
            text: 'Az áru hamarabb ér célba – ez különösen a romlandó termékeknél fontos.',
          },
        ],
      },
      international: {
        title: 'Nemzetközi szállítás',
        short: 'Közúti fuvarozás Európa-szerte valós idejű nyomon követéssel, versenyképes, egyedi árazással.',
        lead: 'Széles körű tapasztalat a nemzetközi közúti fuvarozásban, Európa-szerte.',
        points: [
          {
            title: 'Közúti fuvarozás Európa-szerte',
            text: 'Nemzetközi szállítmányait saját dedikált flottánkkal, közúton juttatjuk el a célállomásra.',
          },
          {
            title: 'Átláthatóság',
            text: 'Korszerű nyomkövető rendszereink valós idejű követést tesznek lehetővé, így mindig naprakész információval rendelkezik szállítmányáról.',
          },
          {
            title: 'Rugalmasság',
            text: 'Versenyképes árak és a célállomáshoz igazított, rugalmas megoldások.',
          },
          {
            title: 'Megbízható európai hálózat',
            text: 'Széles körű piacismeretünknek köszönhetően áruját gyorsan és megbízhatóan juttatjuk el Európa bármely pontjára.',
          },
        ],
      },
    },
    process: {
      eyebrow: 'Így dolgozunk',
      title: 'Az ajánlatkéréstől a kiszállításig',
      steps: {
        request: {
          title: 'Ajánlatkérés',
          text: 'Írja meg, mit, honnan, hová és mikor szállítana – a hőmérsékleti igényekkel együtt.',
        },
        offer: {
          title: 'Egyedi ajánlat',
          text: 'Dedikált kapcsolattartója kidolgozza a szállítmánya számára legjobb megoldást.',
        },
        organise: {
          title: 'Szervezés és felügyelet',
          text: 'Megtervezzük az útvonalat, kijelöljük a járművet, és valós időben követjük a szállítmányt.',
        },
        delivery: {
          title: 'Biztonságos kiszállítás',
          text: 'Áruja időben, kifogástalan állapotban és a megfelelő hőmérsékleten érkezik meg.',
        },
      },
    },
  },


  sustainability: {
    hero: {
      eyebrow: 'Fenntarthatóság',
      title: 'Úton a zöldebb logisztika felé',
      subtitle:
        'A szállítás és a logisztika területén a fenntarthatóság elengedhetetlen ahhoz, hogy a lehető legkisebbre csökkentsük környezeti hatásunkat.',
    },
    intro: {
      eyebrow: 'Elkötelezettségünk',
      title: 'Kisebb kibocsátás, nagyobb hatékonyság',
      paragraphs: [
        'A szállítás minden ellátási lánc gerince – és ez felelősséggel jár. Célunk, hogy minden tevékenységünk során csökkentsük a kibocsátást és növeljük a hatékonyságot.',
        'Partnereinkkel együttműködve igyekszünk a lehető legkevesebbre szorítani a felesleges járműmozgatást, az úgynevezett üresjáratokat, és környezetbarát megoldásokat vezetünk be. Így járulunk hozzá egy zöldebb jövőhöz a következő generációk számára.',
      ],
    },
    pillarsTitle: 'Így csökkentjük a környezeti terhelést',
    pillars: {
      routes: {
        title: 'Optimalizált útvonaltervezés',
        text: 'Okosabb útvonalak: kevesebb megtett kilométer, kevesebb üzemanyag, alacsonyabb kibocsátás.',
      },
      fuels: {
        title: 'Alternatív üzemanyagok',
        text: 'Ahol lehetséges, alternatív üzemanyag-megoldásokat keresünk és alkalmazunk.',
      },
      technology: {
        title: 'Modern technológiák',
        text: 'Korszerű járművek és digitális eszközök teszik tisztábbá és hatékonyabbá működésünket.',
      },
      emptyRuns: {
        title: 'Kevesebb üresjárat',
        text: 'Partnereinkkel együtt a minimálisra csökkentjük a járművek felesleges áthelyezését.',
      },
    },
    closing: {
      title: 'Zöldebb jövő a következő generációknak',
      text: 'Minden optimalizált útvonal és minden elkerült üresjárat számít. Elkötelezettek vagyunk a folyamatos fejlődés mellett – ügyfeleinkért, partnereinkért és a környezetért.',
    },
  },

  contact: {
    hero: {
      eyebrow: 'Kapcsolat',
      title: 'Beszéljünk a szállítmányáról!',
      subtitle:
        'Kérjen ajánlatot vagy tegye fel kérdését – töltse ki az űrlapot, és hamarosan jelentkezünk. Telefonon és e-mailben is elérhet minket.',
    },
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
        'A térképet a Google Maps szolgáltatja. Betöltésekor a Google sütiket helyezhet el és adatokat kezelhet.',
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
      link: 'adatvédelmi tájékoztatót',
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
      consent: 'A folytatáshoz kérjük, fogadja el az adatvédelmi tájékoztatót.',
      date: 'Kérjük, ne múltbeli dátumot válasszon.',
      summary: 'Kérjük, javítsa a megjelölt mezőket.',
    },
    subject: 'Új ajánlatkérés – nhcargo.hu',
  },

  cta: {
    title: 'Segítünk egyszerűbbé tenni az ellátási láncát!',
    text: 'Mondja el, milyen árut, honnan és hová szállítana – dedikált kapcsolattartója hamarosan egyedi ajánlattal jelentkezik.',
    primary: 'Kapcsolatfelvétel',
  },

  footer: {
    tagline: 'Hőmérséklet-szabályozott közúti szállítás az élelmiszeripar számára – Európa-szerte.',
    navTitle: 'Navigáció',
    contactTitle: 'Elérhetőség',
    legalTitle: 'Jogi információk',
    office: 'Iroda',
    seat: 'Székhely',
    rights: 'Minden jog fenntartva.',
    linkedin: 'NH Cargo a LinkedInen',
  },

  legalNotice: {
    title: 'Sablonszöveg',
    text: 'Ez az oldal sablon. A sárgával kiemelt részeket a megrendelőnek kell kitöltenie, a végleges szöveget pedig jogi szakértővel ajánlott ellenőriztetni.',
  },

  notFound: {
    title: 'Az oldal nem található',
    text: 'Sajnáljuk, a keresett oldal nem létezik, vagy átköltözött.',
  },

  about: {
    hero: {
      eyebrow: 'Rólunk',
      title: 'Rugalmas partner a hűtött áruszállításban',
      subtitle:
        'A 2024-ben alapított NH Cargo Kft. fiatal, dinamikus csapat – a hűtött áruszállításban szerzett, összesen közel 100 évnyi szakmai tapasztalattal.',
    },
    intro: {
      title: 'Cégbemutatkozás',
      text: 'Társaságunk 2024-ben alakult, munkatársaink létszáma jelenleg 10 fő. Munkatársaink együttes szakmai tapasztalata a hűtött áruszállítás területén hamarosan eléri a 100 évet.',
      stats: [
        { value: '2024', label: 'alapítás éve' },
        { value: '10 fő', label: 'munkatárs' },
        { value: '~100 év', label: 'együttes szakmai tapasztalat' },
        { value: '30', label: 'dedikált hűtős szerelvény' },
      ],
    },
    activity: {
      title: 'Fő tevékenységünk',
      text: 'Elsődleges profilunk a nemzetközi és belföldi hűtött, teljes rakományos (FTL) fuvarozás. Emellett ponyvás és dobozos járművekkel is vállalunk szállítási feladatokat.',
    },
    fleet: {
      title: 'Járműflotta',
      text: 'Flottánk 30 dedikált hűtős szerelvényből áll, köztük normál, doppelstock és válaszfalas hűtős járművekkel. TAPA- és gyógyszeripari (pharma) minősítéssel rendelkezünk. A teljes flotta GPS-alapú nyomon követéssel működik.',
      types: ['Normál hűtős', 'Doppelstock', 'Válaszfalas hűtős'],
      badges: ['TAPA-minősítés', 'Gyógyszeripari (pharma) minősítés', 'GPS-alapú nyomon követés'],
    },
    results: {
      eyebrow: 'Eredményeink',
      title: 'Számokban a teljesítményünk',
      items: [
        { value: '2 500+', label: 'teljesített fuvarfeladat 2025-ben' },
        { value: '5 M€+', label: 'árbevétel 2025-ben' },
      ],
    },
    quality: {
      title: 'Minőségirányítás',
      text: 'Társaságunk ISO 9001, ISO 14001 és IFS tanúsítványokkal rendelkezik.',
      certs: [
        { name: 'ISO 9001', text: 'Minőségirányítási rendszer' },
        { name: 'ISO 14001', text: 'Környezetirányítási rendszer' },
        { name: 'IFS', text: 'Élelmiszer-biztonsági szabvány' },
      ],
    },
    warehouse: {
      title: 'Raktározás és átrakás',
      text: 'Az M0 autópálya vonalán hűtött raktározási kapacitással rendelkezünk, friss áru esetén átrakási lehetőséggel.',
    },
    duty: {
      title: 'Ügyelet',
      text: 'Hétvégi, valamint reggel 04:00–07:00 közötti ügyeletet biztosítunk, így a felmerülő problémákra gyorsan reagálunk.',
      hours: ['Hétvégi ügyelet', 'Hétköznap 04:00–07:00'],
    },
    strength: {
      title: 'Legnagyobb erősségünk: a rugalmasság',
      text: 'Rugalmas, partnerközpontú működésünkkel megbízható logisztikai hátteret nyújtunk partnereinknek, váratlan helyzetekben is.',
    },
    goals: {
      title: 'Jövőbeli céljaink',
      text: 'Célunk a folyamatos, fenntartható fejlődés, a flotta és a szolgáltatások bővítése, valamint új hazai és nemzetközi partnerkapcsolatok kialakítása. A hűtött szállítmányozás területén tovább kívánjuk erősíteni piaci jelenlétünket, a magas minőségi, biztonsági és szolgáltatási színvonal megtartása mellett.',
    },
    placeholder: { label: 'Kép helye', file: 'Fájl', size: 'Javasolt méret' },
    slots: {
      fejlec: { title: 'Fejléc háttérkép', alt: 'Az NH Cargo hűtős szerelvénye úton' },
      csapat: { title: 'Csapat / iroda', alt: 'Az NH Cargo csapata' },
      flotta: { title: 'Hűtős szerelvények', alt: 'Az NH Cargo dedikált hűtős szerelvényei' },
      raktar: { title: 'Hűtött raktár az M0 mentén', alt: 'Targonca rakodja a hűtött félpótkocsit egy hűtőraktár rakodókapujánál' },
    },
  },
};
