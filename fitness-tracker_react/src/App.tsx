import MainPage from "./components/MainPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainPage />} path="static" />
        <Route element={<MainPage />} index />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
