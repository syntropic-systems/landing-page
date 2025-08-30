"use client";

import React from "react";
import { H1, Subtitle } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Header } from "../../header";
import Link from "next/link";
import { DemoRequestForm } from "@/components/demo-request-form";
import { useDemoModal } from "@/hooks/use-demo-modal";

export function HeroSection() {
  const { isOpen, openModal, closeModal } = useDemoModal();

  return (
    <section
      className="flex flex-col items-center text-center relative mx-auto rounded-b-2xl md:rounded-2xl overflow-hidden my-0 xl:my-6 py-0 px-4
         w-full h-[100vh] xl:w-[1220px] md:h-[600px] lg:h-[810px] md:px-0"
    >
      {/* SVG Background */}
      <div className="absolute inset-0 z-0">
        <svg
          width="100%"
          height="100%"
          viewbox="0 0 1220 810"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveaspectratio="xmidymid slice"
        >
          <g clippath="url(#clip0_186_1134)">
            <mask
              id="mask0_186_1134"
              style={{ masktype: "alpha" }}
              maskunits="userspaceonuse"
              x="10"
              y="-1"
              width="1200"
              height="812"
            >
              <rect
                x="10"
                y="-0.84668"
                width="1200"
                height="811.693"
                fill="url(#paint0_linear_186_1134)"
              />
            </mask>
            <g mask="url(#mask0_186_1134)">
              {/* grid rectangles */}
              {[...array(35)].map((_, i) => (
                <react.fragment key={`row1-${i}`}>
                  <rect
                    x={-20.0891 + i * 36}
                    y="9.2"
                    width="35.6"
                    height="35.6"
                    stroke="hsl(--foreground)"
                    strokeopacity="0.11"
                    strokewidth="0.4"
                    strokedasharray="2 2"
                  />
                  <rect
                    x={-20.0891 + i * 36}
                    y="45.2"
                    width="35.6"
                    height="35.6"
                    stroke="hsl(--foreground)"
                    strokeopacity="0.11"
                    strokewidth="0.4"
                    strokedasharray="2 2"
                  />
                  <rect
                    x={-20.0891 + i * 36}
                    y="81.2"
                    width="35.6"
                    height="35.6"
                    stroke="hsl(--foreground)"
                    strokeopacity="0.11"
                    strokewidth="0.4"
                    strokedasharray="2 2"
                  />
                  <rect
                    x={-20.0891 + i * 36}
                    y="117.2"
                    width="35.6"
                    height="35.6"
                    stroke="hsl(--foreground)"
                    strokeopacity="0.11"
                    strokewidth="0.4"
                    strokedasharray="2 2"
                  />
                  <rect
                    x={-20.0891 + i * 36}
                    y="153.2"
                    width="35.6"
                    height="35.6"
                    stroke="hsl(--foreground)"
                    strokeopacity="0.11"
                    strokewidth="0.4"
                    strokedasharray="2 2"
                  />
                  <rect
                    x={-20.0891 + i * 36}
                    y="189.2"
                    width="35.6"
                    height="35.6"
                    stroke="hsl(--foreground)"
                    strokeopacity="0.11"
                    strokewidth="0.4"
                    strokedasharray="2 2"
                  />
                  <rect
                    x={-20.0891 + i * 36}
                    y="225.2"
                    width="35.6"
                    height="35.6"
                    stroke="hsl(--foreground)"
                    strokeopacity="0.11"
                    strokewidth="0.4"
                    strokedasharray="2 2"
                  />
                  <rect
                    x={-20.0891 + i * 36}
                    y="261.2"
                    width="35.6"
                    height="35.6"
                    stroke="hsl(--foreground)"
                    strokeopacity="0.11"
                    strokewidth="0.4"
                    strokedasharray="2 2"
                  />
                  <rect
                    x={-20.0891 + i * 36}
                    y="297.2"
                    width="35.6"
                    height="35.6"
                    stroke="hsl(--foreground)"
                    strokeopacity="0.11"
                    strokewidth="0.4"
                    strokedasharray="2 2"
                  />
                  <rect
                    x={-20.0891 + i * 36}
                    y="333.2"
                    width="35.6"
                    height="35.6"
                    stroke="hsl(--foreground)"
                    strokeopacity="0.11"
                    strokewidth="0.4"
                    strokedasharray="2 2"
                  />
                  <rect
                    x={-20.0891 + i * 36}
                    y="369.2"
                    width="35.6"
                    height="35.6"
                    stroke="hsl(--foreground)"
                    strokeopacity="0.11"
                    strokewidth="0.4"
                    strokedasharray="2 2"
                  />
                  <rect
                    x={-20.0891 + i * 36}
                    y="405.2"
                    width="35.6"
                    height="35.6"
                    stroke="hsl(--foreground)"
                    strokeopacity="0.11"
                    strokewidth="0.4"
                    strokedasharray="2 2"
                  />
                  <rect
                    x={-20.0891 + i * 36}
                    y="441.2"
                    width="35.6"
                    height="35.6"
                    stroke="hsl(--foreground)"
                    strokeopacity="0.11"
                    strokewidth="0.4"
                    strokedasharray="2 2"
                  />
                  <rect
                    x={-20.0891 + i * 36}
                    y="477.2"
                    width="35.6"
                    height="35.6"
                    stroke="hsl(--foreground)"
                    strokeopacity="0.11"
                    strokewidth="0.4"
                    strokedasharray="2 2"
                  />
                  <rect
                    x={-20.0891 + i * 36}
                    y="513.2"
                    width="35.6"
                    height="35.6"
                    stroke="hsl(--foreground)"
                    strokeopacity="0.11"
                    strokewidth="0.4"
                    strokedasharray="2 2"
                  />
                  <rect
                    x={-20.0891 + i * 36}
                    y="549.2"
                    width="35.6"
                    height="35.6"
                    stroke="hsl(--foreground)"
                    strokeopacity="0.11"
                    strokewidth="0.4"
                    strokedasharray="2 2"
                  />
                  <rect
                    x={-20.0891 + i * 36}
                    y="585.2"
                    width="35.6"
                    height="35.6"
                    stroke="hsl(--foreground)"
                    strokeopacity="0.11"
                    strokewidth="0.4"
                    strokedasharray="2 2"
                  />
                  <rect
                    x={-20.0891 + i * 36}
                    y="621.2"
                    width="35.6"
                    height="35.6"
                    stroke="hsl(--foreground)"
                    strokeopacity="0.11"
                    strokewidth="0.4"
                    strokedasharray="2 2"
                  />
                  <rect
                    x={-20.0891 + i * 36}
                    y="657.2"
                    width="35.6"
                    height="35.6"
                    stroke="hsl(--foreground)"
                    strokeopacity="0.11"
                    strokewidth="0.4"
                    strokedasharray="2 2"
                  />
                  <rect
                    x={-20.0891 + i * 36}
                    y="693.2"
                    width="35.6"
                    height="35.6"
                    stroke="hsl(--foreground)"
                    strokeopacity="0.11"
                    strokewidth="0.4"
                    strokedasharray="2 2"
                  />
                  <rect
                    x={-20.0891 + i * 36}
                    y="729.2"
                    width="35.6"
                    height="35.6"
                    stroke="hsl(--foreground)"
                    strokeopacity="0.11"
                    strokewidth="0.4"
                    strokedasharray="2 2"
                  />
                  <rect
                    x={-20.0891 + i * 36}
                    y="765.2"
                    width="35.6"
                    height="35.6"
                    stroke="hsl(--foreground)"
                    strokeopacity="0.11"
                    strokewidth="0.4"
                    strokedasharray="2 2"
                  />
                </react.fragment>
              ))}
              {/* specific rectangles with fill */}
              <rect
                x="699.711"
                y="81"
                width="36"
                height="36"
                fill="hsl(--foreground)"
                fillopacity="0.08"
              />
              <rect
                x="195.711"
                y="153"
                width="36"
                height="36"
                fill="hsl(--foreground)"
                fillopacity="0.09"
              />
              <rect
                x="1023.71"
                y="153"
                width="36"
                height="36"
                fill="hsl(--foreground)"
                fillopacity="0.09"
              />
              <rect
                x="123.711"
                y="225"
                width="36"
                height="36"
                fill="hsl(--foreground)"
                fillopacity="0.09"
              />
              <rect
                x="1095.71"
                y="225"
                width="36"
                height="36"
                fill="hsl(var(--foreground))"
                fillopacity="0.09"
              />
              <rect
                x="951.711"
                y="297"
                width="36"
                height="36"
                fill="hsl(--foreground)"
                fillopacity="0.09"
              />
              <rect
                x="231.711"
                y="333"
                width="36"
                height="36"
                fill="hsl(--foreground)"
                fillopacity="0.07"
              />
              <rect
                x="303.711"
                y="405"
                width="36"
                height="36"
                fill="hsl(var(--foreground))"
                fillopacity="0.07"
              />
              <rect
                x="87.7109"
                y="405"
                width="36"
                height="36"
                fill="hsl(--foreground)"
                fillopacity="0.09"
              />
              <rect
                x="519.711"
                y="405"
                width="36"
                height="36"
                fill="hsl(--foreground)"
                fillopacity="0.08"
              />
              <rect
                x="771.711"
                y="405"
                width="36"
                height="36"
                fill="hsl(--foreground)"
                fillopacity="0.09"
              />
              <rect
                x="591.711"
                y="477"
                width="36"
                height="36"
                fill="hsl(--foreground)"
                fillopacity="0.07"
              />
            </g>

            <g filter="url(#filter0_f_186_1134)">
              <path
                d="m1447.45 -87.0203v-149.03h1770v1248.85h466.158v894.269c1008.11 894.269 1447.45 454.931 1447.45 -87.0203z"
                fill="url(#paint1_linear_186_1134)"
              />
            </g>

            <g filter="url(#filter1_f_186_1134)">
              <path
                d="m1383.45 -151.02v-213.03h1706v1184.85h402.158v830.269c944.109 830.269 1383.45 390.931 1383.45 -151.02z"
                fill="url(#paint2_linear_186_1134)"
                fillopacity="0.69"
              />
            </g>

            <g
              style={{ mixblendmode: "lighten" }}
              filter="url(#filter2_f_186_1134)"
            >
              <path
                d="m1567.45 -231.02v-293.03h1890v1104.85h586.158v750.269c1128.11 750.269 1567.45 310.931 1567.45 -231.02z"
                fill="url(#paint3_linear_186_1134)"
              />
            </g>

            <g
              style={{ mixblendmode: "overlay" }}
              filter="url(#filter3_f_186_1134)"
            >
              <path
                d="m65.625 750.269h284.007c860.205 750.269 1327.31 283.168 1327.31 -293.03h1650v1104.85h65.625v750.269z"
                fill="url(#paint4_radial_186_1134)"
                fillopacity="0.64"
              />
            </g>
          </g>

          <rect
            x="0.5"
            y="0.5"
            width="1219"
            height="809"
            rx="15.5"
            stroke="hsl(--foreground)"
            strokeopacity="0.06"
          />

          <defs>
            <filter
              id="filter0_f_186_1134"
              x="147.369"
              y="-467.818"
              width="1941.42"
              height="2035.46"
              filterunits="userspaceonuse"
              colorinterpolationfilters="srgb"
            >
              <feflood floodopacity="0" result="backgroundimagefix" />
              <feblend
                mode="normal"
                in="sourcegraphic"
                in2="backgroundimagefix"
                result="shape"
              />
              <fegaussianblur
                stddeviation="159.394"
                result="effect1_foregroundblur_186_1134"
              />
            </filter>
            <filter
              id="filter1_f_186_1134"
              x="-554.207"
              y="-1169.39"
              width="3216.57"
              height="3310.61"
              filterunits="userspaceonuse"
              colorinterpolationfilters="srgb"
            >
              <feflood floodopacity="0" result="backgroundimagefix" />
              <feblend
                mode="normal"
                in="sourcegraphic"
                in2="backgroundimagefix"
                result="shape"
              />
              <fegaussianblur
                stddeviation="478.182"
                result="effect1_foregroundblur_186_1134"
              />
            </filter>
            <filter
              id="filter2_f_186_1134"
              x="426.762"
              y="-452.424"
              width="1622.63"
              height="1716.67"
              filterunits="userspaceonuse"
              colorinterpolationfilters="srgb"
            >
              <feflood floodopacity="0" result="backgroundimagefix" />
              <feblend
                mode="normal"
                in="sourcegraphic"
                in2="backgroundimagefix"
                result="shape"
              />
              <fegaussianblur
                stddeviation="79.6969"
                result="effect1_foregroundblur_186_1134"
              />
            </filter>
            <filter
              id="filter3_f_186_1134"
              x="-253.163"
              y="-611.818"
              width="2221.95"
              height="2035.46"
              filterunits="userspaceonuse"
              colorinterpolationfilters="srgb"
            >
              <feflood floodopacity="0" result="backgroundimagefix" />
              <feblend
                mode="normal"
                in="sourcegraphic"
                in2="backgroundimagefix"
                result="shape"
              />
              <fegaussianblur
                stddeviation="159.394"
                result="effect1_foregroundblur_186_1134"
              />
            </filter>
            <lineargradient
              id="paint0_linear_186_1134"
              x1="35.0676"
              y1="23.6807"
              x2="903.8"
              y2="632.086"
              gradientunits="userspaceonuse"
            >
              <stop stopcolor="hsl(--foreground)" stopopacity="0" />
              <stop offset="1" stopcolor="hsl(var(--muted-foreground))" />
            </lineargradient>
            <lineargradient
              id="paint1_linear_186_1134"
              x1="1118.08"
              y1="-149.03"
              x2="1118.08"
              y2="1248.85"
              gradientunits="userspaceonuse"
            >
              <stop stopcolor="hsl(--foreground)" />
              <stop offset="0.578125" stopcolor="hsl(var(--primary-light))" />
              <stop offset="1" stopcolor="hsl(var(--primary))" />
            </lineargradient>
            <lineargradient
              id="paint2_linear_186_1134"
              x1="1054.08"
              y1="-213.03"
              x2="1054.08"
              y2="1184.85"
              gradientunits="userspaceonuse"
            >
              <stop stopcolor="hsl(--foreground)" />
              <stop offset="0.578125" stopcolor="hsl(var(--primary-light))" />
              <stop offset="1" stopcolor="hsl(var(--primary))" />
            </lineargradient>
            <lineargradient
              id="paint3_linear_186_1134"
              x1="1238.08"
              y1="-293.03"
              x2="1238.08"
              y2="1104.85"
              gradientunits="userspaceonuse"
            >
              <stop stopcolor="hsl(--foreground)" />
              <stop offset="0.578125" stopcolor="hsl(var(--primary-light))" />
              <stop offset="1" stopcolor="hsl(var(--primary))" />
            </lineargradient>
            <radialgradient
              id="paint4_radial_186_1134"
              cx="0"
              cy="0"
              r="1"
              gradientunits="userspaceonuse"
              gradienttransform="translate(989.13 557.24) rotate(47.9516) scale(466.313 471.424)"
            >
              <stop stopcolor="hsl(--foreground)" />
              <stop offset="0.157789" stopcolor="hsl(var(--primary-light))" />
              <stop offset="1" stopcolor="hsl(var(--primary))" />
            </radialgradient>
            <clippath id="clip0_186_1134">
              <rect
                width="1220"
                height="810"
                rx="16"
                fill="hsl(--foreground)"
              />
            </clippath>
          </defs>
        </svg>
      </div>

      {/* Header positioned at top of hero container */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <Header />
      </div>

      <div className="absolute top-1/2 -translate-y-1/2">
        <div className="relative z-10 space-y-4 md:space-y-5 lg:space-y-6 mb-6 md:mb-7 lg:mb-9 max-w-md md:max-w-[500px] lg:max-w-[588px] xl:max-w-[1000px] mt-16 px-4">
          <H1 className="text-foreground text-3xl md:text-4xl lg:text-6xl font-semibold leading-tight">
            The AI-Powered Command Centre for Your Bid Process.
          </H1>
          <Subtitle>
            Automate document analysis, generate winning proposals, and empower
            your team to focus on high-value strategy.
          </Subtitle>
        </div>

        <div className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 items-center justify-center gap-x-6">
          <Button
            onClick={openModal}
            className="relative z-10 bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-3 rounded-full font-medium text-base shadow-lg ring-1 ring-white/10"
          >
            Request Demo
          </Button>
          <Link
            href="https://app.cloudglancelab.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="relative z-10 px-8 py-3 rounded-full font-medium text-base border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Try Live Demo
            </Button>
          </Link>
        </div>
      </div>

      <DemoRequestForm isOpen={isOpen} onClose={closeModal} />
    </section>
  );
}
