import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home.js';
import Assistant from './pages/Assistant.js';
import SignIn from './pages/[[...sign-in]]/SignIn.js';  
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ClerkProvider } from "@clerk/nextjs";

const THEME = createTheme({
  typography: {
    fontSize: 16,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    fontFamily: [
      'DM Serif Text',
      'serif',
    ].join(','),
  },
});

function App() {

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading spinner, etc.
  }

  return (
    <ClerkProvider>
      <ThemeProvider theme={THEME}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/sign-in/*" element={<SignIn />} /> 
          </Routes>
        </Router>
      </ThemeProvider>
    </ClerkProvider>
  );
}

export default App;
