// admin.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [tickets, setTickets] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [loadingTickets, setLoadingTickets] = useState({});
  
  // Filter states
  const [filters, setFilters] = useState({
    status: 'all',
    sortBy: 'newest',
    searchQuery: ''
  });
  
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/tickets/all`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTickets(res.data);
      } catch (err) {
        console.error('Failed to fetch tickets', err);
        showNotification('Failed to load tickets', 'error');
      }
    };

    fetchTickets();
  }, [token]);

  const showNotification = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 4000);
  };

  // Function to format date as DD/MM/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Filter and sort tickets
  const getFilteredAndSortedTickets = () => {
    let filteredTickets = [...tickets];

    // Filter by status
    if (filters.status !== 'all') {
      filteredTickets = filteredTickets.filter(ticket => ticket.status === filters.status);
    }

    // Filter by search query
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      filteredTickets = filteredTickets.filter(ticket => 
        ticket.title.toLowerCase().includes(query) ||
        ticket.description.toLowerCase().includes(query) ||
        (ticket.user?.name || '').toLowerCase().includes(query)
      );
    }

    // Sort tickets
    filteredTickets.sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'status':
          const statusOrder = { 'open': 1, 'in-progress': 2, 'closed': 3 };
          return statusOrder[a.status] - statusOrder[b.status];
        default:
          return 0;
      }
    });

    return filteredTickets;
  };

  // Calculate ticket statistics
  const getTicketStats = () => {
    const stats = {
      total: tickets.length,
      open: tickets.filter(ticket => ticket.status === 'open').length,
      inProgress: tickets.filter(ticket => ticket.status === 'in-progress').length,
      closed: tickets.filter(ticket => ticket.status === 'closed').length
    };
    return stats;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return '#e74c3c'; // Red
      case 'in-progress':
        return '#f39c12'; // Orange
      case 'closed':
        return '#27ae60'; // Green
      default:
        return '#6c757d'; // Gray
    }
  };

  const getStatusBadgeStyle = (status) => ({
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: getStatusColor(status),
    display: 'inline-block',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  });

  const updateStatus = async (id, newStatus) => {
    setLoadingTickets(prev => ({ ...prev, [id]: true }));
    
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/tickets/${id}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTickets((prev) =>
        prev.map((ticket) =>
          ticket._id === id ? { ...ticket, status: newStatus } : ticket
        )
      );

      showNotification(`✅ Ticket status updated to "${newStatus}" successfully!`, 'success');
    } catch (err) {
      console.error('Failed to update status:', err);
      showNotification('❌ Failed to update ticket status. Please try again.', 'error');
    } finally {
      setLoadingTickets(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  const clearFilters = () => {
    setFilters({
      status: 'all',
      sortBy: 'newest',
      searchQuery: ''
    });
  };

  const stats = getTicketStats();
  const filteredTickets = getFilteredAndSortedTickets();

  const styles = {
    container: {
      maxWidth: '1000px',
      margin: '30px auto',
      padding: '20px',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    title: {
      color: '#2c3e50',
      fontSize: '28px',
      fontWeight: 'bold',
      margin: 0
    },
    logoutBtn: {
      padding: '12px 24px',
      backgroundColor: '#e74c3c',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'all 0.3s ease'
    },
    // Simple filter section
    filterSection: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      marginBottom: '30px'
    },
    filterGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '15px',
      marginBottom: '15px'
    },
    filterInput: {
      padding: '10px',
      fontSize: '14px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      backgroundColor: 'white'
    },
    clearBtn: {
      padding: '8px 16px',
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px'
    },
    resultsCount: {
      fontSize: '14px',
      color: '#666',
      marginLeft: '15px'
    },
    statsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginBottom: '30px'
    },
    statCard: {
      backgroundColor: 'white',
      padding: '25px',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
      textAlign: 'center',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    },
    statNumber: {
      fontSize: '36px',
      fontWeight: 'bold',
      marginBottom: '10px',
      display: 'block'
    },
    statLabel: {
      fontSize: '14px',
      color: '#6c757d',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    notification: {
      padding: '15px 20px',
      marginBottom: '20px',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '500',
      textAlign: 'center',
      animation: 'fadeIn 0.3s ease'
    },
    successNotification: {
      backgroundColor: '#d4edda',
      color: '#155724',
      border: '1px solid #c3e6cb'
    },
    errorNotification: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      border: '1px solid #f5c6cb'
    },
    ticketCard: {
      backgroundColor: 'white',
      border: '1px solid #e9ecef',
      borderRadius: '12px',
      padding: '25px',
      marginBottom: '20px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    },
    ticketTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: '10px',
      lineHeight: '1.4'
    },
    ticketDescription: {
      fontSize: '16px',
      color: '#555',
      lineHeight: '1.6',
      marginBottom: '15px'
    },
    ticketMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '15px',
      marginBottom: '20px'
    },
    metaItem: {
      fontSize: '14px',
      color: '#666'
    },
    statusContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      marginTop: '15px'
    },
    statusSelect: {
      padding: '10px 15px',
      fontSize: '14px',
      borderRadius: '8px',
      border: '2px solid #e9ecef',
      backgroundColor: 'white',
      cursor: 'pointer',
      minWidth: '150px',
      transition: 'all 0.3s ease'
    },
    loadingSpinner: {
      display: 'inline-block',
      width: '20px',
      height: '20px',
      border: '3px solid #f3f3f3',
      borderTop: '3px solid #3498db',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    noTickets: {
      textAlign: 'center',
      padding: '60px 20px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    noTicketsText: {
      fontSize: '18px',
      color: '#6c757d',
      marginBottom: '10px'
    },
    noTicketsSubtext: {
      fontSize: '14px',
      color: '#adb5bd'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🛠️ Admin Panel</h1>
        <button 
          onClick={handleLogout}
          style={styles.logoutBtn}
          onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}
        >
          Logout
        </button>
      </div>
      
      {/* Statistics Cards */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}
             onMouseEnter={(e) => {
               e.target.style.transform = 'translateY(-5px)';
               e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
             }}
             onMouseLeave={(e) => {
               e.target.style.transform = 'translateY(0)';
               e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.07)';
             }}>
          <span style={{...styles.statNumber, color: '#3498db'}}>
            {stats.total}
          </span>
          <span style={styles.statLabel}>📋 Total Tickets</span>
        </div>
        
        <div style={styles.statCard}
             onMouseEnter={(e) => {
               e.target.style.transform = 'translateY(-5px)';
               e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
             }}
             onMouseLeave={(e) => {
               e.target.style.transform = 'translateY(0)';
               e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.07)';
             }}>
          <span style={{...styles.statNumber, color: '#e74c3c'}}>
            {stats.open}
          </span>
          <span style={styles.statLabel}>🔴 Open Tickets</span>
        </div>
        
        <div style={styles.statCard}
             onMouseEnter={(e) => {
               e.target.style.transform = 'translateY(-5px)';
               e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
             }}
             onMouseLeave={(e) => {
               e.target.style.transform = 'translateY(0)';
               e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.07)';
             }}>
          <span style={{...styles.statNumber, color: '#f39c12'}}>
            {stats.inProgress}
          </span>
          <span style={styles.statLabel}>🟡 In Progress</span>
        </div>
        
        <div style={styles.statCard}
             onMouseEnter={(e) => {
               e.target.style.transform = 'translateY(-5px)';
               e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
             }}
             onMouseLeave={(e) => {
               e.target.style.transform = 'translateY(0)';
               e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.07)';
             }}>
          <span style={{...styles.statNumber, color: '#27ae60'}}>
            {stats.closed}
          </span>
          <span style={styles.statLabel}>🟢 Closed Tickets</span>
        </div>
      </div>

      {/* Filter Section */}
      <div style={styles.filterSection}>
        <div style={styles.filterGrid}>
          <input
            type="text"
            placeholder="Search tickets..."
            value={filters.searchQuery}
            onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            style={styles.filterInput}
          />
          
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            style={styles.filterInput}
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
            style={styles.filterInput}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Title A-Z</option>
            <option value="status">By Status</option>
          </select>
        </div>
        
        <div>
          <button onClick={clearFilters} style={styles.clearBtn}>
            Clear
          </button>
          <span style={styles.resultsCount}>
            {filteredTickets.length} of {tickets.length} tickets
          </span>
        </div>
      </div>
      
      {message && (
        <div style={{
          ...styles.notification,
          ...(messageType === 'success' ? styles.successNotification : styles.errorNotification)
        }}>
          {message}
        </div>
      )}

      {filteredTickets.length === 0 ? (
        <div style={styles.noTickets}>
          <div style={styles.noTicketsText}>
            {tickets.length === 0 ? '📋 No tickets found' : '🔍 No tickets match your filters'}
          </div>
          <div style={styles.noTicketsSubtext}>
            {tickets.length === 0 
              ? 'All tickets will appear here once users start creating them.'
              : 'Try adjusting your search or filter criteria.'
            }
          </div>
        </div>
      ) : (
        <div>
          {filteredTickets.map((ticket) => (
            <div
              key={ticket._id}
              style={styles.ticketCard}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.07)';
              }}
            >
              <h3 style={styles.ticketTitle}>🎫 {ticket.title}</h3>
              <p style={styles.ticketDescription}>{ticket.description}</p>
              
              <div style={styles.ticketMeta}>
                <div style={styles.metaItem}>
                  <strong>👤 Created By:</strong> {ticket.user?.name || 'Unknown User'}
                </div>
                <div style={styles.metaItem}>
                  <strong>📅 Created:</strong> {formatDate(ticket.createdAt)}
                </div>
              </div>

              <div style={styles.statusContainer}>
                <div>
                  <strong>Status:</strong>
                  <span style={{ marginLeft: '10px', ...getStatusBadgeStyle(ticket.status) }}>
                    {ticket.status}
                  </span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <strong>Update Status:</strong>
                  {loadingTickets[ticket._id] ? (
                    <div style={styles.loadingSpinner}></div>
                  ) : (
                    <select
                      value={ticket.status}
                      onChange={(e) => updateStatus(ticket._id, e.target.value)}
                      style={styles.statusSelect}
                      onFocus={(e) => e.target.style.borderColor = '#3498db'}
                      onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                    >
                      <option value="open">🔴 Open</option>
                      <option value="in-progress">🟡 In Progress</option>
                      <option value="closed">🟢 Closed</option>
                    </select>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Admin;