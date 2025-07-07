 
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
router.post('/', protect, createTicket);
router.get('/my', protect, getMyTickets);

// 👑 Admin routes
router.get('/all', protect, adminOnly, getAllTickets);
router.patch('/:id/status', protect, adminOnly, updateTicketStatus);

module.exports = router;
