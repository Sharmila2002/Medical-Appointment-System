import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">HealthCareApp</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/patient/register">Patient Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/patient/login">Patient Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/doctor/register">Dr.Enroll</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin">View</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
