import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddEditClient from "./pages/AddEditClient";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddEditClient />} />
        <Route path="/edit/:id" element={<AddEditClient />} />
      </Routes>
    </Router>
  );
}

export default App;
