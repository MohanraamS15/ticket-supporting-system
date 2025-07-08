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
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 20px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      backgroundColor: '#fafbfc',
      minHeight: '100vh'
    },
    hero: {
      textAlign: 'center',
      padding: '80px 20px 60px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '0 0 32px 32px',
      color: 'white',
      marginBottom: '60px',
      position: 'relative',
      overflow: 'hidden'
    },
    heroOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.1)',
      zIndex: 1
    },
    heroContent: {
      position: 'relative',
      zIndex: 2
    },
    title: {
      fontSize: '48px',
      fontWeight: '800',
      marginBottom: '24px',
      lineHeight: '1.1',
      textShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    subtitle: {
      fontSize: '22px',
      marginBottom: '0',
      lineHeight: '1.6',
      maxWidth: '680px',
      margin: '0 auto',
      fontWeight: '400',
      opacity: '0.95'
    },
    actionSection: {
      backgroundColor: '#ffffff',
      padding: '50px 40px',
      borderRadius: '24px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
      marginBottom: '50px',
      border: '1px solid #e6e8eb'
    },
    sectionTitle: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#1a1d23',
      marginBottom: '16px',
      textAlign: 'center'
    },
    userInfo: {
      textAlign: 'center',
      marginBottom: '32px',
      padding: '24px',
      backgroundColor: '#f8fafc',
      borderRadius: '16px',
      border: '1px solid #e2e8f0'
    },
    userRole: {
      fontSize: '18px',
      color: '#64748b',
      marginBottom: '12px',
      fontWeight: '500'
    },
    rolebadge: {
      padding: '10px 20px',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      backgroundColor: role === 'admin' ? '#ef4444' : '#3b82f6',
      color: 'white',
      display: 'inline-block',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '16px',
      flexWrap: 'wrap',
      marginTop: '24px'
    },
    button: {
      padding: '16px 28px',
      fontSize: '16px',
      fontWeight: '600',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      minWidth: '140px',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    loginBtn: {
      backgroundColor: '#3b82f6',
      color: 'white',
      boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)'
    },
    registerBtn: {
      backgroundColor: '#10b981',
      color: 'white',
      boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
    },
    adminBtn: {
      backgroundColor: '#ef4444',
      color: 'white',
      boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)'
    },
    dashboardBtn: {
      backgroundColor: '#8b5cf6',
      color: 'white',
      boxShadow: '0 4px 14px rgba(139, 92, 246, 0.4)'
    },
    logoutBtn: {
      backgroundColor: '#6b7280',
      color: 'white',
      boxShadow: '0 4px 14px rgba(107, 114, 128, 0.4)'
    },
    featuresSection: {
      backgroundColor: '#ffffff',
      padding: '60px 40px',
      borderRadius: '24px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
      border: '1px solid #e6e8eb'
    },
    featuresTitle: {
      fontSize: '36px',
      fontWeight: '700',
      color: '#1a1d23',
      textAlign: 'center',
      marginBottom: '50px'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '32px'
    },
    featureCard: {
      padding: '32px',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      border: '2px solid #f1f5f9',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    },
    featureIcon: {
      fontSize: '56px',
      marginBottom: '24px',
      display: 'block'
    },
    featureTitle: {
      fontSize: '22px',
      fontWeight: '700',
      color: '#1a1d23',
      marginBottom: '16px'
    },
    featureDescription: {
      fontSize: '16px',
      color: '#64748b',
      lineHeight: '1.6',
      fontWeight: '400'
    },
    welcomeBack: {
      background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
      border: '1px solid #86efac',
      borderRadius: '16px',
      padding: '28px',
      marginBottom: '24px'
    },
    getStartedText: {
      textAlign: 'center',
      color: '#64748b',
      marginBottom: '36px',
      fontSize: '18px',
      fontWeight: '500'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>🎫 Ticket Support System</h1>
          <p style={styles.subtitle}>
            Streamline your support workflow with intelligent ticket management, 
            role-based access control, and real-time collaboration tools.
          </p>
        </div>
      </div>

      <div style={styles.actionSection}>
        {!token ? (
          <>
            <h2 style={styles.sectionTitle}>Ready to Get Started?</h2>
            <p style={styles.getStartedText}>
              Join our community of professionals who rely on seamless support management
            </p>
            <div style={styles.buttonContainer}>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <button 
                  style={{...styles.button, ...styles.loginBtn}}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 14px rgba(59, 130, 246, 0.4)';
                  }}
                >
                  🔑 Sign In
                </button>
              </Link>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <button 
                  style={{...styles.button, ...styles.registerBtn}}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 14px rgba(16, 185, 129, 0.4)';
                  }}
                >
                  👤 Create Account
                </button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div style={styles.welcomeBack}>
              <h2 style={styles.sectionTitle}>Welcome Back! 👋</h2>
              <div style={styles.userInfo}>
                <p style={styles.userRole}>You're logged in as:</p>
                <span style={styles.rolebadge}>
                  {role === 'admin' ? '👑 Administrator' : '👤 User'}
                </span>
              </div>
            </div>
            
            <div style={styles.buttonContainer}>
              {role === 'admin' ? (
                <Link to="/admin" style={{ textDecoration: 'none' }}>
                  <button 
                    style={{...styles.button, ...styles.adminBtn}}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 14px rgba(239, 68, 68, 0.4)';
                    }}
                  >
                    👑 Admin Dashboard
                  </button>
                </Link>
              ) : (
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                  <button 
                    style={{...styles.button, ...styles.dashboardBtn}}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 14px rgba(139, 92, 246, 0.4)';
                    }}
                  >
                    📊 My Dashboard
                  </button>
                </Link>
              )}
              <button 
                style={{...styles.button, ...styles.logoutBtn}}
                onClick={handleLogout}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(107, 114, 128, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 14px rgba(107, 114, 128, 0.4)';
                }}
              >
                🚪 Sign Out
              </button>
            </div>
          </>
        )}
      </div>

      <div style={styles.featuresSection}>
        <h2 style={styles.featuresTitle}>Built for Modern Teams</h2>
        <div style={styles.featuresGrid}>
          <div 
            style={styles.featureCard}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-8px)';
              e.target.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)';
              e.target.style.borderColor = '#3b82f6';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
              e.target.style.borderColor = '#f1f5f9';
            }}
          >
            <div style={styles.featureIcon}>🎯</div>
            <h3 style={styles.featureTitle}>Intelligent Ticket Routing</h3>
            <p style={styles.featureDescription}>
              Automatically categorize and prioritize tickets with smart routing that gets issues 
              to the right person faster than ever.
            </p>
          </div>
          
          <div 
            style={styles.featureCard}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-8px)';
              e.target.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)';
              e.target.style.borderColor = '#10b981';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
              e.target.style.borderColor = '#f1f5f9';
            }}
          >
            <div style={styles.featureIcon}>⚡</div>
            <h3 style={styles.featureTitle}>Lightning Fast Response</h3>
            <p style={styles.featureDescription}>
              Real-time notifications and instant status updates keep everyone in the loop 
              without the constant back-and-forth.
            </p>
          </div>
          
          <div 
            style={styles.featureCard}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-8px)';
              e.target.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)';
              e.target.style.borderColor = '#8b5cf6';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
              e.target.style.borderColor = '#f1f5f9';
            }}
          >
            <div style={styles.featureIcon}>🛡️</div>
            <h3 style={styles.featureTitle}>Bank-Level Security</h3>
            <p style={styles.featureDescription}>
              Enterprise-grade JWT authentication with granular permissions ensures your 
              sensitive data remains protected at all times.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;