import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React from "react";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Components/Header";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/tv" element={<Tv />}>
          {/* <Route path=":contentId" element={<Tv />} /> */}
        </Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/" element={<Home />}>
          {/* <Route path="/movie/:contentId" element={<Home />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
