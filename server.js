require("dotenv").config({ path: "./server/config/config" });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./server/config/config");
const connectDB = require("./server/config/connectDB");

app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", express.static("client/build"))

// Establish MongoDB Atlas Connection
connectDB();

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