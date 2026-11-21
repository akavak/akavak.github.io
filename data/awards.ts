// Awards, honours and recognition.
// Only items documented in the AVESIS CV are listed. Add new awards to the top of `awards`
// as { year, title, org, description, kind } and they will appear on /awards and the home page.

export type Award = {
  year: string;
  title: string;
  org: string;
  description: string;
  kind: "Patent" | "Editorial" | "Grant" | "Recognition" | "Leadership";
};

export const awards: Award[] = [
  {
    year: "2024",
    title: "TÜSEB Research Grant: AIDCARE",
    org: "Health Institutes of Türkiye (TÜSEB)",
    description: "Competitive national grant as Principal Investigator for an AI-based digital assistant for diabetes self-management and remote monitoring.",
    kind: "Grant",
  },
  {
    year: "2019 – Present",
    title: "Associate Editor, IEEE Access",
    org: "IEEE",
    description: "Appointed Associate Editor / Section Editor of IEEE Access, a multidisciplinary open-access journal of the IEEE.",
    kind: "Editorial",
  },
  {
    year: "2014 – 2015",
    title: "TÜBİTAK Mobile Communications Priority Area Panels",
    org: "TÜBİTAK TEYDEB & ARDEB",
    description: "Member of the national Mobile Communications priority-area working groups of TÜBİTAK.",
    kind: "Recognition",
  },
  {
    year: "2013 – 2015",
    title: "Head of the Department of Computer Engineering",
    org: "Kocaeli University",
    description: "Led the Department of Computer Engineering at Kocaeli University from 2013 to 2015.",
    kind: "Leadership",
  },
  {
    year: "2013 – 2014",
    title: "Editorial Board, Turkish Journal of EE & CS",
    org: "TÜBİTAK",
    description: "Editorial board member of the SCI-Expanded indexed Turkish Journal of Electrical Engineering and Computer Sciences.",
    kind: "Editorial",
  },
  {
    year: "2002 – 2006",
    title: "Four US Patents and One Published Application",
    org: "United States Patent and Trademark Office",
    description: "Named inventor on US patents and applications covering adaptive antenna arrays, CDMA demodulators, channel encoding and Walsh code allocation.",
    kind: "Patent",
  },
  {
    year: "2002",
    title: "TÜBİTAK Research Grant: 3G Smart Antenna Prototype",
    org: "TÜBİTAK EEEAG (102E015)",
    description: "National research grant as Principal Investigator for smart antenna algorithm development and prototype implementation for 3G systems.",
    kind: "Grant",
  },
];
