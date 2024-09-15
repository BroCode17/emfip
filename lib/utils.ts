import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



function formatReadableDate(isoString: Date) {
  const date = new Date(isoString);

  // Options for formatting the date and time
  const options:any = {
    year: 'numeric',
    month: 'long',  // Full month name (e.g., September)
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true  // 12-hour clock (with AM/PM)
  };

  // Use Intl.DateTimeFormat to format the date
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

  return formattedDate;
}


type FormatCurrencyOptions = {
  locale?: string;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

function formatToLocaleCurrency(
  amount: number,
  options: FormatCurrencyOptions = {}
): string {
  const {
    locale = 'en-US',
    currency = 'USD',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2
  } = options;

  // Using a try-catch block to handle potential errors
  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: minimumFractionDigits,
      maximumFractionDigits: maximumFractionDigits
    });

    return formatter.format(amount);
  } catch (error) {
    console.error('Error formatting currency:', error);
    // Fallback formatting if Intl.NumberFormat fails
    return `${currency} ${amount.toFixed(minimumFractionDigits)}`;
  }
}

/**
 * 
 * @param daysToAdd number of day
 * @returns return date on the formate eg September 20, 2024
 */
function getFormattedFutureDate(daysToAdd = 3) {
  const date = new Date(Date.now() + daysToAdd * 24 * 60 * 60 * 1000);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

// Generate order id
const  generateOrderId = () =>  {
  const timestamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 14);
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

// Verify order number
const verifyOrderNumber = (orderId: string) => {
  return /^ORD-\d{8}T\d{5}-[A-Z0-9]{5}$/.test(orderId)
} 
export {
  formatReadableDate,
  formatToLocaleCurrency,
  getFormattedFutureDate,
  generateOrderId,
  verifyOrderNumber
}
