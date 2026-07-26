/// <reference types="vite/client" />

declare module 'remark-heading-id' {
  import type { Plugin } from 'unified'
  const remarkHeadingId: Plugin
  export default remarkHeadingId
}
