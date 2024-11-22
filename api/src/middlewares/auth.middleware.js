const jwt = require("jsonwebtoken");

const authToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the header
  if (!token) {
    return res.status(401).json({ message: "Unauthorizated" });
  }

  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorizated" });
  }
};
module.exports = { authToken };
