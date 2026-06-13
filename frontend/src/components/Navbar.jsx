import { useState } from "react";
import "../pages/dashboard.css";

function Navbar() {
  
  const [showProfile, setShowProfile] = useState(false);
  const name = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  return (
    <nav className="navbar">
      <div className="logo"
      onClick={() => setShowProfile(!showProfile)}>
        🤖 IT Helpdesk AI
      </div>
          {showProfile && (
        <div className="profile-dropdown">

          <p><strong>Name:</strong>{name}</p>
          <p><strong>Email:</strong> {email}</p>

          <hr />

          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("email");
              localStorage.removeItem("username")
              window.location.href = "/";
            }}
          >
            Logout
          </button>

        </div>
      )}
      <div className="nav-links">
        <a href="/dashboard">Dashboard</a>
        <a href="/tickets">My Tickets</a>  
        <a href="/ai-help">AI Help</a>
      </div>
    </nav>
  );
}

export default Navbar;