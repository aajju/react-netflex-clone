import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React from "react";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";

// Router>
// Routes>
// Route path="/" element={Home />} />
// Routes>
// Router>
// );

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="tv" element={<Tv />}></Route>
        <Route path="search" element={<Search />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
