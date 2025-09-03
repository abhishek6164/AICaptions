import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";

function App() {
  return (
    <Router>
      <nav className="flex justify-center gap-6 p-4 bg-indigo-600 text-white shadow">
        <Link to="/register" className="hover:underline">Register</Link>
        <Link to="/login" className="hover:underline">Login</Link>
      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
