import { visit } from 'unist-util-visit'
import type {
  BlockContent,
  Blockquote,
  DefinitionContent,
  Paragraph,
  PhrasingContent,
  Root,
  Text,
} from 'mdast'

type CalloutKind = 'important' | 'key'

const MARKERS: Array<{ kind: CalloutKind; pattern: RegExp }> = [
  { kind: 'important', pattern: /^\[!IMPORTANT\]\s*/i },
  { kind: 'key', pattern: /^\[!KEY\]\s*/i },
]

function matchCalloutMarker(
  paragraph: Paragraph,
): { kind: CalloutKind; children: PhrasingContent[] } | null {
  const first = paragraph.children[0]
  if (!first || first.type !== 'text') return null

  for (const { kind, pattern } of MARKERS) {
    if (!pattern.test(first.value)) continue

    const restText = first.value.replace(pattern, '')
    const restChildren = paragraph.children.slice(1)

    if (!restText && restChildren.length === 0) {
      return { kind, children: [] }
    }

    const children: PhrasingContent[] = []
    if (restText) {
      children.push({ type: 'text', value: restText } satisfies Text)
    }
    children.push(...restChildren)
    return { kind, children }
  }

  return null
}

/**
 * Turns GitHub-style callout blockquotes into styled asides:
 * - `> [!IMPORTANT]` — exclamation-mark divider
 * - `> [!KEY]` — lightbulb divider
 */
export function remarkCallouts() {
  return (tree: Root) => {
    visit(tree, 'blockquote', (node: Blockquote, index, parent) => {
      if (index === undefined || !parent) return

      const first = node.children[0]
      if (!first || first.type !== 'paragraph') return

      const matched = matchCalloutMarker(first)
      if (!matched) return

      const body: Array<BlockContent | DefinitionContent> = []
      if (matched.children.length > 0) {
        body.push({ type: 'paragraph', children: matched.children })
      }
      body.push(...node.children.slice(1))

      parent.children[index] = {
        type: 'blockquote',
        children: body,
        data: {
          hName: 'aside',
          hProperties: {
            className: ['page-callout', `page-callout--${matched.kind}`],
          },
        },
      }
    })
  }
}
