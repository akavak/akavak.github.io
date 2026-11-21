// Central profile data. Sources: AVESIS CV export (ADNAN KAVAK.pdf) and
// https://avesis.kocaeli.edu.tr/akavak (checked November 2026).
// Edit this file to update the site; every page reads from here.

export const profile = {
  name: "Adnan Kavak",
  title: "Prof. Dr.",
  fullName: "Prof. Dr. Adnan Kavak",
  role: "Professor of Computer Engineering",
  affiliation: "Kocaeli University",
  department: "Department of Computer Engineering, Faculty of Engineering",
  headline: "Wireless Networks, AI & Digital Health",
  tagline:
    "Building intelligent wireless systems and trustworthy AI for health, from smart antennas and 6G networks to LLM-powered diabetes care.",
  photo: "/images/adnan-kavak.jpg",
  photoSquare: "/images/adnan-kavak-square.jpg",
  location: "Kocaeli, Türkiye",
  office: "Faculty of Engineering, Block B, Kocaeli University, Kocaeli, Türkiye",
  email: "akavak@kocaeli.edu.tr",
  emailAlt: "dr.adnankavak@gmail.com",
  phone: "+90 262 303 3567",
  cv: "/files/Adnan-Kavak-CV.pdf",
  bio: [
    "Adnan Kavak is a Professor in the Department of Computer Engineering at Kocaeli University, where he served as Head of Department from 2013 to 2015 and leads the Wireless Informatics and Intelligent Systems (WINS) Research Center. His work sits at the meeting point of wireless communications, computer networks and artificial intelligence, with a growing focus on digital health.",
    "He received his B.S. in Electrical and Electronics Engineering from Middle East Technical University (1992), and his M.S. (1996) and Ph.D. (2000) in Electrical and Computer Engineering from The University of Texas at Austin, where his doctoral research characterised vector propagation channels for smart antenna systems. Before joining academia he worked as a satellite control engineer at the PTT Satellite Communications Center and as a Senior Research Engineer at Samsung Telecommunications America, working on adaptive antenna arrays and CDMA base station design. He is the named inventor on four granted US patents and one published US patent application in these areas.",
    "At Kocaeli University since 2001, he has led more than fifteen funded projects supported by TÜBİTAK, TÜSEB and university research funds, covering smart antennas, MIMO systems, wireless sensor networks, remote patient monitoring and AI-assisted diabetes management. He has published more than 160 papers, serves as an Associate Editor of IEEE Access, and has supervised over 24 graduate theses. He is also completing a degree in Physiotherapy and Rehabilitation, which informs his interdisciplinary research in telemedicine and rehabilitation technologies.",
  ],
  ids: {
    orcid: "0000-0001-5694-8042",
    yoksis: "7641",
  },
  links: {
    scholar: "https://scholar.google.com/citations?user=KpyQgtwAAAAJ&hl=en",
    avesis: "https://avesis.kocaeli.edu.tr/akavak",
    orcid: "https://orcid.org/0000-0001-5694-8042",
    linkedin: "https://www.linkedin.com/in/adnan-kavak-8107654a/",
    wins: "https://avesis.kocaeli.edu.tr/arastirma-grubu/wins",
    yok: "https://akademik.yok.gov.tr/academician-details?authorGuidId=B265FA44A3843213",
  },
};

// Metrics: Google Scholar figures from the Scholar profile, the rest from AVESIS (November 2026).
// Update periodically.
export const metrics = [
  { value: 163, label: "Publications", suffix: "+" },
  { value: 1216, label: "Google Scholar Citations" },
  { value: 17, label: "Google Scholar h-index" },
  { value: 21, label: "Research Projects" },
  { value: 5, label: "US Patents & Applications" },
  { value: 24, label: "Theses Supervised", suffix: "+" },
];

// null renders as "—" (e.g. i10-index is only reported by Google Scholar).
export const citationTable: { source: string; citations: number; hIndex: number | null; i10: number | null }[] = [
  { source: "Google Scholar", citations: 1216, hIndex: 17, i10: 33 },
  { source: "Scopus", citations: 547, hIndex: 12, i10: null },
  { source: "Web of Science", citations: 383, hIndex: 11, i10: null },
];

export const researchAreas = [
  {
    key: "AI for Health",
    title: "AI for Digital Health",
    icon: "HeartPulse",
    text: "Trustworthy large language models, retrieval-augmented generation and computer vision for diabetes self-management, nutrition estimation, insulin decision support and remote patient monitoring.",
  },
  {
    key: "6G & Next-Gen Networks",
    title: "6G & Next-Generation Networks",
    icon: "RadioTower",
    text: "Network slicing, MEC, SDN/NFV, cooperative relaying, D2D communication, V2X security, digital twins and ambient backscatter communication for 5G, 6G and beyond.",
  },
  {
    key: "Smart Antennas & Signal Processing",
    title: "Smart Antennas & Signal Processing",
    icon: "Antenna",
    text: "Vector propagation channels, adaptive beamforming, MIMO and OFDM link adaptation, and DSP/FPGA software-radio implementations for CDMA and 3G systems.",
  },
  {
    key: "IoT & Sensor Networks",
    title: "IoT & Wireless Sensor Networks",
    icon: "Network",
    text: "Smart-antenna based localisation, connectivity analysis, VLC-RF medium access, and IoT systems for smart homes, smart cities and environmental monitoring.",
  },
  {
    key: "Data, Cloud & Intelligent Systems",
    title: "Data, Cloud & Intelligent Systems",
    icon: "BrainCircuit",
    text: "Machine learning, cloud and edge architectures, distributed data synchronisation, recommender systems and data mining for large-scale intelligent services.",
  },
];

export const education = [
  {
    period: "2021 – Present",
    degree: "B.Sc. in Physiotherapy and Rehabilitation",
    school: "Kocaeli Health and Technology University",
    detail: "School of Health Sciences · Türkiye",
  },
  {
    period: "1996 – 2000",
    degree: "Ph.D. in Electrical and Computer Engineering",
    school: "The University of Texas at Austin",
    detail: "Dissertation: Vector Propagation Channels for Smart Antenna Wireless Communication Systems",
  },
  {
    period: "1994 – 1996",
    degree: "M.S. in Electrical and Computer Engineering",
    school: "The University of Texas at Austin",
    detail: "Thesis: Ground Specular Reflection Effects at L-Band and UHF-Band GPS Signals",
  },
  {
    period: "1987 – 1992",
    degree: "B.S. in Electrical and Electronics Engineering",
    school: "Middle East Technical University (METU)",
    detail: "Faculty of Engineering · Ankara, Türkiye",
  },
];

export const academicPositions = [
  {
    period: "2011 – Present",
    title: "Professor",
    org: "Kocaeli University",
    detail: "Department of Computer Engineering",
  },
  {
    period: "2008 – 2009",
    title: "Visiting Associate Professor",
    org: "The University of Texas at Austin",
    detail: "Department of Electrical and Computer Engineering",
  },
  {
    period: "2005 – 2011",
    title: "Associate Professor",
    org: "Kocaeli University",
    detail: "Department of Computer Engineering",
  },
  {
    period: "2003 – 2005",
    title: "Assistant Professor",
    org: "Kocaeli University",
    detail: "Department of Computer Engineering, Faculty of Engineering",
  },
  {
    period: "2001 – 2003",
    title: "Assistant Professor",
    org: "Kocaeli University",
    detail: "Department of Electronics and Computer Education, Faculty of Technical Education",
  },
];

export const adminRoles = [
  { period: "2013 – 2015", title: "Head of Department", org: "Department of Computer Engineering, Kocaeli University" },
  { period: "2011 – Present", title: "Head of Division", org: "Department of Computer Engineering, Kocaeli University" },
  { period: "2015", title: "Director", org: "Kocaeli University" },
  { period: "2006", title: "Deputy Head of Department", org: "Department of Computer Engineering, Kocaeli University" },
  { period: "2001 – 2003", title: "Deputy Head of Department & Head of Division", org: "Department of Electronics and Computer Education, Kocaeli University" },
];

export const industryExperience = [
  {
    period: "2000 – 2001",
    title: "Senior Research Engineer",
    org: "Samsung Telecommunications America",
    detail: "Architecture and requirements for cdma2000 1X base transceiver stations and adaptive antenna array systems.",
  },
  {
    period: "1996 – 2000",
    title: "Graduate Research / Teaching Assistant",
    org: "The University of Texas at Austin",
    detail: "Smart antenna channel measurements and GPS propagation studies.",
  },
  {
    period: "1992 – 1994",
    title: "Satellite Control Engineer",
    org: "PTT Satellite Communications Center",
    detail: "Operations and control of national satellite communication systems.",
  },
];

export const service = [
  { period: "2019 – Present", title: "Associate Editor / Section Editor", org: "IEEE Access" },
  { period: "2013 – 2014", title: "Editorial Board Member", org: "Turkish Journal of Electrical Engineering and Computer Sciences" },
  { period: "2014 – 2015", title: "Panel Member, Mobile Communications Priority Area", org: "TÜBİTAK TEYDEB" },
  { period: "2014 – 2015", title: "Panel Member, Mobile Communications Priority Area", org: "TÜBİTAK ARDEB" },
];

export const languages = [
  { name: "Turkish", level: "Native" },
  { name: "English", level: "C1 · Advanced" },
];

export const wins = {
  name: "Wireless Informatics and Intelligent Systems Research Center",
  short: "WINS",
  logo: "/images/wins-logo.png",
  url: "https://avesis.kocaeli.edu.tr/arastirma-grubu/wins",
  about: [
    "WINS is an interdisciplinary research center at Kocaeli University working on next-generation intelligent systems at the intersection of communication networks, informatics and data-driven artificial intelligence.",
    "The center combines theoretical advances with system-level implementation, using AI, advanced analytics, large-scale simulation and rapid prototyping to deliver scalable solutions for connectivity, healthcare and smart infrastructure, through long-term partnerships with academia and industry.",
  ],
  topics: [
    "6G & Beyond Wireless",
    "Quantum Communication",
    "Information Systems",
    "Medical Informatics",
    "e-Health",
    "Ambient IoT",
  ],
  stats: [
    { value: 40, label: "Publications" },
    { value: 342, label: "Scopus Citations" },
    { value: 8, label: "Projects" },
    { value: 10, label: "Members" },
  ],
  members: [
    { name: "Prof. Dr. Adnan Kavak", role: "Group Head", group: "Faculty" },
    { name: "Alpaslan Burak İnner", role: "Academic Staff", group: "Faculty" },
    { name: "Kerem Küçük", role: "Academic Staff", group: "Faculty" },
    { name: "Sajjad Ahmad Khan", role: "Academic Staff", group: "Faculty" },
    { name: "Sultan Aldırmaz Çolak", role: "Academic Staff", group: "Faculty" },
    { name: "Muhammad Jamil", role: "Doctoral Researcher", group: "Researchers" },
    { name: "Gautam Srivastava", role: "Visiting Researcher", group: "Collaborators" },
    { name: "Hossein Fotouhi", role: "Visiting Researcher", group: "Collaborators" },
    { name: "Muhammad Farhan", role: "Visiting Researcher", group: "Collaborators" },
    { name: "Farhan Ullah", role: "Visiting Researcher", group: "Collaborators" },
  ],
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/research/", label: "Research" },
  { href: "/publications/", label: "Publications" },
  { href: "/projects/", label: "Projects" },
  { href: "/awards/", label: "Awards" },
  { href: "/blog/", label: "Blog" },
  { href: "/contact/", label: "Contact" },
];
