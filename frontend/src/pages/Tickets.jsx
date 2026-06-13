import { useEffect, useState } from "react";
import API from "../services/api";
import "./dashboard.css";


function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");

      API.get(`api/tickets/user/${email}`)
          .then((res) => {
              setTickets(res.data);
          })
          .catch((err) => {
              console.error(err); 
          });
  }, []);
  
  return (
    <div
      className="tickets-container">
      <div className="header">
      <h2
          className="text-center mb-4"
          style={{
            fontWeight: "700",
            color: "#e0e2e9"
          }}
      >
        🎫 Ticket Management
      </h2>
      <p className=" subtitle" >
        Manage your support tickets efficiently.
      </p>
      </div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search Ticket..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="ticket-search"
        />
      </div>
     <table className="ticket-table table-hover align-middle"
            style={{fontSize: "14px",}}>
        <thead style={{ backgroundColor: "#2563eb", color: "#fff" }}>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tickets
              .filter(
                (ticket) =>
                  ticket.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
              )
              .map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.title}</td>
              <td>{ticket.category}</td>
              <td>
                  <span
                      className={
                          ticket.status === "RESOLVED"
                          ? "resolved"
                          : "open"
                      }
                  >
                      {ticket.status}
                  </span>
              </td>
              <td>
                <span className={`priority-${ticket.priority?.toLowerCase()}`}>
                  {ticket.priority}
                </span>
              </td>
              <td className="actions-buttons">
                {ticket.status !== "RESOLVED" && (
                  <button
                      className="resolve-btn"
                      onClick={() =>
                          API.put(`api/tickets/resolve/${ticket.id}`)
                              .then(() => window.location.reload())
                              .catch((err) => console.error(err))
                      }
                  >
                      Resolve
                  </button>
                )}
                  <button className="delete-btn" 
                          onClick={() => {
                              API.delete(`api/tickets/delete/${ticket.id}`)
                                  .then(() => window.location.reload());
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
  );
}

export default Tickets;