/**
 * ENGLISH INTERFACE TEXTS – menu, form, cookie banner and other fixed labels.
 * Page content (texts, images, SEO) is edited in the admin: /admin/
 * (files: src/cms/content/*.json). Same structure as hu.ts.
 */
import type { UiDictionary } from './types';

export const en: UiDictionary = {
  nav: {
    home: 'Home',
    about: 'About us',
    services: 'Services',
    sustainability: 'Sustainability',
    contact: 'Contact',
    imprint: 'Imprint',
    privacy: 'Privacy Policy',
    domestic: 'Domestic transport',
    crossdock: 'Cross-docking & storage',
    international: 'International transport',
    cookies: 'Cookie Policy',
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
    requestQuote: 'Request a quote',
    ourServices: 'Our services',
    contactUs: 'Contact us',
    callUs: 'Call us',
    backHome: 'Back to the homepage',
    moreAbout: 'More about us',
  },







  contact: {
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
        'The map is provided by Google Maps. When you load it, Google may set cookies and process your data. You can also allow it permanently in “Cookie settings”.',
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


  footer: {
    navTitle: 'Navigation',
    contactTitle: 'Contact',
    legalTitle: 'Legal',
    office: 'Office',
    seat: 'Registered seat',
    rights: 'All rights reserved.',
    linkedin: 'NH Cargo on LinkedIn',
    cookieSettings: 'Cookie settings',
  },

  legalNotice: {
    title: 'LEGAL REVIEW REQUIRED',
    text: 'This page is a template, not a final legal text. The parts highlighted in yellow must be completed, and the full text must be approved by a legal professional.',
  },

  notFound: {
    title: 'Page not found',
    text: 'Sorry, the page you are looking for does not exist or has been moved.',
  },

  about: {
    placeholder: { label: 'Image goes here', file: 'Upload: admin › Images ›', size: 'Recommended size' },
    slots: {
      fejlec: { title: 'Header background' },
      csapat: { title: 'Team / office' },
      flotta: { title: 'Refrigerated units' },
      raktar: { title: 'Cold storage along the M0' },
    },
  },
  consent: {
    title: 'Cookies and external content',
    text: 'We only store what is necessary for this website to work. Google Maps (external content) is only loaded with your consent. You can change your choice at any time via “Cookie settings” in the footer.',
    accept: 'Accept',
    reject: 'Reject',
    settings: 'Settings',
    save: 'Save selection',
    dialogTitle: 'Cookie settings',
    necessary: { title: 'Necessary', text: 'Needed to remember your cookie preferences. Always active.' },
    media: { title: 'External content (Google Maps)', text: 'Shows the map on the Contact page. When loaded, Google may set cookies and process data such as your IP address.' },
    alwaysOn: 'Always active',
    policy: 'Cookie Policy',
    close: 'Close',
  },
};
