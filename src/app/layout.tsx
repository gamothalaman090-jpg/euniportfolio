import type { Metadata } from "next";
import "./globals.css";

import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.tagline.replace(/\n/g, " "),
  keywords: ["Full-Stack Developer", "Next.js", "React", "Portfolio", "Manila", "Creative Developer", "GSAP"],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    title: `${SITE.name} — Full-Stack Engineer`,
    description: SITE.tagline.replace(/\n/g, " "),
    url: "https://euniportfolio.vercel.app/",
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Full-Stack Engineer`,
    description: SITE.tagline.replace(/\n/g, " "),
    creator: "@lain.zxc",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-[#050508] text-[#F0F0F5] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
