import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "./dashboard.css";

function Dashboard() {

  console.log("DASHBOARD LOADED")
    const [stats, setStats] = useState({
        totalTickets: 0,
        openTickets: 0,
        resolvedTickets: 0,
        aiSessions: 0
    }); 
    
    const [tickets, setTickets] = useState([]);
    const [aiSessions, setAiSessions] = useState([]);
    const [selectedResponse, setSelectedResponse] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const email = localStorage.getItem("email");
    console.log("CURRENT USER =", email)
    useEffect(() => {

        /*API.get("/api/auth/profile")
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
        /*API.get("/dashboard")
            .then((res) => {
                setStats(res.data);
            })
            .catch((err) => {
                console.log(err);
            });*/
            API.get(`/api/tickets/user/${email}`)
            .then((res) => {

              console.log("FULL RESPONSE:", res);
              console.log("DATA:", res.data);

              setTickets(res.data);

             const totalTickets = res.data.length;

              const openTickets = res.data.filter(
                ticket => ticket.status?.toLowerCase() === "open"
              ).length;

              const resolvedTickets = res.data.filter(
                ticket => ticket.status?.toLowerCase() === "resolved"
              ).length;

              console.log("Tickets:", res.data);
              console.log("Total:", totalTickets);
              console.log("Open:", openTickets);
              console.log("Resolved:", resolvedTickets);

              setStats(prevStats => ({
                ...prevStats,
                totalTickets,
                openTickets,
                resolvedTickets,
              }));

            })
            .catch(err => {
              console.error("ERROR:", err);
            });
            console.log("LOCAL STORAGE EMAIL =", localStorage.getItem("email"));
            console.log("Fetching AI sessions for:", email);
            API.get(`/api/ai/sessions/${email}`)
            .then((res) => {
                setAiSessions(res.data);
                setStats(prevStats => ({
                    ...prevStats,
                    aiSessions: res.data.length,
                }));
            })
            .catch((err) => {
                console.error(err);
            });

    }, []);
     
    const deleteSession = async (id) => {
        try {
            await API.delete(`/api/ai/sessions/${id}`);

            setAiSessions(prev =>
                aiSessions.filter(session => session.id !== id)
            );

            alert("Session deleted successfully");
        } catch (error) {
            console.error(error);
            alert("Failed to delete session");
        }
    };
    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("username");

        window.location.href = "/";
    };

    return (
      <><Navbar />
      <div className="dashboard-container">
        <h1 className="dashboard-title">
          📊 Helpdesk AI Dashboard
        </h1>
        
        <div className="stats-cards">
          <div className="stat-card total-card">
            <h3>Total Tickets</h3>
            <h2>{stats.totalTickets}</h2>
          </div>

          <div className="stat-card open-card">
            <h3>Open Tickets</h3>
            <h2>{stats.openTickets}</h2>
          </div>

          <div className="stat-card resolved-card">
            <h3>Resolved Tickets</h3>
            <h2>{stats.resolvedTickets}</h2>
          </div>
          <div className="stat-card ai-card">
            <h3>AI Sessions</h3>
            <h2>{stats.aiSessions}</h2>
          </div>
          </div>

        <div className="recent-ticket-box">
            <h2>Recent Tickets</h2>

            <table className="recent-ticket-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {tickets.slice(0,5).map(ticket => (
                  <tr key={ticket.id}>
                    <td>{ticket.id}</td>
                    <td>{ticket.title}</td>
                    <td>
                      <span className={ticket.status === "OPEN" ? "open-badge" : "resolved-badge"}>
                        {ticket.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div style={{display: "flex",
            justifyContent:"center",
            gap:"20px",
            margin:"30px 0"
            }}>
            <a href="/create-ticket">
            <button className="dashboard-btn">
              ➕ Create Ticket
            </button>
           </a>

            <a href="/tickets">
              <button className="dashboard-btn">
                📋 View Tickets
              </button>
            </a>
          </div> 
            <div className="ai-sessions-container">

            <h2 className="ai-sessions-title">
              AI Sessions
            </h2>

            <table className="ai-sessions-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Issue</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {aiSessions.map((session) => (
                  <tr key={session.id}>

                    <td>{session.id}</td>

                    <td className="issue-title">
                      {session.title}
                    </td>

                    <td>
                      <span
                        className={
                          session.status === "RESOLVED"
                            ? "ai-resolved"
                            : "ai-open"
                        }
                      >
                        {session.status}
                      </span>
                    </td>

                    <td className="session-date">
                      {session.createdDate}
                    </td>
                    
                    <td>
                     <button
                        className="view-btn"
                        onClick={() => {
                          setSelectedResponse(session.aiResponse);
                          setShowModal(true);
                        }}
                      >
                        View
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this session?")) {
                            deleteSession(session.id);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

          </table>

        </div>
        </div>
          <div style={{ textAlign: "center", marginTop: "30px" }}>
                
                {showModal && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h3 style={{color:"white"}}>AI Troubleshooting Response</h3>
                      <div className="session-response-box">
                      {selectedResponse
                        .split(/\d+\./)
                        .filter(step => step.trim())
                        .map((step, index) => (
                          <div key={index} className="step-card">
                            <h4>Step {index + 1}</h4>
                            <p>{step.trim()}</p>
                          </div>
                        ))}
                    </div>
                  <button
                    className="close-btn"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
        </div>
      </>
    );
}

export default Dashboard;