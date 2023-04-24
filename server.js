// Sets up the dependencies for express, FS, and path
const express = require("express");
const fs = require("fs");
const path = require("path");
// The variable 'app' will use the built in express function we just called.
const app = express();
// Creates the variable for ports to use.
const PORT = process.env.PORT || 3001;

// This will create a route for each file in the "public" folder.
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/apiRoutes")(app);

// Starts the server
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
