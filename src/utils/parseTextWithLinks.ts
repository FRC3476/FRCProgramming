export type TextSegment =
  | { type: 'text'; value: string }
  | { type: 'link'; label: string; href: string }

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g

export function parseTextWithLinks(text: string): TextSegment[] {
  const segments: TextSegment[] = []
  let lastIndex = 0

  for (const match of text.matchAll(LINK_PATTERN)) {
    const index = match.index ?? 0

    if (index > lastIndex) {
      segments.push({ type: 'text', value: text.slice(lastIndex, index) })
    }

    segments.push({ type: 'link', label: match[1], href: match[2] })
    lastIndex = index + match[0].length
  }

  if (lastIndex < text.length) {
    segments.push({ type: 'text', value: text.slice(lastIndex) })
  }

  return segments.length > 0 ? segments : [{ type: 'text', value: text }]
}
