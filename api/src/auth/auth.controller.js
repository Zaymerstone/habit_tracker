const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../../db/models");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({
      where: { email },
    });

    if (userExists) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashpass = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password_hash: hashpass,
      roleId: 1,
      level: 2,
    });

    // Generate token for the new user
    const token = jwt.sign({ id: newUser.id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    // Respond with the token and user details
    return res.status(201).json({
      message: "Successful registration",
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        level: newUser.level,
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Log the user data and password (don't log sensitive info in production)
    console.log("User:", user);
    console.log("Password from request:", password); // дебаг
    console.log("Password hash from database:", user.password_hash);

    // Compare the password with the password_hash field
    const isPasswordValid = await bcrypt.compare(password, user.password_hash); // use 'password_hash' instead of 'password'

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate token for the existing user
    const token = jwt.sign({ id: user.id }, "your_jwt_secret", {
      expiresIn: "1h", // сделать на пару дней
    });

    // Respond with the token and user details
    return res.status(200).json({
      message: "Successful authorization",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        level: user.level,
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login };
