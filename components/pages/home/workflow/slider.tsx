"use client";

import React from "react";
import Slider from "react-slick";
import { useIsMobile } from "@/hooks/use-mobile";

// Import slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { H3, Subtitle } from "@/components/ui/typography";
import { workflowContent } from "../workflow-section";

export default function WorkflowSlider() {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = React.useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    pauseOnHover: true,
    arrows: false,
    beforeChange: (oldIndex: number, newIndex: number) =>
      setActiveIndex(newIndex),
    responsive: [
      {
        breakpoint: 400,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  // Only render on mobile
  if (!isMobile) {
    return null;
  }

  //DO NOT REMOVE THE PY-8 ON THE DIV. IT REMOVES THE BOTTOM ACTIVE SLIDER
  return (
    <div className="w-full py-8">
      <div className="relative">
        <Slider {...settings} className="workflow-slider">
          {workflowContent.map((step) => (
            <div key={step.id} className="px-2">
              <div className="text-center mb-4">
                <H3>{step.title}</H3>
                <Subtitle>{step.description}</Subtitle>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Custom styles for the slider */}
      <style jsx global>{`
        .slick-prev::before {
          display: none;
        }
        .slick-next::before {
          display: none;
        }
        .workflow-slider .slick-dots {
          bottom: -30px;
        }

        .workflow-slider .slick-dots li {
          margin: 0 8px;
        }

        .workflow-slider .slick-dots li button:before {
          content: "";
          width: 20px;
          height: 3px;
          background-color: var(--muted-foreground);
          border-radius: 3px;
          opacity: 0.6;
          transition: all 0.3s ease;
          transform: translateX(-50%);
          left: 50%;
        }

        .workflow-slider .slick-dots li.slick-active button:before {
          background-color: var(--primary);
          opacity: 1;
          width: 28px;
          transform: translateX(-50%);
          left: 50%;
        }

        .workflow-slider .slick-slide {
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }

        .workflow-slider .slick-active {
          opacity: 1;
        }

        .workflow-slider .slick-track {
          display: flex !important;
        }

        .workflow-slider .slick-slide {
          height: inherit !important;
        }

        .workflow-slider .slick-slide > div {
          height: 100%;
        }
      `}</style>
    </div>
  );
}
