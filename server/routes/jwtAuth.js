const router = require('express').Router();
// const { Pool } = require('pg');
const poolReadyPromise = require('../utils/db.js');
const pool = require('../utils/db.js')
require('dotenv').config();
const jwtGenerator = require('../utils/jwtGenerator');
const bcrypt = require('bcrypt');


// Route for user Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('email Address: ', email);
        console.log('Password : ', password);
        await poolReadyPromise; // Wait for the pool to be ready

        // check if the user exist or not (if not then throw error)
        const user = await pool.query(`
            SELECT ua.*
            FROM users_accounts ua
            INNER JOIN users_account_roles uar ON ua.user_id = uar.user_id
            INNER JOIN users_roles ur ON uar.role_id = ur.role_id
            WHERE ur.role_name = 'user'
            AND ua.email = $1
        `, [email]);


        if (user.rows.length === 0 || user.rows[0].email !== email) {
            return res.status(401).json({ message: 'Invalid Email ID' });
        }

        const hashedPassword = user.rows[0].password;
        if (password !== hashedPassword) {
            return res.status(401).json({ message: 'Invalid Password' });
        }
        if (user.rows[0].status !== 'enable') {
            return res.status(401).json({ message: 'User is Disable' });
        }

        const updateLastLoginTime = await pool.query(`UPDATE users_accounts SET last_login = NOW() WHERE user_id = $1`, [user.rows[0].user_id]);

        if (updateLastLoginTime.rowCount !== 1) {
            console.error('Failed to update last_login_time');
        }
        // give the jwt token to the user
        const token = await jwtGenerator(user.rows[0].user_id);
        const FirstName = user.rows[0].firstName;
        const LastName = user.rows[0].lastName;
        const user_id = user.rows[0].user_id;
        const user_email = user.rows[0].email;
        const user_role = user.rows[0].role;
        res.json({ message: "Logged in successfully", token, FirstName, LastName, user_email, user_id, user_role });

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
})

// Route for Admin Login

router.post('/adminLogin', async (req, res) => {
    try {
        const { email, password, adminRoles } = req.body;
        console.log('email Address: ', email);
        console.log('Password : ', password);
        console.log('Admin Role : ', adminRoles);
        await poolReadyPromise; // Wait for the pool to be ready

        // check if the user exist or not (if not then throw error)
        const user = await pool.query(`
            SELECT ua.*
            FROM admin_accounts ua
            INNER JOIN users_account_roles uar ON ua.admin_id = uar.admin_id
            INNER JOIN users_roles ur ON uar.role_id = ur.role_id
            WHERE ur.role_name = $1
            AND ua.email = $2
        `, [adminRoles, email])

        if (user.rows.length === 0 || user.rows[0].email !== email) {
            return res.status(401).json({ message: 'Invalid Email ID' });
        }

        const hashedPassword = user.rows[0].password;

        if (password !== hashedPassword) {
            return res.status(401).json({ message: 'Invalid Password' });
        }
        if (user.rows[0].status !== 'enable') {
            return res.status(401).json({ message: 'User is Disable' });
        }

        const updateLastLoginTime = await pool.query(`UPDATE admin_accounts SET last_login = NOW() WHERE admin_id = $1`, [user.rows[0].admin_id]);

        if (updateLastLoginTime.rowCount !== 1) {
            console.error('Failed to update last_login_time');
        }
        // give the jwt token to the user
        const admintoken = await jwtGenerator(user.rows[0].admin_id);
        const FirstName = user.rows[0].firstName;
        const LastName = user.rows[0].lastName;
        const user_id = user.rows[0].admin_id;
        const user_email = user.rows[0].email;
        const user_role = user.rows[0].role;
        res.json({ message: "Admin Logged in successfully", admintoken, FirstName, LastName, user_email, user_id, user_role });

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
})

// Route for update user Password
router.post('/updatePassword', async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        await poolReadyPromise;
        const user = await pool.query(`SELECT * FROM users_accounts where email = $1`, [email]);

        if (user.rows.length !== 1) {
            return res.status(401).json({ message: 'Invalid Email ID !' });
        }

        const updateUser = await pool.query(`UPDATE users_accounts SET password = $1 WHERE email = $2`, [newPassword, email]);

        if (updateUser.rowCount !== 1) {
            return res.status(401).json({ message: 'Password Updation Failed' });
        } else {
            return res.status(200).json({ message: 'Password Updated Succesfully' });
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
})

// get the email Address
router.post('/getEmail', async (req, res) => {
    const userId = req.body.userId;
    try {
        await poolReadyPromise;
        const user = await pool.query(`SELECT email FROM users_accounts where user_id = $1`, [userId]);
        const user_email = user.rows[0].email;

        res.json({ user_email })
    } catch (error) {
        console.error('Error fetching email from database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// check old password
router.post('/checkOldPassword', async (req, res) => {
    const { email, oldPassword } = req.body;
    try {
        await poolReadyPromise;
        const user = await pool.query(`SELECT * FROM users_accounts where email = $1`, [email]);
        if (user.rows.length !== 1) {
            return res.status(401).json({ message: 'Invalid Email ID !' });
        }
        if (oldPassword !== user.rows[0].password) {
            return res.status(401).json({ success: false, message: 'Incorrect old password' });
        }
        res.json({ success: true, message: 'Old password is correct' });

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }

})

// Route for New Account
router.post('/createNewAccount', async (req, res) => {
    const { selectedGender, countryCode, FirstName, LastName, userEmail, phoneNumber, loginPassword, selectPlan } = req.body;

    console.log('selectPlan: ', selectPlan)

    try {
        await poolReadyPromise;

        const user = await pool.query('SELECT email FROM users_accounts where email = $1', [userEmail]);
        if (user.rows.length > 0) {
            return res.status(401).json('User Already Exits !');
        }

        const subscriptionsCat = await pool.query(`SELECT subscription_cat_id FROM subscriptions_cat WHERE name = $1`, [selectPlan]);
        const subscriptionCatId = subscriptionsCat.rows[0].subscription_cat_id;

        const subscriptionInsertResult = await pool.query(`INSERT INTO subscriptions (subscription_cat_id) VALUES ($1) RETURNING subscription_id`, [subscriptionCatId])
        const subscriptionId = subscriptionInsertResult.rows[0].subscription_id;

        // const subsID = pool.query(`select subscription_id from subscriptions`);
        // const subscriptionId = subsID.rows[0].subscriptionId

        const userStatus = 'enable'
        const newUser = await pool.query('INSERT INTO users_accounts(firstName, password, email, created_on, last_login, gender, countryCode, phoneNumber, lastname, status, subscription_id) values ($1, $2, $3, NOW(), NOW(), $4, $5, $6, $7, $8, $9 ) RETURNING user_id', [FirstName, loginPassword, userEmail, selectedGender, countryCode, phoneNumber, LastName, userStatus, subscriptionId]);

        const user_id = newUser.rows[0].user_id;

        const roleName = 'user'; // Change this to the desired role name
        const roleDB = await pool.query(`SELECT role_id FROM users_roles WHERE role_name = $1`, [roleName]);
        const roleId = roleDB.rows[0].role_id;

        await pool.query(`
            INSERT INTO users_account_roles (user_id, role_id, grant_date)
            VALUES ($1, $2, NOW())
        `, [user_id, roleId]);


        // const defaultRole = 'user';
        // await pool.query(`
        //     INSERT INTO users_account_roles (user_id, role_id, grant_date)
        //     VALUES ($1, (SELECT role_id FROM users_roles WHERE role_name = $2), NOW())
        // `, [user_id, defaultRole]);


        const token = await jwtGenerator(user_id);
        const userFirstName = newUser.rows[0].firstname;
        console.log(FirstName);
        const userLastName = newUser.rows[0].lastname;
        const user_email = newUser.rows[0].email;
        res.json({ message: "Account Create successfully", user_id, userFirstName, user_email, token, userLastName });

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
})


router.post('/createAdminNewAccount', async (req, res) => {
    const { firstname, lastname, email, mobile, zip_code, street, password, country, countryCode, state, city, gender, adminRole } = req.body;

    // console.log('firstname, lastname, email, mobile, zip_code, address, password, country, countryCode, state : ', firstname, lastname, email, mobile, zip_code, street, password, country, countryCode, state)

    try {
        await poolReadyPromise;

        const user = await pool.query('SELECT email FROM admin_accounts where email = $1', [email]);
        if (user.rows.length > 0) {
            return res.status(401).json('User Already Exits !');
        }
        const userStatus = 'enable'
        const newUser = await pool.query('INSERT INTO admin_accounts(firstName, password, email, created_on, last_login, gender, countryCode, phoneNumber, lastname, status) values ($1, $2, $3, NOW(), NOW(), $4, $5, $6, $7, $8 ) RETURNING admin_id', [firstname, password, email, gender, countryCode, mobile, lastname, userStatus]);

        const user_id = newUser.rows[0].admin_id;

        // const { firstname, lastname, email, mobile, zip_code, street, password, country, countryCode, state } = req.body;

        // Insert address data
        await pool.query(`
            INSERT INTO address(admin_id, street, state, zip_code, country, city) 
            VALUES ($1, $2, $3, $4, $5, $6)`,
            [user_id, street, state, zip_code, country, city]);

        // const defaultRole = 'admin';
        //const roleName = 'admin'; // Change this to the desired role name
        const roleDB = await pool.query(`SELECT role_id FROM users_roles WHERE role_name = $1`, [adminRole]);
        const roleId = roleDB.rows[0].role_id;

        // await pool.query(`
        //     INSERT INTO users_account_roles (user_id, role_id, grant_date)
        //     VALUES ($1, (SELECT role_id FROM users_roles WHERE role_name = $2), NOW())
        // `, [user_id, defaultRole]);
        await pool.query(`
            INSERT INTO users_account_roles (admin_id, role_id, grant_date)
            VALUES ($1, $2, NOW())
        `, [user_id, roleId]);


        const token = await jwtGenerator(user_id);
        // const userFirstName = newUser.rows[0].firstname;
        // console.log(FirstName);
        // const userLastName = newUser.rows[0].lastname;
        // const user_email = newUser.rows[0].email;
        res.json({ message: "Account Create successfully", user_id, token });
        // res.json({ message: "Account Create successfully" });

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
})

module.exports = router;
