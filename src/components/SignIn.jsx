import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  {account}  from '../appwrite/Auth';
import '../App.css'
import login from '../assets/login.svg'


function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 
    

    try {
     let response = await account.createEmailPasswordSession(email, password);
      navigate('/'); 
      console.log(response);
    } catch (error) {
      setError('Login failed. Please check your email and password.');
      console.error(error);
    }
  };


  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row border rounded-5 p-3 bg-white shadow box-area">
        <div
          className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
          style={{ background: "#6D31EDFF" }}
        >
          <div className="featured-image mb-3">
            <img
              src={login}
              className="img-fluid"
              style={{ width: 250 }}
              alt="Login"
            />
          </div>
          <p
            className="text-white fs-2"
            style={{
              fontFamily: '"Courier New", Courier, monospace',
              fontWeight: 600
            }}
          >
            Be Verified
          </p>
          <small
            className="text-white text-wrap text-center"
            style={{
              width: "17rem",
              fontFamily: '"Courier New", Courier, monospace'
            }}
          >
            Join Pagar.
          </small>
        </div>
        <div className="col-md-6 right-box">
          <div className="row align-items-center mt-5">
            <div className="header-text text-center mb-3">
              <h2>Sign In</h2>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleLogin}>
              <div className="input-group mb-4 mt-5">
                <input
                  type="email"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-4 mt-1">
                <input
                  type="password"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-3 mt-3">
                <button
                  type="submit"
                  className="btn btn-lg w-100 fs-6"
                  style={{ background: "#6D31EDFF", color: 'white' }}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
