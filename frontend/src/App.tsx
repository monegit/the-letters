import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import ReadInfo from "./pages/read/Info";
// import InfoForm from "./pages/read/Info";
import Read from "./pages/read/Read";
import WriteInfo from "./pages/write/Info";
// import WriteInfo from "./pages/write/Info";
import Write from "./pages/write/Write";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/writeInfo" element={<WriteInfo />} />
        <Route path="/readInfo" element={<ReadInfo />} />
        <Route path="/write" element={<Write />} />
        <Route path="/read" element={<Read />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
