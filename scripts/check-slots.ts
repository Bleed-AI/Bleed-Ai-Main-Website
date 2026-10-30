// Asserts the slot pricing and package sizes match Taha's rulings (DECISIONS #38, #40). Run: node --experimental-strip-types scripts/check-slots.ts
import { priceFor, PACKAGES, HYBRID_PACKAGE, itemsSlotCount, SLOTS, slotById } from "../src/lib/slots.ts";
const fail = (m: string) => { console.error("FAIL:", m); process.exitCode = 1; };
const prices: Record<number, number> = { 2: 990, 3: 1485, 4: 1485, 5: 1980, 6: 2475, 7: 2970, 8: 2970 };
for (const [n, p] of Object.entries(prices)) if (priceFor(+n) !== p) fail(`priceFor(${n}) = ${priceFor(+n)}, want ${p}`);
const sizes: Record<string, number> = { shortlisted: 5, "shortlisted-starter": 4, "linkedin-starter": 2, "linkedin-authority": 4, "outbound-test": 2, "outbound-steady": 4, inbound: 4 };
for (const pk of PACKAGES) if (itemsSlotCount(pk.items) !== sizes[pk.id]) fail(`${pk.id} = ${itemsSlotCount(pk.items)} slots, want ${sizes[pk.id]}`);
if (itemsSlotCount(HYBRID_PACKAGE.items) !== 4) fail("hybrid not 4 slots");
for (const s of SLOTS) if (s.parent) slotById(s.parent);
const banned = /aimfox|instantly|unipile|thanks\.io|apify|prospeo|blitz|moltsets|trykit|clay|[–—]/i;
for (const s of SLOTS) if (banned.test(JSON.stringify(s))) fail(`banned word in slot ${s.id}`);
if (!process.exitCode) console.log("slots OK:", SLOTS.length, "slots,", PACKAGES.length, "packages");
