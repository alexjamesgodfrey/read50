//import essentials
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;

//process.env.PORT
//process.env.NODE_ENV => production or undefined

//middleware
app.use(cors());
app.use(express.json()); //req.body
if (process.env.NODE_ENV === "production") {
    //server static content
    //npm run build (index.html)
    app.use(express.static(path.join(__dirname, "../build")));
}

// import routes
require('./routes/users.js')(app);
require('./routes/booklists.js')(app);
require('./routes/shelves.js')(app);
require('./routes/leaderboards.js')(app);
require('./routes/deletions.js')(app);


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


//create a search 
app.post("/api/searches", async (req, res) => {
  try {
    const { search_string, madebyid, madebyusername } = req.body;
    const newSearch = await pool.query(
      "INSERT INTO searches (search_string, madebyid, madebyusername) VALUES($1, $2, $3) RETURNING *",
      [search_string, madebyid, madebyusername]
    );
    res.json(newSearch.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all searches
app.get("/api/searches", async (req, res) => {
    try {
        const allSearches = await pool.query("SELECT * FROM searches");
        res.json(allSearches.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//get a search by id
app.get("api/searches/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const search = await pool.query(
            "SELECT * FROM searches WHERE search_id = $1", [id]);
        res.json(search.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//get a users search history 
app.get("/api/searches/:auth0_id", async (req, res) => {
    try {
        const { auth0_id } = req.params;
        const user = await pool.query("SELECT search_string FROM searches WHERE madeById = $1 ORDER BY id DESC LIMIT 3", [auth0_id]);
        res.json(user.rows);
    } catch (err) {
        console.error(err.message);
    }
})


//get all booklists
app.get("/api/booklists", async (req, res) => {
    try {
        const allBookLists = await pool.query("SELECT * FROM booklists");
        res.json(allBookLists.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get all user LISTTYPE booklists
app.get("/api/booklists/:listtype/:auth0_id", async (req, res) => {
    try {
        const { listtype, auth0_id } = req.params;
        const allBookLists = await pool.query("SELECT * FROM booklists WHERE (listtype = $1) AND (auth0_id = $2)", [listtype, auth0_id]);
        res.json(allBookLists.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//create a booklist entry
app.post("/api/booklists", async (req, res) => {
    try {
        const { auth0_id, google_id, listtype, title, author, date, image } = req.body;
        const newBookList = await pool.query(
            "INSERT INTO booklists (auth0_id, google_id, listtype, title, author, date, image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [auth0_id, google_id, listtype, title, author, date, image]
        );
        res.json(newBookList.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//delete a booklist entry
app.delete("/api/booklists/:auth0_id/:listtype/:google_id", async (req, res) => {
    try {
        const { auth0_id, listtype, google_id } = req.params;
        const deleteBooklist = await pool.query("DELETE FROM booklists WHERE (auth0_id = $1) AND (listtype = $2) AND (google_id = $3)", [auth0_id, listtype, google_id]);
        res.json("Booklist was deleted");
    } catch (err) {
        console.error(err.message);
    }
})


//check if user has book in TBR
app.get("/api/booklists/TBR/:auth0_id/:google_id", async (req, res) => {
    try {
        const { auth0_id, google_id } = req.params;
        const tbr = await pool.query("SELECT id FROM booklists WHERE (auth0_id = $1) AND (google_id = $2) AND (listtype = 'TBR')", [auth0_id, google_id]);
        console.log(tbr.rows[0].id);
        res.send('TBR');
    } catch (err) {
        res.send('notTBR');
        console.error(err.message);
    }
});

//check if user has book in CURR
app.get("/api/booklists/CURR/:auth0_id/:google_id", async (req, res) => {
    try {
        const { auth0_id, google_id } = req.params;
        const tbr = await pool.query("SELECT id FROM booklists WHERE (auth0_id = $1) AND (google_id = $2) AND (listtype = 'CURR')", [auth0_id, google_id]);
        console.log(tbr.rows[0].id);
        res.send('CURR');
    } catch (err) {
        res.send('notCURR');
        console.error(err.message);
    }
});

//check if user has book in ARL
app.get("/api/booklists/ARL/:auth0_id/:google_id", async (req, res) => {
    try {
        const { auth0_id, google_id } = req.params;
        const tbr = await pool.query("SELECT id FROM booklists WHERE (auth0_id = $1) AND (google_id = $2) AND (listtype = 'ARL')", [auth0_id, google_id]);
        console.log(tbr.rows[0].id);
        res.send('ARL');
    } catch (err) {
        res.send('notARL');
        console.error(err.message);
    }
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build"));
})


app.listen(PORT, '0.0.0.0' => {
    console.log(`server has started on port ${PORT}`);
});
