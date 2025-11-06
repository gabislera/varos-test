"use client";

import type { User } from "@prisma/client";
import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { DateRange } from "react-day-picker";
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedName, setSelectedName] = useState<string>("all");
  const [selectedEmail, setSelectedEmail] = useState<string>("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const isFirstRender = useRef(true);
  const isUpdatingFromURL = useRef(false);

  useEffect(() => {
    isUpdatingFromURL.current = true;

    const nameParam = searchParams.get("consultantId");
    const emailParam = searchParams.get("consultantEmail");
    const dateFromParam = searchParams.get("startDate");
    const dateToParam = searchParams.get("endDate");

    if (nameParam) {
      setSelectedName(nameParam);
    } else {
      setSelectedName("all");
    }

    if (emailParam) {
      setSelectedEmail(emailParam);
    } else {
      setSelectedEmail("all");
    }

    if (dateFromParam || dateToParam) {
      const from = dateFromParam
        ? parse(dateFromParam, "yyyy-MM-dd", new Date())
        : undefined;
      const to = dateToParam
        ? parse(dateToParam, "yyyy-MM-dd", new Date())
        : undefined;

      setDateRange({ from, to });
    } else {
      setDateRange(undefined);
    }

    setTimeout(() => {
      isUpdatingFromURL.current = false;
    }, 0);
  }, [searchParams]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (isUpdatingFromURL.current) {
      return;
    }

    const params = new URLSearchParams();

    if (selectedName && selectedName !== "all") {
      params.set("consultantId", selectedName);
    }

    if (selectedEmail && selectedEmail !== "all") {
      params.set("consultantEmail", selectedEmail);
    }

    if (dateRange?.from) {
      params.set("startDate", format(dateRange.from, "yyyy-MM-dd"));
    }

    if (dateRange?.to) {
      params.set("endDate", format(dateRange.to, "yyyy-MM-dd"));
    }

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(newUrl, { scroll: false });
  }, [selectedName, selectedEmail, dateRange, pathname, router]);

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
    <div className="border border-[#222729] rounded-lg p-4 px-6 flex flex-col lg:flex-row items-center gap-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 w-full">
        <Label className="text-xs">Nome do consultor</Label>
        <Select value={selectedName} onValueChange={setSelectedName}>
          <SelectTrigger className="w-full lg:w-auto">
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
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 w-full">
        <Label className="text-xs">Email do consultor</Label>
        <Select value={selectedEmail} onValueChange={setSelectedEmail}>
          <SelectTrigger className="w-full lg:w-auto">
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
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 w-full">
        <Label className="text-xs">Periodo</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="justify-between gap-2 w-full lg:w-auto"
            >
              <span>{formatDateRange()}</span>
              {dateRange?.from && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDateRange(undefined);
                  }}
                  className="hover:text-destructive/90 transition-colors cursor-pointer"
                  type="button"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </Button>
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
