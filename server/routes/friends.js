/**
 * FRIENDS ROUTES
 * todo: lots
 */

 const pool = require("../db.js");

module.exports = function (app) {
    //CREATE
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

    //OUTGOING
    //cancel an outgoing request
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
    //view outgoing (pending) requests by sub
    app.get("/api/friends/outgoing/:sub", async (req, res) => {
        try {
            const { sub } = req.params;
            const outgoing = await pool.query("SELECT username_b FROM friends WHERE auth0_a = $1 AND pending = true", [sub]);
            res.json(outgoing.rows);
        } catch (err) {
            console.error(err.message);
        }
    });

    //INCOMING
    //view incoming requests by sub
    app.get("/api/friends/incoming/:sub", async (req, res) => {
        try {
            const { sub } = req.params;
            const incoming = await pool.query("SELECT username_a FROM friends WHERE auth0_b = $1 AND pending = true", [sub]);
            res.json(incoming.rows);
        } catch (err) {
            console.error(err.message);
        }
    });
    //reject a request
    app.delete("/api/friends/rejectrequest/:sub/:uname", async (req, res) => {
        try {
            const { sub, uname } = req.params;
            const deleteRequest = await pool.query(
                "DELETE FROM friends WHERE (auth0_b = $1) AND (username_a = $2) AND (pending = true)", 
                [sub, uname]
            );
            res.json(deleteRequest.rows);
        } catch (err) {
            console.error(err.message);
        }
    })
    //accept a request
    app.put("/api/friends/acceptrequest/:sub/:uname", async (req, res) => {
        try {
            const { sub, uname } = req.params;
            const acceptRequest = await pool.query(
                "UPDATE friends SET pending = false, accepted = true WHERE auth0_b = $1 AND username_a = $2", 
                [sub, uname]
            );
            res.json(acceptRequest.rows);
        } catch (err) {
            console.error(err.message);
        }
    })

    //COMPLETED
    //view accepted requests by sub (to me)
    app.get("/api/friends/tome/:sub", async (req, res) => {
        try {
            const { sub } = req.params;
            const outgoing = await pool.query("SELECT username_a FROM friends WHERE auth0_b = $1 AND pending = false AND accepted = true", [sub]);
            res.json(outgoing.rows);
        } catch (err) {
            console.error(err.message);
        }
    });
    //view accepted requests by sub (from me)
    app.get("/api/friends/fromme/:sub", async (req, res) => {
        try {
            const { sub } = req.params;
            const outgoing = await pool.query("SELECT username_b FROM friends WHERE auth0_a = $1 AND pending = false AND accepted = true", [sub]);
            res.json(outgoing.rows);
        } catch (err) {
            console.error(err.message);
        }
    });
    //remove a friend
    app.delete("/api/friends/remove/:sub/:uname", async (req, res) => {
        try {
            const { sub, uname } = req.params;
            const first = await pool.query(
                "DELETE FROM friends WHERE (auth0_a = $1) AND (username_b = $2) AND (accepted = true)", 
                [sub, uname]
            );
            const second = await pool.query(
                "DELETE FROM friends WHERE (auth0_b = $1) AND (username_a = $2) AND (accepted = true)", 
                [sub, uname]
            );
            res.json(first.rows);
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
     
 
 