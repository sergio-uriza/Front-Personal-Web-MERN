import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { AppRoute } from './routes/AppRoute'
import { AuthContextProvider } from './contexts/AuthContextProvider'
import { ScrollToTop } from './components/shared/ScrollToTop'
import { SnackbarProvider } from 'notistack'

function App (): JSX.Element {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <ScrollToTop />
        <SnackbarProvider
          maxSnack={1}
          autoHideDuration={2100}
          preventDuplicate
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          dense
        >
          <AppRoute />
        </SnackbarProvider>
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App
