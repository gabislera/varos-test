"use server";

import type { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export type UserFormData = {
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  age?: number;
  cpf: string;
  zipCode: string;
  state: string;
  street: string;
  number: number;
  clientIds?: string[];
};

export async function getClients() {
  try {
    const clients = await prisma.user.findMany({
      where: {
        role: "CLIENT",
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return { success: true, data: clients };
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    return { success: false, data: [] };
  }
}

export async function createUser(data: UserFormData) {
  try {
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { cpf: data.cpf }],
      },
    });

    if (existing) {
      if (existing.email === data.email) {
        return { success: false, message: "Este email já está cadastrado" };
      }

      if (existing.cpf === data.cpf) {
        return { success: false, message: "Este CPF já está cadastrado" };
      }
    }

    await prisma.user.create({
      data: {
        role: data.role,
        name: data.name,
        email: data.email,
        phone: data.phone,
        age: data.age ?? null,
        cpf: data.cpf,
        zipCode: data.zipCode,
        state: data.state,
        street: data.street,
        number: data.number,

        ...(data.role === "CONSULTANT" &&
          data.clientIds && {
            clients: {
              connect: data.clientIds.map((id) => ({ id })),
            },
          }),
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/users");
    return { success: true, message: "Usuário criado com sucesso!" };
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return { success: false, message: "Erro ao criar usuário" };
  }
}

export async function updateUser(id: string, data: UserFormData) {
  try {
    await prisma.user.update({
      where: { id },
      data: {
        role: data.role,
        name: data.name,
        email: data.email,
        phone: data.phone,
        age: data.age ?? null,
        cpf: data.cpf,
        zipCode: data.zipCode,
        state: data.state,
        street: data.street,
        number: data.number,

        ...(data.role === "CONSULTANT" &&
          data.clientIds && {
            clients: {
              set: data.clientIds.map((id) => ({ id })),
            },
          }),
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/users");
    return { success: true, message: "Usuário atualizado com sucesso!" };
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return { success: false, message: "Erro ao atualizar usuário" };
  }
}

