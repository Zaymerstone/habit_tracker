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
    // добавил roleId:1, level:2, чтобы зачекать фронт
    await User.create({
      username,
      email,
      password: hashpass,
      roleId: 1,
      level: 2,
    });

    return res.status(201).json({ message: "Successful registration" });
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

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Заменить на переменную в env потом
    const token = jwt.sign({ id: user.id }, "your_jwt_secret", {
      expiresIn: "1h",
    });
    return res.status(200).json({ message: "Successful authorization", token });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
module.exports = { register, login };
