import { AnimatePresence } from "framer-motion";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import { AuthProvider } from "./contexts/AuthContext";
import CardPull from "./pages/CardPull";
import Dashboard from "./pages/Dashboard";
import Encyclopedia from "./pages/Encyclopedia";
import Events from "./pages/Events";
import Friends from "./pages/Friends";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/encyclopedia" element={<Encyclopedia />} />
            <Route path="/card-pull" element={<CardPull />} />
            <Route path="/events" element={<Events />} />
            <Route path="/friends" element={<Friends />} />
          </Routes>
        </AnimatePresence>
      </AuthProvider>
    </Router>
  );
}

export default App;
