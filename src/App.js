import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { useStateValue } from "./contexts/StateProvider";
import Signup from "./pages/Signup";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <AnimatePresence>
      <>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <h1 className="text-4xl">Hello, {user && user?.displayName}</h1>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<h1 className="text-4xl">Login</h1>} />
        </Routes>
      </>
    </AnimatePresence>
  );
}

export default App;
