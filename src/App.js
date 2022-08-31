import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { useStateValue } from "./contexts/StateProvider";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <AnimatePresence>
      <div className="overflow-x-hidden">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <h1 className="text-4xl">Hello, {user && user?.displayName}</h1>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
}

export default App;
