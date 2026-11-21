// Brand icons (lucide v1 no longer ships brand marks).
type P = { className?: string };

export const LinkedInIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

export const ScholarIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M5.24 13.77 0 9.5 12 0l12 9.5-5.24 4.27C17.59 11.15 15 9.32 12 9.32s-5.59 1.83-6.76 4.45zM12 10.95a6.52 6.52 0 1 0 0 13.05 6.52 6.52 0 0 0 0-13.05z" />
  </svg>
);

export const OrcidIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zM7.37 4.38c.53 0 .96.43.96.96s-.43.97-.96.97-.97-.44-.97-.97.44-.96.97-.96zm-.72 3.07h1.44v10.06H6.65V7.45zm3.56 0h3.9c3.7 0 5.33 2.65 5.33 5.03 0 2.6-2.01 5.03-5.31 5.03h-3.92V7.45zm1.44 1.3v7.47h2.29c3.27 0 4.02-2.48 4.02-3.74 0-2.04-1.3-3.73-4.1-3.73h-2.21z" />
  </svg>
);

export const AvesisIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
    <path d="M4 20 12 4l8 16M7.5 13h9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
