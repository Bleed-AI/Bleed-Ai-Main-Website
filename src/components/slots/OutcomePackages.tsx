import { packagesFor, type OutcomeId } from "@/lib/slots";
import PackageCard from "./PackageCard";

/** The package grid for one outcome page. Drop-in section; the page owns the heading around it. */
export default function OutcomePackages({ outcome }: { outcome: OutcomeId }) {
  const pkgs = packagesFor(outcome);
  return (
    <div className={`grid gap-6 ${pkgs.length > 1 ? "md:grid-cols-2" : "max-w-xl"}`}>
      {pkgs.map((p) => (
        <PackageCard key={p.id} id={p.id} name={p.name} pitch={p.pitch} items={p.items} featured={p.featured} trialOutcome={outcome} />
      ))}
    </div>
  );
}
