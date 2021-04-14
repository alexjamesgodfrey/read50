/**
 * LEADERBOARDS ROUTES
 * todo: lots
 */

const pool = require("../db.js");

module.exports = function (app) {
    app.get("/api/leaderboards", async (req, res) => {
        try {
            const get = await pool.query("SELECT * FROM leaderboards");
            res.json(get.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    })
}
    

