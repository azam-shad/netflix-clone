const updateDetail = require('express').Router();
const poolReadyPromise = require('../utils/db.js');
const pool = require('../utils/db.js');

updateDetail.post('/updateAddress', async (req, res) => {
    const { userId, address, cities, states, country, zipCode, firstName, lastName } = req.body;
    try {
        await poolReadyPromise;
        const userSelect = await pool.query(`SELECT user_id FROM address where user_id = $1`, [userId]);

        if (userSelect.rows.length === 1) {
            // res.status(401).json({ message: 'id All Ready Exits !' });
            await pool.query(`UPDATE address SET  street = $1, city= $2, state = $3, zip_code = $4, country = $5 where user_id = $6`, [address, cities, states, zipCode, country, userId]);

            await pool.query(`UPDATE users_accounts SET firstname = $1, lastname = $2 WHERE user_id = $3`, [firstName, lastName, userId]);
        } else {
            const userAddress = await pool.query(`INSERT INTO address(user_id, street , city , state, zip_code, country) values ($1, $2, $3, $4, $5, $6 )`, [userId, address, cities, states, zipCode, country]);

            if (userAddress.rowCount !== 1) {
                console.error('Failed to Inser Address');
            }
        }
        res.json({ message: 'update success full' })

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
})




module.exports = updateDetail