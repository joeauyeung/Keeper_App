const Express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const config = require("./config")

app = Express();
app.use(cors());
mongoose.connect(`mongodb+srv://admin:${config.dbPass}@keeperdb.xcpk5.mongodb.net/KeeperDB?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connected to database"))
    .catch(err => console.log(err));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", Express.static("client/build"))

// Establish MongoDB

const noteSchema = new mongoose.Schema({
    title: String,
    content: String
})

const Note = mongoose.model("Note", noteSchema)

// API Routes 

app.route("/api")
    .get((req, res) => {
        Note.find((err, notes) => {
            res.send(notes);
            return;}
        );
    })
    .post((req, res) => {
        const note = new Note({
            title: req.body.title,
            content: req.body.content
        });
        note.save();
    });

// Delete Note

app.post("/api/delete", (req,res) => {
    console.log(req.body.id)
    Note.findByIdAndRemove(req.body.id, err => {
        if (err) {
            console.log(err)
        } else {
            console.log("Note deleted")
        }
    })
})

app.all("/*", (req, res) => {res.sendFile(__dirname + "/client/build/index.html")});

const port = process.env.PORT || 8080

app.listen(port, () => console.log("Backend is running on port 8080"));