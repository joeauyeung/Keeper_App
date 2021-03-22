const mongoose = require("mongoose");

module.exports = connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log("Connected to database"))
        .catch(err => console.log(err));
    }

