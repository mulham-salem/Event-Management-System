import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { PrivateRoute } from "./components/common/PrivateRoute";
import { PublicLayout } from "./layouts/PublicLayout";
import { Home } from "./pages/visitor/Home";
import { Login } from "./pages/visitor/Login";
import { Signup } from "./pages/visitor/Signup";
import { Events } from "./pages/common/Events";
import { Venues } from "./pages/common/Venues";
import { Hosts } from "./pages//common/Hosts";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { ClientDashboard } from "./pages/client/ClientDashboard";
import { Bookings } from "./pages/client/Bookings";
import { Registrations } from "./pages/client/Registrations";
import { Ratings } from "./pages/client/Ratings";
import { ProviderDashboard } from "./pages/provider/ProviderDashboard";
import { VenuesManage } from "./pages/provider/VenuesManage";
import { VenuesArchive } from "./pages/provider/VenuesArchive";
import { BookingsManage } from "./pages/provider/BookingsManage";

function App() {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <Router>
        <Routes>

          {/* ===== PUBLIC ROUTES ===== */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/venues" element={<Venues />} />
            <Route path="/providers" element={<Hosts key="provider" role="provider" />} />
            <Route path="/organizers" element={<Hosts key="organizer" role="organizer" />} />
          </Route>

          {/* ===== AUTH ===== */}
          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/client" element={<Signup role="client" />} />
          <Route path="/signup/provider" element={<Signup role="provider" />} />
          <Route path="/signup/organizer" element={<Signup role="organizer" />} />

          {/* ===== CLIENT DASHBOARD ===== */}
          <Route element={<PrivateRoute requiredRole="client" />}>
            <Route element={<DashboardLayout />}>
              <Route path="/client/dashboard" element={<ClientDashboard />} />
              <Route path="/client/events" element={<Events showHero={false} />} />
              <Route path="/client/registrations" element={<Registrations />} />
              <Route path="/client/venues" element={<Venues showHero={false} />} />
              <Route path="/client/bookings" element={<Bookings />} />
              <Route path="/client/event-ratings" element={<Ratings key="event" type="event" />} />
              <Route path="/client/venue-ratings" element={<Ratings key="venue" type="venue" />} />
              <Route path="/client/providers" element={<Hosts key="provider" role="provider" />} />
              <Route path="/client/organizers" element={<Hosts key="organizer" role="organizer" />} />
            </Route>
          </Route>

          {/* ===== PROVIDER DASHBOARD ===== */}
          <Route element={<PrivateRoute requiredRole="provider" />}>
            <Route element={<DashboardLayout />}>
              <Route path="/provider/dashboard" element={<ProviderDashboard />} />
              <Route path="/provider/my-venues" element={<VenuesManage />} />
              <Route path="/provider/archived-venues" element={<VenuesArchive />} />
              <Route path="/provider/bookings" element={<BookingsManage />} />
            </Route>
          </Route>

        </Routes>
      </Router>
    </>
  );
}

export default App;
