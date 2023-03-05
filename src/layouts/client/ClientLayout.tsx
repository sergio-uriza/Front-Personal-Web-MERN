import { Outlet } from 'react-router-dom'

type PropsType = {
  children?: JSX.Element
}

export function ClientLayout ({ children }: PropsType): JSX.Element {
  return (
    <>
      <h2>Se renderiza Layout client</h2>
      { (children != null) ? children : <Outlet/> }
    </>
  )
}
