const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const db = require("./configs/user_config");
const cors = require("cors");
const morgan = require("morgan");
const authRoute = require("./routes/user_routes");
const blogRoute = require("./routes/blog_routes");

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api/user/auth", authRoute);
app.use("/api/blog", blogRoute);

// app listening
app.listen(PORT, () => {
  db.connectDb();
});
