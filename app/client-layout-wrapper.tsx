"use client";

import { useDemoModal } from "@/hooks/use-demo-modal";
import { DemoRequestForm } from "@/components/demo-request-form";
import { useEffect, useState } from "react";

export function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, closeModal } = useDemoModal();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {children}
      {isClient && <DemoRequestForm isOpen={isOpen} onClose={closeModal} />}
    </>
  );
} 