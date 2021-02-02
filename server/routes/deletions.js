/**
 * BOOKLISTS ROUTES
 * todo: create count routes
 */

const pool = require("../db");

module.exports = function (app) {

    //get all deletions
    app.get("/api/deletions", async (req, res) => {
        try {
            const allBookLists = await pool.query("SELECT * FROM deletions");
            res.json(allBookLists.rows);
        } catch (err) {
            console.error(err.message);
        }
    })

    //get all user LISTTYPE deletions
    app.get("/api/deletions/:listtype/:auth0_id", async (req, res) => {
        try {
            const { listtype, auth0_id } = req.params;
            const allBookLists = await pool.query("SELECT * FROM deletions WHERE (listtype = $1) AND (auth0_id = $2)", [listtype, auth0_id]);
            res.json(allBookLists.rows);
        } catch (err) {
            console.error(err.message);
        }
    })

    //create a deletion entry
    app.post("/api/deletions", async (req, res) => {
        try {
            const { auth0_id, google_id, listtype, title, author, date, image, pages, words, date_added, type, seconds_added } = req.body;
            const newBookList = await pool.query(
                "INSERT INTO deletions (auth0_id, google_id, listtype, title, author, date, image, pages, words, date_added, type, seconds_added) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
                [auth0_id, google_id, listtype, title, author, date, image, pages, words, date_added, type, seconds_added]
            );
            res.json(newBookList.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    })

    app.get("/api/deletionactions/:auth0_id", async (req, res) => {
        try {
            const { auth0_id } = req.params;
            const mostRecent = await pool.query("SELECT * FROM deletions where auth0_id = $1", [auth0_id]);
            res.json(mostRecent.rows);
        } catch (err) {
            console.error(err.message);
        }
    })


//     //check if user has book in booklist
//     app.get("/api/booklists/:listtype/:auth0_id/:google_id", async (req, res) => {
//         try {
//             const { auth0_id, google_id, listtype } = req.params;
//             const tbr = await pool.query("SELECT id FROM booklists WHERE (auth0_id = $1) AND (google_id = $2) AND (listtype = $3)", [auth0_id, google_id, listtype]);
//             console.log(tbr.rows[0].id);
//             res.send(listtype);
//         } catch (err) {
//             res.send('not in list');
//             console.error(err.message);
//         }
//     })

//     //get a count of how many of each book are in each list
//    app.get("/api/count/:listtype/:google_id", async (req, res) => {
//         try {
//             const { google_id, listtype } = req.params;
//             const count = await pool.query("SELECT COUNT(*) FROM booklists WHERE (google_id = $1) AND (listtype = $2)", [google_id, listtype]);
//             console.log(count.rows[0].count);
//             res.send(count.rows[0].count);
//         } catch (err) {
//             res.send('not in list');
//             console.error(err.message);
//         }
//    })
    
//     //create three number summary by (1) counting ARL entries; (2) summating pages read; (3) summating words read
//     //get books read (user)
//     app.get("/api/3numsum/books/:auth0_id", async (req, res) => {
//         try {
//             const { auth0_id } = req.params;
//             const booksRead = await pool.query("SELECT COUNT(*) FROM booklists where (auth0_id = $1) and (listtype = 'ARL')", [auth0_id]);
//             res.json(booksRead.rows[0].count);
//         } catch (err) {
//             console.error(err.message);
//         }
//     })
//     //get pages read (user)
//     app.get("/api/3numsum/pages/:auth0_id", async (req, res) => {
//         try {
//             const { auth0_id } = req.params;
//             const pagesRead = await pool.query("SELECT SUM(pages::integer) from booklists where (auth0_id = $1) and (listtype = 'ARL')", [auth0_id]);
//             res.json(pagesRead.rows[0].sum);     
//         } catch (err) {
//             console.error(err.message);
//         }
//     })
//     //get words read (user)
//     app.get("/api/3numsum/words/:auth0_id", async (req, res) => {
//         try {
//             const { auth0_id } = req.params;
//             const pagesRead = await pool.query("SELECT SUM(words::integer) from booklists where (auth0_id = $1) and (listtype = 'ARL')", [auth0_id]);
//             res.json(pagesRead.rows[0].sum);
//         } catch (err) {
//             console.error(err.message);
//         }
//     })


//     //get books read (total)
//     app.get("/api/3numsum/bookcount", async (req, res) => {
//         try {
//             const booksRead = await pool.query("SELECT COUNT(*) FROM booklists where listtype = 'ARL'");
//             res.json(booksRead.rows[0].count);
//         } catch (err) {
//             console.error(err.message);
//         }
//     })
//     //get pages read (total)
//     app.get("/api/3numsum/pagecount", async (req, res) => {
//         try {
//             const pagesRead = await pool.query("SELECT SUM(pages::integer) from booklists where listtype = 'ARL'");
//             res.json(pagesRead.rows[0].sum);
//         } catch (err) {
//             console.error(err.message);
//         }
//     })
//     //get words read (total)
//     app.get("/api/3numsum/wordcount", async (req, res) => {
//         try {
//             const pagesRead = await pool.query("SELECT SUM(words::integer) from booklists where listtype = 'ARL'");
//             res.json(pagesRead.rows[0].sum);
//         } catch (err) {
//             console.error(err.message);
//         }
//     })

//     //get users most recent book
//     app.get("/api/mostrecent/:auth0_id", async (req, res) => {
//         try {
//             const { auth0_id } = req.params;
//             const mostRecent = await pool.query("SELECT * FROM booklists where id = (SELECT MAX(id) from booklists where auth0_id = $1)", [auth0_id]);
//             res.json(mostRecent.rows);
//         } catch (err) {
//             console.error(err.message);
//         }
//     })

}