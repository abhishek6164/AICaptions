import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import UploadPost from "./components/pages/UploadPost";

function App() {
  const [user, setUser] = useState(null); // 👈 track login user

  return (
    <Router>
      <nav className="flex justify-center gap-6 p-4 bg-indigo-600 text-white shadow">
        {!user ? (
          <>
            <Link to="/register" className="hover:underline">Register</Link>
            <Link to="/login" className="hover:underline">Login</Link>
          </>
        ) : (
          <>
            <Link to="/upload" className="hover:underline">Upload Post</Link>
            <button
              onClick={() => setUser(null)}
              className="hover:underline text-red-300"
            >
              Logout
            </button>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route
          path="/upload"
          element={user ? <UploadPost /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
