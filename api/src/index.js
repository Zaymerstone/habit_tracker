const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
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
app.listen(3000);
