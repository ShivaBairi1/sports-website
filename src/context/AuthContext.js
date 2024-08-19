import React, { createContext, useState,useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          fetchUser();
      }
  }, []);

  const fetchUser = async () => {
      try {
          const response = await axios.get('http://localhost:3000/api/users'); // Adjust endpoint as necessary
          setUser(response.data);
      } catch (error) {
          console.error('Error fetching user data:', error);
      }
  };

    const login = async (credentials) => {
        const response = await axios.post('http://localhost:3000/api/login', credentials);
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set token as default header
        setUser(user);
        return response.data;
    };

    const register = async (credentials) => {
        const response = await axios.post('http://localhost:3000/api/signup', credentials);
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set token as default header
        setUser(user);
        return response.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization']; // Remove token from default headers
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};