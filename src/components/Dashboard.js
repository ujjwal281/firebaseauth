import React, { useEffect, useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { Link,useNavigate } from "react-router-dom"
import { auth } from "../firebase";
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {

  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()

  async function handleLogout() {
    setError("")

    try {
      await logout(auth)
      navigate("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  useEffect((currentUser) => {
    if (!currentUser) navigate("/login");
  })


  return (
    <>
        < Card >
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong>Email:</strong> {currentUser.email}
            <Link to="/updateProfile" className="btn btn-primary w-100 mt-3">
              Update Profile
            </Link>
          </Card.Body>
        </Card >
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogout}>
            Log Out
          </Button>
        </div>

      </>
  )
}