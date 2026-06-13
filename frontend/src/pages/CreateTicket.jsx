import { useState } from "react";
import API from "../services/api";

function CreateTicket() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  
  const createTicket = async () => {

      if (
           !title.trim() ||
          !description.trim() ||
          !category.trim() ||
          !priority.trim()
      ) {
          alert("Please fill all fields");
          return;
      }

    try {
      await API.post("/api/tickets/create", {
        title,
        description,
        category,
        priority,
        email: localStorage.getItem("email")

      });

      alert("Ticket Created Successfully");
    } catch (err) {
      alert("Failed to create ticket");
    }
    setTitle("");
    setDescription("");
    setCategory("");
    setPriority("");
  };
  const email = localStorage.getItem("email")

return (
  <div className="create-support-page">
    <div className="create-support-box">

      <h2 className="create-support-title">
        🎫 Create Support Ticket
      </h2>

      <p className="create-support-text">
        Submit a new support request
      </p>

      <input
        className="create-support-input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="create-support-input"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="create-support-input"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        className="create-support-input"
        placeholder="Priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      />

      <button
        className="create-support-btn"
        onClick={createTicket}
      >
        Create Ticket
      </button>

    </div>
  </div>
);
    
}

export default CreateTicket;