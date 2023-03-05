import { TokenCategory } from '../enums/tokenCategory.enum'

export const setAccTokenLocalStorage = (accToken: string): void => {
  window.localStorage.setItem(TokenCategory.ACCESS, accToken)
}

export const getAccTokenLocalStorage = (): string | null => {
  return window.localStorage.getItem(TokenCategory.ACCESS)
}

export const setRefTokenLocalStorage = (refToken: string): void => {
  window.localStorage.setItem(TokenCategory.REFRESH, refToken)
}

export const getRefTokenLocalStorage = (): string | null => {
  return window.localStorage.getItem(TokenCategory.REFRESH)
}

export const clearTokensLocalStorage = (): void => {
  window.localStorage.removeItem(TokenCategory.ACCESS)
  window.localStorage.removeItem(TokenCategory.REFRESH)
}
