import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import { Request, Response } from 'express';

marked.setOptions({ gfm: true });

function readmePath(): string {
  return path.join(__dirname, '..', 'README.md');
}

const FALLBACK_README = [
  '# InterviewPrep — Server',
  '',
  '_README.md could not be read from disk._',
  '',
  'See the project repository for full API documentation.',
].join('\n');

let cachedBodyHtml: string | null = null;
let cachedMtime = 0;

function getReadmeBodyHtml(): string {
  try {
    const p = readmePath();
    const stat = fs.statSync(p);
    if (cachedBodyHtml !== null && stat.mtimeMs === cachedMtime) {
      return cachedBodyHtml;
    }
    const md = fs.readFileSync(p, 'utf8');
    cachedMtime = stat.mtimeMs;
    cachedBodyHtml = marked.parse(md, { async: false }) as string;
    return cachedBodyHtml;
  } catch {
    return marked.parse(FALLBACK_README, { async: false }) as string;
  }
}

const SHELL_CSS = `
:root {
  --bg: #0f1419;
  --surface: #151c28;
  --border: #2d3a4d;
  --text: #e7edf4;
  --muted: #8b9cb3;
  --accent: #3d9cf0;
  --code-bg: #0d1117;
}
* { box-sizing: border-box; }
body {
  margin: 0;
  min-height: 100vh;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
}
.top {
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.85rem 1.5rem;
  background: rgba(15, 20, 25, 0.92);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(8px);
}
.top strong { font-size: 0.95rem; letter-spacing: -0.02em; }
.top nav { display: flex; flex-wrap: wrap; gap: 0.75rem; font-size: 0.88rem; }
.top a { color: var(--accent); text-decoration: none; }
.top a:hover { text-decoration: underline; }
.top span { color: var(--muted); font-size: 0.8rem; }
.doc {
  max-width: 920px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}
.markdown-body { font-size: 0.95rem; }
.markdown-body > :first-child { margin-top: 0; }
.markdown-body h1 {
  font-size: 1.65rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid var(--border);
  margin: 0 0 1rem;
}
.markdown-body h2 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 2rem 0 0.75rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid var(--border);
}
.markdown-body h3 { font-size: 1.05rem; font-weight: 600; margin: 1.5rem 0 0.5rem; }
.markdown-body h4 { font-size: 0.95rem; margin: 1.25rem 0 0.5rem; color: var(--muted); }
.markdown-body p { margin: 0.65rem 0; }
.markdown-body a { color: var(--accent); text-decoration: none; }
.markdown-body a:hover { text-decoration: underline; }
.markdown-body ul, .markdown-body ol { margin: 0.5rem 0 0.5rem 1.25rem; padding: 0; }
.markdown-body li { margin: 0.25rem 0; }
.markdown-body hr {
  border: 0;
  border-top: 1px solid var(--border);
  margin: 1.75rem 0;
}
.markdown-body blockquote {
  margin: 0.75rem 0;
  padding: 0.35rem 0 0.35rem 1rem;
  border-left: 3px solid var(--accent);
  color: var(--muted);
}
.markdown-body code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.86em;
  padding: 0.15em 0.4em;
  border-radius: 4px;
  background: var(--surface);
  border: 1px solid var(--border);
}
.markdown-body pre {
  margin: 1rem 0;
  padding: 1rem 1.1rem;
  overflow-x: auto;
  border-radius: 8px;
  background: var(--code-bg);
  border: 1px solid var(--border);
  font-size: 0.82rem;
  line-height: 1.5;
}
.markdown-body pre code {
  padding: 0;
  border: 0;
  background: transparent;
  font-size: inherit;
}
.markdown-body table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 0.82rem;
  display: block;
  overflow-x: auto;
}
.markdown-body th, .markdown-body td {
  border: 1px solid var(--border);
  padding: 0.45rem 0.65rem;
  text-align: left;
  vertical-align: top;
}
.markdown-body th { background: var(--surface); font-weight: 600; }
.markdown-body tr:nth-child(even) { background: rgba(26, 35, 50, 0.35); }
.markdown-body strong { color: var(--text); }
`;

function buildLandingHtml(bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>InterviewPrep API — Documentation</title>
  <style>${SHELL_CSS}</style>
</head>
<body>
  <header class="top">
    <strong>InterviewPrep API</strong>
    <nav>
      <a href="/api/health">GET /api/health</a>
      <a href="https://github.com/ShailendraTrivedi/InterviewPrep" rel="noopener noreferrer">GitHub</a>
    </nav>
    <span>From server README.md</span>
  </header>
  <div class="doc">
    <article class="markdown-body">${bodyHtml}</article>
  </div>
</body>
</html>`;
}

export function sendLandingPage(_req: Request, res: Response): void {
  const bodyHtml = getReadmeBodyHtml();
  res.type('html').send(buildLandingHtml(bodyHtml));
}

const NOT_FOUND_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Not found · InterviewPrep API</title>
  <style>
    :root { --bg: #0f1419; --surface: #1a2332; --border: #2d3a4d; --text: #e7edf4; --muted: #8b9cb3; --accent: #3d9cf0; }
    body { margin: 0; min-height: 100vh; font-family: ui-sans-serif, system-ui, sans-serif; background: var(--bg); color: var(--text); display: flex; align-items: center; justify-content: center; padding: 1.5rem; }
    .box { max-width: 420px; text-align: center; padding: 2rem; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; }
    h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
    p { color: var(--muted); margin: 0 0 1.25rem; font-size: 0.95rem; }
    a { color: var(--accent); text-decoration: none; font-weight: 500; }
    a:hover { text-decoration: underline; }
    code { font-size: 0.85rem; word-break: break-all; }
  </style>
</head>
<body>
  <div class="box">
    <h1>Page not found</h1>
    <p>This server exposes a <strong>JSON API</strong> and docs at <code>/</code>. There is no page at this path.</p>
    <p><a href="/">← API docs (README)</a> · <a href="/api/health">Health check</a></p>
  </div>
</body>
</html>`;

/** Non-API routes only; API 404s should use JSON from handlers or a dedicated API 404. */
export function sendHtmlNotFound(_req: Request, res: Response): void {
  res.status(404).type('html').send(NOT_FOUND_HTML);
}
