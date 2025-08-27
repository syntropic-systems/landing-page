import React from "react";
import { ArrowRight } from "lucide-react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  loading?: boolean;
  icon?: string;
  href?: string;
  circular?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  fullWidth = false,
  loading = false,
  icon,
  href,
  circular = false,
  children,
  className = "",
  disabled,
  ...props
}) => {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : "",
    loading ? styles.loading : "",
    circular ? styles.circular : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const renderIcon = () => {
    if (!icon) return null;

    switch (icon) {
      case "arrow-right":
        return <ArrowRight size={30} className={styles.icon} />;
      default:
        return null;
    }
  };

  const content = loading ? (
    <span className={styles.loader} />
  ) : (
    <>
      <span>{children}</span>
      {renderIcon()}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} {...(props as any)}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {content}
    </button>
  );
};
