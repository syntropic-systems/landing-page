'use client'

import { create } from "zustand";

interface DemoModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useDemoModal = create<DemoModalState>()((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
