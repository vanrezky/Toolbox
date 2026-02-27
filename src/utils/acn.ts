export function generateValidACN(): string {
  const weights = [8, 7, 6, 5, 4, 3, 2, 1];
  const digits = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10));
  
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += digits[i] * weights[i];
  }
  
  const remainder = sum % 10;
  const complement = 10 - remainder;
  const checkDigit = complement === 10 ? 0 : complement;
  
  return [...digits, checkDigit].join('');
}

export function generateMultipleACNs(count: number): string[] {
  return Array.from({ length: count }, generateValidACN);
}
