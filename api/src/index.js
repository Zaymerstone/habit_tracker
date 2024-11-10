const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { User } = require("../db/models");
const { Habit } = require("../db/models");
const { authRouter } = require("./auth/auth.routes");
const app = express(); // экземпляр приложения we can define routes, middleware, settings using app
app.use(
  cors({
    // middleware для корса (type built-in)
    origin: "http://localhost:5173", // Allow only this origin
  })
);
// middleware
app.use(morgan("dev")); // для логов в чате, чтобы отображалось какой запрос мы использовали, информацию о запросе
app.use(express.urlencoded({ extended: true })); // это мидлвэр функция
app.use(express.json()); // parse data in json
app.use("/auth", authRouter);
app.get("/", (req, res) => {
  res.send(`<form action="/api" method="POST">
      <input name="username" />
      <input name="email" type="email" />
      <select name = "role">
      <option value = "1">
      admin
      </option>
      <option value= "2">user</option>
      </select>
      <button type="submit">Send</button>
    </form>`);
});

app.get("/api", (req, res) => {
  res.send("api");
});
app.post("/api", async (req, res) => {
  console.log(req.body);
  try {
    const { username, email, role } = req.body; // деструкторизация обьекта
    await User.create({ username, email, roleId: role, level: 1 }); // username, email, role как в аттрибуте name in HTML
    res.json({ message: "good" });
  } catch (error) {
    res.json({ error: error });
  }
});

app.get("/habit", (req, res) => {
  res.send(`<form action = "http://localhost:3000/" method = "POST">
    <input type = "text" name = "habit_name"/>
    <input type = "number" name = "max_streak"/>
    <input type = "number" name = "streak"/>
    <button type = "submit">submit</button>
    </form>`);
});

app.post("/", async (req, res) => {
  const { habit_name, max_streak, streak } = req.body;
  try {
    await Habit.create({ name: habit_name, max_streak, streak });
    res.json({ message: "good" });
  } catch (error) {
    res.json({ error: error });
  }
});

app.listen(3000);
