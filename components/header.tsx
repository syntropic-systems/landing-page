"use client";
import { Navbar } from "@/components/ui/resizable-navbar";
import { HeaderContent } from "@/components/header-content";

export function Header() {
  return (
    <Navbar>
      <HeaderContent />
    </Navbar>
  );
}
