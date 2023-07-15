const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const db = require("./configs/user_config");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./routes/user_routes");

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api/user", router);

// app listening
app.listen(PORT, () => {
  db.connectDb();
});
