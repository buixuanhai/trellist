import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeProvider } from '@mui/material/styles';
import RepoList from './components/Repos/RepoList';
import { SWRConfig } from 'swr';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { createTheme } from '@mui/material/styles';
import AppContainer from './components/AppContainer';
import RepoDetailContainer from './components/Repos/RepoDetailContainer';

const theme = createTheme();

function App() {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        fetcher: (resource, init) =>
          fetch(resource, init).then(res => res.json())
      }}
    >
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: { backgroundColor: 'rgb(231, 235, 240)' }
          }}
        />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppContainer />}>
              <Route index element={<RepoList />} />
              <Route path="repo/:repoId" element={<RepoDetailContainer />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </SWRConfig>
  );
}

export default App;
