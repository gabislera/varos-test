"use server";
import { prisma } from "@/lib/prisma";

export async function getUsers(filters?: {
  consultantId?: string;
  consultantEmail?: string;
  startDate?: Date;
  endDate?: Date;
}) {
  try {
    const where: any = {};

    if (filters?.consultantId) {
      where.consultantId = filters.consultantId;
    }

    if (filters?.consultantEmail) {
      where.consultant = {
        email: filters.consultantEmail,
      };
    }

    if (filters?.startDate || filters?.endDate) {
      where.createdAt = {};
      if (filters.startDate) where.createdAt.gte = filters.startDate;
      if (filters.endDate) where.createdAt.lte = filters.endDate;
    }
    const users = await prisma.user.findMany({
      where,
      include: {
        consultant: {
          select: {
            name: true,
            email: true,
          },
        },
        clients: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return users;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return [];
  }
}
