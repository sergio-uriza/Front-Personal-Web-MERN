import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { AppRoute } from './routes/AppRoute'
import { AuthContextProvider } from './contexts/AuthContextProvider'
import { ScrollToTop } from './components/shared/ScrollToTop'

function App (): JSX.Element {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppRoute />
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App
