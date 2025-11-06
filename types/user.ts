import type { User as PrismaUser, UserRole } from "@prisma/client";

export type BaseUser = PrismaUser;

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  age: number | null;
  zipCode: string;
  city: string;
  state: string;
  street: string;
  number: number;
  consultant: {
    name: string;
    email: string;
  } | null;
  clients: {
    id: string;
    name: string;
    email: string;
  }[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type UserSelect = Pick<PrismaUser, "id" | "name" | "email" | "role">;

export type UserWithClients = PrismaUser & {
  clients?: Array<{ id: string; name: string; email: string }>;
};

export type UserFormData = {
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  age?: number;
  cpf: string;
  zipCode: string;
  city: string;
  state: string;
  street: string;
  number: number;
  clientIds?: string[];
};

export type ClientOption = {
  id: string;
  name: string;
  email?: string;
};
