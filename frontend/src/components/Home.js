// Create this file at: frontend/src/components/Home.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div style={{ 
      maxWidth: 800, 
      margin: '50px auto', 
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1>Welcome to Ticket Support System</h1>
      <p style={{ 
        fontSize: '18px', 
        color: '#666', 
        marginBottom: '40px' 
      }}>
        Manage your support tickets efficiently with our role-based ticketing system
      </p>

      {!token ? (
        // Show login/register options for unauthenticated users
        <div style={{ marginTop: '30px' }}>
          <h3>Get Started</h3>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '20px',
            flexWrap: 'wrap' 
          }}>
            <Link to="/login">
              <button style={{
                padding: '12px 24px',
                fontSize: '16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                textDecoration: 'none'
              }}>
                Login
              </button>
            </Link>
            <Link to="/register">
              <button style={{
                padding: '12px 24px',
                fontSize: '16px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                textDecoration: 'none'
              }}>
                Register
              </button>
            </Link>
          </div>
        </div>
      ) : (
        // Show navigation options for authenticated users
        <div style={{ marginTop: '30px' }}>
          <h3>Welcome back!</h3>
          <p>You are logged in as: <strong>{role}</strong></p>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '20px',
            flexWrap: 'wrap',
            marginTop: '20px'
          }}>
            {role === 'admin' ? (
              <Link to="/admin">
                <button style={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}>
                  Admin Panel
                </button>
              </Link>
            ) : (
              <Link to="/dashboard">
                <button style={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}>
                  My Dashboard
                </button>
              </Link>
            )}
            <button 
              onClick={handleLogout}
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}

      <div style={{ 
        marginTop: '50px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px' 
      }}>
        <h3>Features</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}>
          <div style={{ padding: '15px' }}>
            <h4>🎫 Ticket Management</h4>
            <p>Create, track, and manage support tickets easily</p>
          </div>
          <div style={{ padding: '15px' }}>
            <h4>👥 Role-Based Access</h4>
            <p>Different interfaces for users and administrators</p>
          </div>
          <div style={{ padding: '15px' }}>
            <h4>🔐 Secure Authentication</h4>
            <p>JWT-based authentication with protected routes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;