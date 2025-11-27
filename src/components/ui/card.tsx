import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-3xl bg-white shadow-2xl", className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

export { Card };
