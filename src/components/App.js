import React from "react"
import Signup from "./SignUp"
import { Container } from "react-bootstrap" 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./Login"
import Dashboard from "./Dashboard";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import { AuthProvider } from "../context/AuthContext";


// import Dashboard from "./Dashboard"
// import Login from "./Login"
// import PrivateRoute from "./PrivateRoute"
// import ForgotPassword from "./ForgotPassword"
// import UpdateProfile from "./UpdateProfile"

function App() {
  return (
    <BrowserRouter>
    <Container
    className="d-flex align-items-center justify-content-center"
    style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <AuthProvider>
        <Routes>
            {/* <PrivateRoute path="/update-profile" component={UpdateProfile} /> */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            
              {/* <Route path="/login" component={Login} /> */}
              {/* <Route path="/forgot-password" component={ForgotPassword} /> */}
        </Routes>
          </AuthProvider>
      </div>
    </Container>
    </BrowserRouter>
  )
}

export default App