/**
 * BOOKLISTS ROUTES
 * todo: create count routes
 */

const pool = require("../db.js");

module.exports = function (app) {

    //get all booklists
    app.get("/api/booklists", async (req, res) => {
        try {
            const allBookLists = await pool.query("SELECT * FROM booklists");
            res.json(allBookLists.rows);
        } catch (err) {
            console.error(err.message);
        }
    })

    //get all user LISTTYPE booklists
    app.get("/api/booklists/:listtype/:auth0_id", async (req, res) => {
        try {
            const { listtype, auth0_id } = req.params;
            const allBookLists = await pool.query("SELECT * FROM booklists WHERE (listtype = $1) AND (auth0_id = $2) ORDER BY year_read DESC", [listtype, auth0_id]);
            res.json(allBookLists.rows);
        } catch (err) {
            console.error(err.message);
        }
    })

    //create a booklist entry
    app.post("/api/booklists", async (req, res) => {
        try {
            const { auth0_id, google_id, listtype, title, author, date, image, pages, words, date_added, seconds_added, month_read, year_read, review, recommend, format } = req.body;
            const newBookList = await pool.query(
                "INSERT INTO booklists (auth0_id, google_id, listtype, title, author, date, image, pages, words, date_added, type, seconds_added, month_read, year_read, review, recommend, format) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'add', $11, $12, $13, $14, $15, $16) RETURNING *",
                [auth0_id, google_id, listtype, title, author, date, image, pages, words, date_added, seconds_added, month_read, year_read, review, recommend, format]
            );
            res.json(newBookList.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    })

    //edit a booklist entry
    app.put("/api/booklists/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const { month_read, year_read, review, recommend, format } = req.body;
            const editBook = await pool.query(
                "UPDATE booklists SET month_read=$1, year_read=$2, review=$3, recommend=$4, format=$5 WHERE id=$6",
                [month_read, year_read, review, recommend, format, id]
            );
            res.json(editBook.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    })

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


    //check if user has book in booklist
    app.get("/api/booklists/:listtype/:auth0_id/:google_id", async (req, res) => {
        try {
            const { auth0_id, google_id, listtype } = req.params;
            const tbr = await pool.query("SELECT id FROM booklists WHERE (auth0_id = $1) AND (google_id = $2) AND (listtype = $3)", [auth0_id, google_id, listtype]);
            console.log(tbr.rows[0].id);
            res.send(listtype);
        } catch (err) {
            res.send('not in list');
            console.error(err.message);
        }
    })

    //efficient checks query
    app.get("/api/getchecks/:auth0_id/:google_id", async (req, res) => {
        try {
            const { auth0_id, google_id } = req.params;
            const checks = await pool.query("SELECT listtype, COUNT(*) FROM booklists WHERE (auth0_id = $1) AND (google_id = $2) GROUP BY listtype;", [auth0_id, google_id]);
            res.send(checks.rows);
        } catch (err) {
            res.send('not in list');
            console.error(err.message);
        }
    })

    //get a count of how many of each book are in each list
   app.get("/api/count/:listtype/:google_id", async (req, res) => {
        try {
            const { google_id, listtype } = req.params;
            const count = await pool.query("SELECT COUNT(*) FROM booklists WHERE (google_id = $1) AND (listtype = $2)", [google_id, listtype]);
            console.log(count.rows[0].count);
            res.send(count.rows[0].count);
        } catch (err) {
            res.send('not in list');
            console.error(err.message);
        }
   })
    
   //efficient count query
    app.get("/api/totalcount/:google_id", async (req, res) => {
        try {
            const { google_id } = req.params;
            const count = await pool.query("SELECT listtype, COUNT(*) FROM booklists WHERE (google_id = $1) GROUP BY listtype;", [google_id]);
            res.send(count.rows);
        } catch (err) {
            res.send('not in list');
            console.error(err.message);
        }
    })
    
    //create three number summary by (1) counting ARL entries; (2) summating pages read; (3) summating words read
    //get books read (user)
    app.get("/api/3numsum/books/:auth0_id", async (req, res) => {
        try {
            const { auth0_id } = req.params;
            const booksRead = await pool.query("SELECT COUNT(*) FROM booklists where (auth0_id = $1) and (listtype = 'ARL')", [auth0_id]);
            res.json(booksRead.rows[0].count);
        } catch (err) {
            console.error(err.message);
        }
    })
    //get pages read (user)
    app.get("/api/3numsum/pages/:auth0_id", async (req, res) => {
        try {
            const { auth0_id } = req.params;
            const pagesRead = await pool.query("SELECT SUM(pages::integer) from booklists where (auth0_id = $1) and (listtype = 'ARL')", [auth0_id]);
            res.json(pagesRead.rows[0].sum);     
        } catch (err) {
            console.error(err.message);
        }
    })
    //get words read (user)
    app.get("/api/3numsum/words/:auth0_id", async (req, res) => {
        try {
            const { auth0_id } = req.params;
            const pagesRead = await pool.query("SELECT SUM(words::integer) from booklists where (auth0_id = $1) and (listtype = 'ARL')", [auth0_id]);
            res.json(pagesRead.rows[0].sum);
        } catch (err) {
            console.error(err.message);
        }
    })


    //get books read (total)
    app.get("/api/3numsum/bookcount", async (req, res) => {
        try {
            const booksRead = await pool.query("SELECT COUNT(*) FROM booklists where listtype = 'ARL'");
            res.json(booksRead.rows[0].count);
        } catch (err) {
            console.error(err.message);
        }
    })
    //get pages read (total)
    app.get("/api/3numsum/pagecount", async (req, res) => {
        try {
            const pagesRead = await pool.query("SELECT SUM((CASE WHEN pages != 'undefined' THEN pages WHEN pages = 'undefined' THEN '0' END)::INTEGER) FROM booklists WHERE (listtype = 'ARL')");
            res.json(pagesRead.rows[0].sum);
        } catch (err) {
            console.error(err.message);
        }
    })
    //get words read (total)
    app.get("/api/3numsum/wordcount", async (req, res) => {
        try {
            const pagesRead = await pool.query("SELECT SUM((CASE WHEN words != 'NaN' THEN words WHEN words = 'NaN' THEN '0' END)::INTEGER) from booklists where listtype = 'ARL'");
            res.json(pagesRead.rows[0].sum);
        } catch (err) {
            console.error(err.message);
        }
    })

    //get users most recent book
    app.get("/api/mostrecent/:auth0_id", async (req, res) => {
        try {
            const { auth0_id } = req.params;
            const mostRecent = await pool.query("SELECT * FROM booklists where id = (SELECT MAX(id) from booklists where auth0_id = $1)", [auth0_id]);
            res.json(mostRecent.rows);
        } catch (err) {
            console.error(err.message);
        }
    })

    //get all actions 
    app.get("/api/booklistactions/:auth0_id", async (req, res) => {
        try {
            const { auth0_id } = req.params;
            const mostRecent = await pool.query("SELECT * FROM booklists where auth0_id = $1", [auth0_id]);
            res.json(mostRecent.rows);
        } catch (err) {
            console.error(err.message);
        }
    })

    //get books read in 2021 by user
    app.get("/api/twooneread/:auth0_id", async (req, res) => {
        try {
            const { auth0_id } = req.params;
            const realId = auth0_id;
            const books2021 = await pool.query("SELECT COUNT(*) FROM booklists WHERE (auth0_id = $1) AND (listtype = 'ARL') AND (seconds_added::bigint > 1609459200)", [realId]);
            res.json(books2021.rows[0].count);
        } catch (err) {
            console.error(err.message);
        }
    })

    //get the date a book was added
    app.get("/api/addeddate/:auth0_id/:google_id/:listtype", async (req, res) => {
        try {
            const { auth0_id, google_id, listtype } = req.params;
            const addedDate = await pool.query("SELECT date_added FROM booklists WHERE (auth0_id = $1) AND (google_id = $2) AND (listtype = $3)", [auth0_id, google_id, listtype]);
            res.json(addedDate.rows[0].date_added);
        } catch (err) {
            console.error(err.message);
        }
    })

    //get the seconds a book was added
    app.get("/api/addedseconds/:auth0_id/:google_id/:listtype", async (req, res) => {
        try {
            const { auth0_id, google_id, listtype } = req.params;
            const addedSeconds = await pool.query("SELECT seconds_added FROM booklists WHERE (auth0_id = $1) AND (google_id = $2) AND (listtype = $3)", [auth0_id, google_id, listtype]);
            res.json(addedSeconds.rows[0].seconds_added);
        } catch (err) {
            console.error(err.message);
        }
    })

}