import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [tickets, setTickets] = useState([]);
  const [message, setMessage] = useState('');
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
      }
    };

    fetchTickets();
  }, [token]);

  const updateStatus = async (id, newStatus) => {
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

      setMessage('✅ Status updated successfully!');
    } catch (err) {
      console.error('Failed to update status:', err);
      setMessage('❌ Status update failed.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div style={{ maxWidth: 700, margin: '30px auto' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2>Admin Panel</h2>
        <button 
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Logout
        </button>
      </div>
      
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        tickets.map((ticket) => (
          <div
            key={ticket._id}
            style={{
              border: '1px solid #ccc',
              padding: '15px',
              marginBottom: '10px',
              borderRadius: '8px',
            }}
          >
            <h3>{ticket.title}</h3>
            <p>{ticket.description}</p>
            <p>
              <strong>Created By:</strong> {ticket.user?.name || 'Unknown'}
            </p>
            <p>
              <strong>Status:</strong> {ticket.status}
            </p>

            <select
              value={ticket.status}
              onChange={(e) => updateStatus(ticket._id, e.target.value)}
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        ))
      )}
    </div>
  );
};

export default Admin;