"use client";

import { useState } from "react";
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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FilterBar() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 5, 12),
    to: new Date(2025, 6, 15),
  });

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
              <SelectLabel>Jhon Doe</SelectLabel>
              <SelectItem value="jim-beam">Jim Beam</SelectItem>
              <SelectItem value="john-doe">John Doe</SelectItem>
              <SelectItem value="jane-doe">Jane Doe</SelectItem>
              <SelectItem value="jim-beam">Jim Beam</SelectItem>
              <SelectItem value="john-doe">John Doe</SelectItem>
              <SelectItem value="jane-doe">Jane Doe</SelectItem>
              <SelectItem value="jim-beam">Jim Beam</SelectItem>
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
              <SelectLabel>jhon.doe@gmail.com</SelectLabel>
              <SelectItem value="jane.doe@gmail.com">
                jane.doe@gmail.com
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <Label className="text-xs">Periodo</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Periodo</Button>
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
