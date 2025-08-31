"use client";

import { Twitter, Github, Linkedin } from "lucide-react";
import Image from "next/image";

export function FooterSection() {
  return (
    <footer className="w-full max-w-[1320px] mx-auto px-5 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0 py-10 md:py-[70px]">
      {/* Left Section: Logo, Description, Social Links */}
      <div className="flex flex-col justify-start items-start gap-8 p-4 md:p-8">
        <div className="flex gap-3 items-stretch justify-center">
          <Image
            src="/logos/Logo Full.svg"
            alt="Logo"
            width={120}
            height={24}
          />
        </div>
        <p className="text-foreground/90 text-sm leading-[18px] text-left">
          Analysis made effortless
        </p>
        <div className="flex justify-start items-start gap-3">
          <a
            href="#"
            aria-label="Twitter"
            className="w-4 h-4 flex items-center justify-center"
          >
            <Twitter className="w-full h-full text-muted-foreground" />
          </a>
          <a
            href="#"
            aria-label="GitHub"
            className="w-4 h-4 flex items-center justify-center"
          >
            <Github className="w-full h-full text-muted-foreground" />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="w-4 h-4 flex items-center justify-center"
          >
            <Linkedin className="w-full h-full text-muted-foreground" />
          </a>
        </div>
      </div>
      {/* Right Section: Navigation Links */}
      <div className="flex flex-col justify-start items-start gap-3 p-4 md:p-8">
        <h3 className="text-muted-foreground text-sm font-medium leading-5">
          Navigation
        </h3>
        <div className="flex flex-col justify-end items-start gap-2">
          <a
            href="#features-section"
            className="text-foreground text-sm font-normal leading-5 hover:underline"
          >
            Features
          </a>
          <a
            href="#solutions-section"
            className="text-foreground text-sm font-normal leading-5 hover:underline"
          >
            Solutions
          </a>
          <a
            href="#technology-section"
            className="text-foreground text-sm font-normal leading-5 hover:underline"
          >
            Technology
          </a>
          <a
            href="#faq-section"
            className="text-foreground text-sm font-normal leading-5 hover:underline"
          >
            FAQ
          </a>
        </div>
      </div>
    </footer>
  );
}