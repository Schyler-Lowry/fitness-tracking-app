import Page from "./components/page";
import Page2 from "./components/Page2";
import Page3 from "./components/Page3";
import MyModal, { Lorem, ModalUi, useModalContext } from "./components/Modal";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthenticationProvider } from "./context/AuthenticationContext";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<Page3 />} path="static" /> */}
        <Route element={<Page3 />} index />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
