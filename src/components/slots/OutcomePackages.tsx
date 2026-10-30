import { packagesFor, type OutcomeId } from "@/lib/slots";
import BuildYourOwnCard from "./BuildYourOwnCard";
import PackageCard from "./PackageCard";
import SpecialistPlanCard from "./SpecialistPlanCard";

/**
 * The plan grid for one package (outcome). Plans, then Outbound Specialist (outbound only), then Build your own.
 * Shared by the package pages and the pricing page so both show the same cards (Taha 2026-10-30).
 */
export default function OutcomePackages({
  outcome,
  builderHref = "/pricing/#builder",
  animate = false,
}: {
  outcome: OutcomeId;
  builderHref?: string;
  animate?: boolean;
}) {
  const pkgs = packagesFor(outcome);
  const cards = pkgs.length + 1 + (outcome === "outbound" ? 1 : 0);
  const cols = cards >= 4 ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3";
  const rise = (i: number) => (animate ? { className: "pr-rise", style: { animationDelay: `${i * 80}ms` } } : { className: "" });
  return (
    <div className={`grid gap-6 pt-3 ${cols}`}>
      {pkgs.map((p, i) => (
        <div key={p.id} {...rise(i)}>
          <PackageCard id={p.id} name={p.name} pitch={p.pitch} items={p.items} featured={p.featured} trialOutcome={outcome} />
        </div>
      ))}
      {outcome === "outbound" && (
        <div {...rise(pkgs.length)}>
          <SpecialistPlanCard />
        </div>
      )}
      <div {...rise(cards - 1)}>
        <BuildYourOwnCard href={builderHref} />
      </div>
    </div>
  );
}
