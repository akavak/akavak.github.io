import Link from "next/link";
import type { ComponentProps } from "react";
import { asset } from "@/lib/site";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/**
 * next/link everywhere except the home route. With a basePath (GitHub Pages
 * project sites) Next's static export prefetches the home page from
 * `<basePath>.txt`, which lives outside the repository and 404s. A plain anchor
 * avoids that request; navigation to home is a normal page load instead.
 */
export default function SiteLink({ href, prefetch, replace, scroll, shallow, locale, ...rest }: Props) {
  if (href === "/") return <a href={asset("/")} {...rest} />;
  return <Link href={href} prefetch={prefetch} replace={replace} scroll={scroll} shallow={shallow} locale={locale} {...rest} />;
}
