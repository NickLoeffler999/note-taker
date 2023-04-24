// Sets up the dependencies for File Systems and path.
const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  //
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    // Setting up the notes variable, to take in (data) and parse it.
    var notes = JSON.parse(data);

    // This is the GET route for notes.
    app.get("/api/notes", (req, res) => {
      res.json(notes);
    });
    // This creates the POST route for the notes.
    app.post("api/notes", (req, res) => {
      let nextNote = req.body;
      notes.push(nextNote);
      updateDB();
      return console.log("You added a new note!" + nextNote.title);
    });
    // This function will allow the user to delete a note
    app.delete("/api/notes/:id", (req, res) => {
      notes.splice(req.params.id, 1);
      updateDataBase();
      console.log("Success! You deleted this note: " + req.params.id);
    });
    // This function will get the note and save it to the side
    app.get("/api/notes/:id", (req, res) => {
      res.json(notes[req.params.id]);
    });
    // This will access /notes and display notes.html from the "public" folder.
    app.get("/notes", (req, res) => {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // This will access the other routes and display index.html from the "public" folder.
    app.get("/notes", (req, res) => {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });
    //updates the json file whenever a note is added or deleted
    function updateDataBase() {
      fs.writeFile("db/db.json", JSON.stringify(notes, "/"), (err) => {
        if (err) throw err;
        return true;
      });
    }
  });
};
