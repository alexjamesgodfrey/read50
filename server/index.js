//import essentials
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "build")));

// import routes
require('./routes/users.js')(app);
require('./routes/booklists.js')(app);
require('./routes/shelves.js')(app);
require('./routes/leaderboards.js')(app);
require('./routes/deletions.js')(app);
require('./routes/searches.js')(app);


/** ROUTE DOCUMENTS
 * todo: none
 * @users
 *  /api/users -- selects all users -- get
 *  /api/users -- create a user -- post
 *  /api/users/:auth0_id -- selects a user by id -- get
 *  /api/users/color/:auth0_id -- selects a user color -- get
 *  /api/users/color/:auth0_id -- set a user color -- put
 * @booklists
 *  /api/booklists -- selects all booklists -- get
 *  /api/booklists -- create a booklist entry -- post
 *  /api/booklists -- delete a booklist entry -- delete
 *  /api/booklists/:listtype/:auth0_id -- select all booklists of listtype from user -- get
 */


app.get("/", async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`);
    console.log('static file served at ' + path.join(__dirname, "..", "client", "build", "index.html"));
});
