export function generateValidABN(): string {
  const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  while (true) {
    const digits = Array.from({ length: 11 }, () => Math.floor(Math.random() * 10));
    // First digit cannot be 0
    if (digits[0] === 0) digits[0] = Math.floor(Math.random() * 9) + 1;
    
    let sum = (digits[0] - 1) * weights[0];
    for (let i = 1; i < 11; i++) {
      sum += digits[i] * weights[i];
    }
    
    if (sum % 89 === 0) {
      return digits.join('');
    }
  }
}

export function generateMultipleABNs(count: number): string[] {
  return Array.from({ length: count }, generateValidABN);
}
