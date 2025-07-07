const express = require('express');
const router = express.Router();

const {
  createTicket,
  getMyTickets,
  getAllTickets,
  updateTicketStatus,
} = require('../controllers/ticketController');

const protect = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/roleMiddleware');

// 👤 User routes
router.post('/', protect, createTicket);         // POST /api/tickets
router.get('/my', protect, getMyTickets);        // GET  /api/tickets/my

// 👑 Admin routes
router.get('/all', protect, adminOnly, getAllTickets);            // GET /api/tickets/all
router.patch('/:id/status', protect, adminOnly, updateTicketStatus); // PATCH /api/tickets/:id/status

module.exports = router;
