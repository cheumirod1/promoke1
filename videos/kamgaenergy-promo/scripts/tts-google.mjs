#!/usr/bin/env node
// Synthèse voix off FR via Google Cloud Text-to-Speech.
// Lit les lignes parlées de SCRIPT.md et produit un WAV par ligne dans .media/vo/.
//
//   GOOGLE_TTS_API_KEY=… node scripts/tts-google.mjs --list
//   GOOGLE_TTS_API_KEY=… node scripts/tts-google.mjs --voice fr-FR-Chirp3-HD-Charon
//
// Node >= 22.21 : NODE_USE_ENV_PROXY=1 est posé plus bas pour que fetch respecte HTTPS_PROXY.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

process.env.NODE_USE_ENV_PROXY ??= '1';

const KEY = process.env.GOOGLE_TTS_API_KEY || process.env.GOOGLE_API_KEY;
if (!KEY) {
  console.error('✗ Aucune clé. Posez GOOGLE_TTS_API_KEY dans les secrets de l\'environnement.');
  process.exit(2);
}
const API = 'https://texttospeech.googleapis.com/v1';
const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };

// Qualité décroissante : Chirp3-HD (le plus humain) → Studio → Neural2 → Wavenet → Standard
const TIER = ['Chirp3-HD', 'Chirp-HD', 'Studio', 'Neural2', 'Wavenet', 'Standard'];
const rank = (n) => { const i = TIER.findIndex(t => n.includes(t)); return i < 0 ? 99 : i; };

async function voices() {
  const r = await fetch(`${API}/voices?languageCode=fr-FR&key=${KEY}`);
  if (!r.ok) throw new Error(`voices: HTTP ${r.status} — ${(await r.text()).slice(0, 300)}`);
  return (await r.json()).voices.sort((a, b) => rank(a.name) - rank(b.name) || a.name.localeCompare(b.name));
}

function spokenLines() {
  const src = readFileSync('SCRIPT.md', 'utf8');
  const out = [];
  for (const [, head, body] of src.matchAll(/^## (Line \d+[^\n]*)\n(.*?)(?=^## |\Z)/gms)) {
    const text = body.split('\n').filter(l => /^ {4}\S/.test(l)).map(l => l.trim()).join(' ').trim();
    if (!text) continue;
    const t = body.match(/\*\*Time:\*\*\s*([\d.]+)\s*[–-]\s*([\d.]+)s/);
    out.push({ n: out.length + 1, label: head, text, window: t ? +t[2] - +t[1] : null });
  }
  return out;
}

async function synth(text, voice, rate) {
  const body = {
    input: { text },
    voice: { languageCode: 'fr-FR', name: voice },
    audioConfig: { audioEncoding: 'LINEAR16', sampleRateHertz: 24000, speakingRate: rate },
  };
  const r = await fetch(`${API}/text:synthesize?key=${KEY}`, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`synthesize: HTTP ${r.status} — ${(await r.text()).slice(0, 400)}`);
  return Buffer.from((await r.json()).audioContent, 'base64');
}

const wavSeconds = (buf) => {
  const byteRate = buf.readUInt32LE(28);
  return byteRate ? (buf.length - 44) / byteRate : NaN;
};

const list = await voices();
if (args.includes('--list')) {
  console.log('Voix françaises disponibles (les plus humaines en tête)\n');
  for (const v of list) {
    console.log(`  ${v.name.padEnd(30)} ${v.ssmlGender.padEnd(7)} ${v.naturalSampleRateHertz} Hz`);
  }
  process.exit(0);
}

const voice = flag('--voice', list[0]?.name);
const rate = Number(flag('--rate', '1.0'));
if (!voice) { console.error('✗ Aucune voix fr-FR disponible.'); process.exit(1); }

const dir = join('.media', 'vo');
mkdirSync(dir, { recursive: true });
const lines = spokenLines();
console.log(`Voix : ${voice}   vitesse : ${rate}\n`);
console.log(`${'Ligne'.padEnd(9)}${'Durée'.padStart(8)}${'Fenêtre'.padStart(10)}   Verdict`);

let total = 0;
const manifest = [];
for (const l of lines) {
  const buf = await synth(l.text, voice, rate);
  const out = join(dir, `line-${String(l.n).padStart(2, '0')}.wav`);
  writeFileSync(out, buf);
  const d = wavSeconds(buf); total += d;
  const fits = l.window == null ? '—' : (d <= l.window ? 'tient' : `DÉPASSE de ${(d - l.window).toFixed(1)}s`);
  console.log(`${('L' + l.n).padEnd(9)}${d.toFixed(2).padStart(7)}s${(l.window ?? '—').toString().padStart(9)}s   ${fits}`);
  manifest.push({ line: l.n, label: l.label, file: out, seconds: +d.toFixed(3), window: l.window, text: l.text });
}
writeFileSync(join(dir, 'manifest.json'), JSON.stringify({ voice, rate, generatedBy: 'google-cloud-tts', lines: manifest }, null, 2));
console.log(`\nTotal parlé : ${total.toFixed(1)}s   →  ${dir}/  (+ manifest.json)`);
