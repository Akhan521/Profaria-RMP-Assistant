import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home.js'
import Assistant from './pages/Assistant.js'

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/assistant" element={<Assistant />} />
        </Routes>
    </Router>
  );
}

export default App;