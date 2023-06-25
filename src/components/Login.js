import React, {  useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap' 
import { Link , useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {login} = useAuth();

  function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      login( email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate("/")
      })
    } catch {
      navigate("/signup")
      setError("failed to Sign in")
    }
  }

  
  return (
    <>
      <Card >
        <Card.Body>
          <h2 className='text-center mb-4'>Login</h2>
          {error && <Alert variant="danger">{ error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required />
            </Form.Group>

            <Form.Group  id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} required />
            </Form.Group>
                      
                  <Button disabled={loading} className='w-100 mt-2' type="submit" >Login</Button>
                      

                  </Form>
                  
                  <div className='w-100 text-center mt-3'>
                    <Link to = "/forgotPassword">Forget Password</Link>
                  </div>
        </Card.Body>
      </Card>

        <div className='w-100 text-center mt-3'>
          No account yet?<Link to ="/signup">Sign Up</Link> 
        </div>
      
    </>
  )
}

