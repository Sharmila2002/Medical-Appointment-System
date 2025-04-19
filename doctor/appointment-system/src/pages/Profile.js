import AppointmentBooking from "./AppointmentBooking";
import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await axios.get(`http://localhost:5000/api/appointments/${user.id}`);
      setAppointments(res.data);
    };
    fetchAppointments();
  }, [user]);

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Welcome, {user?.name}</h2>
      <p><strong>Email:</strong> {user?.email}</p>
      <AppointmentBooking />

      <h3 className="mt-5">Your Appointments:</h3>
      <ul className="list-group">
        {appointments.map((a, i) => {
          const appointmentDate = new Date(a.appointmentDate);
          const formattedDate = appointmentDate.toLocaleDateString();
          const formattedTime = appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          return (
            <li key={i} className="list-group-item">
              📅 {formattedDate} 🕒 {formattedTime} with Dr. {a.Doctor.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Profile;
