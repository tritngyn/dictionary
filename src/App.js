
import './App.css';
import SearchBar from './Component/Header.js';

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import NAV from './NAV/NAV.js';
import './NAV/NAV.css'

function App() {

  return (
    <>
    <BrowserRouter> 
      <NAV/>
      <Routes>
        <Route path="/" element={<SearchBar />} />
        <Route path="/user" element={<div>User Page</div>} />
      </Routes>
      
    </BrowserRouter>
   
    </>
  );
}

export default App;
