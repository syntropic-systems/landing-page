"use client";

import { useDemoModal } from "@/hooks/use-demo-modal";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DemoRequestForm = dynamic(
  () => import("@/components/demo-request-form").then((m) => m.DemoRequestForm),
  { ssr: false }
);

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
