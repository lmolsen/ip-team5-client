import { BrowserRouter, Routes, Route } from "react-router-dom";
import OasPage from "./pages/OasPage/OasPage";
import OgfPage from "./pages/OgfPage/OgfPage";
import "./App.scss";
import Widget from "./components/Widget/Widget";

function App() {
  return (
    <BrowserRouter>
      <Widget />
      <Routes>
        <Route path="/oas/:persona" element={<OasPage />}></Route>
        <Route path="/ogf/:persona" element={<OgfPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
