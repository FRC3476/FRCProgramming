import { Children, isValidElement, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
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
import { remarkCallouts } from '../utils/remarkCallouts'

function isInternalHref(href: string) {
  return href.startsWith('/') && !href.startsWith('//')
}

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

function LightbulbMark() {
  return (
    <svg
      className="page-callout__icon"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M9 21h6v-1.5H9V21zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1-.85.6V16h-4v-2.3l-.85-.6C8.29 12.25 7.5 10.72 7.5 9c0-2.48 2.02-4.5 4.5-4.5s4.5 2.02 4.5 4.5c0 1.72-.79 3.25-2.15 4.1z"
      />
    </svg>
  )
}

function CalloutAside({
  className,
  children,
  mark,
}: {
  className: string
  children?: React.ReactNode
  mark: React.ReactNode
}) {
  return (
    <aside className={className} role="note">
      <div className="page-callout__divider" aria-hidden="true">
        <span className="page-callout__mark">{mark}</span>
      </div>
      <div className="page-callout__body">{children}</div>
      <div className="page-callout__divider" aria-hidden="true">
        <span className="page-callout__mark">{mark}</span>
      </div>
    </aside>
  )
}

function CodeSnippet({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(true)

  return (
    <details
      className="page-code-details"
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary className="page-code-summary">{getCodeSummary(children)}</summary>
      <pre className="page-code-block">{children}</pre>
    </details>
  )
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
      a: ({ href, children }: { href?: string; children?: React.ReactNode }) => {
        if (href && isInternalHref(href)) {
          return <Link to={href}>{children}</Link>
        }

        return (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        )
      },
      aside: ({
        className,
        children,
      }: {
        className?: string
        children?: React.ReactNode
      }) => {
        if (typeof className !== 'string') {
          return <aside className={className}>{children}</aside>
        }

        if (className.includes('page-callout--important')) {
          return (
            <CalloutAside className={className} mark="!">
              {children}
            </CalloutAside>
          )
        }

        if (className.includes('page-callout--key')) {
          return (
            <CalloutAside className={className} mark={<LightbulbMark />}>
              {children}
            </CalloutAside>
          )
        }

        return <aside className={className}>{children}</aside>
      },
      pre: ({ children }: { children?: React.ReactNode }) => (
        <CodeSnippet>{children}</CodeSnippet>
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
        key={markdown}
        remarkPlugins={[remarkGfm, remarkHeadingId, remarkCallouts]}
        rehypePlugins={[rehypeCodeMeta, rehypeRaw, rehypeSlug, rehypeHighlight]}
        components={components}
      >
        {markdown}
      </ReactMarkdown>
      <MediaLightbox media={lightboxMedia} onClose={() => setLightboxMedia(null)} />
    </>
  )
}
