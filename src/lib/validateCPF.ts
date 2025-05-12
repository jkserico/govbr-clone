
export function validateCPF(cpf: string): boolean {
  // Remove all non-numeric characters
  const cleanCPF = cpf.replace(/\D/g, '');

  // Check if it has 11 digits
  if (cleanCPF.length !== 11) {
    return false;
  }

  // Check if all digits are the same (which is invalid)
  if (/^(\d)\1+$/.test(cleanCPF)) {
    return false;
  }

  // Validate the CPF using the verification algorithm
  let sum = 0;
  let remainder;

  // First digit validation
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cleanCPF.substring(9, 10))) {
    return false;
  }

  // Second digit validation
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cleanCPF.substring(10, 11))) {
    return false;
  }

  return true;
}
