import { Routes, Route } from 'react-router-dom'
import AdminLayout from '../layouts/admin/AdminLayout'
import ClientLayout from '../layouts/client/ClientLayout'
import BlogAdminPage from '../pages/admin/BlogAdminPage'
import CoursesAdminPage from '../pages/admin/CoursesAdminPage'
import AuthAdminPage from '../pages/admin/AuthAdminPage'
import UsersAdminPage from '../pages/admin/UsersAdminPage'
import NotFoundPage from '../pages/NotFoundPage'
import BlogDetailPage from '../pages/web/BlogDetailPage'
import BlogPage from '../pages/web/BlogPage'
import ContactPage from '../pages/web/ContactPage'
import CoursesPage from '../pages/web/CoursesPage'
import HomePage from '../pages/web/HomePage'
import ProtectedRoute from '../utils/ProtectedRoute'

export default function AppRoute (): JSX.Element {
  return (
    <Routes>
      {/* ADMIN ROUTES */}
      <Route element={<ProtectedRoute redirectTo='/admin' />} >
        <Route element={<AdminLayout />} >
          <Route path='/admin/users' element={<UsersAdminPage />} />
          <Route path='/admin/courses' element={<CoursesAdminPage />} />
          <Route path='/admin/menu' element={<BlogAdminPage />} />
          <Route path='/admin/blog' element={<BlogAdminPage />} />
        </Route>
      </Route>

        <Route path='/admin' element={<AuthAdminPage />} />

      {/* CLIENT ROUTES */}
      <Route element={<ClientLayout />} >
        <Route path='/' element={<HomePage />} />
        <Route path='/courses' element={<CoursesPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/blog' element={<BlogPage />} />
        <Route path='/blog/:path' element={<BlogDetailPage />} />
      </Route>

      {/* 404 NOT FOUND */}
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}
