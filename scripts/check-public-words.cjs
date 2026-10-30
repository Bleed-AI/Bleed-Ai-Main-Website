// Gate on the BUILT site (out/): words a visitor must never read (Taha 2026-10-30, DECISIONS #50).
// Run after `next build`: node scripts/check-public-words.cjs
// Scans visible text, alt/aria/title attributes and meta descriptions of every exported HTML page.
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "out");
const BANNED = [
  { re: /\bslots?\b/i, why: "public word is service (DECISIONS #50)" },
  { re: /[–—]/, why: "no em or en dashes" },
];
// Legacy pages outside the service model (old blog, tools, test homepages) are not scanned.
const SLOT_EXEMPT = [/^blog\//, /^home-test\//, /^home-v2\//, /^industries\//, /^free-tools\//, /^book/, /^privacy-policy\//, /^terms\//];

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

function visible(html) {
  const attrs = [...html.matchAll(/\s(?:alt|aria-label|title|placeholder|content)="([^"]*)"/g)].map((m) => m[1]);
  const body = html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ");
  return (body + " " + attrs.join(" ")).replace(/&[a-z#0-9]+;/gi, " ");
}

if (!fs.existsSync(OUT)) {
  console.error("out/ not found: run next build first");
  process.exit(2);
}
let bad = 0;
const files = walk(OUT);
for (const f of files) {
  const rel = path.relative(OUT, f).split(path.sep).join("/");
  // Real prospect quotes may say "slot" in the calendar sense (RepliesMarquee).
  const text = visible(fs.readFileSync(f, "utf8")).replace(/find a slot next week/gi, "");
  for (const b of BANNED) {
    if (SLOT_EXEMPT.some((x) => x.test(rel))) continue;
    const m = text.match(new RegExp(`.{0,50}${b.re.source}.{0,50}`, b.re.flags));
    if (m) {
      bad++;
      console.log(`FAIL ${rel}: ${b.why}: "${m[0].replace(/\s+/g, " ").trim()}"`);
    }
  }
}
console.log(`${files.length} pages scanned, ${bad} failures`);
process.exit(bad ? 1 : 0);
