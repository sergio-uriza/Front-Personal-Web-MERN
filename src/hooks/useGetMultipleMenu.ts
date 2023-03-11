import { useEffect, useState } from 'react'
import { getMultipleMenu } from '../services/menuService'
import { MenuTypeAPI } from '../services/types'

type UseGetMultipleMenuType = {
  listMenus: MenuTypeAPI[] | null
}

export const useGetMultipleMenu = (isMenuActive: boolean, newGet?: boolean): UseGetMultipleMenuType => {
  const [listMenus, setListMenus] = useState<MenuTypeAPI[] | null>(null)

  useEffect(() => {
    setListMenus(null)
    getMultipleMenu(isMenuActive)
      .then((res) => {
        setListMenus(res)
      })
      .catch((_err) => {
        setListMenus([])
      })
  }, [isMenuActive, newGet])

  return {
    listMenus
  }
}
