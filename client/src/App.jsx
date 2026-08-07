import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import BMI from "./pages/BMI";
import Dosha from "./pages/Dosha";
import Dashboard from "./pages/Dashboard";
import AIChat from "./pages/AIChat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/bmi" element={<BMI />} />
        <Route path="/dosha" element={<Dosha />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/aichat" element={<AIChat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;