const express = require("express");
const cors = require("cors");

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

const users = require("./routes/api/v1/users");
const drinks = require("./routes/api/v1/drinks");

app.use("/api/v1/users", users);
app.use("/api/v1/drinks", drinks);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
