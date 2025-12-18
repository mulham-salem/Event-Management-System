import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Events } from "./pages/Events";
import { Venues } from "./pages/Venues";
import { Hosts } from "./pages/Hosts";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/client" element={<Signup role="client" />} />
          <Route path="/signup/provider" element={<Signup role="provider" />} />
          <Route path="/signup/organizer" element={<Signup role="organizer" />} />

          <Route path="/events" element={<Events />} />
          <Route path="/venues" element={<Venues />} />

          <Route path="/providers" element={<Hosts role="provider" />} />
          <Route path="/organizers" element={<Hosts role="organizer" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
