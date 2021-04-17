require("dotenv").config();
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "build")));

require('./routes/users.js')(app);
require('./routes/booklists.js')(app);
require('./routes/shelves.js')(app);
require('./routes/leaderboards.js')(app);
require('./routes/friends.js')(app);
require('./routes/deletions.js')(app);
require('./routes/contact.js')(app);
require('./routes/searches.js')(app);

app.get("/", async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
    } catch (err) {
        console.error(err.message);
    }
})

if (process.env.DEVELOPMENT === 'true') {
    app.listen(5000, () => {
        console.log(`server has started on port ${5000}`);
        console.log('static file served at ' + path.join(__dirname, "..", "client", "build", "index.html"));
    });
}

exports.api = functions.https.onRequest(app)