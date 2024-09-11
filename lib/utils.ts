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

//Currency convertor
function formatToLocaleCurrency(number: any, locale = navigator.language, currency = 'USD') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(number);
}

export {
  formatReadableDate,
  formatToLocaleCurrency
}
