"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { User } from "@/types";

interface UsersTableProps {
  users: User[];
}

export function UsersTable({ users }: UsersTableProps) {
  const router = useRouter();

  const fullAddress = (user: User) => {
    return `${user.street}, ${user.number} - ${user.state}`;
  };

  const handleRowClick = (userId: string) => {
    router.push(`/users/${userId}`);
  };

  return (
    <div className="overflow-x-auto scrollbar-thin">
      <Table className="border border-[#222729] rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead className="py-8">Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>Idade</TableHead>
            <TableHead>Endereço</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead>Atualizado em</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-[#131516]">
          {users.map((user) => (
            <TableRow
              key={user.id}
              onClick={() => handleRowClick(user.id)}
              className="cursor-pointer hover:bg-[#1a1d1f] transition-colors"
            >
              <TableCell className="py-8">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.cpf}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>{fullAddress(user)}</TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell>
                {new Date(user.updatedAt).toLocaleDateString("pt-BR")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
