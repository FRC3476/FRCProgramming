import { useEffect } from 'react'
import './MediaLightbox.css'

export type LightboxMedia = {
  type: 'image' | 'gif' | 'video'
  src: string
  caption?: string
}

type MediaLightboxProps = {
  media: LightboxMedia | null
  onClose: () => void
}

export function MediaLightbox({ media, onClose }: MediaLightboxProps) {
  useEffect(() => {
    if (!media) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [media, onClose])

  if (!media) return null

  return (
    <div
      className="media-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={media.caption ?? 'Media preview'}
      onClick={onClose}
    >
      <button
        type="button"
        className="media-lightbox__close"
        aria-label="Close"
        onClick={onClose}
      >
        ×
      </button>
      <div className="media-lightbox__content" onClick={(e) => e.stopPropagation()}>
        {media.type === 'video' ? (
          <video
            className="media-lightbox__media"
            src={media.src}
            controls
            aria-label={media.caption}
          />
        ) : (
          <img
            className="media-lightbox__media"
            src={media.src}
            alt={media.caption ?? ''}
          />
        )}
        {media.caption ? (
          <figcaption className="media-lightbox__caption">{media.caption}</figcaption>
        ) : null}
      </div>
    </div>
  )
}
