/**
 * Search ROUTES
 * todo: lots
 */

const pool = require("../db");

module.exports = function (app) {
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
}
    

