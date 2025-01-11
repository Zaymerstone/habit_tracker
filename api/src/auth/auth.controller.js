const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User, Habit, Level, UserAchievement, Mastery } = require("../../db/models");

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
      levelId: 1, // zamenit na levelId i na 1
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
        levelId: newUser.levelId, // zamenit na levelId i na newUser.levelId
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
      include: [Habit],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Log the user data and password (don't log sensitive info in production)

    // Compare the password with the password_hash field
    const isPasswordValid = await bcrypt.compare(password, user.password_hash); // use 'password_hash' instead of 'password'

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate token for the existing user
    const token = jwt.sign({ id: user.id }, "your_jwt_secret", {
      expiresIn: "1h", // сделать на пару дней
    });

    console.log("user data: ", user);

    // Respond with the token and user details
    return res.status(200).json({
      message: "Successful authorization",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        levelId: user.levelId, // zamenit na levelId oba
        habits: user.Habit,
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

async function checkUser(req, res) {
  try {
    const userId = req.userId;

    const user = await User.findOne({
      where: { id: userId },
      include: [
        { model: Habit },
        { model: Level },
        {
          model: UserAchievement,
          include: [{ model: Mastery}, {model: Habit}],
          attributes: ["userId", "habitId", "createdAt"] 
        },
      ],
    });

    console.log("user data: ", user);
    // Respond with user info or a success message
    return res.status(200).json({
      message: "User is authenticated",
      user: {
        username: user.username,
        email: user.email,
        level: user.Level, // zamenit na levelId oba
        xp: user.xp,
        roleId: user.roleId,
        habits: user.Habits,
        achievements: user.UserAchievements,
      },
    });
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = { register, login, checkUser };
