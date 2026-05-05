import "./globals.css";
import { Fraunces, DM_Sans } from "next/font/google";

export const metadata = {
  title: "Nyingje — Compassionate AI Companion",
  description: "A calm, warm, minimal AI companion rooted in Buddhist wisdom and modern psychology.",
  openGraph: {
    title: "Nyingje — Compassionate AI Companion",
    description: "A calm, warm, minimal AI companion rooted in Buddhist wisdom and modern psychology.",
    type: "website",
    url: "https://nyingje.app",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nyingje Logo"
      }
    ]
  }
};

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-heading", display: "swap", weight: ["400", "700", "900"] });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap", weight: ["400", "700"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="bg-bg text-text font-body min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
