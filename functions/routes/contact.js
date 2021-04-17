/**
 * contact ROUTES
 * todo: lots
 */

const pool = require("../db.js");

module.exports = function (app) {
    //create a contact entry
    app.post("/api/contact", async (req, res) => {
        try {
            const { from, type, title, body, date } = req.body;
            const contact = await pool.query(
                "INSERT INTO contact (email, objective, title, body, date_sent) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [from, type, title, body, date]
            );
            res.json(contact.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    })
}
    

