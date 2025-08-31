"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
  cubicBezier,
} from "framer-motion";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";


interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      // IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
      className={cn("fixed inset-x-0 top-0 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<any>, {
              visible,
            })
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string; visible?: boolean }
>(({ children, className, visible = false }, ref) => {
  const { scrollY } = useScroll();

  // Animation transforms
  const width = useTransform(scrollY, [0, 100], ["100%", "50%"]);
  const y = useTransform(scrollY, [0, 100], [0, 16]);
  const backdropFilter = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(10px)"]
  );

  // Custom ease function
  const easeInOutQuart = cubicBezier(0.77, 0, 0.175, 1);

  return (
    <motion.div
      ref={ref}
      style={{
        width,
        y,
        backdropFilter,
      }}
      transition={{
        type: "tween",
        duration: 1.5,
        ease: easeInOutQuart,
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full px-4 py-2 xl:flex",
        className
      )}
    >
      {children}
    </motion.div>
  );
});

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({
  children,
  className,
  visible = false,
}: {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}) => {
  const { scrollY } = useScroll();
  
  // Animation transforms for mobile nav
  const y = useTransform(scrollY, [0, 100], [0, 10]);
  const backdropFilter = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(10px)"]
  );

  return (
    <motion.div
      style={{
        y,
        backdropFilter,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 xl:hidden",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "relative z-50 flex w-full flex-row items-center justify-between px-4 py-2",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "fixed left-4 right-4 top-20 z-50 mt-2 flex flex-col gap-4 rounded-2xl p-6",
              "bg-white/80 backdrop-blur-xl dark:bg-neutral-950/80",
              "border border-neutral-200/50 dark:border-neutral-800/50",
              className,
            )}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="text-black dark:text-white" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-black dark:text-white" onClick={onClick} />
  );
};

export const NavbarLogo = ({
  logoSrc,
  logoAlt,
  href = "/",
  logoWidth = 30,
  logoHeight = 30,
  translateX,
}: {
  logoSrc: string;
  logoAlt: string;
  brandName?: string;
  href?: string;
  logoWidth?: number;
  logoHeight?: number;
  visible?: boolean;
  translateX?: any;
}) => {
  return (
    <motion.div style={{ x: translateX }}>
      <Link
        href={href}
        className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal"
      >
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={logoWidth}
          height={logoHeight}
        />
      </Link>
    </motion.div>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-4 py-2 rounded-full bg-white button bg-white text-black text-base font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "shadow-none",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white shadow-none",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
}; 