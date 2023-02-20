import { Outlet } from 'react-router-dom'

interface Props {
  children?: JSX.Element
}

export default function ClientLayout ({ children }: Props): JSX.Element {
  return (
    <>
      <h2>Se renderiza Layout client</h2>
      { (children != null) ? children : <Outlet/> }
    </>
  )
}
