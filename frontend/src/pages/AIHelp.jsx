import { useState } from "react";
import API from "../services/api";
import "./AIHelp.css";
function AIHelp() {
  const [issue, setIssue] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const getSuggestion = async () => {
    if (!issue.trim()) {
      alert("Please describe your issue");
      return;
    }

    setLoading(true);
    try {
  
      const res = await API.post("/api/ai/troubleshoot", {
        email: localStorage.getItem("email"),
        description: issue
      });
      console.log( localStorage.getItem("email"));

      setResponse(res.data.aiResponse);
      setCurrentSessionId(res.data.sessionId);
    } 
    catch (err) {
      console.error(err);
      alert("Error getting AI suggestion");
    } finally {
      setLoading(false);
    }
  };
     const sendFeedback = async (resolved) => {
      try {
        await API.post(
          `/api/ai/feedback`,
          {  sessionId: currentSessionId,
            resolved: resolved
          }
        );

        alert(
          resolved
            ? "Issue marked as resolved"
            : "Ticket created successfully"
        );
      } catch (err) {
        console.error(err);
      }
    };

  return (
    <div className="aihelp-container">
      <div className="aihelp-card">
      <h1 className="aihelp-title">🤖 AI Troubleshooting Assistant</h1>

      <p className="aihelp-subtitle">
        Describe your technical issue and receive troubleshooting guidance
        before creating a ticket.
      </p>

      <textarea className="aihelp-textarea"
        rows="6"
        cols="70"
        placeholder="Example: VPN is not connecting after password reset..."
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
      />

      <br />
      <br />

      <button className="aihelp-button" onClick={getSuggestion}>
        {loading ? "Analyzing..." : "Get AI Suggestion"}
      </button>

      {response && (
        <div className="aihelp-response">
          <h3>AI Suggestion:</h3>
          <div className="ai-response-box">
        {response.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
        </div>
      )}

      <div className="feedback-buttons">
          <button
            className="resolved-btn"
            onClick={() => sendFeedback(true)}
          >
            ✅ Resolved
          </button>

          <button
            className="not-resolved-btn"
            onClick={() => sendFeedback(false)}
          >
            ❌ Not Resolved
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIHelp;