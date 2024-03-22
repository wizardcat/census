import { Box, Container, CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages';
import I18nProvider from './providers/i18n';
import { useAppSelector } from './redux/hooks';

function App() {
  const locale = useAppSelector((state) => {
    return state.locale;
  });

  return (
    <I18nProvider locale={locale.currentLocale}>
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
  );
}

export default App;
