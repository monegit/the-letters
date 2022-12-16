import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import WriteInfo from "./pages/Write/Info";
import Write from "./pages/Write/Write";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/write" element={<WriteInfo />} />
        <Route path="/write/:name" element={<Write />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
