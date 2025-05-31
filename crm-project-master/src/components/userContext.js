import React, {createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";


const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({children}) => {
    console.log('Fetching user...');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
  let isMounted = true;

  const fetchUser = async () => {
    const token = localStorage.getItem("AccessToken");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get('http://localhost:8085/api/auth/me', {
        headers: { Authorization: 'Bearer ' + token }
      });
      if (isMounted) setUser(res.data);
    } catch (err) {
      if (isMounted) {
        setError(err);
        setUser(null);
        localStorage.removeItem("AccessToken");
        localStorage.removeItem("RefreshToken");
        navigate("/login");
      }
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  fetchUser();
  return () => {
    isMounted = false;
  };
}, []);

    return (
        <UserContext.Provider value={{user, setUser, loading, error}}>
            {children}
        </UserContext.Provider>
    );
};