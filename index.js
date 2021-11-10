const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Broker = require("./models/database"); //change to whatever it will be
require("dotenv").config();
app.use(cors());
app.use(express.json());

morgan.token("body", function (req, res) {
    return JSON.stringify(req.body);
});
app.use(
    morgan(function (tokens, req, res) {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, "content-length"),
            "-",
            tokens["response-time"](req, res),
            "ms",
            tokens.body(req, res),
        ].join(" ");
    })
);

app.get("/cities", (req, res) => {
    Broker.distinct("city").then((cities) => {
        res.json(cities);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});
