const roleAuthorization = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.token.data.role;
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Access forbidden" });
    }
    next();
  };
};

module.exports = roleAuthorization;
