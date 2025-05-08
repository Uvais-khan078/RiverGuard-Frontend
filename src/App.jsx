import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Map from "./components/Map"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/test" element={<Map />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/adminpage" element={<AdminPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
