import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import {Home} from "./pages/Home";
import {Login} from "./pages/Login";
import {Signup} from "./pages/Signup";
import {Events} from "./pages/Events";
import {Venues} from "./pages/Venues";
import {Hosts} from "./pages/Hosts";
import {ClientDashboard} from "./pages/ClientDashboard";
import {Bookings} from "./pages/Bookings";
import {Registrations} from "./pages/Registrations";
import {PrivateRoute} from "./components/common/PrivateRoute";
import {PublicLayout} from "./layouts/PublicLayout";
import {DashboardLayout} from "./layouts/DashboardLayout";

function App() {
    return (
        <>
            <Toaster position="top-right" toastOptions={{duration: 4000}} />
            <Router>
                <Routes>
                    {/* ===== PUBLIC ROUTES ===== */}
                    <Route element={<PublicLayout/>}>
                        <Route path="/" element={<Home/>} />
                        <Route path="/events" element={<Events/>} />
                        <Route path="/venues" element={<Venues/>} />
                        <Route path="/providers" element={<Hosts key="provider" role="provider" />}/>
                        <Route path="/organizers" element={<Hosts key="organizer" role="organizer" />}/>
                    </Route>

                    {/* ===== AUTH ===== */}
                    <Route path="/login" element={<Login/>} />

                    <Route path="/signup" element={<Signup/>} />
                    <Route path="/signup/client" element={<Signup role="client"/>} />
                    <Route path="/signup/provider" element={<Signup role="provider"/>} />
                    <Route path="/signup/organizer" element={<Signup role="organizer"/>} />

                    {/* ===== CLIENT DASHBOARD ===== */}
                    <Route element={<PrivateRoute requiredRole="client"/>}>
                        <Route element={<DashboardLayout/>}>
                            <Route path="/client/dashboard" element={<ClientDashboard/>} />
                            <Route path="/client/events" element={<Events showHero={false}/>} />
                            <Route path="/client/registrations" element={<Registrations />} />
                            <Route path="/client/venues" element={<Venues showHero={false}/>} />
                            <Route path="/client/bookings" element={<Bookings />} />
                            <Route path="/client/providers" element={<Hosts role="provider"/>} />
                            <Route path="/client/organizers" element={<Hosts role="organizer"/>} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
