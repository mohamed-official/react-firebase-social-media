import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { useStateValue } from "./contexts/StateProvider";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <AnimatePresence>
      <div className="overflow-x-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
}

export default App;
