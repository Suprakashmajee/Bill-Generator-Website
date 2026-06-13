import { CountryConfig, CountryCode } from '../types';

export const COUNTRIES: Record<CountryCode, CountryConfig> = {
  US: {
    code: 'US',
    name: 'United States',
    currency: 'USD',
    currencySymbol: '$',
    taxLabel: 'State Sales Tax',
    hasStateSalesTax: true,
    hasGstSplit: false,
    hasVat: false,
    addressFormat: 'US'
  },
  IN: {
    code: 'IN',
    name: 'India',
    currency: 'INR',
    currencySymbol: '₹',
    taxLabel: 'GST',
    hasStateSalesTax: false,
    hasGstSplit: true,
    hasVat: false,
    addressFormat: 'IN'
  },
  GB: {
    code: 'GB',
    name: 'United Kingdom',
    currency: 'GBP',
    currencySymbol: '£',
    taxLabel: 'VAT',
    hasStateSalesTax: false,
    hasGstSplit: false,
    hasVat: true,
    addressFormat: 'UK'
  },
  CA: {
    code: 'CA',
    name: 'Canada',
    currency: 'CAD',
    currencySymbol: 'C$',
    taxLabel: 'Tax (GST/HST)',
    hasStateSalesTax: true,
    hasGstSplit: false,
    hasVat: false,
    addressFormat: 'CA'
  },
  AU: {
    code: 'AU',
    name: 'Australia',
    currency: 'AUD',
    currencySymbol: 'A$',
    taxLabel: 'GST',
    hasStateSalesTax: false,
    hasGstSplit: false,
    hasVat: false,
    addressFormat: 'AU'
  },
  DE: {
    code: 'DE',
    name: 'Germany (EU)',
    currency: 'EUR',
    currencySymbol: '€',
    taxLabel: 'Vat (MwSt.)',
    hasStateSalesTax: false,
    hasGstSplit: false,
    hasVat: true,
    addressFormat: 'EU'
  },
  AE: {
    code: 'AE',
    name: 'United Arab Emirates',
    currency: 'AED',
    currencySymbol: 'AED',
    taxLabel: 'VAT',
    hasStateSalesTax: false,
    hasGstSplit: false,
    hasVat: true,
    addressFormat: 'AE'
  },
  OTHER: {
    code: 'OTHER',
    name: 'Other / Custom Country',
    currency: 'USD',
    currencySymbol: '¤',
    taxLabel: 'Tax Amount',
    hasStateSalesTax: false,
    hasGstSplit: false,
    hasVat: false,
    addressFormat: 'DEFAULT'
  }
};

export const US_STATES = [
  { code: 'AL', name: 'Alabama', rate: 4 },
  { code: 'AZ', name: 'Arizona', rate: 5.6 },
  { code: 'CA', name: 'California', rate: 7.25 },
  { code: 'CO', name: 'Colorado', rate: 2.9 },
  { code: 'FL', name: 'Florida', rate: 6 },
  { code: 'GA', name: 'Georgia', rate: 4 },
  { code: 'IL', name: 'Illinois', rate: 6.25 },
  { code: 'MA', name: 'Massachusetts', rate: 6.25 },
  { code: 'MI', name: 'Michigan', rate: 6 },
  { code: 'NY', name: 'New York', rate: 4 },
  { code: 'NC', name: 'North Carolina', rate: 4.75 },
  { code: 'OH', name: 'Ohio', rate: 5.75 },
  { code: 'PA', name: 'Pennsylvania', rate: 6 },
  { code: 'TX', name: 'Texas', rate: 6.25 },
  { code: 'WA', name: 'Washington', rate: 6.5 }
];

export const INDIA_STATES = [
  { code: 'AN', name: 'Andaman and Nicobar Islands' },
  { code: 'AP', name: 'Andhra Pradesh' },
  { code: 'AR', name: 'Arunachal Pradesh' },
  { code: 'AS', name: 'Assam' },
  { code: 'BR', name: 'Bihar' },
  { code: 'CH', name: 'Chandigarh' },
  { code: 'CG', name: 'Chhattisgarh' },
  { code: 'DN', name: 'Dadra and Nagar Haveli and Daman and Diu' },
  { code: 'DL', name: 'Delhi' },
  { code: 'GA', name: 'Goa' },
  { code: 'GJ', name: 'Gujarat' },
  { code: 'HR', name: 'Haryana' },
  { code: 'HP', name: 'Himachal Pradesh' },
  { code: 'JK', name: 'Jammu and Kashmir' },
  { code: 'JH', name: 'Jharkhand' },
  { code: 'KA', name: 'Karnataka' },
  { code: 'KL', name: 'Kerala' },
  { code: 'LA', name: 'Ladakh' },
  { code: 'LD', name: 'Lakshadweep' },
  { code: 'MP', name: 'Madhya Pradesh' },
  { code: 'MH', name: 'Maharashtra' },
  { code: 'MN', name: 'Manipur' },
  { code: 'ML', name: 'Meghalaya' },
  { code: 'MZ', name: 'Mizoram' },
  { code: 'NL', name: 'Nagaland' },
  { code: 'OR', name: 'Odisha' },
  { code: 'PY', name: 'Puducherry' },
  { code: 'PB', name: 'Punjab' },
  { code: 'RJ', name: 'Rajasthan' },
  { code: 'SK', name: 'Sikkim' },
  { code: 'TN', name: 'Tamil Nadu' },
  { code: 'TG', name: 'Telangana' },
  { code: 'TR', name: 'Tripura' },
  { code: 'UP', name: 'Uttar Pradesh' },
  { code: 'UK', name: 'Uttarakhand' },
  { code: 'WB', name: 'West Bengal' }
];

export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' }
];
