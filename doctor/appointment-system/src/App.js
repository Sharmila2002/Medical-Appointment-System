import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientRegister from "./pages/PatientRegister";
import PatientLogin from "./pages/PatientLogin";
import DoctorRegister from "./pages/DoctorRegister";
import DoctorLogin from "./pages/DoctorLogin";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import Navbar from "./components/Navbar";
import WelcomeSection from "./components/WelcomeSection";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<WelcomeSection />} />
        <Route path="/patient/register" element={<PatientRegister />} />
        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="/doctor/register" element={<DoctorRegister />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
