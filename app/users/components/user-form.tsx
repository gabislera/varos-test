"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  brazilianStates,
  fetchAddressByCep,
  formatCep,
  formatCpf,
  formatPhone,
} from "@/lib/utils";
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
  city: z.string().min(1, { message: "Cidade é obrigatória" }),
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
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
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
          city: user.city,
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
          city: "",
          state: "",
          street: "",
          number: undefined,
          clientIds: [],
        },
  });

  const selectedRole = watch("role");

  const handleCepChange = async (value: string) => {
    const formatted = formatCep(value);
    setValue("zipCode", formatted);

    const cleanCep = formatted.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      setIsLoadingCep(true);
      const result = await fetchAddressByCep(formatted);

      if (result.success && result.data) {
        setValue("street", result.data.street, { shouldValidate: true });
        setValue("city", result.data.city, { shouldValidate: true });
        setValue("state", result.data.state, { shouldValidate: true });
        toast.success("Endereço encontrado!");
      } else {
        toast.error(result.error || "CEP não encontrado");
      }

      setIsLoadingCep(false);
    }
  };

  const onSubmit = async (data: UserFormData) => {
    startTransition(async () => {
      const result = user
        ? await updateUser(user.id, data)
        : await createUser(data);

      if (result.success) {
        toast.success(result.message);
        router.push("/dashboard");
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <form
      className="flex flex-col w-full max-w-[600px]"
      onSubmit={handleSubmit(onSubmit)}
      id="user-form"
    >
      <div className="flex items-center justify-end gap-4 mb-6">
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
        <div className="flex flex-col gap-2">
          <Label>Telefone</Label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                placeholder="(00) 00000-0000"
                value={field.value}
                onChange={(e) => {
                  const formatted = formatPhone(e.target.value);
                  field.onChange(formatted);
                }}
                className="w-full"
              />
            )}
          />
          {errors.phone && (
            <span className="text-red-500 text-sm">{errors.phone.message}</span>
          )}
        </div>
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
                <div className="flex flex-col gap-2">
                  <Label>CPF</Label>
                  <Controller
                    name="cpf"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        placeholder="000.000.000-00"
                        value={field.value}
                        onChange={(e) => {
                          const formatted = formatCpf(e.target.value);
                          field.onChange(formatted);
                        }}
                        className="w-full"
                      />
                    )}
                  />
                  {errors.cpf && (
                    <span className="text-red-500 text-sm">
                      {errors.cpf.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Label>CEP</Label>
                  <div className="relative">
                    <Controller
                      name="zipCode"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="text"
                          placeholder="00000-000"
                          value={field.value}
                          onChange={(e) => {
                            handleCepChange(e.target.value);
                          }}
                          className="w-full"
                          disabled={isLoadingCep}
                        />
                      )}
                    />
                    {isLoadingCep && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      </div>
                    )}
                  </div>
                  <a
                    href="https://buscacepinter.correios.com.br/app/endereco/index.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-primary hover:underline"
                  >
                    Não sabe seu CEP?
                  </a>
                  {errors.zipCode && (
                    <span className="text-red-500 text-sm">
                      {errors.zipCode.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Estado</Label>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled
                      >
                        <SelectTrigger className="w-full disabled:opacity-60 disabled:cursor-not-allowed">
                          <SelectValue placeholder="Selecione o estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {brazilianStates.map((state) => (
                              <SelectItem key={state.value} value={state.value}>
                                {state.label}
                              </SelectItem>
                            ))}
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

                <div className="flex flex-col gap-2">
                  <Label>Cidade</Label>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        placeholder="Cidade"
                        {...field}
                        disabled
                        className="w-full disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    )}
                  />
                  {errors.city && (
                    <span className="text-red-500 text-sm">
                      {errors.city.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2 w-full col-span-1">
                  <Label>Endereço</Label>
                  <Controller
                    name="street"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        placeholder="Digite o endereço"
                        {...field}
                        disabled
                        className="w-full disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    )}
                  />
                  {errors.street && (
                    <span className="text-red-500 text-sm">
                      {errors.street.message}
                    </span>
                  )}
                </div>
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
