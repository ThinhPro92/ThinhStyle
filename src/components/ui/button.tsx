import { forwardRef, type ButtonHTMLAttributes } from "react";
import { buttonVariants, type ButtonVariants } from "./button.variants";
import { cn } from "../../utils/cn";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
