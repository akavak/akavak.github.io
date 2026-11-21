import { Award, BadgeCheck, Landmark, Lightbulb, PenTool, type LucideIcon } from "lucide-react";
import type { Award as AwardT } from "@/data/awards";

export const awardIcon: Record<AwardT["kind"], LucideIcon> = {
  Patent: Lightbulb,
  Editorial: PenTool,
  Grant: Landmark,
  Recognition: BadgeCheck,
  Leadership: Award,
};
