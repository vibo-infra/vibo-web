import React from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  loading = false,
  ...props
}) => {
  const baseStyles = `
    font-medium transition-all duration-200 
    active:scale-[0.97] 
    focus:outline-none focus:ring-2 focus:ring-primary
    duration-300 ease-out
  `;

  const variantStyles: Record<ButtonVariant, string> = {
    primary: `
      bg-primary text-black 
    `,
    secondary: `
      bg-background-secondary text-text
      hover:bg-background-tertiary
    `,
    outline: `
      border border-text-muted text-text-tertiary
      hover:border-primary hover:text-primary
    `,
    ghost: `
      text-text-muted
      hover:text-secondary
      hover:bg-background-tertiary-light
      shadow-soft
    `,
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      {...props}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? "w-full" : ""}
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
        rounded-3xl
      `}
    >
      {loading ? (
        <span className="animate-pulse opacity-80">Loading...</span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
