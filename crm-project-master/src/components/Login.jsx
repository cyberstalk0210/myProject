import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

const Login = () => {

      const [formData, setFormData] = useState({
        username: '',
        password: ''
      });
    
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8085/api/auth/login',formData).then(res => {
            let token = res.data;
            localStorage.setItem("AccessToken", token.accessToken)
            localStorage.setItem("RefreshToken", token.refreshToken)
            localStorage.setItem("userName",formData.username);
            navigate('/')
        }).catch(err => {
            toast.error(err.response)
            console.log(err);
        })
    };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card p-4">
            <h2 className="text-center">Login</h2>

            <form onSubmit={handleSubmit} >
              <div className="mb-3">
                <label htmlFor="text" className="form-label">Username</label>
                <input
                  type="text" name='username'
                  className="form-control"
                  id="username"
                  value={formData.username}
            onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password" name='password'
                  value={formData.password}
                     onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            <p className="mt-3 text-center">
              Don't have an account? <a href="/register">Register here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;