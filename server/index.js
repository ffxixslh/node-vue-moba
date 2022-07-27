const express = require("express");

const app = express();

app.use(require("cors")());
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));

require("./routes/admin")(app);
require("./plugins/db")(app);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
