import React, { useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap' 
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { resetPassword } = useAuth();
    // const {Signup} = useAuth();
  
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
   function handleSubmit(e) {
      e.preventDefault()
       try {
        setMessage("");
        setError("")
        setLoading(true)
        resetPassword(email)
          .then((userCredential) => {
            const user = userCredential.user
            setMessage("Check your inbox for further instructions")
            console.log(user);
            navigate("/login")
        })
      } catch(error) {
        setError("Failed to reset password")
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    }
  
    
    return (
      <>
        <Card >
          <Card.Body>
            <h2 className='text-center mb-4'>Password Reset</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
                
            <Form >
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type='email'onChange={(e) => setEmail(e.target.value)}required />
              </Form.Group>
  
            <Button disabled={loading} className='w-100 mt-2' onClick={handleSubmit}>Reset Password</Button>


            <div className='w-100 text-center mt-2'>
            <Link  to ="/signup">Log In</Link> 
            </div>

                        
  
            </Form>
          </Card.Body>
        </Card>
  
          <div className='w-100 text-center mt-2'>
            Need account?<Link to ="/signup">Sign up</Link> 
          </div>
        
      </>
    )
}

export default ForgotPassword
