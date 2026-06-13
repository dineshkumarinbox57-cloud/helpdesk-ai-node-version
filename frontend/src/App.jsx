import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import Register from "./pages/Register";
import CreateTicket from "./pages/CreateTicket";
import ProtectedRoute from "./components/ProtectedRoute";
import AIHelp from "./pages/AIHelp";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
            <Route
          path="/dashboard"
          element={
              <ProtectedRoute>
                  <Dashboard />
              </ProtectedRoute>
              // <Dashboard />
          }
        />
        
        <Route
            path="/tickets"
            element={
                <ProtectedRoute>
                    <Tickets />
                </ProtectedRoute>
            }
        />

        <Route
            path="/create-ticket"
            element={
                <ProtectedRoute>
                    <CreateTicket />
                </ProtectedRoute>
            }
        />

        <Route path="/ai-help" 
            element={  
            <ProtectedRoute>
            <AIHelp />
            </ProtectedRoute>} 
        /> 

     </Routes>
    </BrowserRouter>
          );
}

export default App;