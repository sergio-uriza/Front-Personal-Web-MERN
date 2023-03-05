import { Navigate, Outlet } from 'react-router-dom'

type PropsType = {
  isAllowed: boolean
  children?: JSX.Element
  redirectTo?: string
}

export function ProtectedRoute ({
  isAllowed,
  children,
  redirectTo = '/'
}: PropsType): JSX.Element {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />
  }

  return children != null ? children : <Outlet />
}
