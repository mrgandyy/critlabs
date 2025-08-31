import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About — CRIT",
  description:
    "CRIT makes clean energy + dialed focus for gamers. Zero sugar, transparent dosing, no crash—built for the clutch.",
  openGraph: {
    title: "About — CRIT",
    description:
      "Clean energy + dialed focus for gamers. Zero sugar, transparent dosing, no crash—built for the clutch.",
    images: [{ url: "/og/crit-og.jpg", width: 1200, height: 630 }],
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
