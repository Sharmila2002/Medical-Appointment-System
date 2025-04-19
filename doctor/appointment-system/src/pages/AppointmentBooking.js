import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function AppointmentBooking() {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchDoctors = async () => {
      const res = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(res.data);
      setSelectedDoctor(res.data[0]?.id || "");
    };
    fetchDoctors();
  }, []);

  const handleBooking = async () => {
    try {
      await axios.post("http://localhost:5000/api/appointment", {
        appointmentDate: selectedDateTime,
        patientId: user.id,
        doctorId: selectedDoctor,
      });
      alert("✅ Appointment booked successfully!");
    } catch (error) {
      alert("❌ Failed to book appointment.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h4 className="text-center mb-4">Book an Appointment</h4>

        {/* Doctor Selection */}
        <div className="mb-3">
          <label className="form-label">Select Doctor</label>
          <select
            className="form-select"
            onChange={(e) => setSelectedDoctor(e.target.value)}
            value={selectedDoctor}
          >
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                Dr. {doc.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date and Time Picker */}
        <div className="mb-3">
          <label className="form-label">Select Date & Time</label>
          <DatePicker
            selected={selectedDateTime}
            onChange={(date) => setSelectedDateTime(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="yyyy-MM-dd h:mm aa"
            minDate={new Date()}
            className="form-control"
            placeholderText="Select date and time"
          />
        </div>

        {/* Submit Button */}
        <button className="btn btn-primary w-100" onClick={handleBooking}>
          Book Appointment
        </button>
      </div>
    </div>
  );
}

export default AppointmentBooking;
