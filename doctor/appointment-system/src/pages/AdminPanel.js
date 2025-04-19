import { useEffect, useState } from "react";
import axios from "axios";

function AdminPanel() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const res = await axios.get("http://localhost:5000/api/admin/appointments");
      setAppointments(res.data);
    };
    fetchAll();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">All Appointments</h2>

        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Date</th>
                <th>Patient</th>
                <th>Doctor</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((a, i) => (
                  <tr key={i}>
                    <td>{new Date(a.appointmentDate).toDateString()}</td>
                    <td>{a.Patient.name}</td>
                    <td>Dr. {a.Doctor.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
