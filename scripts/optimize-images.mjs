#!/usr/bin/env node
// Optimize PNGs in one or more directories using sharp's palette encoder.
// Non-recursive. Overwrites files in place. Skips SVG and small files.
//
// Usage:
//   node scripts/optimize-images.mjs <dir> [...<dir>] [flags]
//   npm run optimize:images -- <dir> [flags]
//
// Flags:
//   --max-width N   Resize PNGs wider than N pixels (default 1920)
//   --quality N     Palette quality 1-100 (default 90)
//   --min-kb N      Skip files smaller than N KB (default 100)
//   --recursive     Walk subdirectories too
//   -h, --help      Show this help

import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";
import { parseArgs } from "node:util";

const { values, positionals } = parseArgs({
    options: {
        "max-width": { type: "string", default: "1920" },
        "quality": { type: "string", default: "90" },
        "min-kb": { type: "string", default: "100" },
        "recursive": { type: "boolean", default: false },
        "help": { type: "boolean", short: "h" },
    },
    allowPositionals: true,
});

if (values.help || positionals.length === 0) {
    console.log(
        "Usage: node scripts/optimize-images.mjs <dir> [...<dir>] [--max-width 1920] [--quality 90] [--min-kb 100] [--recursive]"
    );
    process.exit(values.help ? 0 : 1);
}

const maxWidth = parseInt(values["max-width"], 10);
const quality = parseInt(values.quality, 10);
const minKb = parseInt(values["min-kb"], 10);
const recursive = values.recursive;

async function walk(dir) {
    const out = [];
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            if (recursive) out.push(...(await walk(full)));
        } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".png")) {
            out.push(full);
        }
    }
    return out;
}

async function optimizeFile(src) {
    const before = (await fs.stat(src)).size;
    if (before < minKb * 1024) return { src, before, after: before, skipped: "below min-kb" };

    const tmp = path.join(path.dirname(src), `.${path.basename(src)}.tmp`);
    const meta = await sharp(src).metadata();
    let pipeline = sharp(src);
    if (meta.width && meta.width > maxWidth) {
        pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
    }
    await pipeline
        .png({ compressionLevel: 9, effort: 10, palette: true, quality, dither: 1.0 })
        .toFile(tmp);

    const after = (await fs.stat(tmp)).size;
    if (after >= before) {
        await fs.unlink(tmp);
        return { src, before, after: before, skipped: "no gain" };
    }
    await fs.rename(tmp, src);
    return { src, before, after };
}

const pad = (s, n) => String(s).padStart(n);

for (const dir of positionals) {
    const abs = path.resolve(dir);
    const files = await walk(abs);
    console.log(`\n${abs}  (${files.length} PNGs)`);
    let totalBefore = 0;
    let totalAfter = 0;
    for (const f of files) {
        const r = await optimizeFile(f);
        totalBefore += r.before;
        totalAfter += r.after;
        const rel = path.relative(abs, r.src);
        const b = pad((r.before / 1024).toFixed(0), 6) + " KB";
        if (r.skipped) {
            console.log(`  ${rel.padEnd(40)}  ${b}  (skipped: ${r.skipped})`);
        } else {
            const a = pad((r.after / 1024).toFixed(0), 5) + " KB";
            const pct = ((1 - r.after / r.before) * 100).toFixed(1);
            console.log(`  ${rel.padEnd(40)}  ${b} → ${a}  (-${pct}%)`);
        }
    }
    if (totalBefore > 0) {
        const b = (totalBefore / 1024).toFixed(0);
        const a = (totalAfter / 1024).toFixed(0);
        const pct = ((1 - totalAfter / totalBefore) * 100).toFixed(1);
        console.log(`  ${"TOTAL".padEnd(40)}  ${pad(b, 6)} KB → ${pad(a, 5)} KB  (-${pct}%)`);
    }
}
