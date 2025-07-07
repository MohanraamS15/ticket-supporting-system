import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  // 🔁 Fetch user tickets on load
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/tickets/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTickets(res.data);
      } catch (err) {
        console.error('Failed to fetch tickets', err);
      }
    };

    fetchTickets();
  }, [token]);

  // ➕ Create new ticket
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post(
        'http://localhost:5000/api/tickets',
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTickets([...tickets, res.data]); // Add new ticket to list
      setForm({ title: '', description: '' });
      setMessage('✅ Ticket created successfully!');
    } catch (err) {
      console.error('Ticket creation failed', err);
      setMessage('❌ Failed to create ticket.');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '30px auto' }}>
      <h2>User Dashboard</h2>

      <h3>Create New Ticket</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        /><br /><br />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        /><br /><br />
        <button type="submit">Submit Ticket</button>
      </form>

      {message && <p style={{ color: 'green' }}>{message}</p>}

      <hr />

      <h3>Your Tickets</h3>
      {tickets.length === 0 ? (
        <p>No tickets yet.</p>
      ) : (
        tickets.map((ticket) => (
          <div
            key={ticket._id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '6px',
              background: '#f9f9f9',
            }}
          >
            <h4>{ticket.title}</h4>
            <p>{ticket.description}</p>
            <p><strong>Status:</strong> {ticket.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
