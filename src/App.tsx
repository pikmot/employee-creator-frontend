import Home from "./pages/Home/Home";
import Form from "./pages/Form/Form";

import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees/createEmployee" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
