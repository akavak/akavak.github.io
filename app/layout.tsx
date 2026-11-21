import type { Metadata, Viewport } from "next";
import { Playfair_Display, Urbanist } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { profile } from "@/data/profile";
import { SITE_URL, asset } from "@/lib/site";
import "./globals.css";

const urbanist = Urbanist({ subsets: ["latin", "latin-ext"], variable: "--font-urbanist", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  style: ["italic"],
  weight: ["500", "600"],
  variable: "--font-playfair",
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: {
    default: `${profile.fullName} | Wireless Networks, AI & Digital Health`,
    template: `%s | ${profile.fullName}`,
  },
  description:
    "Prof. Dr. Adnan Kavak, Professor of Computer Engineering at Kocaeli University and Head of the WINS Research Center. Research on 6G wireless networks, smart antennas, IoT and trustworthy AI for digital health.",
  keywords: [
    "Adnan Kavak",
    "Kocaeli University",
    "Computer Engineering",
    "Wireless Communications",
    "6G",
    "Smart Antennas",
    "Digital Health",
    "Medical AI",
    "Large Language Models",
    "WINS Research Center",
  ],
  authors: [{ name: profile.fullName }],
  openGraph: {
    type: "profile",
    title: profile.fullName,
    description: profile.tagline,
    url: `${SITE_URL}/`,
    images: [{ url: `${SITE_URL}${profile.photoSquare}`, width: 600, height: 600, alt: profile.fullName }],
  },
  twitter: { card: "summary", title: profile.fullName, description: profile.tagline },
  icons: { icon: asset("/favicon.svg") },
};

export const viewport: Viewport = {
  themeColor: "#0e0e0e",
  width: "device-width",
  initialScale: 1,
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Adnan Kavak",
  honorificPrefix: "Prof. Dr.",
  jobTitle: "Professor of Computer Engineering",
  affiliation: { "@type": "CollegeOrUniversity", name: "Kocaeli University" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "The University of Texas at Austin" },
    { "@type": "CollegeOrUniversity", name: "Middle East Technical University" },
  ],
  email: `mailto:${profile.email}`,
  image: `${SITE_URL}${profile.photoSquare}`,
  url: `${SITE_URL}/`,
  sameAs: [profile.links.scholar, profile.links.orcid, profile.links.linkedin, profile.links.avesis],
  knowsAbout: ["Wireless Communications", "6G Networks", "Smart Antennas", "Internet of Things", "Artificial Intelligence", "Digital Health"],
};

// Runs before paint: marks JS as available (enables reveal animations) and
// applies the saved theme without a flash.
const themeScript = `(function(){document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t)}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" data-scroll-behavior="smooth" className={`${urbanist.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
