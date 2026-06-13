import { useState } from "react";
import API from "../services/api";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      const response = await API.post("api/auth/register", {
        username,
        email,
        password,
      });
      localStorage.setItem("name",username);
      localStorage.setItem("email",email);
      alert(response.data.message);
    } catch (error) {
        console.log(error);
        console.log(error.response);
        alert(error.response?.data || error.message);
       }  
  };

  return (
  <div className="register-container">


    <div className="register-card">

      <div className="register-logo">
        🤖
      </div>

      <h1>
        IT Helpdesk <span>AI</span>
      </h1>

      <p>Create your account</p>

      <input
        type="text"
        placeholder="👤 Full Name"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="email"
        placeholder="📧 Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="🔒 Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={register}>
        🚀 Register
      </button>

      <div className="register-footer">
        Already have an account?
        <a href="/"> Sign In</a>
      </div>

    </div>

  </div>
);
}

export default Register;