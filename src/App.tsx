import Home from "./pages/Home/Home";
import Form from "./pages/Form/Form";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter, Route, Routes } from "react-router";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees/createEmployee" element={<Form />} />
          <Route path="/employees/:id/editEmployee" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
