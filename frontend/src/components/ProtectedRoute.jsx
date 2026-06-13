    import { Navigate } from "react-router-dom";


function ProtectedRoute({ children }) {

    const token = localStorage.getItem("token");
    console.log("PROTECTED ROUTE");
    console.log("TOKEN : ",token);

    return token ? children : <Navigate to="/" />;

}

export default ProtectedRoute;