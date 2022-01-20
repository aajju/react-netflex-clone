import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React from "react";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Components/Header";

// Router>
// Routes>
// Route path="/" element={Home />} />
// Routes>
// Router>
// );

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/tv" element={<Tv />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
