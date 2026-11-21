import { Antenna, BrainCircuit, HeartPulse, Network, RadioTower, type LucideIcon } from "lucide-react";

const map: Record<string, LucideIcon> = { Antenna, BrainCircuit, HeartPulse, Network, RadioTower };

export default function AreaIcon({ name }: { name: string }) {
  const Icon = map[name] || BrainCircuit;
  return <Icon />;
}
