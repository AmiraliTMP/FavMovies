"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

type AuthInputProps = {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  onValueChange?: (value: string) => void;
  dir?: "ltr" | "rtl" | "auto";
  registration?: UseFormRegisterReturn;
};

export default function AuthInput({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
  required = true,
  onValueChange,
  dir,
  registration,
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-bold text-white/90">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={inputType}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          dir={dir}
          {...registration}
          onChange={(event) => {
            registration?.onChange(event);
            onValueChange?.(event.target.value);
          }}
          className={`h-12.5 w-full rounded-[9px] border border-white/15 bg-[#181818]/90 px-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#F5C518] focus:ring-4 focus:ring-[#F5C518]/10 ${
            isPassword ? "pe-12" : ""
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 inset-e-3 inline-flex items-center justify-center text-white/45 transition hover:text-[#F5C518]"
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        )}
      </div>
    </div>
  );
}
