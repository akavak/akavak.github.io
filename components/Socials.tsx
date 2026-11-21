import { Mail } from "lucide-react";
import { profile } from "../data/profile";
import { AvesisIcon, LinkedInIcon, OrcidIcon, ScholarIcon } from "./BrandIcons";

export default function Socials({ withEmail = false }: { withEmail?: boolean }) {
  const items = [
    { href: profile.links.scholar, label: "Google Scholar", Icon: ScholarIcon },
    { href: profile.links.orcid, label: "ORCID", Icon: OrcidIcon },
    { href: profile.links.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
    { href: profile.links.avesis, label: "AVESIS academic profile", Icon: AvesisIcon },
  ];
  return (
    <div className="socials">
      {items.map(({ href, label, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
          <Icon />
        </a>
      ))}
      {withEmail && (
        <a href={`mailto:${profile.email}`} aria-label="Email" title="Email">
          <Mail />
        </a>
      )}
    </div>
  );
}
