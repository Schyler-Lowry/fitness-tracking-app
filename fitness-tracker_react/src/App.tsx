import MainPage from "./components/MainPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ColorsProvider } from "./context/ColorsContext";
import AppLayout from "./components/AppLayout";
import GraphPage from "./components/GraphPage";

function App() {
  return (
    <BrowserRouter>
      <ColorsProvider>
        <Routes>
          {/* <Route element={<MainPage />} index /> */}
          <Route element={<AppLayout />}>
            <Route element={<MainPage />} index />
            <Route element={<GraphPage />} path="graph" />
          </Route>
          {/* <Route element={<MainPage />} path="static" /> */}
          {/* <Route element={<AppLayout />} path="static">
            <Route element={<MainPage />} index />
            <Route element={<GraphPage />} path="graph" />
          </Route> */}
        </Routes>
      </ColorsProvider>
    </BrowserRouter>
  );
}

export default App;
