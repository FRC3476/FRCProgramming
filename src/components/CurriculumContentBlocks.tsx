import { useState } from 'react'
import type { CurriculumContentBlock } from '../data/curriculum'
import { parseTextWithLinks } from '../utils/parseTextWithLinks'
import { MediaLightbox, type LightboxMedia } from './MediaLightbox'

type CurriculumContentBlocksProps = {
  blocks: CurriculumContentBlock[]
}

export function CurriculumContentBlocks({ blocks }: CurriculumContentBlocksProps) {
  const [lightboxMedia, setLightboxMedia] = useState<LightboxMedia | null>(null)

  const openLightbox = (media: LightboxMedia) => setLightboxMedia(media)

  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'text':
            return (
              <p key={`${block.type}-${i}`} className="curriculum-text">
                {parseTextWithLinks(block.body).map((segment, j) =>
                  segment.type === 'link' ? (
                    <a
                      key={j}
                      href={segment.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {segment.label}
                    </a>
                  ) : (
                    segment.value
                  ),
                )}
              </p>
            )
          case 'image':
          case 'gif':
            return (
              <figure key={`${block.type}-${i}`} className="curriculum-media-figure">
                <img
                  className="curriculum-media curriculum-media--clickable"
                  src={block.src}
                  alt={block.caption ?? ''}
                  onClick={() =>
                    openLightbox({
                      type: block.type,
                      src: block.src,
                      caption: block.caption,
                    })
                  }
                />
                {block.caption ? (
                  <figcaption className="curriculum-media-caption">{block.caption}</figcaption>
                ) : null}
              </figure>
            )
          case 'video':
            return (
              <figure key={`${block.type}-${i}`} className="curriculum-media-figure">
                <video
                  className="curriculum-media curriculum-media--clickable"
                  src={block.src}
                  controls
                  aria-label={block.caption}
                  onClick={() =>
                    openLightbox({
                      type: block.type,
                      src: block.src,
                      caption: block.caption,
                    })
                  }
                />
                {block.caption ? (
                  <figcaption className="curriculum-media-caption">{block.caption}</figcaption>
                ) : null}
              </figure>
            )
        }
      })}
      <MediaLightbox media={lightboxMedia} onClose={() => setLightboxMedia(null)} />
    </>
  )
}
