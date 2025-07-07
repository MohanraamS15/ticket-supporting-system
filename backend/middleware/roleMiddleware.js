 
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // user is admin, allow access
  } else {
    res.status(403).json({ msg: 'Access denied: Admins only' });
  }
};

module.exports = adminOnly;
