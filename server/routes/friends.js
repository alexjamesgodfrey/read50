/**
 * FRIENDS ROUTES
 * todo: lots
 */

 const pool = require("../db.js");

 module.exports = function (app) {
     //view outoing (pending) requests by sub
     app.get("/api/friends/outgoing/:sub", async (req, res) => {
        try {
            const { sub } = req.params;
            const outgoing = await pool.query("SELECT username_b FROM friends WHERE auth0_a = $1 AND pending = true", [sub]);
            res.json(outgoing.rows);
        } catch (err) {
            console.error(err.message);
        }
    });
    //view outoing (complete) requests by sub
    app.get("/api/friends/:sub", async (req, res) => {
        try {
            const { sub } = req.params;
            const outgoing = await pool.query("SELECT username_b FROM friends WHERE auth0_a = $1 AND pending = false", [sub]);
            res.json(outgoing.rows);
        } catch (err) {
            console.error(err.message);
        }
    });
    //cancel an outoging request
    app.delete("/api/friends/cancel/:sub/:uname", async (req, res) => {
        try {
            const { sub, uname } = req.params;
            const cancelRequest = await pool.query(
                "DELETE FROM friends WHERE (auth0_a = $1) AND (username_b = $2)", 
                [sub, uname]
            );
            res.json(cancelRequest.rows);
        } catch (err) {
            console.error(err.message);
        }
    })
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
            const { auth0_a, auth0_b, username_a, username_b } = req.body;
            const newRequest = await pool.query(
                "INSERT INTO friends (auth0_a, auth0_b, username_a, username_b, pending, accepted) VALUES ($1, $2, $3, $4, true, false) RETURNING *",
                [auth0_a, auth0_b, username_a, username_b]
            );
            res.json(newBookList.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    })
    //reject a request
    app.delete("/api/friends/rejectrequest/:sub/:uname", async (req, res) => {
        try {
            const { sub, uname } = req.params;
            const deleteRequest = await pool.query(
                "DELETE FROM friends WHERE (auth0_b = $1) AND (username_a = $2)", 
                [sub, uname]
            );
            res.json(deleteRequest.rows);
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
     
 
 