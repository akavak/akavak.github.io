import type { ComponentProps } from "react";
import { asset } from "../lib/site";

export default function SiteLink({ href, ...props }: ComponentProps<"a"> & { href: string }) {
  return <a href={asset(href)} {...props} />;
}
