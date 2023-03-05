import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { AppRoute } from './routes/AppRoute'
import { AuthContextProvider } from './contexts/AuthContextProvider'

function App (): JSX.Element {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App
