const assets = import.meta.glob<string>('../assets/**/*', {
  eager: true,
  query: '?url',
  import: 'default',
})

function normalizeAssetPath(src: string): string | null {
  if (src.startsWith('../assets/')) {
    return src
  }

  if (src.startsWith('/assets/')) {
    return `..${src}`
  }

  if (src.startsWith('assets/')) {
    return `../${src}`
  }

  return null
}

export function resolveAssetUrl(src: string): string {
  const normalized = normalizeAssetPath(src)
  if (!normalized) return src

  const match = Object.entries(assets).find(([path]) => path === normalized)
  return match?.[1] ?? src
}

export function isBundledAsset(src: string): boolean {
  const normalized = normalizeAssetPath(src)
  if (!normalized) return false
  return Object.keys(assets).includes(normalized)
}
