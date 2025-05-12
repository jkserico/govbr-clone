
export interface UserData {
  name: string;
  cpf: string;
  motherName: string;
  birthDate: string;
  compensation: number;
  fee: number;
}

// This would normally be fetched from a backend service
export const getUserData = (cpf: string): UserData => {
  // Default user data for the example
  const defaultUser: UserData = {
    name: "Damiana Ocezia De Lima",
    cpf: cpf,
    motherName: "Maria De Lima",
    birthDate: "12/06/1985",
    compensation: 5960.50,
    fee: 61.90
  };
  
  // For demonstration purposes, we'll use the provided CPF
  // In a real scenario, this would connect to a backend API
  return defaultUser;
};

export const getMotherOptions = (correctName: string): string[] => {
  const options = [
    "Ana Lucia da Silva",
    "Joana Maria de Souza",
    "Sandra Regina Pereira"
  ];
  
  // Make sure the correct name is included and shuffle
  const allOptions = [correctName, ...options.filter(name => name !== correctName)];
  return shuffleArray(allOptions).slice(0, 4);
};

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
