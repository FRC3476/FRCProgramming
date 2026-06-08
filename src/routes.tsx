export const HOME_PATH = '/'
export const LEARN_PATH = '/learn'
export const CODEBASES_PATH = '/codebases'
export const CURRICULUM_PATH = '/curriculum'
export const TOOLS_PATH = '/tools'

export const APP_PATHS = [
  HOME_PATH,
  LEARN_PATH,
  CODEBASES_PATH,
  CURRICULUM_PATH,
  TOOLS_PATH,
] as const

export type AppPath = (typeof APP_PATHS)[number]

const VALID_PATHS = new Set<string>(APP_PATHS)

export const getAppPath = (pathname: string): AppPath =>
  VALID_PATHS.has(pathname) ? (pathname as AppPath) : HOME_PATH
