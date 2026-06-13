export interface InvoiceItem {
  id: string;
  name: string;
  description: string;
  hsnSac?: string; // India custom
  quantity: number;
  rate: number;
  discountPercent: number; // Discount%
  taxPercent: number; // Tax% or GST/VAT rate
}

export type CountryCode = 'US' | 'IN' | 'GB' | 'CA' | 'AU' | 'DE' | 'AE' | 'OTHER';

export interface CountryConfig {
  code: CountryCode;
  name: string;
  currency: string;
  currencySymbol: string;
  taxLabel: string; // e.g., "Sales Tax", "GST", "VAT"
  hasStateSalesTax: boolean;
  hasGstSplit: boolean; // India CGST/SGST/IGST
  hasVat: boolean;
  addressFormat: string;
}

export interface BusinessDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  logoUrl?: string;
  taxId?: string; // General/Tax ID
  gstin?: string; // India GSTIN
  pan?: string; // India PAN
  vatNumber?: string; // UK/EU VAT
  state?: string; // For India state mapping or US state sales tax
  zipCode?: string; // ZIP / Postal code
}

export interface ClientDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  taxId?: string;
  gstin?: string; // India Client GSTIN
  vatNumber?: string; // UK/EU Client VAT
  state?: string; // For calculating CGST/SGST vs IGST
  zipCode?: string;
}

export interface InvoiceMeta {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  paymentTerms: string;
  placeOfSupply?: string; // Custom for GST mapping (India)
  poNumber?: string;
  notes: string;
  termsAndConditions: string;
  signatoryName?: string;
  signatureUrl?: string;
}

export interface BankDetails {
  showBankDetails: boolean;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountHolder: string;
  branchName: string;
  upiId?: string;
  showUpiQr: boolean;
}

export interface InvoiceData {
  id?: string;
  country: CountryCode;
  templateStyle: 'professional' | 'gst-modern' | 'compact' | 'elegance';
  accentColor: string; // Hex color code
  textColor: string;
  fontSize: 'xs' | 'sm' | 'base';
  sender: BusinessDetails;
  receiver: ClientDetails;
  meta: InvoiceMeta;
  items: InvoiceItem[];
  shippingCharges: number;
  discountTotal: number; // Overall flat discount or shipping
  bankDetails: BankDetails;
}
