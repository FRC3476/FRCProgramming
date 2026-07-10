import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkHeadingId from 'remark-heading-id'
import { visit } from 'unist-util-visit'
import GithubSlugger from 'github-slugger'
import type { Heading, Root } from 'mdast'

export type NavItem = {
  id: string
  title: string
  level: 0 | 1
}

function getHeadingText(node: Heading): string {
  return node.children
    .map((child) => ('value' in child ? child.value : ''))
    .join('')
    .trim()
}

export function buildNavItems(markdown: string): NavItem[] {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHeadingId)

  const tree = processor.parse(markdown) as Root
  processor.runSync(tree)

  const slugger = new GithubSlugger()
  const items: NavItem[] = []

  visit(tree, 'heading', (node: Heading) => {
    if (node.depth !== 1 && node.depth !== 2) return

    const title = getHeadingText(node)
    const id = (node.data as { id?: string } | undefined)?.id ?? slugger.slug(title)

    items.push({
      id,
      title,
      level: node.depth === 1 ? 0 : 1,
    })
  })

  return items
}

export function getPageTitle(markdown: string): string {
  const h1 = buildNavItems(markdown).find((item) => item.level === 0)
  return h1?.title ?? 'Untitled'
}
