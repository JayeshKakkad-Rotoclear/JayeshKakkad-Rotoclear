#!/usr/bin/env node
/**
 * Profile dashboard cards
 *
 * Renders the SVG cards used by README.md / README.de.md in light and dark
 * variants (GitHub picks one via <picture> + prefers-color-scheme):
 *
 *   assets/cards/{hero,focus,stack,stats}-{en,de}-{light,dark}.svg
 *
 *   node scripts/profile-cards.mjs           # render from assets/cards/stats.json
 *   node scripts/profile-cards.mjs --fetch   # refresh stats from the GitHub API first
 *                                            # (token in METRICS_TOKEN or GITHUB_TOKEN)
 *
 * Only aggregate numbers are fetched and stored - never repository names.
 * No dependencies; Node 18+.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'assets', 'cards');
const STATS_FILE = path.join(OUT_DIR, 'stats.json');
const WIDTH = 840;

// ---------------------------------------------------------------------------
// Design tokens (same system as Desk Companion)
// ---------------------------------------------------------------------------

const THEMES = {
  light: {
    surface: '#ffffff', surface2: '#f5f7fb', surface3: '#eaeef5',
    border: '#e1e6ef', text: '#0f172a', text2: '#334155', muted: '#64748b', faint: '#94a3b8',
    accent: '#6366f1', accent2: '#8b5cf6', accentSoft: 'rgba(99,102,241,0.10)',
    success: '#059669', info: '#0284c7', warning: '#d97706', track: '#e7ebf2',
    glow: 'rgba(99,102,241,0.10)'
  },
  dark: {
    surface: '#121826', surface2: '#171f30', surface3: '#1e2739',
    border: '#222c40', text: '#e8ecf4', text2: '#c3cad8', muted: '#8b95a9', faint: '#5d677b',
    accent: '#818cf8', accent2: '#a78bfa', accentSoft: 'rgba(129,140,248,0.14)',
    success: '#34d399', info: '#38bdf8', warning: '#fbbf24', track: '#1f2839',
    glow: 'rgba(129,140,248,0.16)'
  }
};

// System font stack: images on GitHub cannot load web fonts
const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif";

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

const CONTENT = {
  en: {
    hero: {
      eyebrow: 'SOFTWARE ARCHITECT · EMBEDDED SYSTEMS ENGINEER',
      name: 'Jayesh Kakkad',
      tagline: 'Building secure, scalable platforms where embedded hardware meets modern software.',
      chips: ['Embedded Linux', 'IoT platforms', 'Security'],
      pathTitle: 'FROM DEVICE TO SOFTWARE',
      path: [['Device', 'firmware · drivers'], ['Edge', 'video pipelines'], ['Platform', 'services · data'], ['Interface', 'web apps']],
      title: 'Jayesh Kakkad, Software Architect and Embedded Systems Engineer'
    },
    focus: {
      title: 'WHAT I BUILD',
      items: [
        ['Platform Architecture', 'Secure industrial IoT platforms, edge device orchestration, distributed services and workflow integrations.', ['IoT', 'Edge', 'Distributed systems']],
        ['Embedded Engineering', 'Embedded Linux with Yocto and PTXdist, V4L2 and GStreamer video pipelines, software for ZynqMP and ARM.', ['Yocto', 'GStreamer', 'ZynqMP']],
        ['Full-Stack Development', 'Interfaces with SvelteKit, React and TypeScript; APIs and data with FastAPI, Node.js, PostgreSQL and Prisma.', ['SvelteKit', 'FastAPI', 'Docker']],
        ['Security Engineering', 'Threat modeling, secure development and practical testing with Burp Suite, Nessus, Wireshark and Kali.', ['OWASP', 'Threat modeling', 'Testing']]
      ]
    },
    stack: {
      title: 'TOOLKIT',
      groups: [
        ['Languages', ['C', 'C++', 'Python', 'TypeScript', 'JavaScript', 'Nim']],
        ['Frontend & backend', ['SvelteKit', 'React', 'Tailwind', 'Node.js', 'FastAPI', 'Prisma']],
        ['Data & infrastructure', ['PostgreSQL', 'Supabase', 'Docker', 'Linux', 'Git', 'VS Code']],
        ['Embedded', ['Embedded Linux', 'Yocto', 'PTXdist', 'V4L2', 'GStreamer', 'ZynqMP', 'ARM']],
        ['Security', ['OWASP Top 10', 'OWASP IoT Top 10', 'Threat modeling', 'Burp Suite', 'Nessus', 'Wireshark']]
      ]
    },
    stats: {
      title: 'GITHUB ACTIVITY',
      period: 'Last 12 months',
      updated: 'Updated',
      kpis: ['Contributions', 'Commits', 'Active days', 'Repositories'],
      activity: 'Contributions per month',
      languages: 'Top languages',
      other: 'Other',
      locale: 'en-GB'
    }
  },
  de: {
    hero: {
      eyebrow: 'SOFTWAREARCHITEKT · EMBEDDED-ENTWICKLER',
      name: 'Jayesh Kakkad',
      tagline: 'Sichere, skalierbare Plattformen an der Schnittstelle zwischen Embedded-Hardware und moderner Software.',
      chips: ['Embedded Linux', 'IoT-Plattformen', 'Sicherheit'],
      pathTitle: 'VOM GERÄT ZUR SOFTWARE',
      path: [['Gerät', 'Firmware · Treiber'], ['Edge', 'Videopipelines'], ['Plattform', 'Dienste · Daten'], ['Oberfläche', 'Web-Apps']],
      title: 'Jayesh Kakkad, Softwarearchitekt und Embedded-Entwickler'
    },
    focus: {
      title: 'WAS ICH ENTWICKLE',
      items: [
        ['Plattformarchitektur', 'Sichere industrielle IoT-Plattformen, Orchestrierung von Edge-Geräten, verteilte Dienste und Integrationen.', ['IoT', 'Edge', 'Verteilte Systeme']],
        ['Embedded-Entwicklung', 'Embedded Linux mit Yocto und PTXdist, Videopipelines mit V4L2 und GStreamer, Software für ZynqMP und ARM.', ['Yocto', 'GStreamer', 'ZynqMP']],
        ['Full-Stack-Entwicklung', 'Oberflächen mit SvelteKit, React und TypeScript; APIs und Daten mit FastAPI, Node.js, PostgreSQL und Prisma.', ['SvelteKit', 'FastAPI', 'Docker']],
        ['Security Engineering', 'Bedrohungsmodellierung, sichere Entwicklung und Sicherheitstests mit Burp Suite, Nessus, Wireshark und Kali.', ['OWASP', 'Bedrohungsmodell', 'Tests']]
      ]
    },
    stack: {
      title: 'WERKZEUGE',
      groups: [
        ['Sprachen', ['C', 'C++', 'Python', 'TypeScript', 'JavaScript', 'Nim']],
        ['Frontend & Backend', ['SvelteKit', 'React', 'Tailwind', 'Node.js', 'FastAPI', 'Prisma']],
        ['Daten & Infrastruktur', ['PostgreSQL', 'Supabase', 'Docker', 'Linux', 'Git', 'VS Code']],
        ['Embedded', ['Embedded Linux', 'Yocto', 'PTXdist', 'V4L2', 'GStreamer', 'ZynqMP', 'ARM']],
        ['Sicherheit', ['OWASP Top 10', 'OWASP IoT Top 10', 'Bedrohungsmodellierung', 'Burp Suite', 'Nessus', 'Wireshark']]
      ]
    },
    stats: {
      title: 'GITHUB-AKTIVITÄT',
      period: 'Letzte 12 Monate',
      updated: 'Stand',
      kpis: ['Beiträge', 'Commits', 'Aktive Tage', 'Repositories'],
      activity: 'Beiträge pro Monat',
      languages: 'Häufigste Sprachen',
      other: 'Andere',
      locale: 'de-DE'
    }
  }
};

// ---------------------------------------------------------------------------
// SVG helpers
// ---------------------------------------------------------------------------

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Conservative width estimate for the system UI fonts (no layout engine in an <img>)
function textWidth(text, size, { bold = false, spacing = 0 } = {}) {
  let units = 0;
  for (const ch of text) {
    if ('ilI.,:;|!\'·'.includes(ch)) units += 0.3;
    else if ('fjrt()[] '.includes(ch)) units += 0.38;
    else if ('mwMW'.includes(ch)) units += 0.86;
    else if (ch >= 'A' && ch <= 'Z') units += 0.66;
    else if (ch >= '0' && ch <= '9') units += 0.58;
    else units += 0.54;
  }
  return units * size * (bold ? 1.06 : 1) + spacing * text.length;
}

function wrap(text, maxWidth, size) {
  const lines = [];
  let line = '';
  for (const word of text.split(' ')) {
    const next = line ? `${line} ${word}` : word;
    if (textWidth(next, size) > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

const text = (x, y, value, { size = 14, fill, weight = 400, spacing = 0, anchor = 'start', opacity } = {}) =>
  `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}"${spacing ? ` letter-spacing="${spacing}"` : ''}${anchor !== 'start' ? ` text-anchor="${anchor}"` : ''}${opacity ? ` opacity="${opacity}"` : ''}>${esc(value)}</text>`;

function chip(x, y, label, t, { size = 12.5, height = 26, fill = t.accentSoft, color = t.accent, weight = 600 } = {}) {
  const w = Math.round(textWidth(label, size, { bold: true }) + 24);
  return {
    width: w,
    svg: `<rect x="${x}" y="${y}" width="${w}" height="${height}" rx="${height / 2}" fill="${fill}"/>` +
      text(x + w / 2, y + height / 2 + size * 0.36, label, { size, fill: color, weight, anchor: 'middle' })
  };
}

// Section label in the card header style (small caps, muted, accent icon dot)
const cardLabel = (x, y, label, t) =>
  `<circle cx="${x + 4}" cy="${y - 4}" r="4" fill="${t.accent}"/>` +
  text(x + 16, y, label, { size: 12, fill: t.muted, weight: 700, spacing: 1.3 });

function frame(height, t, body, title, { glow = false } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${height}" viewBox="0 0 ${WIDTH} ${height}" role="img" aria-label="${esc(title)}">
<title>${esc(title)}</title>
<defs>
<radialGradient id="glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0 0) scale(560 300)"><stop stop-color="${t.glow}"/><stop offset="1" stop-color="${t.glow}" stop-opacity="0"/></radialGradient>
</defs>
<g font-family="${FONT}">
<rect x="0.5" y="0.5" width="${WIDTH - 1}" height="${height - 1}" rx="18" fill="${t.surface}" stroke="${t.border}"/>
${glow ? `<rect x="0.5" y="0.5" width="${WIDTH - 1}" height="${height - 1}" rx="18" fill="url(#glow)"/>` : ''}
${body}
</g>
</svg>
`;
}

// ---------------------------------------------------------------------------
// Cards
// ---------------------------------------------------------------------------

function renderHero(c, t) {
  const h = c.hero;
  const parts = [];

  parts.push(`<rect x="40" y="38" width="36" height="4" rx="2" fill="${t.accent}"/>`);
  parts.push(text(40, 72, h.eyebrow, { size: 12, fill: t.accent, weight: 700, spacing: 1.4 }));
  parts.push(text(38, 124, h.name, { size: 46, fill: t.text, weight: 700, spacing: -0.8 }));
  const taglineLines = wrap(h.tagline, 400, 17);
  taglineLines.forEach((line, i) => parts.push(text(40, 160 + i * 25, line, { size: 17, fill: t.text2 })));
  // Chips sit below the tagline, however many lines it wraps to
  const chipsY = 160 + (taglineLines.length - 1) * 25 + 22;

  let x = 40;
  for (const label of h.chips) {
    const c1 = chip(x, chipsY, label, t);
    parts.push(c1.svg);
    x += c1.width + 8;
  }

  // Right panel: device -> software path as a vertical timeline
  const px = 500, py = 34, pw = 306, ph = 222;
  parts.push(`<rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="14" fill="${t.surface2}"/>`);
  parts.push(text(px + 22, py + 32, h.pathTitle, { size: 11, fill: t.muted, weight: 700, spacing: 1.2 }));
  const rowY = (i) => py + 66 + i * 42;
  parts.push(`<line x1="${px + 31}" y1="${rowY(0)}" x2="${px + 31}" y2="${rowY(h.path.length - 1)}" stroke="${t.border}" stroke-width="2"/>`);
  h.path.forEach(([label, sub], i) => {
    const y = rowY(i);
    const last = i === h.path.length - 1;
    parts.push(`<circle cx="${px + 31}" cy="${y}" r="9" fill="${last ? t.accent : t.surface}" stroke="${t.accent}" stroke-width="2"/>`);
    parts.push(text(px + 54, y + 5, label, { size: 15, fill: t.text, weight: 600 }));
    parts.push(text(px + pw - 22, y + 5, sub, { size: 12.5, fill: t.muted, anchor: 'end' }));
  });

  return frame(Math.max(290, chipsY + 26 + 36), t, parts.join('\n'), h.title, { glow: true });
}

function renderFocus(c, t) {
  const f = c.focus;
  // No in-card title: the README heading above the card names the section
  const parts = [];
  const gap = 16, cols = 2, x0 = 24, y0 = 24;
  const cw = (WIDTH - x0 * 2 - gap) / cols;
  const ch = 186;

  f.items.forEach(([title, desc, tags], i) => {
    const x = x0 + (i % cols) * (cw + gap);
    const y = y0 + Math.floor(i / cols) * (ch + gap);
    parts.push(`<rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="14" fill="${t.surface2}"/>`);
    // number badge
    parts.push(`<rect x="${x + 20}" y="${y + 20}" width="36" height="28" rx="8" fill="${t.accentSoft}"/>`);
    parts.push(text(x + 38, y + 39, String(i + 1).padStart(2, '0'), { size: 13, fill: t.accent, weight: 700, anchor: 'middle' }));
    parts.push(text(x + 68, y + 40, title, { size: 17, fill: t.text, weight: 650 }));
    wrap(desc, cw - 40, 13.5).slice(0, 3).forEach((line, li) =>
      parts.push(text(x + 20, y + 74 + li * 20, line, { size: 13.5, fill: t.muted })));
    let tx = x + 20;
    for (const tag of tags) {
      const c1 = chip(tx, y + ch - 42, tag, t, { size: 12, height: 24, fill: t.surface3, color: t.text2, weight: 600 });
      parts.push(c1.svg);
      tx += c1.width + 6;
    }
  });

  const height = y0 + 2 * ch + gap + 24;
  return frame(height, t, parts.join('\n'), `${f.title}: ${f.items.map(i => i[0]).join(', ')}`);
}

function renderStack(c, t) {
  const s = c.stack;
  const parts = [];
  const labelW = 190, x0 = 28, chipH = 28, rowGap = 10, lineGap = 8;
  const maxX = WIDTH - 28;
  let y = 20;

  s.groups.forEach(([label, items], gi) => {
    if (gi > 0) {
      parts.push(`<line x1="${x0}" y1="${y - rowGap / 2 - 1}" x2="${maxX}" y2="${y - rowGap / 2 - 1}" stroke="${t.border}"/>`);
    }
    const rowTop = y;
    let x = x0 + labelW;
    let lines = 1;
    for (const item of items) {
      const w = Math.round(textWidth(item, 13, { bold: true }) + 26);
      if (x + w > maxX) {
        x = x0 + labelW;
        y += chipH + lineGap;
        lines++;
      }
      parts.push(chip(x, y + 6, item, t, { size: 13, height: chipH, fill: t.surface2, color: t.text, weight: 600 }).svg);
      x += w + 8;
    }
    parts.push(text(x0, rowTop + 6 + chipH / 2 + 5, label, { size: 14, fill: t.muted, weight: 600 }));
    y += chipH + 6 + rowGap + (lines > 1 ? 0 : 0) + 6;
  });

  return frame(y + 14, t, parts.join('\n'), `${s.title}: ${s.groups.map(([l, i]) => `${l}: ${i.join(', ')}`).join('; ')}`);
}

function renderStats(c, t, stats) {
  const s = c.stats;
  const fmt = (n) => Number(n || 0).toLocaleString(s.locale);
  const updated = new Date(stats.generatedAt).toLocaleDateString(s.locale, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Europe/Berlin' });
  const parts = [];
  parts.push(cardLabel(28, 42, s.period.toUpperCase(), t));
  parts.push(text(WIDTH - 28, 42, `${s.updated} ${updated}`, { size: 12, fill: t.faint, anchor: 'end' }));

  // KPI tiles
  const kpiValues = [stats.contributions, stats.commits, stats.activeDays, stats.repositories];
  const gap = 12, x0 = 24, kw = (WIDTH - x0 * 2 - gap * 3) / 4, ky = 60, kh = 84;
  kpiValues.forEach((value, i) => {
    const x = x0 + i * (kw + gap);
    parts.push(`<rect x="${x}" y="${ky}" width="${kw}" height="${kh}" rx="12" fill="${t.surface2}"/>`);
    parts.push(text(x + 18, ky + 44, fmt(value), { size: 28, fill: i === 0 ? t.accent : t.text, weight: 700, spacing: -0.5 }));
    parts.push(text(x + 18, ky + 68, s.kpis[i], { size: 12.5, fill: t.muted }));
  });

  // Monthly activity bars (12 months, current month highlighted)
  const ay = ky + kh + 24, ah = 168, aw = 486;
  parts.push(`<rect x="${x0}" y="${ay}" width="${aw}" height="${ah}" rx="12" fill="${t.surface2}"/>`);
  parts.push(text(x0 + 18, ay + 28, s.activity, { size: 12.5, fill: t.muted, weight: 600 }));
  const months = (stats.months || []).slice(-12);
  const max = Math.max(1, ...months.map(m => m.count));
  const bx = x0 + 18, bw = aw - 36, by = ay + 40, bh = ah - 82;
  const step = bw / Math.max(1, months.length);
  months.forEach((m, i) => {
    // Square-root scale keeps quieter months visible next to a very busy one
    const hgt = m.count > 0 ? Math.max(4, (Math.sqrt(m.count) / Math.sqrt(max)) * (bh - 16)) : 2;
    const last = i === months.length - 1;
    const x = bx + i * step + 5;
    parts.push(`<rect x="${x.toFixed(1)}" y="${(by + bh - hgt).toFixed(1)}" width="${(step - 10).toFixed(1)}" height="${hgt.toFixed(1)}" rx="4" fill="${m.count > 0 ? t.accent : t.track}" opacity="${last || m.count === 0 ? 1 : 0.6}"/>`);
    const [y, mo] = m.month.split('-').map(Number);
    const label = new Date(Date.UTC(y, mo - 1, 15)).toLocaleDateString(s.locale, { month: 'short', timeZone: 'UTC' }).replace('.', '');
    parts.push(text(x + (step - 10) / 2, by + bh + 20, label, { size: 11, fill: last ? t.accent : t.faint, weight: last ? 700 : 500, anchor: 'middle' }));
    if (m.count > 0) {
      parts.push(text(x + (step - 10) / 2, by + bh - hgt - 6, fmt(m.count), { size: 10.5, fill: last ? t.accent : t.muted, weight: 600, anchor: 'middle' }));
    }
  });

  // Languages: stacked bar + legend
  const lx = x0 + aw + 16, lw = WIDTH - x0 - lx;
  parts.push(`<rect x="${lx}" y="${ay}" width="${lw}" height="${ah}" rx="12" fill="${t.surface2}"/>`);
  parts.push(text(lx + 18, ay + 28, s.languages, { size: 12.5, fill: t.muted, weight: 600 }));
  const palette = [t.accent, t.info, t.success, t.warning, t.accent2, t.faint];
  const langs = (stats.languages || []).map(l => (l.name === 'Other' ? { ...l, name: s.other } : l));
  const barX = lx + 18, barW = lw - 36, barY = ay + 42;
  parts.push(`<clipPath id="langbar"><rect x="${barX}" y="${barY}" width="${barW}" height="10" rx="5"/></clipPath>`);
  let cx = barX;
  const segs = langs.map((l, i) => {
    const w = (l.percent / 100) * barW;
    const seg = `<rect x="${cx.toFixed(1)}" y="${barY}" width="${w.toFixed(1)}" height="10" fill="${palette[i % palette.length]}"/>`;
    cx += w;
    return seg;
  });
  parts.push(`<g clip-path="url(#langbar)"><rect x="${barX}" y="${barY}" width="${barW}" height="10" fill="${t.track}"/>${segs.join('')}</g>`);
  langs.slice(0, 6).forEach((l, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = barX + col * (barW / 2), y = barY + 40 + row * 28;
    parts.push(`<circle cx="${x + 5}" cy="${y - 4}" r="5" fill="${palette[i % palette.length]}"/>`);
    parts.push(text(x + 16, y, l.name, { size: 13, fill: t.text, weight: 600 }));
    parts.push(text(x + barW / 2 - 12, y, `${l.percent.toLocaleString(s.locale, { maximumFractionDigits: l.percent < 10 ? 1 : 0 })}${s.locale === 'de-DE' ? ' %' : '%'}`, { size: 12.5, fill: t.muted, anchor: 'end' }));
  });

  const height = ay + ah + 24;
  const summary = `${s.title}: ${s.kpis.map((k, i) => `${k} ${fmt(kpiValues[i])}`).join(', ')}; ${s.languages}: ${langs.map(l => `${l.name} ${l.percent.toFixed(0)}%`).join(', ')}`;
  return frame(height, t, parts.join('\n'), summary);
}

// ---------------------------------------------------------------------------
// GitHub stats (aggregates only)
// ---------------------------------------------------------------------------

async function fetchStats(token) {
  const query = `query($cursor: String) {
    viewer {
      contributionsCollection {
        totalCommitContributions

        restrictedContributionsCount
        contributionCalendar { totalContributions weeks { contributionDays { contributionCount date } } }
      }
      repositories(first: 100, after: $cursor, isFork: false, ownerAffiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]) {
        totalCount
        pageInfo { hasNextPage endCursor }
        nodes { languages(first: 10, orderBy: { field: SIZE, direction: DESC }) { edges { size node { name } } } }
      }
    }
  }`;

  const call = async (cursor) => {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'User-Agent': 'profile-cards' },
      body: JSON.stringify({ query, variables: { cursor } })
    });
    const body = await res.json();
    if (!res.ok || body.errors) {
      throw new Error(`GitHub API ${res.status}: ${JSON.stringify(body.errors || body.message)}`);
    }
    return body.data.viewer;
  };

  const first = await call(null);
  const nodes = [...first.repositories.nodes];
  let page = first.repositories.pageInfo;
  while (page.hasNextPage && nodes.length < 500) {
    const next = await call(page.endCursor);
    nodes.push(...next.repositories.nodes);
    page = next.repositories.pageInfo;
  }

  const bytes = {};
  for (const repo of nodes) {
    for (const edge of repo.languages.edges) {
      bytes[edge.node.name] = (bytes[edge.node.name] || 0) + edge.size;
    }
  }
  const total = Object.values(bytes).reduce((a, b) => a + b, 0) || 1;
  const sorted = Object.entries(bytes).sort((a, b) => b[1] - a[1]);
  const top = sorted.slice(0, 5).map(([name, size]) => ({ name, percent: (size / total) * 100 }));
  const rest = sorted.slice(5).reduce((sum, [, size]) => sum + size, 0);
  if (rest > 0) top.push({ name: 'Other', percent: (rest / total) * 100 });

  const cc = first.contributionsCollection;
  return {
    generatedAt: new Date().toISOString(),
    contributions: cc.contributionCalendar.totalContributions,
    commits: cc.totalCommitContributions + cc.restrictedContributionsCount,
    activeDays: cc.contributionCalendar.weeks.reduce((n, w) => n + w.contributionDays.filter(d => d.contributionCount > 0).length, 0),
    repositories: first.repositories.totalCount,
    months: Object.entries(
      cc.contributionCalendar.weeks.flatMap(w => w.contributionDays).reduce((acc, d) => {
        const key = d.date.slice(0, 7);
        acc[key] = (acc[key] || 0) + d.contributionCount;
        return acc;
      }, {})
    ).sort(([a], [b]) => a.localeCompare(b)).slice(-12).map(([month, count]) => ({ month, count })),
    languages: top
  };
}

// ---------------------------------------------------------------------------

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  let stats = fs.existsSync(STATS_FILE) ? JSON.parse(fs.readFileSync(STATS_FILE, 'utf-8')) : null;
  if (process.argv.includes('--fetch')) {
    const token = process.env.METRICS_TOKEN || process.env.GITHUB_TOKEN;
    if (!token) throw new Error('--fetch needs METRICS_TOKEN or GITHUB_TOKEN');
    try {
      stats = await fetchStats(token);
      fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2) + '\n');
      console.log(`stats: ${stats.contributions} contributions, ${stats.repositories} repositories`);
    } catch (err) {
      // Keep the last good snapshot rather than failing the profile
      if (!stats) throw err;
      console.warn(`::warning::Could not refresh stats, keeping previous snapshot: ${err.message}`);
    }
  }

  for (const [lang, content] of Object.entries(CONTENT)) {
    for (const [themeName, theme] of Object.entries(THEMES)) {
      const cards = {
        hero: renderHero(content, theme),
        focus: renderFocus(content, theme),
        stack: renderStack(content, theme),
        ...(stats ? { stats: renderStats(content, theme, stats) } : {})
      };
      for (const [name, svg] of Object.entries(cards)) {
        fs.writeFileSync(path.join(OUT_DIR, `${name}-${lang}-${themeName}.svg`), svg);
      }
    }
  }
  console.log(`cards written to ${path.relative(ROOT, OUT_DIR)}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
