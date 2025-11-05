"use server";

import { revalidatePath } from "next/cache";
import type { UserRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type UserFormData = {
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  age?: string;
  cpf: string;
  zipcode: string;
  state: string;
  street: string;
  number: string;
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
    await prisma.user.create({
      data: {
        role: data.role,
        name: data.name,
        email: data.email,
        phone: data.phone,
        age: data.age ? parseInt(data.age, 10) : null,
        cpf: data.cpf,
        zipCode: data.zipcode,
        state: data.state,
        street: data.street,
        number: parseInt(data.number, 10),

        ...(data.role === "CONSULTANT" &&
          data.clientIds && {
            clients: {
              connect: data.clientIds.map((id) => ({ id })),
            },
          }),
      },
    });

    revalidatePath("/dashboard");
    return { success: true, message: "Usuário creado com sucesso!" };
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return { success: false, message: "Erro ao criar usuário" };
  }
}
