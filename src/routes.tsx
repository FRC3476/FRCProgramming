export const HOME_PATH = '/'
export const LEARN_PATH = '/learn'
export const COMMUNITY_PATH = '/community'

export type AppPath = typeof HOME_PATH | typeof LEARN_PATH | typeof COMMUNITY_PATH

export const getAppPath = (pathname: string): AppPath => {
  return pathname === LEARN_PATH ? LEARN_PATH : HOME_PATH
}
