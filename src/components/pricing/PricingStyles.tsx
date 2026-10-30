/** Page-scoped keyframes for the pricing page (2026-10-30). Rendered once by the page. */
const css = `
@keyframes prPop { 0% { transform: scale(.35); opacity: 0 } 70% { transform: scale(1.08); opacity: 1 } 100% { transform: scale(1) } }
@keyframes prFlip {
  0% { transform: perspective(320px) rotateY(180deg) scale(.7); background: rgba(177,19,15,.35); border-color: #B1130F; }
  55% { transform: perspective(320px) rotateY(-14deg) scale(1.18); }
  100% { transform: perspective(320px) rotateY(0) scale(1); }
}
@keyframes prRing { 0% { opacity: .95; transform: scale(1) } 100% { opacity: 0; transform: scale(2.1) } }
@keyframes prSpark { 0% { opacity: 1; transform: translate(0,0) scale(1) } 100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(.3) } }
@keyframes prFlash { 0% { opacity: 0; transform: translateY(6px) } 12% { opacity: 1; transform: none } 85% { opacity: 1 } 100% { opacity: 0; transform: translateY(-6px) } }
@keyframes prChild { 0% { opacity: 0; transform: translateY(-8px) } 100% { opacity: 1; transform: none } }
@keyframes prRise { 0% { opacity: 0; transform: translateY(14px) } 100% { opacity: 1; transform: none } }
@keyframes prGlow { 0% { text-shadow: 0 0 0 rgba(52,211,153,0) } 30% { text-shadow: 0 0 22px rgba(52,211,153,.9); color: #6ee7b7 } 100% { text-shadow: 0 0 0 rgba(52,211,153,0) } }
@keyframes prBump { 0% { transform: scale(1) } 35% { transform: scale(1.06) } 100% { transform: scale(1) } }
.pr-pop { animation: prPop .42s cubic-bezier(.2,1.3,.4,1) both; }
.pr-flip { animation: prFlip .75s cubic-bezier(.2,.9,.3,1.15) both; }
.pr-ring { position: absolute; inset: -3px; border-radius: 8px; border: 2px solid #34d399; pointer-events: none; animation: prRing .9s ease-out forwards; }
.pr-spark { position: absolute; left: 50%; top: 50%; width: 5px; height: 5px; margin: -2.5px; border-radius: 9999px; background: #34d399; box-shadow: 0 0 8px #34d399; pointer-events: none; animation: prSpark .8s ease-out forwards; }
.pr-flash { animation: prFlash 2.2s ease forwards; }
.pr-child-in { animation: prChild .38s ease-out both; }
.pr-rise { animation: prRise .5s cubic-bezier(.2,.8,.3,1) both; }
.pr-glow { animation: prGlow 1.1s ease-out; }
.pr-bump { animation: prBump .35s ease-out; }
.pr-noscroll::-webkit-scrollbar { display: none; }
.pr-noscroll { scrollbar-width: none; }
.pr-faq summary::-webkit-details-marker { display: none; }
.pr-faq[open] .pr-faq-plus { transform: rotate(45deg); }
@media (prefers-reduced-motion: reduce) {
  .pr-pop, .pr-flip, .pr-child-in, .pr-rise, .pr-glow, .pr-bump { animation: none !important; }
  .pr-flash { animation: none !important; opacity: 1; }
  .pr-ring, .pr-spark { display: none; }
}
`;

export default function PricingStyles() {
  return <style>{css}</style>;
}
