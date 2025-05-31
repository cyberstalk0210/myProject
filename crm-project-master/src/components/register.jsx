import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [prePassword, setprePassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      username: userName,
      password: password,
      prePassword: prePassword
    };

    try {
      const response = await axios.post('http://localhost:8085/api/auth/register', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("Ro'yxatdan o'tish muvaffaqiyatli:", response.data);

      if (response.data.success) {
        alert(response.data.message || 'Ro\'yxatdan o\'tish muvaffaqiyatli!');
        navigate('/login');
      } else {
        setError(response.data.message || 'Xatolik yuz berdi.');
      }

    } catch (error) {
      if (error.response) {
        console.error('Serverdan xato:', error.response.data);
        setError(error.response.data.message || 'Server xatosi yuz berdi.');
      } else {
        console.error('Tarmoq yoki boshqa xato:', error.message);
        setError('Tarmoq xatosi yoki serverga ulanib bo‘lmadi.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card p-4">
            <h2 className="text-center">Register</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={userName}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="prepassword" className="form-label">Pre Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="prepassword"
                  value={prePassword}
                  onChange={(e) => setprePassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
            <p className="mt-3 text-center">
              Already have an account? <a href="/login">Login here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
