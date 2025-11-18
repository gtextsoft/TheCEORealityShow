// Validation utility functions
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone: string): boolean {
  // Basic phone validation - accepts international format
  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

export function validateAge(age: number): boolean {
  return age >= 21 && age <= 70;
}

export function validateURL(url: string): boolean {
  if (!url || url.trim() === '') return true; // Optional field
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

