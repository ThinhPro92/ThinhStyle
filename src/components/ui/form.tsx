import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export const Form = ({
  className,
  ...props
}: HTMLAttributes<HTMLFormElement>) => (
  <form className={cn("space-y-6", className)} {...props} />
);
