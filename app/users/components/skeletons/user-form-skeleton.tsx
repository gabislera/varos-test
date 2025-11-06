import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function UserFormSkeleton() {
  return (
    <div className="flex flex-col w-full max-w-[600px]">
      <div className="flex items-center justify-end gap-4 mb-6">
        <Skeleton className="h-9 w-[100px] bg-[#1B3F1B] rounded-[48px]" />

        <Button variant="secondary" disabled>
          Deletar usuário
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-2 w-full col-span-2">
          <Label>Tipo de usuário</Label>
          <Skeleton className="h-9 w-full" />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Nome</Label>
          <Skeleton className="h-9 w-full" />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Telefone</Label>
          <Skeleton className="h-9 w-full" />
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          <Label>Email</Label>
          <Skeleton className="h-9 w-full" />
        </div>

        <div className="col-span-2">
          <Tabs defaultValue="userInfo" className="space-y-6">
            <TabsList>
              <TabsTrigger value="userInfo">Informações básicas</TabsTrigger>
            </TabsList>

            <TabsContent value="userInfo">
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <Label>Idade</Label>
                  <Skeleton className="h-9 w-full" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>CPF</Label>
                  <Skeleton className="h-9 w-full" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>CEP</Label>
                  <Skeleton className="h-9 w-full" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Estado</Label>
                  <Skeleton className="h-9 w-full" />
                </div>
                <div className="flex flex-col gap-2 col-span-2">
                  <Label>Endereço</Label>
                  <Skeleton className="h-9 w-full" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Número</Label>
                  <Skeleton className="h-9 w-full" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
