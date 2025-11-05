"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createUser, getClients } from "./actions";
import FormInput from "./components/form-input";

const userSchema = z.object({
  role: z.enum(["ADMIN", "CONSULTANT", "CLIENT"]),
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  phone: z.string().regex(/^\(?\d{2}\)?[\s.-]?\d{4,5}[\s.-]?\d{4}$/, {
    message: "Telefone inválido",
  }),
  email: z.email({ message: "Email inválido" }),
  age: z
    .string()
    .regex(/^\d+$/, { message: "Idade deve ser um número" })
    .optional()
    .or(z.literal("")),
  cpf: z.string().min(11, { message: "CPF deve ter 11 dígitos" }),
  zipcode: z
    .string()
    .regex(/^\d{5}-?\d{3}$/, { message: "CEP inválido. Ex: 00000-000" }),
  state: z.string().min(1, { message: "Estado é obrigatório" }),
  street: z.string().min(1, { message: "Rua é obrigatória" }),
  number: z
    .string()
    .min(1, { message: "Número é obrigatório" })
    .regex(/^\d+$/, { message: "Número deve conter apenas dígitos" }),
  clients: z.array(z.string()).optional(),
});

type UserFormData = z.infer<typeof userSchema>;

export default function UsersPage() {
  const [clients, setClients] = useState<
    Array<{ id: string; name: string; email: string }>
  >([]);
  const [loadingClients, setLoadingClients] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    mode: "onChange",
    defaultValues: {
      role: "CONSULTANT",
      clients: [],
    },
  });

  useEffect(() => {
    async function fetchClients() {
      setLoadingClients(true);
      const result = await getClients();
      if (result.success) {
        setClients(result.data);
      }
      setLoadingClients(false);
    }
    fetchClients();
  }, []);

  const onSubmit = async (data: UserFormData) => {
    const formattedData = {
      ...data,
      clientIds: data.clients,
    };

    const result = await createUser(formattedData);

    if (result.success) {
      reset();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <header className="w-full border-b border-[#222729] py-6 px-8 flex items-center justify-between sticky top-0 bg-background">
        <Link href="/dashboard">
          <h1>VAROS</h1>
        </Link>
        <div className="flex items-center gap-4">
          <Button type="submit" form="user-form" variant="default">
            Criar usuário
          </Button>
          <Button variant="secondary" disabled>
            Deletar usuário
          </Button>
        </div>
      </header>
      <form
        className="flex flex-col w-full max-w-[600px] mt-8"
        onSubmit={handleSubmit(onSubmit)}
        id="user-form"
      >
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-2 w-full col-span-2">
            <Label>Tipo de usuario</Label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="Tipo de usuario" />
                  </SelectTrigger>
                  <SelectContent className="">
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
                <TabsTrigger value="addClients">Adicionar clientes</TabsTrigger>
              </TabsList>

              <TabsContent value="userInfo">
                <div className="grid grid-cols-2 gap-8">
                  <FormInput
                    label="Idade"
                    type="text"
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
                    register={register("zipcode")}
                    error={errors.zipcode}
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
                              <SelectLabel>Selecione o estado</SelectLabel>
                              <SelectItem value="SP">São Paulo</SelectItem>
                              <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                              <SelectItem value="MG">Minas Gerais</SelectItem>
                              <SelectItem value="ES">Espírito Santo</SelectItem>
                              <SelectItem value="RS">
                                Rio Grande do Sul
                              </SelectItem>
                              <SelectItem value="PR">Paraná</SelectItem>
                              <SelectItem value="SC">Santa Catarina</SelectItem>
                              <SelectItem value="MS">
                                Mato Grosso do Sul
                              </SelectItem>
                              <SelectItem value="MT">Mato Grosso</SelectItem>
                              <SelectItem value="GO">Goiás</SelectItem>
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
                    label="Complemento"
                    placeholder="Digite o complemento"
                    type="text"
                    register={register("number")}
                    error={errors.number}
                    fullWidth
                  />
                </div>
              </TabsContent>

              <TabsContent value="addClients">
                <Controller
                  name="clients"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div>
                      {loadingClients ? (
                        <p className="text-sm text-muted-foreground">
                          Carregando clientes...
                        </p>
                      ) : clients.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          Nenhum cliente encontrado.
                        </p>
                      ) : (
                        <MultiSelect
                          options={clients}
                          selected={field.value || []}
                          onSelectionChange={field.onChange}
                          placeholder="Selecione clientes..."
                          label="Clientes"
                        />
                      )}
                      {fieldState.error && (
                        <span className="text-red-500 text-sm">
                          {fieldState.error.message}
                        </span>
                      )}
                    </div>
                  )}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </form>
    </div>
  );
}
