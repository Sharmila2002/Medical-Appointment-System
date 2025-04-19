const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const sequelize = new Sequelize("appointmentdb", "shoot", "shoot", {
  host: "localhost",
  dialect: "mysql",
});

// Models
const Patient = sequelize.define("Patient", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
});

const Doctor = sequelize.define("Doctor", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
});

const Appointment = sequelize.define("Appointment", {
  appointmentDate: DataTypes.DATE,
  patientId: DataTypes.INTEGER,
  doctorId: DataTypes.INTEGER,
});

// Associations
Appointment.belongsTo(Patient, { foreignKey: "patientId" });
Appointment.belongsTo(Doctor, { foreignKey: "doctorId" });

// Sync DB
sequelize.sync();

// Auth & CRUD APIs
app.post("/api/patient/register", async (req, res) => {
  const user = await Patient.create(req.body);
  res.json(user);
});

app.post("/api/patient/login", async (req, res) => {
  const user = await Patient.findOne({ where: req.body });
  user ? res.json(user) : res.status(401).json({ error: "Invalid credentials" });
});

app.post("/api/doctor/register", async (req, res) => {
  const doc = await Doctor.create(req.body);
  res.json(doc);
});

app.post("/api/doctor/login", async (req, res) => {
  const doc = await Doctor.findOne({ where: req.body });
  doc ? res.json(doc) : res.status(401).json({ error: "Invalid credentials" });
});

app.get("/api/doctors", async (req, res) => {
  const docs = await Doctor.findAll();
  res.json(docs);
});

app.post("/api/appointment", async (req, res) => {
  const appt = await Appointment.create(req.body);
  res.json(appt);
});

app.get("/api/appointments/:id", async (req, res) => {
  const appts = await Appointment.findAll({
    where: { patientId: req.params.id },
    include: [Doctor],
  });
  res.json(appts);
});

app.get("/api/admin/appointments", async (req, res) => {
  const appts = await Appointment.findAll({ include: [Doctor, Patient] });
  res.json(appts);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

