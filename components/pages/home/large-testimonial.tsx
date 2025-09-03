import Image from "next/image";
import { H3 } from "@/components/ui/typography";

export function LargeTestimonial() {
  return (
    <section className="w-full px-5 overflow-hidden flex justify-center items-center">
      <div className="flex-1 flex flex-col justify-start items-start overflow-hidden">
        <div className="self-stretch px-4 py-12 md:px-6 md:py-16 lg:py-28 flex flex-col justify-start items-start gap-2">
          <div className="self-stretch flex justify-between items-center">
            <div className="flex-1 px-4 py-8 md:px-12 lg:px-20 md:py-8 lg:py-10 overflow-hidden rounded-lg flex flex-col justify-center items-start gap-6 md:gap-8 lg:gap-11">
              <div className="">
                <H3 className="text-left">
                  &quot;CloudGlance transformed our entire bid process. We went
                  from analyzing 200+ page documents in weeks to getting
                  actionable insights in minutes. Our win rate increased by 40%
                  in the first quarter alone.&quot;
                </H3>
              </div>
              <div className="flex justify-start items-start gap-5">
                <Image
                  src="/images/guillermo-rauch.png"
                  alt="Guillermo Rauch avatar"
                  width={48}
                  height={48}
                  className="w-12 h-12 relative rounded-full"
                  style={{ border: "1px solid var(--border-black-08)" }}
                  loading="lazy"
                />
                <div className="flex flex-col justify-start items-start">
                  <div className="text-foreground text-base font-medium leading-6">
                    Sarah Chen
                  </div>
                  <div className="text-muted-foreground text-sm font-normal leading-6">
                    {"VP Business Development, Global Engineering Firm"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
