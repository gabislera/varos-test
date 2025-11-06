"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createUser, updateUser } from "../actions";
import FormInput from "./form-input";

const userSchema = z.object({
  role: z.enum(["ADMIN", "CONSULTANT", "CLIENT"]),
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  phone: z.string().regex(/^\(?\d{2}\)?[\s.-]?\d{4,5}[\s.-]?\d{4}$/, {
    message: "Telefone inválido",
  }),
  email: z.string().email({ message: "Email inválido" }),
  age: z.coerce.number().optional().or(z.literal(undefined)),
  cpf: z.string().regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, {
    message: "Formato de CPF inválido",
  }),
  zipCode: z
    .string()
    .regex(/^\d{5}-?\d{3}$/, { message: "CEP inválido. Ex: 00000-000" }),
  state: z.string().min(1, { message: "Estado é obrigatório" }),
  street: z.string().min(1, { message: "Rua é obrigatória" }),
  number: z.coerce.number().refine((n) => !Number.isNaN(n) && n >= 1, {
    message: "Número é obrigatório",
  }),
  clientIds: z.array(z.string()).optional(),
});

type UserFormData = z.infer<typeof userSchema>;

type UserWithClients = User & {
  clients?: Array<{ id: string; name: string; email: string }>;
};

type UserFormProps = {
  user?: UserWithClients;
  clients?: Array<{ id: string; name: string }>;
};

export default function UserForm({ user, clients = [] }: UserFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema) as any,
    mode: "onChange",
    defaultValues: user
      ? {
          role: user.role,
          name: user.name,
          email: user.email,
          phone: user.phone,
          age: user.age ?? undefined,
          cpf: user.cpf,
          zipCode: user.zipCode,
          state: user.state,
          street: user.street,
          number: user.number,
          clientIds: user.clients?.map((c) => c.id) || [],
        }
      : {
          role: "CLIENT",
          name: "",
          email: "",
          phone: "",
          age: undefined,
          cpf: "",
          zipCode: "",
          state: "",
          street: "",
          number: undefined,
          clientIds: [],
        },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: UserFormData) => {
    console.log(data);
    startTransition(async () => {
      const result = user
        ? await updateUser(user.id, data)
        : await createUser(data);

      if (result.success) {
        alert(result.message);
        router.push("/dashboard");
      } else {
        alert(result.message);
      }
    });
  };

  return (
    <form
      className="flex flex-col w-full max-w-[600px] mt-8"
      onSubmit={handleSubmit(onSubmit)}
      id="user-form"
    >
      <div className="flex items-center justify-end gap-4">
        <Button type="submit" form="user-form" variant="default">
          {isPending
            ? "Salvando..."
            : user
              ? "Atualizar usuário"
              : "Criar usuário"}
        </Button>
        <Button variant="secondary" disabled>
          Deletar usuário
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-2 w-full col-span-2">
          <Label>Tipo de usuário</Label>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tipo de usuário" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ADMIN">Administrador</SelectItem>
                    <SelectItem value="CONSULTANT">Consultor</SelectItem>
                    <SelectItem value="CLIENT">Cliente</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <FormInput
          label="Nome"
          type="text"
          placeholder="Digite o nome"
          register={register("name")}
          error={errors.name}
        />
        <FormInput
          label="Telefone"
          type="text"
          placeholder="Digite o telefone"
          register={register("phone")}
          error={errors.phone}
        />
        <FormInput
          label="Email"
          type="email"
          placeholder="Digite o email"
          register={register("email")}
          error={errors.email}
          fullWidth
        />

        <div className="col-span-2">
          <Tabs defaultValue="userInfo" className="space-y-6">
            <TabsList>
              <TabsTrigger value="userInfo">Informações básicas</TabsTrigger>
              {selectedRole === "CONSULTANT" && (
                <TabsTrigger value="addClients">Adicionar clientes</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="userInfo">
              <div className="grid grid-cols-2 gap-8">
                <FormInput
                  label="Idade"
                  type="number"
                  placeholder="Digite a idade"
                  register={register("age")}
                  error={errors.age}
                />
                <FormInput
                  label="CPF"
                  type="text"
                  placeholder="000.000.000-00"
                  register={register("cpf")}
                  error={errors.cpf}
                />
                <FormInput
                  label="CEP"
                  type="text"
                  placeholder="Insira o CEP"
                  register={register("zipCode")}
                  error={errors.zipCode}
                />

                <div className="flex flex-col gap-2">
                  <Label>Estado</Label>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="SP">São Paulo</SelectItem>
                            <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                            <SelectItem value="MG">Minas Gerais</SelectItem>
                            {/* Adicione outros estados */}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.state && (
                    <span className="text-red-500 text-sm">
                      {errors.state.message}
                    </span>
                  )}
                </div>

                <FormInput
                  label="Endereço"
                  type="text"
                  placeholder="Digite o endereço"
                  register={register("street")}
                  error={errors.street}
                  fullWidth
                />
                <FormInput
                  label="Número"
                  placeholder="Digite o número"
                  type="number"
                  register={register("number")}
                  error={errors.number}
                />
              </div>
            </TabsContent>

            {selectedRole === "CONSULTANT" && (
              <TabsContent value="addClients">
                <Controller
                  name="clientIds"
                  control={control}
                  render={({ field }) => (
                    <MultiSelect
                      options={clients.map((c) => ({ id: c.id, name: c.name }))}
                      selected={field.value || []}
                      onSelectionChange={field.onChange}
                      placeholder="Selecione clientes..."
                      label="Clientes"
                    />
                  )}
                />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </form>
  );
}
