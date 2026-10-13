/**
 * ENGLISH TEXTS – every English text on the website is edited here.
 * Same structure as hu.ts. (Legal page texts live in legal.ts.)
 */
import type { Dictionary } from './types';

export const en: Dictionary = {
  meta: {
    home: {
      title: 'NH Cargo Kft. – Temperature-controlled transport across Europe',
      description:
        'Reliable refrigerated transport for frozen, chilled and fresh cargo. Domestic and international road freight with a dedicated contact person. Request a quote.',
    },
    services: {
      title: 'Services – Domestic, cross-docking & international transport | NH Cargo',
      description:
        'Domestic transport across Hungary, domestic cross-docking and international road freight across Europe with real-time shipment tracking.',
    },
    industries: {
      title: 'Industries – Food & special cargo transport | NH Cargo',
      description:
        'Temperature-controlled road transport for the food industry, plus tailored solutions for oversized, high-value and time-critical cargo.',
    },
    sustainability: {
      title: 'Sustainability – Greener logistics | NH Cargo',
      description:
        'Optimised route planning, alternative fuels, modern technology and fewer empty runs: how NH Cargo reduces the environmental impact of transport.',
    },
    contact: {
      title: 'Contact & quote request | NH Cargo Kft.',
      description:
        'Request a quote for temperature-controlled transport. Phone: +36 70 902 5961, email: info@nhcargo.hu. Office: 2040 Budaörs, Baross u. 165., Hungary.',
    },
    imprint: {
      title: 'Imprint | NH Cargo Kft.',
      description: 'Company details of NH Cargo Kft. and information about the operator of this website.',
    },
    privacy: {
      title: 'Privacy Policy | NH Cargo Kft.',
      description: 'How NH Cargo Kft. processes personal data in accordance with the GDPR.',
    },
  },

  nav: {
    home: 'Home',
    services: 'Services',
    industries: 'Industries',
    sustainability: 'Sustainability',
    contact: 'Contact',
    imprint: 'Imprint',
    privacy: 'Privacy',
    quote: 'Get a quote',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    mainNav: 'Main navigation',
    skip: 'Skip to content',
    homeLink: 'NH Cargo – back to the homepage',
  },

  common: {
    learnMore: 'Learn more',
    allServices: 'All services',
    allIndustries: 'All industries',
    requestQuote: 'Request a quote',
    ourServices: 'Our services',
    contactUs: 'Contact us',
    callUs: 'Call us',
    backHome: 'Back to the homepage',
  },

  alt: {
    heroTrucks: 'Trucks driving on a motorway between hills at dusk',
    truckOnRoad: 'White articulated truck driving along a road between green hills',
    highwayMotion: 'Truck speeding along a wet motorway, shown with motion blur',
    reeferTrailers: 'Row of refrigerated semi-trailers parked at loading docks',
    boxTruck: 'White box truck in front of a modern industrial building',
    dockDoors: 'Blue loading dock doors inside a logistics centre',
    warehouse: 'Tall warehouse racking filled with cardboard boxes',
    freshVegetables: 'Fresh vegetables – cauliflower, cabbage, cucumbers and tomatoes – side by side',
    windTurbines: 'Wind turbine above green farmland under a blue sky',
    highwayInterchange: 'Aerial view of a motorway interchange surrounded by forest',
    aerialTrucks: 'Top-down view of trucks and cars on a road through a forest',
  },

  home: {
    hero: {
      eyebrow: 'Temperature-controlled road transport · Food industry',
      title: 'Reliable temperature-controlled transport across Europe',
      subtitle:
        'Frozen, chilled or fresh – we deliver your cargo safely, on time and at exactly the right temperature, with one dedicated contact person managing every shipment.',
      chips: ['Frozen', 'Chilled', 'Fresh'],
      stats: [
        { value: '10+', label: 'years of logistics experience' },
        { value: '1:1', label: 'dedicated contact person' },
        { value: 'EU', label: 'Europe-wide coverage' },
      ],
    },
    about: {
      eyebrow: 'About us',
      title: 'A reliable partner for temperature-controlled logistics',
      paragraphs: [
        'NH Cargo Kft. is a reliable partner with significant experience in temperature-controlled transportation. Our team has been working in logistics for more than ten years and brings hands-on experience from several areas of the field.',
        'Our speciality is temperature-controlled road transport for the food sector. Thanks to our extensive market knowledge and our dedicated truck fleet, we provide transport solutions across Europe.',
      ],
      mission: {
        title: 'Our mission',
        text: 'We aim to offer something special to every customer who needs frozen, chilled or fresh transport. We understand how important your supply chain is – and that it requires the highest level of transport service.',
      },
      contactPerson: {
        title: 'One dedicated contact person',
        text: 'Every client is assigned a dedicated contact person who knows all of your requirements and organises the best possible solution for your cargo – no call centres, no repeating yourself.',
      },
    },
    why: {
      eyebrow: 'Why NH Cargo',
      title: 'Why choose us?',
      intro: 'Temperature-sensitive cargo leaves no room for error. This is what you can rely on when you work with us.',
    },
    services: {
      eyebrow: 'Services',
      title: 'Transport solutions tailored to your supply chain',
      intro:
        'From fast domestic deliveries to cross-docking and international freight – we organise the solution that fits your cargo.',
    },
    industries: {
      eyebrow: 'Industries',
      title: 'Expertise where temperature matters most',
      intro:
        'We know the specific requirements of the sectors we serve – and we handle every shipment accordingly.',
    },
    sustainability: {
      eyebrow: 'Sustainability',
      title: 'Moving goods responsibly',
      text: 'We reduce emissions and increase efficiency through optimised route planning, alternative fuels and modern technologies – and we work with our partners to keep empty runs to a minimum.',
      cta: 'Our approach to sustainability',
    },
  },

  why: {
    experience: {
      title: '10+ years of experience',
      text: 'More than a decade in logistics, with experience across many areas of the industry.',
    },
    contact: {
      title: 'Dedicated contact person',
      text: 'One person who knows your requirements and organises every shipment for you.',
    },
    temperature: {
      title: 'Temperature-controlled specialists',
      text: 'Frozen, chilled and fresh cargo – kept within the required range from loading to delivery.',
    },
    fleet: {
      title: 'Own dedicated fleet',
      text: 'A dedicated truck fleet means reliable capacity and consistent service quality.',
    },
    europe: {
      title: 'Europe-wide coverage',
      text: 'Extensive market knowledge and a reliable partner network for transport across Europe.',
    },
    tracking: {
      title: 'Real-time shipment tracking',
      text: 'Advanced tracking systems keep you informed about the status of your shipment at all times.',
    },
  },

  services: {
    hero: {
      eyebrow: 'Services',
      title: 'Domestic and international transport – organised end to end',
      subtitle:
        'Whether your goods travel across Hungary or across Europe, we plan every shipment around your requirements, your timeline and your cargo’s temperature needs.',
    },
    items: {
      domestic: {
        title: 'Domestic transport',
        short: 'Fast, flexible deliveries anywhere in Hungary through a comprehensive domestic network.',
        lead: 'Fast, flexible and reliable deliveries anywhere in Hungary.',
        points: [
          {
            title: 'Fast and flexible shipping',
            text: 'A wide range of shipping options tailored to your needs – from regular routes to one-off deliveries.',
          },
          {
            title: 'Extensive network',
            text: 'Our comprehensive domestic network lets us deliver quickly to any part of Hungary.',
          },
          {
            title: 'Modern fleet, experienced professionals',
            text: 'Modern vehicles and experienced people ensure safe and timely delivery.',
          },
          {
            title: 'Optimised processes',
            text: 'Streamlined logistics processes reduce transport costs and increase efficiency.',
          },
          {
            title: 'Flexible service options',
            text: 'Services that adapt to the needs of different customers and cargo types.',
          },
        ],
      },
      crossdock: {
        title: 'Domestic cross-docking',
        short: 'Goods move directly from incoming to outgoing vehicles – shorter transit times, lower costs.',
        lead: 'Goods are transferred directly from incoming to outgoing shipments – without unnecessary storage.',
        points: [
          {
            title: 'Shorter transit times',
            text: 'Goods are transferred directly between vehicles, keeping time in transit to a minimum.',
          },
          {
            title: 'Greater efficiency',
            text: 'Fewer handling steps make the entire logistics chain more efficient.',
          },
          {
            title: 'Lower costs',
            text: 'No long-term storage means lower warehousing and handling costs.',
          },
          {
            title: 'Faster delivery',
            text: 'Your goods reach their destination sooner – especially important for perishable cargo.',
          },
        ],
      },
      international: {
        title: 'International transport',
        short: 'Road freight across Europe with real-time tracking and competitive, tailored pricing.',
        lead: 'Extensive experience in international road freight across Europe.',
        points: [
          {
            title: 'Road freight across Europe',
            text: 'We deliver your international shipments by road, with our own dedicated fleet.',
          },
          {
            title: 'Transparency',
            text: 'Advanced tracking systems allow real-time monitoring, so you always have up-to-date information on your shipment.',
          },
          {
            title: 'Flexibility',
            text: 'Competitive pricing and flexible solutions tailored to your destination.',
          },
          {
            title: 'Reliable European network',
            text: 'Thanks to our extensive market knowledge, we deliver your goods quickly and reliably anywhere in Europe.',
          },
        ],
      },
    },
    process: {
      eyebrow: 'How it works',
      title: 'From request to delivery',
      steps: {
        request: {
          title: 'Send your request',
          text: 'Tell us what, where and when – including any temperature requirements.',
        },
        offer: {
          title: 'Receive a tailored offer',
          text: 'Your dedicated contact person prepares the best solution for your cargo.',
        },
        organise: {
          title: 'We organise and monitor',
          text: 'We plan the route, assign the vehicle and track the shipment in real time.',
        },
        delivery: {
          title: 'Safe delivery',
          text: 'Your goods arrive on time, in optimal condition and at the right temperature.',
        },
      },
    },
  },

  industries: {
    hero: {
      eyebrow: 'Industries',
      title: 'Specialists in sensitive cargo',
      subtitle:
        'Food and special cargo each follow their own rules. We know them – and we build our processes around them.',
    },
    items: {
      food: {
        title: 'Food transport',
        short: 'Fresh produce, frozen goods and dry items – handled to the highest hygiene and safety standards.',
        lead: 'Transporting food requires special attention and expertise.',
        text: 'Our processes meet the highest hygiene and safety standards, so the quality and freshness of your products are preserved all the way to delivery. Our team knows the specific requirements of the food industry and offers flexible solutions for fresh produce, frozen goods and dry items alike. Our goal: on-time delivery in optimal condition.',
        points: [
          'Fresh produce, frozen goods and dry items',
          'Highest hygiene and safety standards',
          'Quality and freshness preserved until delivery',
        ],
      },
      special: {
        title: 'Special solutions',
        short: 'Oversized, high-value or time-critical cargo handled with a customised logistics strategy.',
        lead: 'Tailored handling for complex or sensitive cargo.',
        text: 'Whether it is oversized items, high-value products or time-sensitive deliveries, our experts develop customised logistics strategies based on advanced technology and in-depth industry knowledge – going beyond standard procedures.',
        points: ['Oversized and heavy items', 'High-value products', 'Time-critical deliveries'],
      },
    },
  },

  sustainability: {
    hero: {
      eyebrow: 'Sustainability',
      title: 'On the road to greener logistics',
      subtitle:
        'Sustainability in transport and logistics is essential to minimise our impact on the environment.',
    },
    intro: {
      eyebrow: 'Our commitment',
      title: 'Lower emissions, higher efficiency',
      paragraphs: [
        'Transport is the backbone of every supply chain – and that comes with responsibility. Our goal is to reduce emissions and increase efficiency in everything we do.',
        'We work together with our partners to minimise unnecessary repositioning – so-called empty runs – and to implement eco-friendly solutions. In this way, we contribute to a greener future for the next generations.',
      ],
    },
    pillarsTitle: 'How we reduce our footprint',
    pillars: {
      routes: {
        title: 'Optimised route planning',
        text: 'Smarter routes mean fewer kilometres, less fuel and lower emissions.',
      },
      fuels: {
        title: 'Alternative fuels',
        text: 'Wherever viable, we look for and adopt alternative fuel solutions.',
      },
      technology: {
        title: 'Modern technologies',
        text: 'Modern vehicles and digital tools make our operations cleaner and more efficient.',
      },
      emptyRuns: {
        title: 'Fewer empty runs',
        text: 'Together with our partners, we minimise the unnecessary repositioning of vehicles.',
      },
    },
    closing: {
      title: 'A greener future for the next generations',
      text: 'Every optimised route and every avoided empty run counts. We are committed to continuous improvement – for our clients, our partners and the environment.',
    },
  },

  contact: {
    hero: {
      eyebrow: 'Contact',
      title: 'Let’s talk about your cargo',
      subtitle:
        'Request a quote or ask us a question – fill in the form and we will get back to you shortly. You can also reach us by phone or email.',
    },
    details: {
      title: 'Contact details',
      company: 'Company',
      phone: 'Phone',
      email: 'Email',
      office: 'Office',
      seat: 'Registered seat',
    },
    map: {
      title: 'Find us',
      consent:
        'The map is provided by Google Maps. When you load it, Google may set cookies and process your data.',
      load: 'Load map',
      open: 'Open in Google Maps',
      iframeTitle: 'Map of the NH Cargo office in Budaörs',
    },
  },

  form: {
    title: 'Request a quote',
    intro: 'Fields marked with * are required.',
    nameOrder: ['firstName', 'lastName'],
    fields: {
      firstName: 'First name',
      lastName: 'Last name',
      company: 'Company name',
      email: 'Email',
      phone: 'Phone',
      pickup: 'Pickup location',
      pickupPlaceholder: 'e.g. Budaörs, HU',
      delivery: 'Delivery location',
      deliveryPlaceholder: 'e.g. Munich, DE',
      cargoType: 'Cargo type',
      cargoPlaceholder: 'Please select',
      temperature: 'Temperature requirement',
      temperaturePlaceholder: 'e.g. +2 to +8 °C',
      date: 'Preferred date',
      message: 'Message',
      messagePlaceholder: 'Quantity, pallets, weight, special requirements…',
      honeypot: 'Leave this field empty',
    },
    cargoOptions: {
      frozen: 'Frozen',
      chilled: 'Chilled',
      fresh: 'Fresh',
      dry: 'Dry goods',
      special: 'Special cargo',
    },
    consent: {
      before: 'I have read the ',
      link: 'Privacy Policy',
      after: ' and consent to NH Cargo Kft. processing my data in order to respond to my enquiry.',
    },
    required: 'required',
    submit: 'Send request',
    sending: 'Sending…',
    success: {
      title: 'Thank you!',
      text: 'Thank you for contacting us. We will get back to you as soon as possible.',
      again: 'Send another message',
    },
    error: {
      title: 'Something went wrong',
      text: 'Your message could not be sent. Please try again later, or contact us directly by phone or email.',
    },
    validation: {
      required: 'Please fill in this field.',
      email: 'Please enter a valid email address.',
      phone: 'Please enter a valid phone number.',
      consent: 'Please accept the Privacy Policy to continue.',
      date: 'Please choose a date that is not in the past.',
      summary: 'Please correct the highlighted fields.',
    },
    subject: 'New quote request – nhcargo.hu',
  },

  cta: {
    title: 'We are here to help you streamline your supply chain!',
    text: 'Tell us what you need to ship, from where and to where – your dedicated contact person will get back to you with a tailored offer.',
    primary: 'Contact us',
  },

  footer: {
    tagline: 'Temperature-controlled road transport for the food industry – across Europe.',
    navTitle: 'Navigation',
    contactTitle: 'Contact',
    legalTitle: 'Legal',
    office: 'Office',
    seat: 'Registered seat',
    rights: 'All rights reserved.',
    linkedin: 'NH Cargo on LinkedIn',
  },

  legalNotice: {
    title: 'Template text',
    text: 'This page is a template. The parts highlighted in yellow must be completed by the client, and the final text should be reviewed by a legal professional.',
  },

  notFound: {
    title: 'Page not found',
    text: 'Sorry, the page you are looking for does not exist or has been moved.',
  },
};
