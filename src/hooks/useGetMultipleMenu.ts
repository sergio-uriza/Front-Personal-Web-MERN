import { useEffect, useState } from 'react'
import { getMultipleMenu } from '../services/menuService'
import { MenuTypeAPI } from '../services/types'

type UseGetMultipleMenuType = {
  menusList: MenuTypeAPI[] | null
}

export const useGetMultipleMenu = (isMenuActive: boolean, newGet?: boolean): UseGetMultipleMenuType => {
  const [menusList, setMenusList] = useState<MenuTypeAPI[] | null>(null)

  useEffect(() => {
    setMenusList(null)
    getMultipleMenu(isMenuActive)
      .then((res) => {
        setMenusList(res)
      })
      .catch((_err) => {
        setMenusList([])
      })
  }, [isMenuActive, newGet])

  return {
    menusList
  }
}
