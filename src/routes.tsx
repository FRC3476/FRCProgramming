export const HOME_PATH = '/'
export const LEARN_PATH = '/learn'

export type AppPath = typeof HOME_PATH | typeof LEARN_PATH

export const getAppPath = (pathname: string): AppPath => {
  return pathname === LEARN_PATH ? LEARN_PATH : HOME_PATH
}
