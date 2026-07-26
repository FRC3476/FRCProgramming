import { Children, isValidElement, useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkHeadingId from 'remark-heading-id'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import { visit } from 'unist-util-visit'
import type { Root, Element } from 'hast'
import { MediaLightbox, type LightboxMedia } from './medialightbox/MediaLightbox'
import { isBundledAsset, resolveAssetUrl } from '../utils/resolveAssetUrl'

// Copies the code fence meta (the text after the language, e.g. ```java My label)
// into a data attribute, because rehype-raw would otherwise strip it.
function rehypeCodeMeta() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      const meta = node.tagName === 'code' && (node.data as { meta?: string } | undefined)?.meta
      if (meta) {
        node.properties.dataMeta = meta
      }
    })
  }
}

type MarkdownContentProps = {
  markdown: string
}

function isMediaFigure(node: React.ReactNode) {
  return (
    isValidElement<{ className?: string }>(node) &&
    typeof node.props.className === 'string' &&
    node.props.className.split(/\s+/).includes('page-media-figure')
  )
}

function getCodeSummary(children: React.ReactNode): string {
  const child = Children.toArray(children)[0]
  if (isValidElement<{ 'data-meta'?: string }>(child)) {
    const meta = child.props['data-meta']
    if (typeof meta === 'string' && meta.trim()) {
      return meta.trim()
    }
  }

  return ''
}

export function MarkdownContent({ markdown }: MarkdownContentProps) {
  const [lightboxMedia, setLightboxMedia] = useState<LightboxMedia | null>(null)

  const components = useMemo(
    () => ({
      p: ({ children }: { children?: React.ReactNode }) => {
        const childList = Children.toArray(children)
        if (childList.length === 1 && isMediaFigure(childList[0])) {
          return childList[0]
        }

        return <p className="page-text">{children}</p>
      },
      a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),
      pre: ({ children }: { children?: React.ReactNode }) => (
        <details className="page-code-details" open>
          <summary className="page-code-summary">{getCodeSummary(children)}</summary>
          <pre className="page-code-block">{children}</pre>
        </details>
      ),
      code: ({
        className,
        children,
      }: {
        className?: string
        children?: React.ReactNode
      }) => {
        const isBlock = typeof className === 'string' && className.includes('language-')
        return (
          <code className={isBlock ? className : 'page-inline-code'}>{children}</code>
        )
      },
      img: ({ src, alt }: { src?: string; alt?: string }) => {
        if (!src) return null

        const resolvedSrc = resolveAssetUrl(src)
        const caption = alt ?? ''
        const isClickable = isBundledAsset(src) || src.endsWith('.gif')

        return (
          <figure className="page-media-figure">
            <img
              className={`page-media${isClickable ? ' page-media--clickable' : ''}`}
              src={resolvedSrc}
              alt={caption}
              onClick={
                isClickable
                  ? () =>
                      setLightboxMedia({
                        type: src.endsWith('.gif') ? 'gif' : 'image',
                        src: resolvedSrc,
                        caption: caption || undefined,
                      })
                  : undefined
              }
            />
            {caption ? (
              <figcaption className="page-media-caption">{caption}</figcaption>
            ) : null}
          </figure>
        )
      },
    }),
    [],
  )

  return (
    <>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkHeadingId]}
        rehypePlugins={[rehypeCodeMeta, rehypeRaw, rehypeSlug, rehypeHighlight]}
        components={components}
      >
        {markdown}
      </ReactMarkdown>
      <MediaLightbox media={lightboxMedia} onClose={() => setLightboxMedia(null)} />
    </>
  )
}
