import { useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkHeadingId from 'remark-heading-id'
import rehypeSlug from 'rehype-slug'
import { MediaLightbox, type LightboxMedia } from './medialightbox/MediaLightbox'
import { isBundledAsset, resolveAssetUrl } from '../utils/resolveAssetUrl'

type MarkdownContentProps = {
  markdown: string
}

export function MarkdownContent({ markdown }: MarkdownContentProps) {
  const [lightboxMedia, setLightboxMedia] = useState<LightboxMedia | null>(null)

  const components = useMemo(
    () => ({
      p: ({ children }: { children?: React.ReactNode }) => (
        <p className="page-text">{children}</p>
      ),
      a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),
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
        rehypePlugins={[rehypeSlug]}
        components={components}
      >
        {markdown}
      </ReactMarkdown>
      <MediaLightbox media={lightboxMedia} onClose={() => setLightboxMedia(null)} />
    </>
  )
}
