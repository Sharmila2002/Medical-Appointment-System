import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PatientRegister() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/patient/register", form);
    alert("Registered successfully!");
    navigate("/patient/login");
  };

  return (
    <div className="container mt-4">
      <h2>Patient Register</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <input className="form-control" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div className="mb-3">
          <input className="form-control" placeholder="Email" type="email" onChange={e => setForm({ ...form, email: e.target.value })} required />
        </div>
        <div className="mb-3">
          <input className="form-control" placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} required />
        </div>
        <button className="btn btn-primary w-100" type="submit">Register</button>
      </form>
    </div>
  );
}

export default PatientRegister;
