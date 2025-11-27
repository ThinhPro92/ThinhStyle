import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, ...props }, ref) => {
    {
      return (
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base placeholder:text-slate-400",
            "focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-all duration-200",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
      );
    }
  }
);
Input.displayName = "Input";

export { Input };
