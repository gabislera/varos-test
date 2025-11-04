"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import FormInput from "./components/form-input";

const clients = [
  "John Doe",
  "Licon Doe",
  "Steve Doe",
  "Matt Doe",
  "Sarah Doe",
  "Lucas Doe",
];

const userSchema = z.object({
  role: z.enum(["admin", "consulter", "client"]),
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  phone: z.string().regex(/^\(?\d{2}\)?[\s.-]?\d{4,5}[\s.-]?\d{4}$/, {
    message: "Telefone inválido",
  }),
  email: z.string().email({ message: "Email inválido" }),
  age: z
    .string()
    .regex(/^\d+$/, { message: "Idade deve ser um número" })
    .optional()
    .or(z.literal("")),
  cpf: z.string().min(11, { message: "CPF deve ter 11 dígitos" }),
  address: z.object({
    zipcode: z
      .string()
      .regex(/^\d{5}-?\d{3}$/, { message: "CEP inválido. Ex: 00000-000" }),
    state: z.string().min(1, { message: "Estado é obrigatório" }),
    street: z.string().min(1, { message: "Rua é obrigatória" }),
    number: z
      .string()
      .min(1, { message: "Número é obrigatório" })
      .regex(/^\d+$/, { message: "Número deve conter apenas dígitos" }),
  }),
  clients: z.array(z.string()).optional(),
});

type UserFormData = z.infer<typeof userSchema>;

export default function UsersPage() {
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
      role: "consulter",
      clients: [],
    },
  });

  const onSubmit = (data: UserFormData) => {
    console.log(data);
    reset();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <header className="w-full border-b border-[#222729] py-6 px-8 flex items-center justify-between sticky top-0 bg-background">
        <h1>VAROS</h1>
        <div className="flex items-center gap-4">
          <Button type="submit" form="user-form" variant="outline">
            Criar usuário
          </Button>
          <Button variant="outline">Deletar usuário</Button>
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
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="consulter">Consultor</SelectItem>
                      <SelectItem value="client">Cliente</SelectItem>
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
          <FormInput
            label="CPF"
            type="text"
            placeholder="Digite o CPF"
            register={register("cpf")}
            error={errors.cpf}
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
                    label="CEP"
                    type="text"
                    placeholder="Digite o CEP"
                    register={register("address.zipcode")}
                    error={errors.address?.zipcode}
                  />

                  <FormInput
                    label="Estado"
                    type="text"
                    placeholder="Digite o estado"
                    register={register("address.state")}
                    error={errors.address?.state}
                  />
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2 w-full col-span-2">
                      <Label>Estado</Label>
                      <Select>
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
                    </div>
                  </div>
                  <FormInput
                    label="Endereço"
                    type="text"
                    placeholder="Digite o endereço"
                    register={register("address.street")}
                    error={errors.address?.street}
                    fullWidth
                  />
                  <FormInput
                    label="Complemento"
                    placeholder="Digite o complemento"
                    type="text"
                    register={register("address.number")}
                    error={errors.address?.number}
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
                      <MultiSelect
                        options={clients}
                        selected={field.value || []}
                        onSelectionChange={field.onChange}
                        placeholder="Selecione clientes..."
                        label="Clientes"
                      />
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
