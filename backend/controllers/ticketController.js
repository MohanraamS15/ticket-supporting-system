 
const Ticket = require('../models/Ticket');

// 🎫 Create a new ticket
exports.createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    const ticket = await Ticket.create({
      user: req.user.id,
      title,
      description,
    });
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 👤 Get all tickets for current user
exports.getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 👑 Get all tickets (admin only)
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('user', 'name email');
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 🔄 Update ticket status (admin only)
exports.updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
