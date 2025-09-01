"use client";
import {
  NavBody,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { NavContent } from "@/components/ui/nav-content";
import { useState } from "react";
import navbarData from "@/content/navbar_new.json";
import { useDemoModal } from "@/hooks/use-demo-modal";
import { AnimatePresence, motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";

export function HeaderContent({ visible }: { visible?: boolean }) {
  const { navLinks, actions, brand } = navbarData;
  const { openModal } = useDemoModal();
  const { scrollY } = useScroll();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const translateX = useTransform(scrollY, [0, 100], [0, 100]);
  const translateXReverse = useTransform(scrollY, [0, 100], [0, -100]);
  const y = useTransform(scrollY, [0, 100], [8, 0]); // Reduced from 30 to 8

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    if (!href) return; // Prevent error if href is undefined
    const targetId = href.substring(1); // Remove '#' from href
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <NavBody visible={visible}>
        <motion.div style={{ x: translateX, y }}>
          <NavbarLogo
            logoSrc="/logos/Logo Full.svg"
            logoAlt={brand.logo.alt}
            href={brand.href}
            logoWidth={96}
            logoHeight={20}
          />
        </motion.div>
        <NavContent>
          <div className="flex items-center gap-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href!)}
                className="text-white py-2 text-base"
              >
                {link.label}
              </a>
            ))}
          </div>
        </NavContent>
        <motion.div style={{}} className="absolute right-4 flex items-center">
          <AnimatePresence>
            {visible && (
              <motion.div
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 0 }}
                transition={{
                  type: "tween",
                  duration: visible ? 0.3 : 0,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <NavbarButton variant="primary" onClick={openModal} as="button">
                  {actions.primary.label}
                </NavbarButton>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav visible={visible}>
        <MobileNavHeader className="flex items-center justify-between w-full px-4 rounded-lg">
          <NavbarLogo
            logoSrc="/logos/Logo Icon White.svg"
            logoAlt="Cloud Glance AI"
            href="/"
            logoWidth={40}
            logoHeight={40}
            visible={visible}
          />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navLinks.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.href || "#"}
              onClick={(e) => {
                handleScroll(e, item.href || "#");
                setIsMobileMenuOpen(false);
              }}
              className="relative text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              <span className="block py-2">{item.label}</span>
            </a>
          ))}
          <div className="flex w-full flex-col gap-4 mt-4">
            <NavbarButton
              onClick={() => {
                openModal();
                setIsMobileMenuOpen(false);
              }}
              variant="primary"
              className="w-full"
              as="button"
            >
              {actions.primary.label}
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </>
  );
}
