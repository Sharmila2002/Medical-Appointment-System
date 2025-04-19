import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PatientLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/patient/login", form);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/profile");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Patient Login</h2>
      <form onSubmit={handleLogin} className="w-50 mx-auto">
        <div className="mb-3">
          <input className="form-control" placeholder="Email" type="email" onChange={e => setForm({ ...form, email: e.target.value })} required />
        </div>
        <div className="mb-3">
          <input className="form-control" placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} required />
        </div>
        <button className="btn btn-success w-100" type="submit">Login</button>
      </form>
    </div>
  );
}

export default PatientLogin;
