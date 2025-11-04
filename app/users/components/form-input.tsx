import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
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
}

export default function FormInput({
  label,
  type,
  placeholder,
  fullWidth = false,
  error,
  register,
  className,
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
      <Input
        type={type}
        {...(placeholder && { placeholder })}
        {...register}
        className="w-full"
      />
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
}
