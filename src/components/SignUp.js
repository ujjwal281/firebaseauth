import React, { useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap' 
import { Link, useNavigate } from "react-router-dom";
// import { createUserWithEmailAndPassword  } from 'firebase/auth';
// import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { signUp } = useAuth();

  const [error, setError] = useState("");


  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


 function handleSubmit(e) {
    e.preventDefault()
    if (password !== passwordConfirm) {
      return setError('password do not match');
    }

    try {
      setError("")
      setLoading(true)
      signUp(email,password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate("/")
      })
    } catch(error) {
      setError("failed to create and error")
      navigate("/signup");
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  }

  
  return (
    <>
      <Card >
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form >
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type='email'onChange={(e) => setEmail(e.target.value)}required />
            </Form.Group>

            <Form.Group  id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>

            <Form.Group  id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type='password' onChange={(e) => setPasswordConfirm(e.target.value)} required />
            </Form.Group>

            <Button disabled={loading} className='w-100 mt-2' onClick={handleSubmit}>Sign Up</Button>

          </Form>
        </Card.Body>
      </Card>

        <div className='w-100 text-center mt-2'>
          ALready have an account?<Link to ="/login">Log In</Link> 
        </div>
      
    </>
  )
}

// import React, {useState} from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import {  createUserWithEmailAndPassword  } from 'firebase/auth';
// import { auth } from '../firebase';
 
// const Signup = () => {
//     const navigate = useNavigate();
 
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('');
 
//     const onSubmit = async (e) => {
  //       e.preventDefault()
  
//       await createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             // Signed in
//             const user = userCredential.user;
//             console.log(user);
//             navigate("/login")
//             // ...
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             console.log(errorCode, errorMessage);
//             // ..
//         });
 
   
//     }
 
//   return (
//     <main >
//         <section>
//             <div>
//                 <div>
//                     <h1> FocusApp </h1>
//                     <form>
//                         <div>
//                             <label htmlFor="email-address">
//                                 Email address
//                             </label>
//                             <input
//                                 type="email"
//                                 label="Email address"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 required
//                                 placeholder="Email address"
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="password">
//                                 Password
//                             </label>
//                             <input
//                                 type="password"
//                                 label="Create password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required
//                                 placeholder="Password"
//                             />

//                         </div>                                             
                        
//                         <button
//                             type="submit" 
//                             onClick={onSubmit}                        
//                         >  
//                             Sign up                                
//                         </button>
                                                                     
//                     </form>
                   
//                     <p>
//                         Already have an account?{' '}
//                         <NavLink to="/login" >
//                             Sign in
//                         </NavLink>
//                     </p>                   
//                 </div>
//             </div>
//         </section>
//     </main>
//   )
// }
 
// export default Signup