import React, { useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap' 
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
 
export default function UpdateProfile() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState("");
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault()

    if (password !== passwordConfirm) {
      return setError('password do not match');
    }

   
    const promises = [];
    setError("")
    setLoading(true)
     
    if (email !== currentUser.email) {
      promises.push(updateEmail(email))
    }

    if (password !== currentUser.password) {
      promises.push(updatePassword(email))
    }
    // Signup( email, password)
       
    Promise.all(promises).then(() => {
      navigate('/')
    }).catch(() => {
      setError("Failed to update account")
    }).finally(() => {
      setLoading(false);
    })
  }
  
  
  return (
    <>
      <Card >
        <Card.Body>
          <h2 className='text-center mb-4'>Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form >
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type='email'onChange={(e) => setEmail(e.target.value)} defaultValue={currentUser.email} required />
            </Form.Group>

            <Form.Group  id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank to keep same" />
            </Form.Group>

            <Form.Group  id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type='password' onChange={(e) => setPasswordConfirm(e.target.value)} placeholder="Leave blank to keep same"  />
            </Form.Group>

            <Button disabled={loading} className='w-100 mt-2' onClick={handleSubmit}>Update</Button>

          </Form>
        </Card.Body>
      </Card>

        <div className='w-100 text-center mt-2'>
          <Link to ="/">Cancel</Link> 
        </div>
    </>
  )
}
