import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ViaCepResponse } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const brazilianStates = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

export function formatCep(value: string): string {
  const numbers = value.replace(/\D/g, "");
  const limited = numbers.slice(0, 8);

  if (limited.length <= 5) {
    return limited;
  }

  return `${limited.slice(0, 5)}-${limited.slice(5)}`;
}

export function formatCpf(value: string): string {
  const numbers = value.replace(/\D/g, "");
  const limited = numbers.slice(0, 11);

  if (limited.length <= 3) {
    return limited;
  }
  if (limited.length <= 6) {
    return `${limited.slice(0, 3)}.${limited.slice(3)}`;
  }
  if (limited.length <= 9) {
    return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6)}`;
  }

  return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6, 9)}-${limited.slice(9)}`;
}

export function formatPhone(value: string): string {
  const numbers = value.replace(/\D/g, "");
  const limited = numbers.slice(0, 11);

  if (limited.length <= 2) {
    return limited;
  }
  if (limited.length <= 6) {
    return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
  }
  if (limited.length <= 10) {
    return `(${limited.slice(0, 2)}) ${limited.slice(2, 6)}-${limited.slice(6)}`;
  }

  return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;
}

export async function fetchAddressByCep(cep: string): Promise<{
  success: boolean;
  data?: {
    street: string;
    city: string;
    state: string;
  };
  error?: string;
}> {
  try {
    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      return { success: false, error: "CEP deve conter 8 dígitos" };
    }

    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);

    if (!response.ok) {
      return { success: false, error: "Erro ao buscar CEP" };
    }

    const data: ViaCepResponse = await response.json();

    if (data.erro) {
      return { success: false, error: "CEP não encontrado" };
    }

    return {
      success: true,
      data: {
        street: data.logradouro,
        city: data.localidade,
        state: data.uf,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    return { success: false, error: "Erro ao buscar CEP" };
  }
}
