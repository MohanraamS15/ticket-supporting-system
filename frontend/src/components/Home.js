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

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    },
    hero: {
      textAlign: 'center',
      padding: '60px 20px',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      marginBottom: '40px',
      border: '1px solid #e9ecef'
    },
    title: {
      fontSize: '42px',
      fontWeight: '700',
      color: '#2c3e50',
      marginBottom: '20px',
      lineHeight: '1.2'
    },
    subtitle: {
      fontSize: '20px',
      color: '#6c757d',
      marginBottom: '40px',
      lineHeight: '1.6',
      maxWidth: '600px',
      margin: '0 auto 40px'
    },
    actionSection: {
      backgroundColor: '#ffffff',
      padding: '40px',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      marginBottom: '40px',
      border: '1px solid #e9ecef'
    },
    sectionTitle: {
      fontSize: '28px',
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: '10px',
      textAlign: 'center'
    },
    userInfo: {
      textAlign: 'center',
      marginBottom: '30px',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      border: '1px solid #e9ecef'
    },
    userRole: {
      fontSize: '18px',
      color: '#495057',
      marginBottom: '10px'
    },
    rolebadge: {
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      backgroundColor: role === 'admin' ? '#dc3545' : '#007bff',
      color: 'white',
      display: 'inline-block'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      flexWrap: 'wrap',
      marginTop: '20px'
    },
    button: {
      padding: '16px 32px',
      fontSize: '16px',
      fontWeight: '600',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      minWidth: '160px',
      justifyContent: 'center'
    },
    loginBtn: {
      backgroundColor: '#007bff',
      color: 'white'
    },
    registerBtn: {
      backgroundColor: '#28a745',
      color: 'white'
    },
    adminBtn: {
      backgroundColor: '#dc3545',
      color: 'white'
    },
    dashboardBtn: {
      backgroundColor: '#007bff',
      color: 'white'
    },
    logoutBtn: {
      backgroundColor: '#6c757d',
      color: 'white'
    },
    featuresSection: {
      backgroundColor: '#ffffff',
      padding: '40px',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      border: '1px solid #e9ecef'
    },
    featuresTitle: {
      fontSize: '32px',
      fontWeight: '600',
      color: '#2c3e50',
      textAlign: 'center',
      marginBottom: '40px'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px'
    },
    featureCard: {
      padding: '30px',
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      border: '1px solid #e9ecef',
      textAlign: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    featureIcon: {
      fontSize: '48px',
      marginBottom: '20px'
    },
    featureTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: '15px'
    },
    featureDescription: {
      fontSize: '16px',
      color: '#6c757d',
      lineHeight: '1.6'
    },
    welcomeBack: {
      backgroundColor: '#e8f5e8',
      border: '1px solid #c3e6cb',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '20px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>🎫 Ticket Support System</h1>
        <p style={styles.subtitle}>
          Manage your support tickets efficiently with our modern, role-based ticketing system. 
          Fast, secure, and user-friendly.
        </p>
      </div>

      <div style={styles.actionSection}>
        {!token ? (
          <>
            <h2 style={styles.sectionTitle}>Get Started Today</h2>
            <p style={{ textAlign: 'center', color: '#6c757d', marginBottom: '30px' }}>
              Join thousands of users who trust our platform for their support needs
            </p>
            <div style={styles.buttonContainer}>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <button 
                  style={{...styles.button, ...styles.loginBtn}}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  🔑 Login
                </button>
              </Link>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <button 
                  style={{...styles.button, ...styles.registerBtn}}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  👤 Register
                </button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div style={styles.welcomeBack}>
              <h2 style={styles.sectionTitle}>Welcome Back! 👋</h2>
              <div style={styles.userInfo}>
                <p style={styles.userRole}>You are logged in as:</p>
                <span style={styles.rolebadge}>
                  {role === 'admin' ? '👑 Admin' : '👤 User'}
                </span>
              </div>
            </div>
            
            <div style={styles.buttonContainer}>
              {role === 'admin' ? (
                <Link to="/admin" style={{ textDecoration: 'none' }}>
                  <button 
                    style={{...styles.button, ...styles.adminBtn}}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    👑 Admin Panel
                  </button>
                </Link>
              ) : (
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                  <button 
                    style={{...styles.button, ...styles.dashboardBtn}}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    📊 My Dashboard
                  </button>
                </Link>
              )}
              <button 
                style={{...styles.button, ...styles.logoutBtn}}
                onClick={handleLogout}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                🚪 Logout
              </button>
            </div>
          </>
        )}
      </div>

      <div style={styles.featuresSection}>
        <h2 style={styles.featuresTitle}>Why Choose Our Platform?</h2>
        <div style={styles.featuresGrid}>
          <div 
            style={styles.featureCard}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <div style={styles.featureIcon}>🎫</div>
            <h3 style={styles.featureTitle}>Smart Ticket Management</h3>
            <p style={styles.featureDescription}>
              Create, track, and manage support tickets with intuitive tools and real-time status updates.
            </p>
          </div>
          
          <div 
            style={styles.featureCard}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <div style={styles.featureIcon}>👥</div>
            <h3 style={styles.featureTitle}>Role-Based Access</h3>
            <p style={styles.featureDescription}>
              Tailored interfaces for users and administrators with appropriate permissions and features.
            </p>
          </div>
          
          <div 
            style={styles.featureCard}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <div style={styles.featureIcon}>🔐</div>
            <h3 style={styles.featureTitle}>Enterprise Security</h3>
            <p style={styles.featureDescription}>
              JWT-based authentication with protected routes ensuring your data stays secure and private.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;