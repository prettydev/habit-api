require("rootpath")();
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("_middleware/error-handler");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use("/users", require("./src/users/users.controller"));
app.use("/userHabits", require("./src/userHabits/userHabits.controller"));
app.use("/colors", require("./src/colors/colors.controller"));
app.use("/memberships", require("./src/memberships/memberships.controller"));
app.use("/tracking", require("./src/tracking/trackings.controller"));
app.use("/utils", require("./src/utils/functions"));
// global error handler
app.use(errorHandler);

const port =80;
app.listen(port, '0.0.0.0', () => console.log("Server listening on port " + port));
