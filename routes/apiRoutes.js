// Sets up the dependencies for File Systems and path.
const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  //
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    // Setting up the notes variable, to take in (data) and stringify it.
    var notes = JSON.stringify(data);

    // This is the GET route for notes.
    app.get("/api/notes", function (req, res) {
      req.json(notes);
    });
    // This creates the POST route for the notes.
    app.post("api/notes", function (req, res) {
      let nextNote = req.body;
      notes.push(nextNote);
      updateDB();
      return console.log("You added a new note!" + nextNote.title);
    });
    // This function will allow the user to delete a note
    app.delete("/api/notes/:id", function (req, res) {
      notes.splice(req.params.id, 1);
      updateDb();
      console.log("Success! You deleted this note: " + req.params.id);
    });

    // This will access /notes and display notes.html from the "public" folder.
    app.get("/notes", function (req, res) {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // This will access the other routes and display index.html from the "public" folder.
    app.get("/notes", function (req, res) {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
  });
};
