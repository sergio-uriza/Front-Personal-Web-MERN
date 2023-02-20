import { Navigate, Outlet } from 'react-router-dom'

interface Props {
  children?: JSX.Element
  redirectTo?: string
}

export default function ProtectedRoute ({ children, redirectTo = '/' }: Props): JSX.Element {
  const isLoggedIn = true
  if (isLoggedIn == null) {
    return <Navigate to={redirectTo} replace />
  }

  return (children != null) ? children : <Outlet/>
}
