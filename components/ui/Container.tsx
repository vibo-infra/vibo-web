import clsx from "clsx";
import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer";
};

export function Container({
  children,
  className,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={clsx(
        "mx-auto w-full max-w-[1120px] px-8 max-md:px-5",
        className
      )}
    >
      {children}
    </Component>
  );
}
