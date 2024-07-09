import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";

function App(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="" element={<Home />} />
          <Route path="new" element={<New />} />
          {/* <Route path="new">
            <Route></Route>
          </Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
