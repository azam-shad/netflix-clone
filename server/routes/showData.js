const view = require('express').Router()
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const poolReadyPromise = require('../utils/db.js');
const pool = require('../utils/db.js');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/profilImage');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname)); // Use the original filename
    }
});

const fileFilter = (req, file, cb) => {
    // Validate file type
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images are allowed.'), false);
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});



view.get('/getImage', async (req, res) => {
    const userId = req.query.userId;

    try {
        const result = await pool.query('SELECT image FROM users_accounts WHERE user_id = $1', [userId]);

        if (result.rows.length > 0) {
            const imageData = result.rows[0].image;
            res.setHeader('Content-Type', 'image/jpeg'); // Adjust the content type based on your image type
            res.json(imageData);
        } else {
            res.status(404).json({ success: false, message: 'Image not found for the specified user ID' });
        }
    } catch (error) {
        console.error('Error retrieving image:', error);
        res.status(500).json({ success: false, message: 'Error retrieving image from the database' });
    }

})

view.post('/views', async (req, res) => {
    const userId = req.body.userId;
    try {
        await poolReadyPromise;
        const user = await pool.query(`SELECT * FROM users_accounts where user_id = $1`, [userId]);
        const users_email = user.rows[0].email
        const firstName = user.rows[0].firstname;
        const lastName = user.rows[0].lastname;
        const phoneNumber = user.rows[0].phonenumber;
        const countryCode = user.rows[0].countrycode;
        const createdOn = user.rows[0].created_on;
        const lastLogin = user.rows[0].last_login;
        const gender = user.rows[0].gender;
        // console.log(users_image)
        res.json({ users_email, firstName, lastName, phoneNumber, countryCode, createdOn, lastLogin, gender })

    } catch (error) {
        console.error('Error fetching image from database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})
view.post('/viewAddress', async (req, res) => {
    const userId = req.body.userId;
    console.log("userId: ", userId);
    try {
        await poolReadyPromise;
        const user = await pool.query(`SELECT * FROM address WHERE user_id = $1`, [userId]);

        const user_street = user.rows[0].street;
        const user_city = user.rows[0].city;
        const user_state = user.rows[0].state;
        const user_zipcode = user.rows[0].zip_code;
        const user_country = user.rows[0].country;
        res.json({
            user_street, user_city,
            user_state,
            user_zipcode,
            user_country
        })

    } catch (error) {
        console.error('Error fetching image from database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// update image
view.post('/updateImage', upload.single('file'), async (req, res) => {
    try {
        const userId = req.body.userId;
        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No image file provided' });
        }

        const { filename, path, mimetype } = req.file;
        console.log('Uploaded File:', { filename, path, mimetype });

        const imageUrl = `${req.file.filename}`;

        const success = await pool.query(`UPDATE users_accounts SET image = $1 WHERE user_id = $2`, [imageUrl, userId]);

        if (success) {
            res.json({ success: true, message: 'Image updated successfully' });
        } else {
            res.status(500).json({ success: false, message: 'Error updating image in the database' });
        }
    } catch (error) {
        console.error('Error during image upload:', error);
        res.status(500).json({ success: false, message: 'Image upload failed' });
    }

})


view.get('/getPlans', async (req, res) => {
    // const userId = req.query.userId;

    try {
        const result = await pool.query(`SELECT * FROM subscriptions_cat`);
        const AdminRole = await pool.query(`SELECT * FROM users_roles`);

        const subscriptionsName = result.rows
        const adminRoles = AdminRole.rows


        res.json({ subscriptionsName, adminRoles })
    } catch (error) {
        console.error('Error retrieving image:', error);
        res.status(500).json({ success: false, message: 'Error retrieving image from the database' });
    }

})




module.exports = view