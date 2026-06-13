import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

    const login = async () => {

        try {

          const response = await API.post(
            "/api/auth/login",
            {
              email,
              password
            }
          );

          console.log("FULL RESPONSE =", response.data);

          if (response.data.success) {

            localStorage.setItem(
              "token",
              response.data.token
            );

            localStorage.setItem(
              "email",
              response.data.user.email
            );

            localStorage.setItem(
              "username",
              response.data.user.username
            );

            console.log(
              "TOKEN =",
              localStorage.getItem("token")
            );

            console.log(
              "EMAIL =",
              localStorage.getItem("email")
            );

            navigate("/dashboard");

          } else {

            alert(response.data.message);

          }

        } catch (error) {

          console.log(error);

          alert("Invalid email or password");

        }
      };

       return (
        <div className="login-container">

          <div className="login-card">

            <div className="login-logo">
              🤖
            </div>

            <h1>
              IT Helpdesk <span>AI</span>
            </h1>

            <p>Smart troubleshooting before ticket creation</p>

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

            <button onClick={login}>
              🔑 Sign In
            </button>

            <div className="login-footer">
              Don't have an account?
              <a href="/register"> Register</a>
            </div>

          </div>

        </div>
      );

}

export default Login;