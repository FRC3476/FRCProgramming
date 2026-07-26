import { useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
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
  const [zoomOrigin, setZoomOrigin] = useState<{ x: number; y: number } | null>(null)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const panStartRef = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null)

  useEffect(() => {
    setZoomOrigin(null)
    setPan({ x: 0, y: 0 })
    setIsPanning(false)
    panStartRef.current = null
  }, [media])

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

  useEffect(() => {
    if (!isPanning) return

    const handleMouseMove = (event: globalThis.MouseEvent) => {
      const start = panStartRef.current
      if (!start) return
      setPan({
        x: start.panX + (event.clientX - start.x),
        y: start.panY + (event.clientY - start.y),
      })
    }

    const stopPanning = () => {
      setIsPanning(false)
      panStartRef.current = null
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', stopPanning)
    window.addEventListener('blur', stopPanning)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', stopPanning)
      window.removeEventListener('blur', stopPanning)
    }
  }, [isPanning])

  if (!media) return null

  const handleImageClick = (event: MouseEvent<HTMLImageElement>) => {
    event.stopPropagation()
    if (zoomOrigin) {
      setZoomOrigin(null)
      setPan({ x: 0, y: 0 })
      return
    }
    const rect = event.currentTarget.getBoundingClientRect()
    setZoomOrigin({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    })
  }

  const handleImageMouseDown = (event: MouseEvent<HTMLImageElement>) => {
    if (event.button !== 2 || !zoomOrigin) return
    event.preventDefault()
    event.stopPropagation()
    panStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      panX: pan.x,
      panY: pan.y,
    }
    setIsPanning(true)
  }

  const handleContextMenu = (event: MouseEvent<HTMLImageElement>) => {
    if (!zoomOrigin) return
    event.preventDefault()
  }

  const zoomed = Boolean(zoomOrigin)

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
            className={[
              'media-lightbox__media',
              'media-lightbox__media--zoomable',
              zoomed ? 'media-lightbox__media--zoomed' : '',
              isPanning ? 'media-lightbox__media--panning' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            src={media.src}
            alt={media.caption ?? ''}
            style={
              zoomed
                ? {
                    transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(2)`,
                  }
                : undefined
            }
            onClick={handleImageClick}
            onMouseDown={handleImageMouseDown}
            onContextMenu={handleContextMenu}
            draggable={false}
          />
        )}
        {media.caption ? (
          <figcaption className="media-lightbox__caption">{media.caption}</figcaption>
        ) : null}
      </div>
    </div>
  )
}
