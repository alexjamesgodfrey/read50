/**
 * USER ROUTES
 * todo: none
 */

const pool = require("../db.js");

module.exports = function (app) {
    
    //get all users + their info
    app.get("/api/users", async (req, res) => {
        try {
            const allUsers = await pool.query("SELECT * FROM users WHERE (words IS NOT NULL) ORDER BY words DESC LIMIT 100");
            res.json(allUsers.rows);
        } catch (err) {
            console.error(err.message);
        }
    })

    //get top 10 users levenshtein
    app.get("/api/users/levenshtein/:uname", async (req, res) => {
        try {
            const { uname } = req.params;
            const levenshtein = await pool.query("SELECT username, auth0_id FROM users ORDER BY SIMILARITY(username, $1) DESC LIMIT 10", [uname]);
            res.json(levenshtein.rows);
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
        app.get("/api/users/:auth0_id", async (req, res) => {
            try {
                const { auth0_id } = req.params;
                const user = await pool.query("SELECT * FROM users WHERE auth0_id = $1", [auth0_id]);
                res.json(user.rows);
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
    });

    //delete a user
    app.delete("/api/deleteuser/:sub", async (req, res) => {
        try {
            const { sub } = req.params;
            const deleteUser = await pool.query(
                "DELETE FROM users WHERE auth0_id = $1",
                [sub]
            );
            res.json(deleteUser.rows[0]);
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

    //set a user's username
    app.put("/api/setusername/:username/:auth0_id", async (req, res) => {
        try {
            const { username, auth0_id } = req.params;
            const setun = await pool.query("UPDATE users SET username = $1 WHERE auth0_id = $2", [username, auth0_id]);
            res.json(setun.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    })

    //set a user's email
    app.put("/api/setemail/:email/:auth0_id", async (req, res) => {
        try {
            const { email, auth0_id } = req.params;
            const setun = await pool.query("UPDATE users SET email = $1 WHERE auth0_id = $2", [email, auth0_id]);
            res.json(setun.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    })

    //set a user's photo url
    app.put("/api/seturl", async (req, res) => {
        try {
            const { picture_link, auth0_id } = req.body;
            const setun = await pool.query("UPDATE users SET picture_link = $1 WHERE auth0_id = $2", [picture_link, auth0_id]);
            res.json(setun.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    })
    
}
    

