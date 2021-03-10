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
            const allBookLists = await pool.query("SELECT * FROM booklists WHERE (listtype = $1) AND (auth0_id = $2)", [listtype, auth0_id]);
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
            const pagesRead = await pool.query("SELECT SUM(pages::integer) from booklists where listtype = 'ARL'");
            res.json(pagesRead.rows[0].sum);
        } catch (err) {
            console.error(err.message);
        }
    })
    //get words read (total)
    app.get("/api/3numsum/wordcount", async (req, res) => {
        try {
            const pagesRead = await pool.query("SELECT SUM(words::integer) from booklists where listtype = 'ARL'");
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

    //get all users + their info
    app.get("/api/users", async (req, res) => {
        try {
            const allUsers = await pool.query("SELECT * FROM users");
            res.json(allUsers.rows);
        } catch (err) {
            console.error(err.message);
        }
    })

    //get all auth0 subs
    app.get("/api/getsubs", async (req, res) => {
        try {
            const allSubs = await pool.query("SELECT auth0_id from users");
            let subsArray = allSubs.rows;
            for (let i = 0; i < subsArray.length; i++){
                subsArray[i] = subsArray[i].auth0_id;
            }
            res.json(subsArray);
        } catch (err) {
            console.error(err.message);
        }
    })

    //get a auth0_id by username
        app.get("/api/usernametosub/:uname", async (req, res) => {
            try {
                const { uname } = req.params;
                const user = await pool.query("SELECT auth0_id FROM users WHERE username = $1", [uname]);
                res.json(user.rows[0].auth0_id);
            } catch (err) {
                console.error(err.message);
            }
        })
    
    //get count of users
    app.get("/api/usercount", async (req, res) => {
        try {
            const userCount = await pool.query("SELECT COUNT(*) FROM users");
            res.json(userCount.rows[0].count);
        } catch (err) {
            console.error(err.message);
        }
    })
    
    //get user color
        app.get("/api/users/color/:auth0_id", async (req, res) => {
            try {
                const { auth0_id } = req.params;
                const user = await pool.query("SELECT color FROM users WHERE auth0_id = $1", [auth0_id]);
                console.log(user.rows[0].color);
                res.json(user.rows[0].color);
            } catch (err) {
                console.error(err.message);
            }
        })
    
    //get user username
        app.get("/api/users/username/:auth0_id", async (req, res) => {
            try {
                const { auth0_id } = req.params;
                const user = await pool.query("SELECT username FROM users WHERE auth0_id = $1", [auth0_id]);
                console.log(user.rows[0].username);
                res.json(user.rows[0].username);
            } catch (err) {
                console.error(err.message);
            }
        })
    
    //set user color
        app.put("/api/users/color/:auth0_id", async (req, res) => {
        try {
            const { auth0_id } = req.params;
            const { color } = req.body;
            const updateBook = await pool.query(
                "UPDATE users SET color = $1 WHERE auth0_id = $2",
                [color, auth0_id]
            );
            res.json("user was updated");
            res.json(updateBook.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    })

    //check if user is in db
    /**
     * 'valid user' is responded if the user is in the database
     * this makes sure that no users are added twice to the database
     */
        app.get("/api/users/herecheck/:auth0_id", async (req, res) => {
            try {
                const { auth0_id } = req.params;
                const user = await pool.query("SELECT user_id FROM users WHERE auth0_id = $1", [auth0_id]);
                console.log(user.rows[0].user_id);
                res.send('valid user');
            } catch (err) {
                res.send('invalid user');
                console.error(err.message);
            }
        })

    //create a user
    app.post("/api/users", async (req, res) => {
        try {
            const { auth0_id, email, username, picture_link, logincount, color } = req.body;
            const newUser = await pool.query(
                "INSERT INTO users (auth0_id, email, username, picture_link, logincount, color) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
                [auth0_id, email, username, picture_link, logincount, color]
            );
            res.json(newUser.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    })

    //get a user's goal
    app.get("/api/goal/:auth0_id", async (req, res) => {
        try {
            const { auth0_id } = req.params;
            const goal = await pool.query("SELECT goal FROM users WHERE auth0_id = $1", [auth0_id]);
            res.json(goal.rows[0].goal);
        } catch (err) {
            console.error(err.message);
        }
    })

    //set a user's goal
    app.put("/api/setgoal/:number/:auth0_id", async (req, res) => {
        try {
            const { number, auth0_id } = req.params;
            const goal = await pool.query("UPDATE users SET goal = $1 WHERE auth0_id = $2", [number, auth0_id]);
            res.json(goal.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    })

}