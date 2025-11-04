"use client";

import { useState } from "react";
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

export default function UsersPage() {
  const [selectedClients, setSelectedClients] = useState<string[]>([]);

  return (
    <div className="flex items-center justify-center h-full pt-8">
      <form className="flex flex-col w-full max-w-[600px]">
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-2 w-full col-span-2">
            <Label>Tipo de usuario</Label>
            <Select>
              <SelectTrigger className="w-full ">
                <SelectValue placeholder="Tipo de usuario" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectGroup>
                  <SelectLabel>Selecione o tipo de usuario</SelectLabel>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="consultor">Consultor</SelectItem>
                  <SelectItem value="cliente">Cliente</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <FormInput label="Nome" type="text" placeholder="Digite o nome" />
          <FormInput
            label="Telefone"
            type="text"
            placeholder="Digite o telefone"
          />
          <FormInput
            label="Email"
            type="email"
            placeholder="Digite o email"
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
                  />
                  <FormInput
                    label="CEP"
                    type="text"
                    placeholder="Digite o CEP"
                  />

                  <FormInput
                    label="Estado"
                    type="text"
                    placeholder="Digite o estado"
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
                    fullWidth
                  />
                  <FormInput
                    label="Complemento"
                    type="text"
                    placeholder="Digite o complemento"
                    fullWidth
                  />
                </div>
              </TabsContent>

              <TabsContent value="addClients">
                <MultiSelect
                  options={clients}
                  selected={selectedClients}
                  onSelectionChange={setSelectedClients}
                  placeholder="Selecione clientes..."
                  label="Clientes"
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </form>
    </div>
  );
}
