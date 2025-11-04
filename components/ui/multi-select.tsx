"use client";

import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onSelectionChange: (selected: string[]) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onSelectionChange,
  placeholder = "Selecione...",
  label,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);

  const toggleOption = (option: string) => {
    const newSelected = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option];
    onSelectionChange(newSelected);
  };

  const getDisplayText = () => {
    if (selected.length === 0) return placeholder;

    const joined = selected.join(", ");
    if (joined.length <= 40) return joined;

    let truncated = "";
    for (const name of selected) {
      if (`${truncated}${name}, `.length > 40) break;
      truncated += `${name}, `;
    }
    return `${truncated.trim().replace(/,$/, "")}...`;
  };

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      {label && <Label>{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            className={cn(
              "flex items-center justify-between w-full rounded-md border border-input bg-[#131516] px-3 py-2 text-sm",
              "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "hover:bg-input/50 cursor-pointer",
            )}
          >
            <span className="truncate text-muted-foreground">
              {getDisplayText()}
            </span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          <ul className="max-h-60 overflow-y-auto bg-[#131516]">
            {options.map((option) => {
              const isSelected = selected.includes(option);
              return (
                <button
                  key={option}
                  role="option"
                  type="button"
                  onClick={() => toggleOption(option)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      toggleOption(option);
                    }
                  }}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-input/50 w-full",
                    isSelected && "bg-accent/60",
                  )}
                >
                  <span>{option}</span>
                  {isSelected && <Check className="h-4 w-4 text-primary" />}
                </button>
              );
            })}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}
