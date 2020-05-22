const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./model/connect");
const createDB = require("./users/model/createDB");
const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./users/public'));

app.use("/api", require("./users/controller/api/route"));

//connect database
db.connect(err => {
  if (err) {
    throw err;
  } else {
    console.log("Database connected");
  }
});

//database created
createDB();

app.listen(PORT, () => {
  console.log("Listening to port 3030");
});
