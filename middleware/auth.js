
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header
  const authHeader = req.header('Authorization');
  
  // Check if no header
  if (!authHeader) {
    return res.status(401).json({ 
      msg: 'No token, authorization denied',
      error: 'Missing Authorization Header'
    });
  }

  // Support both "Bearer <token>" and raw "<token>"
  const token = authHeader.startsWith('Bearer ') 
    ? authHeader.split(' ')[1] 
    : authHeader;

  if (!token || token === 'undefined' || token === 'null') {
    return res.status(401).json({ 
      msg: 'Token is empty or invalid',
      error: 'Invalid Token Format' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT Verification Error:', err.message);
    res.status(401).json({ 
      msg: 'Token is not valid', 
      error: err.message 
    });
  }
};
