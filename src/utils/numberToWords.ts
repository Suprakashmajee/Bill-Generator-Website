const ONES = [
  '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
  'Seventeen', 'Eighteen', 'Nineteen'
];

const TENS = [
  '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
];

const SCALES = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];

function convertLessThanThousand(num: number): string {
  let words = '';

  if (num >= 100) {
    words += ONES[Math.floor(num / 100)] + ' Hundred ';
    num %= 100;
  }

  if (num >= 20) {
    words += TENS[Math.floor(num / 10)] + ' ';
    num %= 10;
  }

  if (num > 0) {
    words += ONES[num] + ' ';
  }

  return words.trim();
}

/**
 * Convert standard numbers to English words
 */
export function numberToWords(num: number, currency = 'USD'): string {
  if (num === 0) return 'Zero';

  // Support Indian Numbering System formatting (Lakhs, Crores) if currency is INR
  if (currency === 'INR') {
    return numberToIndianWords(num);
  }

  const parts = num.toFixed(2).split('.');
  const integerPart = Math.floor(num);
  const decimalPart = parseInt(parts[1], 10);

  let result = '';

  if (integerPart === 0) {
    result = 'Zero';
  } else {
    let checkNum = integerPart;
    let scaleIdx = 0;

    while (checkNum > 0) {
      const chunk = checkNum % 1000;
      if (chunk !== 0) {
        const chunkStr = convertLessThanThousand(chunk);
        const scaleStr = SCALES[scaleIdx] ? ' ' + SCALES[scaleIdx] : '';
        result = chunkStr + scaleStr + (result ? ' ' + result : '');
      }
      checkNum = Math.floor(checkNum / 1000);
      scaleIdx++;
    }
  }

  let finalWords = result.trim();

  // Handle currency context
  if (currency === 'USD') {
    finalWords += ' US Dollars';
    if (decimalPart > 0) {
      finalWords += ' and ' + convertLessThanThousand(decimalPart) + ' Cents';
    } else {
      finalWords += ' Only';
    }
  } else if (currency === 'GBP') {
    finalWords += ' British Pounds';
    if (decimalPart > 0) {
      finalWords += ' and ' + convertLessThanThousand(decimalPart) + ' Pence';
    } else {
      finalWords += ' Only';
    }
  } else if (currency === 'EUR') {
    finalWords += ' Euros';
    if (decimalPart > 0) {
      finalWords += ' and ' + convertLessThanThousand(decimalPart) + ' Cents';
    } else {
      finalWords += ' Only';
    }
  } else {
    finalWords += ' ' + currency;
    if (decimalPart > 0) {
      finalWords += ' and ' + decimalPart + '/100';
    } else {
      finalWords += ' Only';
    }
  }

  return finalWords.trim().replace(/\s+/g, ' ');
}

/**
 * Convert numbers using Indian terms (Lakh, Crore) for INR payments
 */
function numberToIndianWords(num: number): string {
  const parts = num.toFixed(2).split('.');
  const integerPart = Math.floor(num);
  const decimalPart = parseInt(parts[1], 10);

  if (integerPart === 0 && decimalPart === 0) return 'Zero Rupees Only';

  let result = '';

  if (integerPart > 0) {
    result = convertIndianInteger(integerPart);
  } else {
    result = 'Zero';
  }

  let finalWords = 'Rupees ' + result.trim();

  if (decimalPart > 0) {
    const paiseStr = convertLessThanThousand(decimalPart);
    finalWords += ' and ' + paiseStr + ' Paise';
  }

  finalWords += ' Only';
  return finalWords.trim().replace(/\s+/g, ' ');
}

function convertIndianInteger(num: number): string {
  let words = '';

  // Crores
  if (num >= 10000000) {
    words += convertLessThanThousand(Math.floor(num / 10000000)) + ' Crore ';
    num %= 10000000;
  }

  // Lakhs
  if (num >= 100000) {
    words += convertLessThanThousand(Math.floor(num / 100000)) + ' Lakh ';
    num %= 100000;
  }

  // Thousands
  if (num >= 1000) {
    words += convertLessThanThousand(Math.floor(num / 1000)) + ' Thousand ';
    num %= 1000;
  }

  // Hundreds & rest
  if (num > 0) {
    words += convertLessThanThousand(num);
  }

  return words;
}
