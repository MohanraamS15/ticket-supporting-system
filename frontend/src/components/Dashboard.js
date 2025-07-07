import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return '#e74c3c'; // Red
      case 'in-progress':
        return '#f39c12'; // Orange
      case 'closed':
        return '#27ae60'; // Green
      default:
        return '#95a5a6'; // Gray
    }
  };

  // Status background color (lighter version)
  const getStatusBgColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return '#ffebee'; // Light red
      case 'in-progress':
        return '#fff3e0'; // Light orange
      case 'closed':
        return '#e8f5e8'; // Light green
      default:
        return '#f5f5f5'; // Light gray
    }
  };

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/tickets/my`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTickets(res.data);
      } catch (err) {
        console.error('Failed to fetch tickets', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/tickets`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTickets([...tickets, res.data]);
      setForm({ title: '', description: '' });
      setMessage('✅ Ticket created successfully!');
    } catch (err) {
      console.error('Ticket creation failed', err);
      setMessage('❌ Failed to create ticket.');
    } finally {
      setLoading(false);
    }
  };

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
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      border: '1px solid #e9ecef'
    },
    title: {
      color: '#2c3e50',
      fontSize: '28px',
      fontWeight: '600',
      margin: '0'
    },
    logoutBtn: {
      padding: '12px 24px',
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 4px rgba(220,53,69,0.2)'
    },
    formContainer: {
      backgroundColor: '#ffffff',
      padding: '30px',
      borderRadius: '12px',
      marginBottom: '30px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      border: '1px solid #e9ecef'
    },
    formTitle: {
      color: '#2c3e50',
      fontSize: '22px',
      fontWeight: '600',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    input: {
      padding: '12px 16px',
      border: '2px solid #e9ecef',
      borderRadius: '8px',
      fontSize: '16px',
      transition: 'border-color 0.3s ease',
      outline: 'none'
    },
    textarea: {
      padding: '12px 16px',
      border: '2px solid #e9ecef',
      borderRadius: '8px',
      fontSize: '16px',
      resize: 'vertical',
      minHeight: '100px',
      fontFamily: 'inherit',
      transition: 'border-color 0.3s ease',
      outline: 'none'
    },
    submitBtn: {
      padding: '14px 28px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 4px rgba(0,123,255,0.2)',
      alignSelf: 'flex-start'
    },
    message: {
      padding: '12px 16px',
      borderRadius: '8px',
      margin: '20px 0',
      fontWeight: '500',
      backgroundColor: '#d4edda',
      color: '#155724',
      border: '1px solid #c3e6cb'
    },
    ticketsContainer: {
      backgroundColor: '#ffffff',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      border: '1px solid #e9ecef'
    },
    ticketsTitle: {
      color: '#2c3e50',
      fontSize: '22px',
      fontWeight: '600',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    ticketsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '20px',
      marginTop: '20px'
    },
    ticketCard: {
      border: '1px solid #e9ecef',
      borderRadius: '12px',
      padding: '20px',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'pointer'
    },
    ticketTitle: {
      color: '#2c3e50',
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '12px',
      lineHeight: '1.3'
    },
    ticketDescription: {
      color: '#6c757d',
      fontSize: '14px',
      lineHeight: '1.5',
      marginBottom: '15px'
    },
    statusContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    statusBadge: {
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      border: '2px solid',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px'
    },
    noTickets: {
      textAlign: 'center',
      color: '#6c757d',
      fontSize: '16px',
      padding: '40px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      border: '2px dashed #dee2e6'
    },
    loading: {
      textAlign: 'center',
      color: '#6c757d',
      fontSize: '16px',
      padding: '20px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>📊 User Dashboard</h1>
        <button 
          style={styles.logoutBtn}
          onClick={handleLogout}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#c82333'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#dc3545'}
        >
          Logout
        </button>
      </div>

      <div style={styles.formContainer}>
        <h2 style={styles.formTitle}>
          🎫 Create New Ticket
        </h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="text"
            placeholder="Enter ticket title..."
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            onFocus={(e) => e.target.style.borderColor = '#007bff'}
            onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            required
          />
          <textarea
            style={styles.textarea}
            placeholder="Describe your issue in detail..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            onFocus={(e) => e.target.style.borderColor = '#007bff'}
            onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            required
          />
          <button 
            style={styles.submitBtn}
            type="submit"
            disabled={loading}
            onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#0056b3')}
            onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#007bff')}
          >
            {loading ? 'Creating...' : 'Submit Ticket'}
          </button>
        </form>
      </div>

      {message && (
        <div style={styles.message}>
          {message}
        </div>
      )}

      <div style={styles.ticketsContainer}>
        <h2 style={styles.ticketsTitle}>
          📋 Your Tickets
        </h2>
        
        {loading ? (
          <div style={styles.loading}>Loading tickets...</div>
        ) : tickets.length === 0 ? (
          <div style={styles.noTickets}>
            <p>🎫 No tickets yet.</p>
            <p>Create your first ticket above to get started!</p>
          </div>
        ) : (
          <div style={styles.ticketsGrid}>
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                style={styles.ticketCard}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                }}
              >
                <h3 style={styles.ticketTitle}>{ticket.title}</h3>
                <p style={styles.ticketDescription}>{ticket.description}</p>
                <div style={styles.statusContainer}>
                  <span>Status:</span>
                  <span
                    style={{
                      ...styles.statusBadge,
                      color: getStatusColor(ticket.status),
                      backgroundColor: getStatusBgColor(ticket.status),
                      borderColor: getStatusColor(ticket.status)
                    }}
                  >
                    {ticket.status === 'open' && '🔴'}
                    {ticket.status === 'in-progress' && '🟠'}
                    {ticket.status === 'closed' && '🟢'}
                    {ticket.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;