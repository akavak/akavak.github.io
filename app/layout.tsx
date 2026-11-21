import Header from "../components/Header";
import Footer from "../components/Footer";
import { profile } from "../data/profile";
import { SITE_URL, asset } from "../lib/site";
import type { ReactNode } from "react";
import type { Metadata } from "../lib/site";

const siteMetadata = {
  title: `${profile.fullName} | Wireless Networks, AI & Digital Health`,
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
  openGraph: {
    type: "profile",
    title: profile.fullName,
    description: profile.tagline,
    image: `${SITE_URL}${profile.photoSquare}`,
  },
  twitterCard: "summary",
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

export default function Layout({ children, route, metadata }: { children: ReactNode; route: string; metadata: Metadata }) {
  const title = metadata.title ? `${metadata.title} | ${profile.fullName}` : siteMetadata.title;
  const description = metadata.description || siteMetadata.description;
  const url = `${SITE_URL}${route}`;
  const social = metadata.openGraph || siteMetadata.openGraph;

  return (
    <html lang="en" data-theme="dark" data-bs-theme="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0e0e0e" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={siteMetadata.keywords.join(", ")} />
        <meta name="author" content={profile.fullName} />
        <meta property="og:type" content={social.type} />
        <meta property="og:title" content={social.title} />
        <meta property="og:description" content={social.description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={siteMetadata.openGraph.image} />
        {metadata.openGraph && <meta property="article:published_time" content={metadata.openGraph.publishedTime} />}
        <meta name="twitter:card" content={siteMetadata.twitterCard} />
        <meta name="twitter:title" content={social.title} />
        <meta name="twitter:description" content={social.description} />
        {route === "/404.html" ? <meta name="robots" content="noindex" /> : <link rel="canonical" href={url} />}
        <link rel="icon" href={asset("/favicon.svg")} />
        <link rel="stylesheet" href={asset("/assets/bootstrap.min.css")} />
        <link rel="stylesheet" href={asset("/assets/fonts.css")} />
        <link rel="stylesheet" href={asset("/assets/site.css")} />
        <script src={asset("/assets/theme.js")} />
        <script src={asset("/assets/site.js")} defer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Header pathname={route} />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
