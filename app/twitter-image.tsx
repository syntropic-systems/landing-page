import { renderOgCard } from "@/components/og-card";

export const runtime = "edge";

export const alt = "CloudGlance - AI-Powered Document Intelligence Platform";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return renderOgCard();
}
