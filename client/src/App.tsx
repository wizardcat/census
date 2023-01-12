import { CssBaseline, Container, Box } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAppSelector } from './redux/hooks'
import I18nProvider from './providers/i18n'
import { Home } from './pages'

function App() {
  const curLocale = useAppSelector(state => {
    return state.locale
  })

  return (
    <I18nProvider locale={curLocale.locale}>
      <BrowserRouter>
        <CssBaseline />
        <div>
          <Box>
            <Container maxWidth="xl">
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </Container>
          </Box>
        </div>
      </BrowserRouter>
    </I18nProvider>
  )
}

export default App
