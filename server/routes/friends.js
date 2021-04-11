/**
 * FRIENDS ROUTES
 * todo: lots
 */

 const pool = require("../db.js");

 module.exports = function (app) {
     //view outoing requests by sub
     app.get("/api/friends/outgoing/:sub", async (req, res) => {
        try {
            const { sub } = req.params;
            const outgoing = await pool.query("SELECT * FROM friends WHERE auth0_a = $1", [sub]);
            res.json(outgoing.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    });
     //view incoming requests by sub
     app.get("/api/friends/incoming/:sub", async (req, res) => {
        try {
            const { sub } = req.params;
            const incoming = await pool.query("SELECT username_a FROM friends WHERE auth0_b = $1", [sub]);
            res.json(incoming.rows);
        } catch (err) {
            console.error(err.message);
        }
    });
     //create a request
    app.post("/api/friends/createrequest", async (req, res) => {
        try {
            const { asub, aun, bsub, bun } = req.body;
            const newRequest = await pool.query(
                "INSERT INTO friends (auth0_a, auth0_b, username_a, username_b, pending) VALUES ($1, $2, $3, $4, true) RETURNING *",
                [asub, bsub, aun, bun]
            );
            res.json(newBookList.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    })
     app.get("/api/friends", async (req, res) => {
         try {
             const get = await pool.query("SELECT * FROM friends");
             res.json(get.rows[0]);
         } catch (err) {
             console.error(err.message);
         }
     })
 }
     
 
 