"use client";

import type { User } from "@prisma/client";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FilterBar({ consultants }: { consultants: User[] }) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const formatDateRange = () => {
    if (!dateRange?.from) {
      return "Selecione um período";
    }

    if (dateRange.from && !dateRange.to) {
      return format(dateRange.from, "dd/MM/yyyy", { locale: ptBR });
    }

    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })} - ${format(dateRange.to, "dd/MM/yyyy", { locale: ptBR })}`;
    }

    return "Selecione um período";
  };

  return (
    <div className="border border-[#222729] rounded-md p-4 px-6 flex items-center gap-6">
      <div className="flex items-center gap-2">
        <Label className="text-xs">Nome do consultor</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Jhon Doe" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {consultants.length === 0 ? (
                <SelectItem value="none">
                  Nenhum consultor encontrado
                </SelectItem>
              ) : (
                <>
                  <SelectItem value="all">Todos</SelectItem>
                  {consultants.map((consultant) => (
                    <SelectItem key={consultant.id} value={consultant.id}>
                      {consultant.name}
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <Label className="text-xs">Email do consultor</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="jhon.doe@gmail.com" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {consultants.length === 0 ? (
                <SelectItem value="none">
                  Nenhum consultor encontrado
                </SelectItem>
              ) : (
                <>
                  <SelectItem value="all">Todos</SelectItem>
                  {consultants.map((consultant) => (
                    <SelectItem key={consultant.id} value={consultant.email}>
                      {consultant.email}
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <Label className="text-xs">Periodo</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">{formatDateRange()}</Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            side="bottom"
            collisionPadding={16}
            className="w-auto p-0"
          >
            <Calendar
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              className="rounded-lg border shadow-sm"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
