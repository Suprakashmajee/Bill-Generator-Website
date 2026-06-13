import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, Trash2, Download, RefreshCw, Eye, EyeOff, LayoutTemplate, 
  MapPin, User, FileText, IndianRupee, CreditCard, Sparkles, Check, HelpCircle, Upload, QrCode
} from 'lucide-react';
import { InvoiceData, InvoiceItem, CountryCode } from '../types';
import { COUNTRIES, US_STATES, INDIA_STATES } from '../utils/countries';
import { numberToWords } from '../utils/numberToWords';

// Standard demo datasets for US, India, and UK to showcase features
const SAMPLE_DATASETS: Record<CountryCode, Partial<InvoiceData>> = {
  US: {
    country: 'US',
    templateStyle: 'professional',
    accentColor: '#0f172a', // Slate 900
    textColor: '#1e293b',
    fontSize: 'sm',
    sender: {
      name: 'Acme Tech Solutions Inc.',
      email: 'billing@acmetechnology.com',
      phone: '+1 (555) 432-8700',
      address: '100 Silicon Valley Blvd, Suite 400, San Jose',
      state: 'CA',
      zipCode: '95112',
      taxId: 'US-87654321-X'
    },
    receiver: {
      name: 'Global Enterprise Partners',
      email: 'ap@globalenterprise.com',
      phone: '+1 (555) 019-2199',
      address: '750 Broadway Ave, Floor 12, New York',
      state: 'NY',
      zipCode: '10003',
      taxId: 'US-22334455-A'
    },
    meta: {
      invoiceNumber: 'BS-2026-0089',
      invoiceDate: '2026-06-13',
      dueDate: '2026-07-13',
      paymentTerms: 'NET 30',
      poNumber: 'PO-99120',
      notes: 'Thank you for choosing Acme Tech. We appreciate your ongoing business support.',
      termsAndConditions: 'Please process the balance within 30 days of receipt. Interest charges of 1.5% per month apply to overdue bills.'
    },
    items: [
      { id: '1', name: 'Premium Cloud Host Platform Services', description: 'Enterprise dedicated VPS instances with isolated Node configs', quantity: 2, rate: 1250, discountPercent: 10, taxPercent: 7.25 },
      { id: '2', name: 'AI Optimization Engineering Hours', description: 'Model tuning, vector semantic search architecture pipeline design', quantity: 15, rate: 150, discountPercent: 0, taxPercent: 7.25 }
    ],
    shippingCharges: 45,
    discountTotal: 100,
    bankDetails: {
      showBankDetails: true,
      bankName: 'Silicon Valley Premier Bank',
      accountNumber: '990218733220',
      ifscCode: 'SVPB-US-CA',
      accountHolder: 'Acme Tech Solutions LLC',
      branchName: 'Downtown San Jose',
      showUpiQr: false
    }
  },
  IN: {
    country: 'IN',
    templateStyle: 'gst-modern',
    accentColor: '#a16207', // Amber 705
    textColor: '#3f2c06',
    fontSize: 'sm',
    sender: {
      name: 'Zenith Info System Private Limited',
      email: 'accounting@zenithindia.co.in',
      phone: '+91 98450 12345',
      address: 'Block C, Outer Ring Road, Manyata Tech Park, Bengaluru',
      state: 'KA', // Karnataka
      zipCode: '560045',
      gstin: '29AAACZ1234A1Z5',
      pan: 'AAACZ1234A'
    },
    receiver: {
      name: 'Omex Digital Retailers Ltd.',
      email: 'purchase@omex.in',
      phone: '+91 99123 45678',
      address: 'Sakinaka Metro Blvd, Andheri East, Mumbai',
      state: 'MH', // Maharashtra (Igst split happens!)
      zipCode: '400072',
      gstin: '27AABCX4321B2Z9'
    },
    meta: {
      invoiceNumber: 'ZIS/2026-27/089',
      invoiceDate: '2026-06-13',
      dueDate: '2026-06-28',
      paymentTerms: 'Due on Receipt',
      placeOfSupply: 'Maharashtra (MH)',
      poNumber: 'DIG/2026/A1',
      notes: 'GST tax calculated on inter-state basis (IGST 18% as Place of Supply differs from Vendor state).',
      termsAndConditions: 'Please draw the check in favor of Zenith Info Private Limited. All differences are subject to Bengaluru juridiction.'
    },
    items: [
      { id: '1', name: 'Software Consulting Services', description: 'Design and deployment of highly scalable microservice orchestrators', quantity: 1, rate: 85000, discountPercent: 5, taxPercent: 18 },
      { id: '2', name: 'SaaS Platform Lizence Add-ons', description: 'Yearly subscription license key for 25 admin accounts', quantity: 1, rate: 12000, discountPercent: 0, taxPercent: 18 }
    ],
    shippingCharges: 0,
    discountTotal: 5000,
    bankDetails: {
      showBankDetails: true,
      bankName: 'HDFC Bank Limited',
      accountNumber: '50100438271822',
      ifscCode: 'HDFC0000140',
      accountHolder: 'Zenith Info System Pvt Ltd',
      branchName: 'Manyata Tech Park, Bangalore',
      upiId: 'zenith@okhdfc',
      showUpiQr: true
    }
  },
  GB: {
    country: 'GB',
    templateStyle: 'elegance',
    accentColor: '#1d4ed8', // Blue 700
    textColor: '#1f2937',
    fontSize: 'sm',
    sender: {
      name: 'London Creative Agency Ltd',
      email: 'billing@londoncreative.co.uk',
      phone: '+44 20 7946 0192',
      address: '22 Baker St, Marylebone, London',
      zipCode: 'NW1 6XE',
      vatNumber: 'GB 123 4567 89'
    },
    receiver: {
      name: 'Euro Ventures Group SAS',
      email: 'accounts@euroventures.eu',
      phone: '+33 1 42 27 78 90',
      address: '15 Rue de Rivoli, Paris',
      zipCode: '75001',
      vatNumber: 'EU 987 6543 21'
    },
    meta: {
      invoiceNumber: 'LCA-4421',
      invoiceDate: '2026-06-13',
      dueDate: '2026-07-13',
      paymentTerms: 'NET 30',
      notes: 'Cross-border service delivery. VAT computed at standard rates (20%) where applicable.',
      termsAndConditions: 'Standard payment in GBP. Delayed payments bear a statutory penalty of 8% interest above Bank of England base rate.'
    },
    items: [
      { id: '1', name: 'Brand Strategy & Marketing Playbook', description: 'Complete company design guidelines, logo formats, typographic guide', quantity: 1, rate: 4500, discountPercent: 0, taxPercent: 20 },
      { id: '2', name: 'Front-End React Integration Retainer', description: 'Weekly modular component development and optimization services', quantity: 4, rate: 1200, discountPercent: 5, taxPercent: 20 }
    ],
    shippingCharges: 0,
    discountTotal: 250,
    bankDetails: {
      showBankDetails: true,
      bankName: 'Barclays Bank PLC',
      accountNumber: '88127364',
      ifscCode: '20-45-78', // Uses Sort Code placeholder
      accountHolder: 'London Creative Agency LLP',
      branchName: 'Regent Street, London',
      showUpiQr: false
    }
  },
  CA: {
    country: 'CA',
    templateStyle: 'professional',
    accentColor: '#dc2626', // Red 600
    textColor: '#1f2937',
    fontSize: 'sm',
    sender: {
      name: 'Maplewood Forestry Supply',
      email: 'sales@maplewoodforest.ca',
      phone: '+1 (416) 123-4567',
      address: '45 Parliament St, Toronto, ON',
      state: 'ON',
      zipCode: 'M5A 2Y2',
      taxId: 'CA-987654321-RT0001'
    },
    receiver: {
      name: 'Northwood Builders Co.',
      email: 'ops@northwoodbuilders.ca',
      phone: '+1 (604) 987-6543',
      address: '888 Robson St, Vancouver, BC',
      state: 'BC',
      zipCode: 'V6Z 2E7'
    },
    meta: {
      invoiceNumber: 'MFS-26-003',
      invoiceDate: '2026-06-13',
      dueDate: '2026-07-13',
      paymentTerms: 'NET 30',
      notes: 'Thank you for your construction supply orders.',
      termsAndConditions: 'Standard warranty rules apply to raw lumber products. Goods remain properties of seller until fully settled.'
    },
    items: [
      { id: '1', name: 'Premium Douglas Fir Planks', description: 'Sanded construction utility lumber logs 2x4x8 qty packs', quantity: 50, rate: 18.5, discountPercent: 0, taxPercent: 13 },
      { id: '2', name: 'Heavy Duty Structural Bolts', description: 'Anti-rust stainless industrial utility anchor packages', quantity: 10, rate: 45, discountPercent: 10, taxPercent: 13 }
    ],
    shippingCharges: 150,
    discountTotal: 50,
    bankDetails: {
      showBankDetails: true,
      bankName: 'Royal Bank of Canada (RBC)',
      accountNumber: '112-443-1', // Route details
      ifscCode: '003-00002', // Transit details
      accountHolder: 'Maplewood Supply Inc.',
      branchName: 'Queens Quay Branch',
      showUpiQr: false
    }
  },
  AU: {
    country: 'AU',
    templateStyle: 'professional',
    accentColor: '#059669', // Emerald 600
    textColor: '#1f2937',
    fontSize: 'sm',
    sender: {
      name: 'Aussie Web Developers Pty Ltd',
      email: 'finance@aussieweb.com.au',
      phone: '+61 2 9234 5678',
      address: 'Suite 101, 80 Elizabeth St, Sydney, NSW',
      zipCode: '2000',
      taxId: 'ABN 45 123 456 789'
    },
    receiver: {
      name: 'Outback Tourism Expeditions',
      email: 'accounts@outbacktourism.com.au',
      phone: '+61 8 8952 1234',
      address: '44 Todd Mall, Alice Springs, NT',
      zipCode: '0870'
    },
    meta: {
      invoiceNumber: 'AUD-3382',
      invoiceDate: '2026-06-13',
      dueDate: '2026-06-27',
      paymentTerms: '14 Days From Issue',
      notes: 'Thank you for trusting Aussie Web for your mobile applications and SEO consulting.',
      termsAndConditions: 'Aussie Web retains structural codebase code until full execution fee is transferred.'
    },
    items: [
      { id: '1', name: 'Cross-platform Mobile Booking App Development', description: 'Sprint 3 implementation: payments gateway + GPS tracker mapping', quantity: 1, rate: 6500, discountPercent: 0, taxPercent: 10 },
      { id: '2', name: 'Cloud Server Migration Service', description: 'Safe database transfer to AWS Sydney servers', quantity: 1, rate: 1200, discountPercent: 10, taxPercent: 10 }
    ],
    shippingCharges: 0,
    discountTotal: 300,
    bankDetails: {
      showBankDetails: true,
      bankName: 'Commonwealth Bank of Australia',
      accountNumber: '1234 56789',
      ifscCode: '062-900', // BSB code
      accountHolder: 'Aussie Web Developers Trust Account',
      branchName: 'George St Sydney',
      showUpiQr: false
    }
  },
  DE: {
    country: 'DE',
    templateStyle: 'compact',
    accentColor: '#2563eb',
    textColor: '#1f2937',
    fontSize: 'sm',
    sender: {
      name: 'München Tech Engineering GmbH',
      email: 'zahlen@muenchen-tech.de',
      phone: '+49 89 2314 567',
      address: 'Maximilianstraße 12, München',
      zipCode: '80539',
      vatNumber: 'DE 987654321'
    },
    receiver: {
      name: 'Stuttgart Automotives SE & Co',
      email: 'kreditoren@stuttgart-auto.de',
      phone: '+49 711 9845 000',
      address: 'Königstraße 5, Stuttgart',
      zipCode: '70173',
      vatNumber: 'DE 123456789'
    },
    meta: {
      invoiceNumber: 'MTE-2026/044',
      invoiceDate: '2026-06-13',
      dueDate: '2026-07-28',
      paymentTerms: 'NET 45',
      notes: 'Lieferung gemäß Vereinbarung. Wir bedanken uns für Ihre Kooperation.',
      termsAndConditions: 'Gerichtsstand ist München. Zahlbar ohne Abzug innerhalb von 45 Tagen auf das unten genannte Bankkonto.'
    },
    items: [
      { id: '1', name: 'CAD Software Blueprint Optimization', description: 'Detailed stress-analysis calculations for electric motor mounts', quantity: 12, rate: 180, discountPercent: 0, taxPercent: 19 },
      { id: '2', name: 'CNC Parts Machining Prototypes', description: 'Laser cut aerospace grade grade-5 aluminum components', quantity: 4, rate: 450, discountPercent: 15, taxPercent: 19 }
    ],
    shippingCharges: 45.5,
    discountTotal: 100,
    bankDetails: {
      showBankDetails: true,
      bankName: 'Deutsche Bank AG',
      accountNumber: 'DE89 3704 0044 0532 01', // IBAN style
      ifscCode: 'DEUTDEMMXXX', // BIC code
      accountHolder: 'München Tech Engineering GmbH',
      branchName: 'Hauptfiliale München',
      showUpiQr: false
    }
  },
  AE: {
    country: 'AE',
    templateStyle: 'elegance',
    accentColor: '#0d9488', // Teal 600
    textColor: '#0f172a',
    fontSize: 'sm',
    sender: {
      name: 'Al-Sahr Digital Ventures Dubai LLC',
      email: 'finance@alsahradigital.ae',
      phone: '+971 4 456 7890',
      address: 'Level 44, Emirates Towers, Sheikh Zayed Rd, Dubai',
      zipCode: 'P.O. Box 7728',
      vatNumber: '100034526700003' // TRN (Tax Registration Number)
    },
    receiver: {
      name: 'Abu Dhabi Investments Capital',
      email: 'info@adinvestcap.ae',
      phone: '+971 2 612 3456',
      address: 'Al Maryah Island, Abu Dhabi Global Market Square',
      zipCode: 'P.O. Box 2244'
    },
    meta: {
      invoiceNumber: 'ADV-Dubai-26019',
      invoiceDate: '2026-06-13',
      dueDate: '2026-07-13',
      paymentTerms: 'NET 30',
      notes: 'Creative designs & UI/UX services for Abu Dhabi investment dashboard launch.',
      termsAndConditions: 'Prices are in AED (United Arab Emirates Dirham). Standard VAT rate is evaluated at 5%.'
    },
    items: [
      { id: '1', name: 'Fintech Dashboard Wireframes & UI Prototypes', description: 'Figma high fidelity deliverables, component library, interactions setup', quantity: 1, rate: 35000, discountPercent: 5, taxPercent: 5 },
      { id: '2', name: 'SEO & Copywriting Content Packages', description: 'Search engine optimized content drafts for 20 web articles', quantity: 5, rate: 1200, discountPercent: 0, taxPercent: 5 }
    ],
    shippingCharges: 0,
    discountTotal: 1500,
    bankDetails: {
      showBankDetails: true,
      bankName: 'Emirates NBD PJSC',
      accountNumber: 'AE03 0260 0000 1234 5678 901',
      ifscCode: 'ENBDUAEHH',
      accountHolder: 'Al-Sahr Digital Ventures LLC',
      branchName: 'Emaar Square, Dubai',
      showUpiQr: false
    }
  },
  OTHER: {
    country: 'OTHER',
    templateStyle: 'professional',
    accentColor: '#4f46e5', // Indigo 600
    textColor: '#1f2937',
    fontSize: 'sm',
    sender: {
      name: 'Global Services Network',
      email: 'accounting@globalservices.net',
      phone: '+41 22 730 01 11',
      address: 'Route de Genève 45, Geneva',
      zipCode: '1201',
      taxId: 'CH-982.112.001'
    },
    receiver: {
      name: 'International Trading Solutions Ltd',
      email: 'settlement@internationaltrading.sg',
      phone: '+65 6789 0123',
      address: '10 Marina Boulevard, Tower 2, Marina Bay',
      zipCode: '018983'
    },
    meta: {
      invoiceNumber: 'GSN-99432',
      invoiceDate: '2026-06-13',
      dueDate: '2026-06-25',
      paymentTerms: 'NET 12',
      notes: 'General invoicing for supply chain integration consultation.',
      termsAndConditions: 'All fees are evaluated in standard international currency USD.'
    },
    items: [
      { id: '1', name: 'Supply Chain Audit and Automation Feasibility study', description: 'Comprehensive review of current logistics workflows and database bottlenecks', quantity: 1, rate: 8400, discountPercent: 0, taxPercent: 0 }
    ],
    shippingCharges: 0,
    discountTotal: 400,
    bankDetails: {
      showBankDetails: true,
      bankName: 'UBS AG Switzerland',
      accountNumber: 'CH12 0023 5431 9928 1123 A',
      ifscCode: 'UBSWCHZH120',
      accountHolder: 'Global Services Network S.A.',
      branchName: 'Geneva Head Branch',
      showUpiQr: false
    }
  }
};

const EMPTY_ITEM = (id: string): InvoiceItem => ({
  id,
  name: '',
  description: '',
  quantity: 1,
  rate: 0,
  taxPercent: 5,
  discountPercent: 0
});

export default function BillingEngine() {
  const [invoice, setInvoice] = useState<InvoiceData>({
    country: 'US',
    templateStyle: 'professional',
    accentColor: '#1e3a8a', // Dark Navy Blue
    textColor: '#1e293b',
    fontSize: 'sm',
    sender: {
      name: '',
      email: '',
      phone: '',
      address: '',
      logoUrl: '',
      taxId: '',
      gstin: '',
      pan: '',
      vatNumber: '',
      state: '',
      zipCode: ''
    },
    receiver: {
      name: '',
      email: '',
      phone: '',
      address: '',
      taxId: '',
      gstin: '',
      state: '',
      zipCode: ''
    },
    meta: {
      invoiceNumber: 'INV-' + Math.floor(100000 + Math.random() * 900000),
      invoiceDate: new Date().toISOString().substring(0, 10),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
      paymentTerms: 'NET 30',
      placeOfSupply: '',
      poNumber: '',
      notes: '',
      termsAndConditions: 'Payment is due within 30 days of the invoice date.'
    },
    items: [ { ...EMPTY_ITEM('1') } ],
    shippingCharges: 0,
    discountTotal: 0,
    bankDetails: {
      showBankDetails: true,
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      accountHolder: '',
      branchName: '',
      upiId: '',
      showUpiQr: false
    }
  });

  const [activeTab, setActiveTab] = useState<'design' | 'sender_receiver' | 'meta' | 'items' | 'payment'>('sender_receiver');
  const [currentCurrency, setCurrentCurrency] = useState('USD');
  const [currentSymbol, setCurrentSymbol] = useState('$');
  const [logoFile, setLogoFile] = useState<string | null>(null);
  const [signatureFile, setSignatureFile] = useState<string | null>(null);
  const [previewHidden, setPreviewHidden] = useState(false);
  const [history, setHistory] = useState<InvoiceData[]>([]);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  
  const invoicePreviewRef = useRef<HTMLDivElement>(null);

  // Load initial sample data (US by default) to make the preview look gorgeous from the start!
  useEffect(() => {
    applySampleData('US');
    // Load local storage history if exists
    try {
      const savedHistory = localStorage.getItem('billstore_history');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.error('Error loading history', e);
    }
  }, []);

  // Whenever country change, update standard currencies & presets
  const handleCountryChange = (cCode: CountryCode) => {
    const config = COUNTRIES[cCode];
    setCurrentCurrency(config.currency);
    setCurrentSymbol(config.currencySymbol);
    
    setInvoice(prev => ({
      ...prev,
      country: cCode,
      sender: {
        ...prev.sender,
        state: cCode === 'US' ? 'CA' : cCode === 'IN' ? 'KA' : '',
      },
      receiver: {
        ...prev.receiver,
        state: cCode === 'US' ? 'NY' : cCode === 'IN' ? 'MH' : '',
      }
    }));
  };

  const applySampleData = (cCode: CountryCode) => {
    const sample = SAMPLE_DATASETS[cCode];
    if (sample) {
      const config = COUNTRIES[cCode];
      setCurrentCurrency(config.currency);
      setCurrentSymbol(config.currencySymbol);
      
      setInvoice(prev => ({
        ...prev,
        ...sample,
        sender: { ...prev.sender, ...sample.sender },
        receiver: { ...prev.receiver, ...sample.receiver },
        meta: { ...prev.meta, ...sample.meta },
        items: sample.items ? sample.items.map(item => ({ ...item })) : prev.items,
        bankDetails: { ...prev.bankDetails, ...sample.bankDetails }
      }));
    }
  };

  const handleSenderChange = (field: keyof typeof invoice.sender, value: string) => {
    setInvoice(prev => ({
      ...prev,
      sender: {
        ...prev.sender,
        [field]: value
      }
    }));
  };

  const handleReceiverChange = (field: keyof typeof invoice.receiver, value: string) => {
    setInvoice(prev => ({
      ...prev,
      receiver: {
        ...prev.receiver,
        [field]: value
      }
    }));
  };

  const handleMetaChange = (field: keyof typeof invoice.meta, value: string) => {
    setInvoice(prev => ({
      ...prev,
      meta: {
        ...prev.meta,
        [field]: value
      }
    }));
  };

  const handleBankChange = (field: keyof typeof invoice.bankDetails, value: any) => {
    setInvoice(prev => ({
      ...prev,
      bankDetails: {
        ...prev.bankDetails,
        [field]: value
      }
    }));
  };

  // Line Items Operations
  const handleItemChange = (itemId: string, field: keyof InvoiceItem, value: any) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            [field]: value
          };
        }
        return item;
      })
    }));
  };

  const addItemRow = () => {
    const newId = (invoice.items.length + 1).toString();
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, EMPTY_ITEM(newId)]
    }));
  };

  const deleteItemRow = (id: string) => {
    if (invoice.items.length <= 1) {
      alert('Your invoice needs at least 1 line item!');
      return;
    }
    setInvoice(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  // Files Upload Handlers
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignatureFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculations State
  const calculateTotals = () => {
    let subtotal = 0;
    let taxTotal = 0;
    
    // Each line item can have rates, discounts and dynamic country tax percent
    const processedItems = invoice.items.map(item => {
      const lineCost = item.quantity * item.rate;
      const lineDiscount = lineCost * (item.discountPercent / 100);
      const afterDiscount = lineCost - lineDiscount;
      
      let finalTaxRate = item.taxPercent;
      
      // If US and using global state sales tax auto calculations
      if (invoice.country === 'US' && invoice.sender.state) {
        const matchingState = US_STATES.find(s => s.code === invoice.sender.state);
        if (matchingState) {
          finalTaxRate = matchingState.rate;
        }
      }

      const itemTax = afterDiscount * (finalTaxRate / 100);
      subtotal += afterDiscount;
      taxTotal += itemTax;

      return {
        ...item,
        actualTaxRate: finalTaxRate,
        lineTotal: afterDiscount
      };
    });

    // Custom Indian GST split computation
    let cgst = 0;
    let sgst = 0;
    let igst = 0;
    let isSameState = true;

    if (invoice.country === 'IN') {
      const senderState = invoice.sender.state || 'KA';
      const receiverState = invoice.receiver.state || 'KA';
      isSameState = senderState === receiverState;

      if (isSameState) {
        cgst = taxTotal / 2;
        sgst = taxTotal / 2;
      } else {
        igst = taxTotal;
      }
    }

    const ship = Number(invoice.shippingCharges) || 0;
    const flatDiscount = Number(invoice.discountTotal) || 0;
    const grandTotal = Math.max(0, subtotal + taxTotal + ship - flatDiscount);

    const totalWords = numberToWords(grandTotal, currentCurrency);

    return {
      subtotal,
      taxTotal,
      cgst,
      sgst,
      igst,
      isSameState,
      grandTotal,
      totalWords,
      processedItems
    };
  };

  const calc = calculateTotals();

  // Reset Everything
  const handleReset = () => {
    if (confirm('Are you certain you want to reset all active inputs?')) {
      setLogoFile(null);
      setSignatureFile(null);
      setInvoice({
        country: 'US',
        templateStyle: 'professional',
        accentColor: '#1e3a8a',
        textColor: '#1e293b',
        fontSize: 'sm',
        sender: {
          name: '',
          email: '',
          phone: '',
          address: '',
          taxId: '',
          gstin: '',
          pan: '',
          vatNumber: '',
          state: '',
          zipCode: ''
        },
        receiver: {
          name: '',
          email: '',
          phone: '',
          address: '',
          taxId: '',
          gstin: '',
          state: '',
          zipCode: ''
        },
        meta: {
          invoiceNumber: 'INV-' + Math.floor(100000 + Math.random() * 900000),
          invoiceDate: new Date().toISOString().substring(0, 10),
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
          paymentTerms: 'NET 30',
          placeOfSupply: '',
          poNumber: '',
          notes: '',
          termsAndConditions: 'Payment is due within 30 days of standard invoice date.'
        },
        items: [ { ...EMPTY_ITEM('1') } ],
        shippingCharges: 0,
        discountTotal: 0,
        bankDetails: {
          showBankDetails: true,
          bankName: '',
          accountNumber: '',
          ifscCode: '',
          accountHolder: '',
          branchName: '',
          upiId: '',
          showUpiQr: false
        }
      });
      setCurrentCurrency('USD');
      setCurrentSymbol('$');
    }
  };

  // Generate & Download PDF using html2canvas & jspdf!
  const handleDownloadPdf = async () => {
    if (!invoice.sender.name || !invoice.receiver.name) {
      alert('Please fill out at least Vendor Name & Client Name before generating standard receipts!');
      return;
    }

    setIsGeneratingPdf(true);

    try {
      // Lazy load html2canvas & jspdf safely 
      const html2canvasModule = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const target = invoicePreviewRef.current;
      if (!target) {
        throw new Error('Invoice element wrapper reference is not found!');
      }

      // Hide temporary editing buttons in DOM element capture if any are inside the container
      const opt = {
        scale: 2, // Standard high resolution scale
        useCORS: true,
        allowTaint: true
      };

      const canvas = await html2canvasModule(target, opt);
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210; // A4 size width in mm
      const pageHeight = 297; // A4 size height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Draw standard single or multi-page PDF dynamically
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName = `${invoice.sender.name.replace(/\s+/g, '_')}_Invoice_${invoice.meta.invoiceNumber}.pdf`;
      pdf.save(fileName);

      // Save to active history stack locally
      const updatedHistory = [invoice, ...history.slice(0, 9)];
      setHistory(updatedHistory);
      localStorage.setItem('billstore_history', JSON.stringify(updatedHistory));

    } catch (error) {
      console.error('PDF Build error: ', error);
      alert('Failed to output printable receipt model. Standard system default print view will activate!');
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <section id="billing-engine" className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12 scroll-mt-20">
      
      {/* Upper Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-sky-50/75 p-4 rounded-2xl border border-sky-200">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-gray-950 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-sky-500 animate-pulse" />
            Invoice Customizer Panel
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">Custom compliance controls aligned beautifully with physical corporate structures.</p>
        </div>

        {/* Action presets */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 bg-white border border-sky-200 px-3 py-1.5 rounded-xl">
            <span className="text-xs font-bold text-gray-650">Preset Samples:</span>
            {['US', 'IN', 'GB', 'CA', 'AU'].map((demoCode) => (
              <button
                key={demoCode}
                id={`demo-btn-${demoCode}`}
                onClick={() => applySampleData(demoCode as CountryCode)}
                className={`text-[10px] font-extrabold px-2 py-1 rounded-md transition-all cursor-pointer ${
                  invoice.country === demoCode 
                    ? 'bg-sky-400 text-gray-950 shadow-xs' 
                    : 'bg-gray-100 hover:bg-sky-100 text-gray-600'
                }`}
              >
                {demoCode}
              </button>
            ))}
          </div>

          <button
            id="engine-reset-btn"
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-xl border border-sky-300 bg-white hover:bg-sky-50 px-3 py-2 text-xs font-bold text-gray-700 cursor-pointer transition"
            title="Reset active form inputs"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset Form
          </button>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Column - 7 Columns Width */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section: Country and Template Design Styling */}
          <div className="bg-white rounded-2xl border border-sky-200 p-6 shadow-xs relative">
            <span className="absolute -top-3 left-6 inline-flex h-6 items-center justify-center rounded-full bg-sky-400 px-3 text-xs font-black text-gray-955 shadow-sm">
              1. Region & Themes
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-xs font-black text-gray-700 mb-1.5">Selected Global Region</label>
                <select
                  id="country-selection"
                  value={invoice.country}
                  onChange={(e) => handleCountryChange(e.target.value as CountryCode)}
                  className="w-full h-11 bg-gray-55/65 hover:bg-gray-50 border border-gray-200 rounded-xl px-3 text-sm font-semibold focus:border-sky-500 focus:outline-hidden transition cursor-pointer"
                >
                  {Object.values(COUNTRIES).map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name} ({c.currencySymbol})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-gray-700 mb-1.5">PDF Frame Style</label>
                <select
                  id="template-style"
                  value={invoice.templateStyle}
                  onChange={(e) => setInvoice(prev => ({ ...prev, templateStyle: e.target.value as any }))}
                  className="w-full h-11 bg-gray-55/65 hover:bg-gray-50 border border-gray-200 rounded-xl px-3 text-sm font-semibold focus:border-sky-500 focus:outline-hidden transition cursor-pointer"
                >
                  <option value="professional">Professional Classic</option>
                  <option value="gst-modern">Modern Dual-Column</option>
                  <option value="compact">Compact Minimalist</option>
                  <option value="elegance">Elegance Borderless</option>
                </select>
              </div>
            </div>

            {/* Design accents */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Invoice Accent Highlight</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    id="accent-color-colorpicker"
                    value={invoice.accentColor}
                    onChange={(e) => setInvoice(prev => ({ ...prev, accentColor: e.target.value }))}
                    className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    value={invoice.accentColor}
                    onChange={(e) => setInvoice(prev => ({ ...prev, accentColor: e.target.value }))}
                    className="w-full h-10 bg-gray-55/65 border border-gray-200 rounded-lg px-2 text-xs font-mono"
                    placeholder="#1e3a8a"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Font Base Size</label>
                <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-xl">
                  {['xs', 'sm', 'base'].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      id={`font-sz-btn-${sz}`}
                      onClick={() => setInvoice(prev => ({ ...prev, fontSize: sz as any }))}
                      className={`py-1 text-xs font-bold rounded-lg capitalize cursor-pointer transition-all ${
                        invoice.fontSize === sz ? 'bg-white text-gray-950 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                  Logo Upload
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    id="business-logo-imagefile"
                    className="hidden"
                  />
                  <label
                    htmlFor="business-logo-imagefile"
                    className="flex items-center justify-center gap-1.5 h-10 border border-dashed border-gray-350 rounded-lg text-xs font-bold text-gray-650 bg-gray-55/50 hover:bg-sky-50 hover:border-sky-400 cursor-pointer transition"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    {logoFile ? 'Change Logo' : 'Select File'}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Sender and Receiver Contact Details Accordion */}
          <div className="bg-white rounded-2xl border border-sky-200 p-6 shadow-xs relative">
            <span className="absolute -top-3 left-6 inline-flex h-6 items-center justify-center rounded-full bg-sky-400 px-3 text-xs font-black text-gray-955 shadow-sm">
              2. Vendor & Client
            </span>

            {/* Toggle state display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              
              {/* SENDER / MERCHANT BLOCK */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <h3 className="text-sm font-bold text-gray-950 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    Vendor Details (From)
                  </h3>
                  {localStorage.getItem('billstore_curr_user') && (
                    <button
                      type="button"
                      id="autofill-profile-btn"
                      onClick={() => {
                        try {
                          const savedUserStr = localStorage.getItem('billstore_curr_user');
                          if (savedUserStr) {
                            const savedUser = JSON.parse(savedUserStr);
                            const savedProfileStr = localStorage.getItem(`profile_${savedUser.email.toLowerCase()}`);
                            if (savedProfileStr) {
                              const savedProfile = JSON.parse(savedProfileStr);
                              
                              setInvoice(prev => ({
                                ...prev,
                                sender: {
                                  ...prev.sender,
                                  name: savedProfile.name || prev.sender.name,
                                  email: savedProfile.email || prev.sender.email,
                                  phone: savedProfile.phone || prev.sender.phone,
                                  address: savedProfile.businessAddress || prev.sender.address,
                                  taxId: savedProfile.taxId || prev.sender.taxId,
                                  zipCode: savedProfile.zipCode || prev.sender.zipCode,
                                  state: savedProfile.state || prev.sender.state,
                                }
                              }));
                              alert('Seeded billing parameters from your master customer profile.');
                            } else {
                              alert('Initialize your Brand Profile first by clicking your name in the navigation header.');
                            }
                          }
                        } catch (err) {
                          console.error(err);
                          alert('Error pulling profile coordinates.');
                        }
                      }}
                      className="inline-flex items-center gap-1 text-[10px] font-black bg-sky-50 text-sky-700 hover:bg-sky-100 px-2.5 py-1 rounded-md border border-sky-200 cursor-pointer transition active:scale-95 text-xs font-semibold"
                    >
                      📄 Fill from Profile
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">Company / Creator Name</label>
                  <input
                    id="sender-name"
                    type="text"
                    value={invoice.sender.name}
                    onChange={(e) => handleSenderChange('name', e.target.value)}
                    placeholder="e.g. Oracle Media Solutions"
                    className="w-full h-10 border border-gray-200 rounded-lg px-3 text-xs focus:border-sky-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={invoice.sender.email}
                      onChange={(e) => handleSenderChange('email', e.target.value)}
                      placeholder="bill@company.com"
                      className="w-full h-10 border border-gray-200 rounded-lg px-3 text-xs focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={invoice.sender.phone}
                      onChange={(e) => handleSenderChange('phone', e.target.value)}
                      placeholder="+91 95643 27643"
                      className="w-full h-10 border border-gray-200 rounded-lg px-3 text-xs focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">HQ Address</label>
                  <textarea
                    rows={2}
                    value={invoice.sender.address}
                    onChange={(e) => handleSenderChange('address', e.target.value)}
                    placeholder="BTM Layout, 6th Stage, Bangalore"
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-xs focus:border-sky-500"
                  ></textarea>
                </div>

                {/* Localized inputs based on Country */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-dashed border-gray-100">
                  {invoice.country === 'US' ? (
                    <>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-650">State (Tax Rate)</label>
                        <select
                          value={invoice.sender.state}
                          onChange={(e) => handleSenderChange('state', e.target.value)}
                          className="w-full h-10 border border-gray-200 rounded-lg px-2 text-xs"
                        >
                          {US_STATES.map(s => (
                            <option key={s.code} value={s.code}>{s.name} ({s.rate}%)</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-650">ZIP Code</label>
                        <input
                          type="text"
                          value={invoice.sender.zipCode}
                          onChange={(e) => handleSenderChange('zipCode', e.target.value)}
                          placeholder="ZIP Info"
                          className="w-full h-10 border border-gray-200 rounded-lg px-3 text-xs"
                        />
                      </div>
                    </>
                  ) : invoice.country === 'IN' ? (
                    <>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-650">GSTIN Number</label>
                        <input
                          type="text"
                          value={invoice.sender.gstin}
                          onChange={(e) => handleSenderChange('gstin', e.target.value.toUpperCase())}
                          placeholder="29AAACZ1234A1Z5"
                          className="w-full h-10 border border-gray-200 rounded-lg px-3 text-xs"
                          maxLength={15}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-655">PAN Number</label>
                        <input
                          type="text"
                          value={invoice.sender.pan}
                          onChange={(e) => handleSenderChange('pan', e.target.value.toUpperCase())}
                          placeholder="AAACZ1234A"
                          className="w-full h-10 border border-gray-200 rounded-lg px-2 text-xs"
                          maxLength={10}
                        />
                      </div>
                    </>
                  ) : invoice.country === 'GB' || COUNTRIES[invoice.country].hasVat ? (
                    <>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-650">VAT Registration No.</label>
                        <input
                          type="text"
                          value={invoice.sender.vatNumber}
                          onChange={(e) => handleSenderChange('vatNumber', e.target.value.toUpperCase())}
                          placeholder="GB 123 4567 89"
                          className="w-full h-10 border border-gray-200 rounded-lg px-3 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-650">Postal Code</label>
                        <input
                          type="text"
                          value={invoice.sender.zipCode}
                          onChange={(e) => handleSenderChange('zipCode', e.target.value)}
                          placeholder="e.g. NW1 6XE"
                          className="w-full h-10 border border-gray-200 rounded-lg px-3 text-xs"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-650">Tax ID</label>
                        <input
                          type="text"
                          value={invoice.sender.taxId}
                          onChange={(e) => handleSenderChange('taxId', e.target.value)}
                          placeholder="Tax registration"
                          className="w-full h-10 border border-gray-200 rounded-lg px-3 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-655">VAT Rate (%)</label>
                        <input
                          type="number"
                          value={invoice.items[0]?.taxPercent || 0}
                          onChange={(e) => handleItemChange(invoice.items[0]?.id, 'taxPercent', Number(e.target.value))}
                          placeholder="VAT rate"
                          className="w-full h-10 border border-gray-200 rounded-lg px-3 text-xs"
                        />
                      </div>
                    </>
                  )}
                </div>

                {invoice.country === 'IN' && (
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">State / UT (Supply Source)</label>
                    <select
                      value={invoice.sender.state}
                      onChange={(e) => handleSenderChange('state', e.target.value)}
                      className="w-full h-10 border border-gray-200 rounded-lg px-2.5 text-xs"
                    >
                      {INDIA_STATES.map(s => (
                        <option key={s.code} value={s.code}>{s.name} ({s.code})</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* RECEIVER / CLIENT BLOCK */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-950 border-b border-gray-100 pb-2 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-sky-500"></div>
                  Billing To (Client)
                </h3>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">Client Business / Name</label>
                  <input
                    id="client-name"
                    type="text"
                    value={invoice.receiver.name}
                    onChange={(e) => handleReceiverChange('name', e.target.value)}
                    placeholder="e.g. Apex Hypermarkets Inc."
                    className="w-full h-10 border border-gray-200 rounded-lg px-3 text-xs focus:border-sky-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">Client Email</label>
                    <input
                      type="email"
                      value={invoice.receiver.email}
                      onChange={(e) => handleReceiverChange('email', e.target.value)}
                      placeholder="finance@client.com"
                      className="w-full h-10 border border-gray-200 rounded-lg px-3 text-xs focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">Client Phone</label>
                    <input
                      type="text"
                      value={invoice.receiver.phone}
                      onChange={(e) => handleReceiverChange('phone', e.target.value)}
                      placeholder="+1 (415) 882-9912"
                      className="w-full h-10 border border-gray-200 rounded-lg px-3 text-xs focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">Shipping & Billing Address</label>
                  <textarea
                    rows={2}
                    value={invoice.receiver.address}
                    onChange={(e) => handleReceiverChange('address', e.target.value)}
                    placeholder="Provide full mailing coordinates"
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-xs focus:border-sky-500"
                  ></textarea>
                </div>

                {/* Localized client inputs */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-dashed border-gray-100">
                  {invoice.country === 'US' ? (
                    <>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-650">State</label>
                        <select
                          value={invoice.receiver.state}
                          onChange={(e) => handleReceiverChange('state', e.target.value)}
                          className="w-full h-10 border border-gray-200 rounded-lg px-2 text-xs"
                        >
                          {US_STATES.map(s => (
                            <option key={s.code} value={s.code}>{s.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-650">ZIP Code</label>
                        <input
                          type="text"
                          value={invoice.receiver.zipCode}
                          onChange={(e) => handleReceiverChange('zipCode', e.target.value)}
                          placeholder="ZIP Info"
                          className="w-full h-10 border border-gray-200 rounded-lg px-3 text-xs"
                        />
                      </div>
                    </>
                  ) : invoice.country === 'IN' ? (
                    <>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-653">Client GSTIN</label>
                        <input
                          type="text"
                          value={invoice.receiver.gstin}
                          onChange={(e) => handleReceiverChange('gstin', e.target.value.toUpperCase())}
                          placeholder="Client GST (opt)"
                          className="w-full h-10 border border-gray-200 rounded-lg px-3 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-655">Place of Supply State</label>
                        <select
                          value={invoice.receiver.state}
                          onChange={(e) => handleReceiverChange('state', e.target.value)}
                          className="w-full h-10 border border-gray-200 rounded-lg px-2 text-xs"
                        >
                          {INDIA_STATES.map(s => (
                            <option key={s.code} value={s.code}>{s.name}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-650">Client Tax ID</label>
                        <input
                          type="text"
                          value={invoice.receiver.taxId}
                          onChange={(e) => handleReceiverChange('taxId', e.target.value)}
                          placeholder="Client Tax ID"
                          className="w-full h-10 border border-gray-200 rounded-lg px-3 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-652">Postal ZIP</label>
                        <input
                          type="text"
                          value={invoice.receiver.zipCode}
                          onChange={(e) => handleReceiverChange('zipCode', e.target.value)}
                          placeholder="Postal details"
                          className="w-full h-10 border border-gray-200 rounded-lg px-3 text-xs"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Section: Invoice Parameters and Metadata */}
          <div className="bg-white rounded-2xl border border-sky-200 p-6 shadow-xs relative">
            <span className="absolute -top-3 left-6 inline-flex h-6 items-center justify-center rounded-full bg-sky-400 px-3 text-xs font-black text-gray-955 shadow-sm">
              3. Invoice Numbers & Dates
            </span>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
              <div>
                <label className="block text-[11px] font-extrabold text-gray-750 mb-1">Invoice Number</label>
                <input
                  id="inv-number-input"
                  type="text"
                  value={invoice.meta.invoiceNumber}
                  onChange={(e) => handleMetaChange('invoiceNumber', e.target.value)}
                  placeholder="e.g. BS-2026-08"
                  className="w-full h-10 border border-gray-200 rounded-lg px-3 text-xs font-semibold focus:border-sky-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-gray-750 mb-1">Invoice Date</label>
                <input
                  type="date"
                  value={invoice.meta.invoiceDate}
                  onChange={(e) => handleMetaChange('invoiceDate', e.target.value)}
                  className="w-full h-10 border border-gray-200 rounded-lg px-2 text-xs font-semibold focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-gray-750 mb-1">Due Date</label>
                <input
                  type="date"
                  value={invoice.meta.dueDate}
                  onChange={(e) => handleMetaChange('dueDate', e.target.value)}
                  className="w-full h-10 border border-gray-200 rounded-lg px-2 text-xs font-semibold focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-gray-750 mb-1">Payment Terms</label>
                <input
                  type="text"
                  value={invoice.meta.paymentTerms || ''}
                  onChange={(e) => handleMetaChange('paymentTerms', e.target.value)}
                  placeholder="NET 30 / COD"
                  className="w-full h-10 border border-gray-200 rounded-lg px-3 text-xs focus:border-sky-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-3 border-t border-gray-100">
              <div>
                <label className="block text-[11px] font-semibold text-gray-650 mb-1">P.O. Number (Optional)</label>
                <input
                  type="text"
                  value={invoice.meta.poNumber || ''}
                  onChange={(e) => handleMetaChange('poNumber', e.target.value)}
                  placeholder="Purchase Order index"
                  className="w-full h-10 border border-gray-200 rounded-lg px-3 text-xs"
                />
              </div>
              {invoice.country === 'IN' && (
                <div>
                  <label className="block text-[11px] font-semibold text-gray-655 mb-1">Place of Supply (State / UT)</label>
                  <input
                    type="text"
                    value={invoice.meta.placeOfSupply || ''}
                    onChange={(e) => handleMetaChange('placeOfSupply', e.target.value)}
                    placeholder="GST Mapping state"
                    className="w-full h-10 border border-gray-200 rounded-lg px-3 text-xs"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Section: Dynamic Line Items list */}
          <div className="bg-white rounded-2xl border border-sky-200 p-6 shadow-xs relative">
            <span className="absolute -top-3 left-6 inline-flex h-6 items-center justify-center rounded-full bg-sky-400 px-3 text-xs font-black text-gray-955 shadow-sm">
              4. Service line items
            </span>

            {/* Line Items layout */}
            <div className="space-y-4 mt-4" id="engine-line-items">
              {invoice.items.map((item, index) => (
                <div 
                  key={item.id} 
                  className="p-4 bg-gray-55/40 rounded-xl border border-gray-100 relative group transition hover:border-sky-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-sky-800 bg-sky-100 px-2.5 py-1 rounded-md">
                      Item #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => deleteItemRow(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      title="Delete item line"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-5">
                      <label className="block text-[10px] font-semibold text-gray-500 mb-1">Item Title / Name</label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                        placeholder="Premium service description..."
                        className="w-full h-9 border border-gray-200 rounded-lg px-2.5 text-xs focus:border-sky-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-semibold text-gray-500 mb-1">Quantity</label>
                      <input
                        type="number"
                        min="1"
                        step="any"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(item.id, 'quantity', Number(e.target.value))}
                        className="w-full h-9 border border-gray-200 rounded-lg px-2 text-xs focus:border-sky-500"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-[10px] font-semibold text-gray-500 mb-1">Rate ({currentSymbol})</label>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={item.rate}
                        onChange={(e) => handleItemChange(item.id, 'rate', Number(e.target.value))}
                        className="w-full h-9 border border-gray-200 rounded-lg px-2 text-xs focus:border-sky-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-semibold text-gray-500 mb-1">Line Amount</label>
                      <div className="h-9 flex items-center bg-gray-100 border border-gray-200 rounded-lg px-2 text-xs font-bold text-gray-700">
                        {currentSymbol}{(item.quantity * item.rate).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Sub item config */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mt-3 pt-3 border-t border-dashed border-gray-200">
                    <div className="sm:col-span-5">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                        placeholder="Add secondary explanation detailed text..."
                        className="w-full h-8 border border-gray-200 rounded-lg px-2 text-[11px]"
                      />
                    </div>

                    {invoice.country === 'IN' && (
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          value={item.hsnSac || ''}
                          onChange={(e) => handleItemChange(item.id, 'hsnSac', e.target.value)}
                          placeholder="HSN/SAC Code"
                          className="w-full h-8 border border-gray-200 rounded-lg px-2 text-[10px]"
                        />
                      </div>
                    )}

                    <div className="sm:col-span-2">
                      <div className="relative">
                        <span className="absolute inset-y-0 right-2 flex items-center text-[10px] text-gray-400 font-extrabold">% Off</span>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={item.discountPercent}
                          onChange={(e) => handleItemChange(item.id, 'discountPercent', Number(e.target.value))}
                          placeholder="Disc"
                          className="w-full h-8 border border-gray-200 rounded-lg pl-2 pr-6 text-[11px]"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <div className="relative">
                        <span className="absolute inset-y-0 right-2 flex items-center text-[10px] text-gray-400 font-bold">% Tax</span>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={item.taxPercent}
                          onChange={(e) => handleItemChange(item.id, 'taxPercent', Number(e.target.value))}
                          placeholder="GST/VAT"
                          className="w-full h-8 border border-gray-200 rounded-lg pl-2 pr-8 text-[11px]"
                          disabled={invoice.country === 'US'} // Fixed US state sales tax rules
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add action row */}
            <button
              id="engine-add-item-btn"
              type="button"
              onClick={addItemRow}
              className="mt-4 flex items-center justify-center gap-2 w-full py-3 border border-dashed border-sky-300 bg-sky-50/50 hover:bg-sky-50 text-sky-850 text-xs font-bold rounded-xl cursor-pointer transition"
            >
              <Plus className="h-4 w-4" />
              Add Another Line Item
            </button>
          </div>

          {/* Section: Payment Terms, Notes, Signatory Upload, and Banking */}
          <div className="bg-white rounded-2xl border border-sky-200 p-6 shadow-xs relative">
            <span className="absolute -top-3 left-6 inline-flex h-6 items-center justify-center rounded-full bg-sky-400 px-3 text-xs font-black text-gray-955 shadow-sm">
              5. Bank Details & Signature
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Add Terms & Instructions</label>
                <textarea
                  rows={3}
                  value={invoice.meta.termsAndConditions}
                  onChange={(e) => handleMetaChange('termsAndConditions', e.target.value)}
                  placeholder="Terms of payments, penalty dates..."
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-xs focus:border-sky-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Public Notes</label>
                <textarea
                  rows={3}
                  value={invoice.meta.notes}
                  onChange={(e) => handleMetaChange('notes', e.target.value)}
                  placeholder="Thank you message, special credits..."
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-xs focus:border-sky-500"
                ></textarea>
              </div>
            </div>

            {/* Bank details selection trigger */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                  <CreditCard className="h-4 w-4 text-sky-600" />
                  Include Client Bank Settlement Details
                </span>
                <input
                  type="checkbox"
                  id="show-bank-details"
                  checked={invoice.bankDetails.showBankDetails}
                  onChange={(e) => handleBankChange('showBankDetails', e.target.checked)}
                  className="h-4 w-4 accent-sky-500 cursor-pointer"
                />
              </div>

              {invoice.bankDetails.showBankDetails && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-sky-50/30 rounded-xl border border-sky-200">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">Bank Institution</label>
                    <input
                      type="text"
                      value={invoice.bankDetails.bankName}
                      onChange={(e) => handleBankChange('bankName', e.target.value)}
                      placeholder="e.g. HDFC/Chase"
                      className="w-full h-8 bg-white border border-gray-200 rounded-lg px-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">Account Holder</label>
                    <input
                      type="text"
                      value={invoice.bankDetails.accountHolder}
                      onChange={(e) => handleBankChange('accountHolder', e.target.value)}
                      placeholder="Owner Name LLC"
                      className="w-full h-8 bg-white border border-gray-200 rounded-lg px-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">Account Number</label>
                    <input
                      type="text"
                      value={invoice.bankDetails.accountNumber}
                      onChange={(e) => handleBankChange('accountNumber', e.target.value)}
                      placeholder="99120042....88"
                      className="w-full h-8 bg-white border border-gray-200 rounded-lg px-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">{invoice.country === 'IN' ? 'IFSC Code' : 'Sort Code / Transit'}</label>
                    <input
                      type="text"
                      value={invoice.bankDetails.ifscCode}
                      onChange={(e) => handleBankChange('ifscCode', e.target.value)}
                      placeholder={invoice.country === 'IN' ? 'HDFC0000140' : 'IFS Sort Code'}
                      className="w-full h-8 bg-white border border-gray-200 rounded-lg px-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">Branch HQ</label>
                    <input
                      type="text"
                      value={invoice.bankDetails.branchName}
                      onChange={(e) => handleBankChange('branchName', e.target.value)}
                      placeholder="Bangalore BTM Branch"
                      className="w-full h-8 bg-white border border-gray-200 rounded-lg px-2 text-xs"
                    />
                  </div>

                  {/* UPI QR Code Generation block - available for India payments or general UPI users */}
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">VPA / UPI Address</label>
                    <input
                      type="text"
                      value={invoice.bankDetails.upiId || ''}
                      onChange={(e) => handleBankChange('upiId', e.target.value)}
                      placeholder="business@oksbi"
                      className="w-full h-8 bg-white border border-gray-200 rounded-lg px-2 text-xs"
                    />
                  </div>

                  {invoice.bankDetails.upiId && (
                    <div className="col-span-1 sm:col-span-3 flex items-center justify-between p-2.5 bg-sky-100/50 rounded-lg mt-1 border border-sky-200">
                      <span className="text-[10px] font-semibold text-sky-900 flex items-center gap-1">
                        <QrCode className="h-4 w-4" />
                        Show dynamic UPI QR Code on Invoice template in side preview!
                      </span>
                      <input
                        type="checkbox"
                        checked={invoice.bankDetails.showUpiQr}
                        onChange={(e) => handleBankChange('showUpiQr', e.target.checked)}
                        className="h-4 w-4 accent-sky-500 cursor-pointer text-xs"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Signatory upload */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Authorized Person Name</label>
                <input
                  type="text"
                  value={invoice.meta.signatoryName || ''}
                  onChange={(e) => handleMetaChange('signatoryName', e.target.value)}
                  placeholder="John Doe (Director)"
                  className="w-full h-10 border border-gray-200 rounded-lg px-3 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Official E-Signature File</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSignatureUpload}
                    id="digital-signature-file"
                    className="hidden"
                  />
                  <label
                    htmlFor="digital-signature-file"
                    className="flex items-center justify-center gap-1.5 h-10 border border-dashed border-gray-350 rounded-lg text-xs font-bold text-gray-650 bg-gray-55/50 hover:bg-sky-50 hover:border-sky-400 cursor-pointer transition"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    {signatureFile ? 'Change Signature' : 'Upload Signature'}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Action trigger download buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              id="bill-engine-download-btn"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="flex-1 h-14 bg-sky-400 text-gray-950 font-black rounded-2xl hover:bg-sky-500 active:scale-[0.99] cursor-pointer transition-all flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg disabled:opacity-50 text-[15px]"
            >
              {isGeneratingPdf ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Compiling High-Res Invoice...
                </>
              ) : (
                <>
                  <Download className="h-5.5 w-5.5" />
                  Generate & Download PDF Invoice
                </>
              )}
            </button>
          </div>

        </div>

        {/* Live Preview Panel Column - 5 Columns Width */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <div className="flex justify-between items-center bg-gray-900 text-white px-4 py-3 rounded-t-2xl border-b border-gray-800">
            <span className="text-xs font-black tracking-wider uppercase text-sky-400 flex items-center gap-1.5">
              <span className="block h-2 w-2 rounded-full bg-sky-400 animate-ping"></span>
              Live PDF Template Preview
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400">Scaling: A4 Ratio</span>
              <button
                id="preview-hide-toggle"
                onClick={() => setPreviewHidden(!previewHidden)}
                className="text-gray-400 hover:text-white transition cursor-pointer"
                title={previewHidden ? 'Show full preview' : 'Collapse preview page'}
              >
                {previewHidden ? <Eye className="h-4.5 w-4.5" /> : <EyeOff className="h-4.5 w-4.5" />}
              </button>
            </div>
          </div>

          {/* Actual Invoice Body Container to convert using html2canvas */}
          <div className={`transition-all duration-300 ${previewHidden ? 'h-0 scale-y-0 overflow-hidden opacity-0' : 'h-auto scale-y-100 opacity-100'}`}>
            <div 
              ref={invoicePreviewRef}
              id="rendered-invoice-preview"
              style={{ color: invoice.textColor }}
              className={`bg-white rounded-b-2xl shadow-xl border border-gray-300 p-8 mx-auto w-full font-sans overflow-x-auto`}
            >
              
              {/* Dynamic Font Sizes styling */}
              <div className={`space-y-6 ${invoice.fontSize === 'xs' ? 'text-xs' : invoice.fontSize === 'sm' ? 'text-xs md:text-sm' : 'text-sm md:text-base'}`}>
                
                {/* Custom Layout style header: "Professional Classic" */}
                {invoice.templateStyle === 'professional' && (
                  <div className="space-y-6">
                    <div className="flex justify-between gap-4 items-start border-b pb-6 border-gray-150">
                      <div>
                        {logoFile ? (
                          <img src={logoFile} alt="Company Logo" className="max-h-16 max-w-[140px] object-contain rounded mb-3" />
                        ) : (
                          <div className="h-10 w-10 bg-gray-200 rounded-lg mb-2 flex items-center justify-center font-bold text-gray-500 text-xs">Logo</div>
                        )}
                        <h4 className="font-extrabold text-lg text-gray-950">{invoice.sender.name || 'Your Company LLC'}</h4>
                        <p className="text-xs text-gray-505 leading-relaxed whitespace-pre-line mt-1">
                          {invoice.sender.address || 'Sender HQ Postal Coordinates'}{'\n'}
                          Email: {invoice.sender.email || 'accounting@yourcompany.com'}{'\n'}
                          Phone: {invoice.sender.phone || 'Sender Phone'}
                        </p>
                        
                        {/* Custom country credentials */}
                        <div className="mt-2 text-[10px] text-gray-500">
                          {invoice.sender.taxId && <div>Tax ID: {invoice.sender.taxId}</div>}
                          {invoice.sender.gstin && <div>GSTIN: {invoice.sender.gstin}</div>}
                          {invoice.sender.pan && <div>PAN: {invoice.sender.pan}</div>}
                          {invoice.sender.vatNumber && <div>VAT Registration: {invoice.sender.vatNumber}</div>}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <h3 className="text-2xl font-black tracking-tight" style={{ color: invoice.accentColor }}>INVOICE</h3>
                        <p className="text-xs text-gray-500 font-mono mt-1">NO. {invoice.meta.invoiceNumber}</p>
                        
                        <div className="mt-6 space-y-1 text-xs text-gray-500">
                          <div><strong>Date:</strong> {invoice.meta.invoiceDate}</div>
                          <div><strong>Due Date:</strong> {invoice.meta.dueDate}</div>
                          <div><strong>Terms:</strong> {invoice.meta.paymentTerms}</div>
                          {invoice.meta.poNumber && <div><strong>P.O. Number:</strong> {invoice.meta.poNumber}</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Custom Layout style: "GST Modern" - Side columns grid */}
                {invoice.templateStyle === 'gst-modern' && (
                  <div className="space-y-6">
                    <div className="p-4 rounded-xl text-white flex justify-between items-center" style={{ backgroundColor: invoice.accentColor }}>
                      <div className="flex items-center gap-2">
                        {logoFile && <img src={logoFile} alt="Company Logo" className="max-h-12 max-w-[100px] object-contain rounded bg-white p-1" />}
                        <div>
                          <h4 className="font-black text-sm">{invoice.sender.name || 'Your Company LLC'}</h4>
                          <p className="text-[10px] opacity-85">Invoice ID: {invoice.meta.invoiceNumber}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono tracking-widest block opacity-75">TAX INVOICE</span>
                        <span className="text-xs">Date: {invoice.meta.invoiceDate}</span>
                      </div>
                    </div>

                    <p className="text-[11px] font-semibold text-gray-550 -mb-2">COMPLIANT SETTLEMENT RECEIPT</p>
                  </div>
                )}

                {/* Custom Layout style: "Elegance Minimalist" */}
                {invoice.templateStyle === 'elegance' && (
                  <div className="space-y-6">
                    <div className="border-t-4 pt-4 flex justify-between gap-4 items-start" style={{ borderColor: invoice.accentColor }}>
                      <div>
                        <h4 className="text-xl font-bold uppercase tracking-widest text-gray-900 leading-none">{invoice.sender.name || 'Your Company LLC'}</h4>
                        <span className="text-[10px] tracking-widest text-gray-400 uppercase mt-0.5 block font-bold">Official Invoice Draft</span>
                      </div>
                      <div className="text-right">
                        <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900"># {invoice.meta.invoiceNumber}</h3>
                        <p className="text-xs text-gray-500">{invoice.meta.invoiceDate}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Compact Minimal style is super clean, skipping blocky dividers */}
                {invoice.templateStyle === 'compact' && (
                  <div className="border-b pb-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-black text-base text-gray-900">{invoice.sender.name || 'Your Company LLC'}</h4>
                      <p className="text-[10px] text-gray-500">{invoice.sender.email || 'accounting@yourcompany.com'} | {invoice.sender.phone}</p>
                    </div>
                    <div className="text-right text-xs">
                      <p className="font-mono text-gray-900 font-extrabold">INV: {invoice.meta.invoiceNumber}</p>
                      <p className="text-gray-400 text-[10px]">{invoice.meta.invoiceDate}</p>
                    </div>
                  </div>
                )}

                {/* Shared Addresses block (To / Client details) */}
                <div className="grid grid-cols-2 gap-6 bg-slate-50/50 p-4 rounded-xl border border-gray-100">
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-2">Billing Details</h5>
                    <p className="font-extrabold text-gray-900">{invoice.receiver.name || 'Client business name'}</p>
                    <p className="text-xs text-gray-505 leading-relaxed whitespace-pre-line mt-1">
                      {invoice.receiver.address || 'Address of Client'}{'\n'}
                      Email: {invoice.receiver.email || 'Client Email'}{'\n'}
                      Phone: {invoice.receiver.phone || 'Client Phone'}
                    </p>
                    {invoice.receiver.taxId && <p className="text-[10px] text-gray-500 mt-2">Tax ID: {invoice.receiver.taxId}</p>}
                    {invoice.receiver.gstin && <p className="text-[10px] text-gray-500 mt-1">GSTIN: {invoice.receiver.gstin}</p>}
                  </div>

                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-2">Merchant Metadata</h5>
                    <div className="space-y-1.5 text-xs text-gray-550">
                      {invoice.sender.name && <div>Vendor: {invoice.sender.name}</div>}
                      {invoice.sender.email && <div>Email: {invoice.sender.email}</div>}
                      <div>Payment Terms: {invoice.meta.paymentTerms}</div>
                      <div>Due Date: {invoice.meta.dueDate}</div>
                      {invoice.meta.placeOfSupply && <div>Supply State: {invoice.meta.placeOfSupply}</div>}
                    </div>
                  </div>
                </div>

                {/* Standard line item layout table */}
                <table className="w-full text-left border-collapse" id="preview-invoice-table">
                  <thead>
                    <tr className="border-b border-gray-200 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">
                      <th className="py-2.5">Item Description</th>
                      {invoice.country === 'IN' && <th className="py-2.5 text-center">HSN</th>}
                      <th className="py-2.5 text-right">Qty</th>
                      <th className="py-2.5 text-right">Price</th>
                      <th className="py-2.5 text-right">Tax%</th>
                      <th className="py-2.5 text-right">Disc%</th>
                      <th className="py-2.5 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                    {calc.processedItems.map((item) => (
                      <tr key={item.id} className="align-top">
                        <td className="py-3">
                          <p className="font-extrabold text-gray-900">{item.name || 'Active Service Module'}</p>
                          {item.description && <p className="text-[10px] text-gray-400 mt-0.5">{item.description}</p>}
                        </td>
                        {invoice.country === 'IN' && <td className="py-3 text-center text-[10px]">{item.hsnSac || '-'}</td>}
                        <td className="py-3 text-right font-semibold">{item.quantity}</td>
                        <td className="py-3 text-right font-semibold">{currentSymbol}{Number(item.rate).toFixed(2)}</td>
                        <td className="py-3 text-right font-medium text-gray-500">{item.taxPercent}%</td>
                        <td className="py-3 text-right font-medium text-gray-500">{item.discountPercent}%</td>
                        <td className="py-3 text-right font-extrabold text-gray-950">
                          {currentSymbol}{item.lineTotal.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pricing / Invoicing breakdown calculations */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-gray-150">
                  
                  {/* Notes / Terms columns */}
                  <div className="md:col-span-7 space-y-4">
                    {invoice.meta.termsAndConditions && (
                      <div>
                        <h6 className="font-bold text-[10px] uppercase tracking-wider text-gray-400">Terms & Settling Guidelines</h6>
                        <p className="text-[10.5px] text-gray-500 whitespace-pre-line leading-relaxed mt-1">
                          {invoice.meta.termsAndConditions}
                        </p>
                      </div>
                    )}
                    
                    {invoice.meta.notes && (
                      <div>
                        <h6 className="font-bold text-[10px] uppercase tracking-wider text-gray-400">Merchant Notes</h6>
                        <p className="text-[10.5px] text-gray-500 whitespace-pre-line leading-relaxed mt-1">
                          {invoice.meta.notes}
                        </p>
                      </div>
                    )}

                    {/* Digital signatures rendering */}
                    {invoice.meta.signatoryName && (
                      <div className="pt-2 border-t border-dashed border-gray-100">
                        <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Authorized Signatory</span>
                        {signatureFile ? (
                          <img src={signatureFile} alt="E-Signature" className="max-h-12 object-contain my-1 rounded" />
                        ) : (
                          <div className="h-6 w-1"></div>
                        )}
                        <span className="text-xs font-bold text-gray-800">{invoice.meta.signatoryName}</span>
                      </div>
                    )}
                  </div>

                  {/* Calculations numbers */}
                  <div className="md:col-span-5 space-y-2 text-right text-xs text-gray-600">
                    <div className="flex justify-between gap-4 font-medium">
                      <span>Subtotal amount:</span>
                      <span className="text-gray-900 font-bold">{currentSymbol}{calc.subtotal.toFixed(2)}</span>
                    </div>

                    {/* Regional tax details */}
                    {invoice.country === 'IN' ? (
                      <>
                        {calc.isSameState ? (
                          <>
                            <div className="flex justify-between gap-4">
                              <span>CGST (Central Tax):</span>
                              <span>{currentSymbol}{calc.cgst.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span>SGST (State Tax):</span>
                              <span>{currentSymbol}{calc.sgst.toFixed(2)}</span>
                            </div>
                          </>
                        ) : (
                          <div className="flex justify-between gap-4">
                            <span>IGST (Integrated Tax):</span>
                            <span>{currentSymbol}{calc.igst.toFixed(2)}</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex justify-between gap-4">
                        <span>{COUNTRIES[invoice.country].taxLabel}:</span>
                        <span>{currentSymbol}{calc.taxTotal.toFixed(2)}</span>
                      </div>
                    )}

                    {Number(invoice.shippingCharges) > 0 && (
                      <div className="flex justify-between gap-4">
                        <span>Shipping & Delivery:</span>
                        <span>{currentSymbol}{Number(invoice.shippingCharges).toFixed(2)}</span>
                      </div>
                    )}

                    {Number(invoice.discountTotal) > 0 && (
                      <div className="flex justify-between gap-4 text-emerald-600 font-bold">
                        <span>Flat Deductions:</span>
                        <span>-{currentSymbol}{Number(invoice.discountTotal).toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between gap-4 pt-2 border-t border-gray-200 text-sm font-black text-gray-950">
                      <span>Grand Total:</span>
                      <span style={{ color: invoice.accentColor }} className="text-base font-black">
                        {currentSymbol}{calc.grandTotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="text-[10px] text-gray-400 leading-snug font-mono text-right capitalize mt-2 border-t border-dashed border-gray-100 pt-1.5">
                      {calc.totalWords}
                    </div>
                  </div>
                </div>

                {/* Bank / settlement credentials on templates */}
                {invoice.bankDetails.showBankDetails && invoice.bankDetails.bankName && (
                  <div className="mt-6 pt-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-gray-50 p-4 rounded-xl">
                    <div className="sm:col-span-8 space-y-1">
                      <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest block">Bank Settlement Route</span>
                      <p className="text-xs font-bold text-gray-900">{invoice.bankDetails.bankName}</p>
                      <p className="text-[11px] text-gray-550 leading-relaxed">
                        Holder: {invoice.bankDetails.accountHolder} | A/C: {invoice.bankDetails.accountNumber}{'\n'}
                        Route/Transit Code: {invoice.bankDetails.ifscCode} | Branch: {invoice.bankDetails.branchName}
                      </p>
                    </div>

                    {/* Dynamic Indian UPI QR code generation if checked */}
                    {invoice.country === 'IN' && invoice.bankDetails.upiId && invoice.bankDetails.showUpiQr && (
                      <div className="sm:col-span-4 flex flex-col items-center sm:items-end justify-center">
                        <span className="text-[9px] text-gray-400 font-extrabold mb-1 tracking-wider uppercase">Scan To Pay UPI</span>
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`upi://pay?pa=${invoice.bankDetails.upiId}&pn=${encodeURIComponent(invoice.bankDetails.accountHolder || invoice.sender.name)}&am=${calc.grandTotal.toFixed(2)}&cu=INR`)}`}
                          alt="UPI dynamic payment code QR" 
                          className="h-16 w-16 border rounded bg-white p-1 shadow-xs"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-[8px] font-mono text-gray-500 mt-1">{invoice.bankDetails.upiId}</span>
                      </div>
                    )}
                  </div>
                )}

              </div>

            </div>
          </div>
          
          {/* Backing Invoice history logs stack */}
          {history.length > 0 && (
            <div className="bg-white rounded-2xl border border-sky-200 p-4 shadow-sm text-xs">
              <h5 className="font-bold text-gray-900 mb-2">My Local Invoices List Saved</h5>
              <div className="space-y-2">
                {history.map((hist, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2.5 bg-gray-50 hover:bg-sky-50/50 rounded-lg">
                    <div>
                      <span className="font-bold block text-gray-950">{hist.sender.name || 'Personal Client'}</span>
                      <span className="text-[10px] text-gray-500">Invoice: {hist.meta.invoiceNumber} | {hist.meta.invoiceDate}</span>
                    </div>
                    <button
                      onClick={() => {
                        const config = COUNTRIES[hist.country];
                        setCurrentCurrency(config.currency);
                        setCurrentSymbol(config.currencySymbol);
                        setInvoice({ ...hist });
                      }}
                      className="text-[10px] font-bold text-sky-700 hover:text-sky-900 cursor-pointer bg-white px-2.5 py-1 rounded border border-sky-200"
                    >
                      Retrieve Data
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </section>
  );
}
