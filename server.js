const express = require("express");

const cors = require("cors");
const items = require("./routes/api/items");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

//Use Routes
app.use("/api/items", items);

app.listen(port, function () {
  console.log(`Server is running on port ${port} !`);
});
