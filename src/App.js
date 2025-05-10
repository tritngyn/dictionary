import './App.css';
import SearchBar from './Component/SearchBar.js';


import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, IconButton } from '@mui/material';

import React, {useState} from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  
} from "react-router-dom";
import NAV from './NAV/NAV.js';
import './NAV/NAV.css'

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({
    palette: { mode: darkMode ? 'dark' : 'light' },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <BrowserRouter> 
      <NAV darkMode = {darkMode} setDarkMode={setDarkMode}/>
      <Routes>
        <Route path="/" element={<SearchBar />} />
        <Route path="/user" element={<div>User Page</div>} />
      </Routes>
      
    </BrowserRouter>
    </ThemeProvider>
  );
 
    
   
  
}

export default App;
