import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home.js';
import Assistant from './pages/Assistant.js';
import SignIn from './sign-in/[[...sign-in]]/page.js';  
import SignUp from './sign-up/[[...sign-up]]/page.js'; 
import { createTheme, ThemeProvider } from '@mui/material/styles';


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

  return (
      <ThemeProvider theme={THEME}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/sign-in" element={<SignIn />} /> 
            <Route path="/sign-up" element={<SignUp />} /> 
          </Routes>
        </Router>
      </ThemeProvider>
  );
}

export default App;
