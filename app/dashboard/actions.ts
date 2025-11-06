"use server";
import { UserRole } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const getUsers = async (filters?: {
  consultantId?: string;
  consultantEmail?: string;
  startDate?: Date;
  endDate?: Date;
}) => {
  const cacheKey = [
    "users",
    filters?.consultantId || "all",
    filters?.consultantEmail || "all",
    filters?.startDate?.toISOString() || "no-start",
    filters?.endDate?.toISOString() || "no-end",
  ];

  return unstable_cache(
    async () => {
      try {
        const where: Record<string, unknown> = {
          role: UserRole.CLIENT,
        };

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
          if (filters.startDate)
            (where.createdAt as Record<string, unknown>).gte =
              filters.startDate;
          if (filters.endDate)
            (where.createdAt as Record<string, unknown>).lte = filters.endDate;
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
    },
    cacheKey,
    {
      tags: ["users"],
      revalidate: 60,
    },
  )();
};

export const getConsultants = async () => {
  return unstable_cache(
    async () => {
      try {
        const consultants = await prisma.user.findMany({
          where: {
            role: UserRole.CONSULTANT,
          },
          orderBy: {
            name: "asc",
          },
        });

        return consultants;
      } catch (error) {
        console.error("Erro ao buscar consultores:", error);
        return [];
      }
    },
    ["consultants"],
    {
      tags: ["users"],
      revalidate: 60,
    },
  )();
};

export const getClientsByDays = async (
  days: number,
  filters?: {
    consultantId?: string;
    consultantEmail?: string;
    startDate?: Date;
    endDate?: Date;
  },
) => {
  const cacheKey = [
    `clients-last-${days}-days`,
    filters?.consultantId || "all",
    filters?.consultantEmail || "all",
  ];

  return unstable_cache(
    async () => {
      try {
        const dateFrom = new Date();
        dateFrom.setDate(dateFrom.getDate() - days);
        dateFrom.setHours(0, 0, 0, 0);

        const where: Record<string, unknown> = {
          role: UserRole.CLIENT,
          createdAt: {
            gte: dateFrom,
          },
        };

        if (filters?.consultantId) {
          where.consultantId = filters.consultantId;
        }

        if (filters?.consultantEmail) {
          where.consultant = {
            email: filters.consultantEmail,
          };
        }

        const count = await prisma.user.count({
          where,
        });

        return count;
      } catch (error) {
        console.error("Erro ao buscar total de clientes:", error);
        return 0;
      }
    },
    cacheKey,
    {
      tags: ["users"],
      revalidate: 60,
    },
  )();
};
