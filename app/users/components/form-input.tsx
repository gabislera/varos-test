import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormInputProps {
  label: string;
  type: string;
  placeholder?: string;
  fullWidth?: boolean;
  error?: FieldError;
  register: UseFormRegisterReturn;
  className?: string;
  isLoading?: boolean;
}

export default function FormInput({
  label,
  type,
  placeholder,
  fullWidth = false,
  error,
  register,
  className,
  isLoading = false,
}: FormInputProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        fullWidth && "w-full col-span-2",
        className,
      )}
    >
      <Label>{label}</Label>
      <div className="relative">
        <Input
          type={type}
          {...(placeholder && { placeholder })}
          {...register}
          className="w-full"
          disabled={isLoading}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        )}
      </div>
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
}
