import { Routes, Route } from 'react-router-dom'
import { AdminLayout } from '../layouts/admin/AdminLayout'
import { ClientLayout } from '../layouts/client/ClientLayout'
import { BlogAdminPage } from '../pages/admin/BlogAdminPage'
import { CoursesAdminPage } from '../pages/admin/CoursesAdminPage'
import { AuthAdminPage } from '../pages/admin/AuthAdminPage'
import { UsersAdminPage } from '../pages/admin/UsersAdminPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { BlogDetailPage } from '../pages/web/BlogDetailPage'
import { BlogPage } from '../pages/web/BlogPage'
import { ContactPage } from '../pages/web/ContactPage'
import { CoursesPage } from '../pages/web/CoursesPage'
import { HomePage } from '../pages/web/HomePage'
import { ProtectedRoute } from '../components/protected/ProtectedRoute'
import { useAuthContext } from '../hooks/context/useAuthContext'
import { UserRole } from '../enums/userRole.enum'
import { useRecoverLogin } from '../hooks/useRecoverLogin'
import { BackdropLoading } from '../components/loading/BackdropLoading'
import { MenuAdminPage } from '../pages/admin/MenuAdminPage'
import { UserLayout } from '../layouts/user/UserLayout'
import { AuthUserPage } from '../pages/user/AuthUserPage'
import { ProfileUserPage } from '../pages/user/ProfileUserPage'
import { BlogUserPage } from '../pages/user/BlogUserPage'
import { NewsletterAdminPage } from '../pages/admin/NewsletterAdminPage'

export function AppRoute (): JSX.Element {
  const { loggedUser } = useAuthContext()
  const { isRecovering } = useRecoverLogin()

  if (isRecovering) return <BackdropLoading open={true} />

  return (
    <Routes>
      {/* CLIENT ROUTES */}
      <Route path='/' element={<ClientLayout />} >
        <Route index element={<HomePage />} />
        <Route path='courses' element={<CoursesPage />} />
        <Route path='contact' element={<ContactPage />} />
        <Route path='blog' element={<BlogPage />} />
        <Route path='blog/:path' element={<BlogDetailPage />} />
      </Route>

      {/* USER ROUTES */}
      <Route element={<ProtectedRoute redirectTo={'/user/auth'} isAllowed={loggedUser != null} />} >
        <Route path='/me' element={<UserLayout />} >
          <Route index element={<p>Bienvenido, desde aqui puedes gestionar tu perfil</p>} />
          <Route path='profile' element={<ProfileUserPage />} />
          <Route path='blog' element={<BlogUserPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute redirectTo={'/'} isAllowed={loggedUser == null} />} >
        <Route path='/user/auth' element={<AuthUserPage />} />
      </Route>

      {/* ADMIN ROUTES */}
      <Route element={<ProtectedRoute redirectTo={loggedUser != null && loggedUser.role !== UserRole.ADMIN ? '/' : '/admin/auth'} isAllowed={loggedUser != null && loggedUser.role === UserRole.ADMIN} />} >
        <Route path='/admin' element={<AdminLayout />} >
          <Route index element={<p>Bienvenido, desde aqui puedes gestionar la aplicacion</p>} />
          <Route path='users' element={<UsersAdminPage />} />
          <Route path='menu' element={<MenuAdminPage />} />
          <Route path='courses' element={<CoursesAdminPage />} />
          <Route path='blog' element={<BlogAdminPage />} />
          <Route path='newsletter' element={<NewsletterAdminPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute redirectTo={loggedUser != null && loggedUser.role !== UserRole.ADMIN ? '/' : '/admin'} isAllowed={loggedUser == null} />} >
        <Route path='/admin/auth' element={<AuthAdminPage />} />
      </Route>

      {/* 404 NOT FOUND */}
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}
