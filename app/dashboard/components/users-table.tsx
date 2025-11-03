import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { User } from "../page";

interface UsersTableProps {
  users: User[];
}

export function UsersTable({ users }: UsersTableProps) {
  return (
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
          <TableRow key={user.name}>
            <TableCell className="py-8">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>{user.cpf}</TableCell>
            <TableCell>{user.age}</TableCell>
            <TableCell>{user.address}</TableCell>
            <TableCell>{user.createdAt}</TableCell>
            <TableCell>{user.updatedAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
