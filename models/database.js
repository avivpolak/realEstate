const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.DATABASE;

console.log("connecting to the database");

mongoose
    .connect(url)
    .then((result) => {
        console.log("connected to MongoDB");
    })
    .catch((error) => {
        console.log("error connecting to MongoDB:", error.message);
    });

const brokerSchema = new mongoose.Schema({
    licenseId: { type: Number, unique: true },
    name: String,
    city: String,
});

brokerSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model("Broker", brokerSchema);
