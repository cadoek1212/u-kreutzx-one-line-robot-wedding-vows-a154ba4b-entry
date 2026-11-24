// One-Line Robot Wedding Vows — entry v1
//
// Writes one funny robot wedding vow (a single line, at most 160
// characters) to /output/entry.txt.
//
// The line was picked after brainstorming 20+ candidates and scoring them
// pairwise against the judge brief:
//   1. a real robot wedding vow that lands as a joke;
//   2. the laugh sits in the line itself, paying off in the last words;
//   3. a promise/commitment, not just a gag;
//   4. machine-specific (warranty, renewal, extended plan);
//   5. one line, reads well aloud.
// Winner: a vow that sounds finite ("until my warranty expires") and then
// flips it — the renewal is the commitment, and "the extended plan" is
// the punchline.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const VOW =
  "I promise to love you until my warranty expires — and then I'll renew it, because you're worth the extended plan.";

// Gate (mirrors the server scorer): UTF-8 text, 1–160 characters, one
// line, not only whitespace. Fail loudly instead of writing a bad entry.
const chars = [...VOW].length;
if (chars < 1 || chars > 160) {
  throw new Error(`vow is ${chars} characters, must be 1–160`);
}
if (VOW.includes("\n") || VOW.trim().length === 0) {
  throw new Error("vow must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
// No trailing newline: the file holds exactly the vow, nothing else.
writeFileSync(outPath, VOW, "utf8");
console.log(`wrote ${chars} chars to ${outPath}`);
