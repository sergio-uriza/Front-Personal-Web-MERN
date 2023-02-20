import { Outlet } from 'react-router-dom'

interface Props {
  children?: JSX.Element
}

export default function AdminLayout ({ children }: Props): JSX.Element {
  return (
    <>
      <h2>Se renderiza Layout admin</h2>
      { (children != null) ? children : <Outlet/> }
    </>
  )
}
