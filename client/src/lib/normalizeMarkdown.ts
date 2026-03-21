/**
 * Many editors wrap notes in a fenced `markdown` / `md` block. That makes the
 * whole section a single code block while the rest of the document parses as
 * Markdown—exactly the “top is raw, bottom renders” bug.
 */
export function unwrapLeadingMarkdownFence(text: string): string {
  const t = text.replace(/^\uFEFF/, '').trimStart();
  const firstLine = (t.split(/\r?\n/, 1)[0] ?? '').trim();
  if (!/^```(?:markdown|md)$/i.test(firstLine)) {
    return text;
  }
  const nl = t.indexOf('\n');
  if (nl === -1) {
    return text;
  }
  const afterFirst = t.slice(nl + 1);
  const lines = afterFirst.split(/\r?\n/);
  let closeIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^```\s*$/.test(lines[i])) {
      closeIndex = i;
      break;
    }
  }
  if (closeIndex === -1) {
    return text;
  }
  const inner = lines.slice(0, closeIndex).join('\n');
  const rest = lines.slice(closeIndex + 1).join('\n');
  return `${inner.trimEnd()}\n\n${rest.trimStart()}`;
}
