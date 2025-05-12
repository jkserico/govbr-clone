
export function formatCPF(cpf: string): string {
  // Remove all non-numeric characters
  const numbers = cpf.replace(/\D/g, '');
  
  // Return formatted CPF: XXX.XXX.XXX-XX
  return numbers.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
}

export function unformatCPF(cpf: string): string {
  return cpf.replace(/\D/g, '');
}
