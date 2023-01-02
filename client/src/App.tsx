import { CssBaseline, Container, Box } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages'

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <div>
        <Box
          sx={{
            backgroundColor: theme => theme.palette.grey[100],
          }}
        >
          <Container maxWidth="xl">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Container>
        </Box>
      </div>
    </BrowserRouter>
  )
}

export default App
