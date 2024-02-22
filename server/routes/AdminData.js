const adminData = require('express').Router();
const poolReadyPromise = require('../utils/db');
const pool = require('../utils/db');


adminData.get('/counts', async (req, res) => {
    await poolReadyPromise

    const userCounts = await pool.query(`SELECT COUNT(uar.user_id)
    FROM users_account_roles uar
    JOIN users_roles ur ON uar.role_id = ur.role_id
    JOIN users_accounts ua ON uar.user_id = ua.user_id
    WHERE ur.role_name = 'user'
    AND ua.status = 'enable'`);

    const disableUserCounts = await pool.query(`SELECT COUNT(uar.user_id)
    FROM users_account_roles uar
    JOIN users_roles ur ON uar.role_id = ur.role_id
    JOIN users_accounts ua ON uar.user_id = ua.user_id
    WHERE ur.role_name = 'user'
    AND ua.status = 'disable'`);

    const adminCounts = await pool.query(`SELECT COUNT(user_id)
    FROM users_account_roles uar
    JOIN users_roles ur ON uar.role_id = ur.role_id
    WHERE ur.role_name = 'admin'`);

    const subscribed_user_count = await pool.query(`SELECT COUNT(ua.subscription_id)
    FROM users_accounts ua
    JOIN users_account_roles uar ON ua.user_id = uar.user_id
    JOIN users_roles ur ON uar.role_id = ur.role_id
    WHERE ur.role_name = 'user'
    AND ua.status = 'enable'
    AND ua.subscription_id IS NOT NULL;`);

    const moviesCount = await pool.query(`select count(distinct movie_id) from movies;`);

    const countsUser = userCounts.rows[0].count
    const countsAdmin = adminCounts.rows[0].count
    const disableUsers = disableUserCounts.rows[0].count
    const subscribed = subscribed_user_count.rows[0].count
    const countMovies = moviesCount.rows[0].count

    res.json({ countsUser, countsAdmin, disableUsers, subscribed, countMovies })
})

adminData.get('/userDetails', async (req, res) => {

    try {
        await poolReadyPromise;
        // console.log("This is a userDetails");

        const viewUsers = await pool.query(`SELECT
            ua.user_id,
            ua.firstname,
            ua.lastname,
            ua.email,
            ua.countrycode,
            ua.phonenumber,
            ua.status,
            ur.role_name
        FROM
            users_accounts ua
        INNER JOIN
            users_account_roles uar ON ua.user_id = uar.user_id
        INNER JOIN
            users_roles ur ON uar.role_id = ur.role_id
        WHERE
            ur.role_name = 'user';`);

        // console.log('viewUsers: ', viewUsers.rows);
        const adminViewUser = viewUsers.rows;
        res.json({ adminViewUser });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
adminData.get('/viewDetails/:userId', async (req, res) => {
    const userId = req.params.userId;
    console.log(userId)

    try {
        await poolReadyPromise;
        // console.log("This is a userDetails");

        const viewUsers = await pool.query(`SELECT	* FROM users_accounts WHERE user_id = $1`, [userId]);
        const viewAddress = await pool.query(`select * from address WHERE user_id = $1`, [userId]);

        // console.log(viewUsers.rows[0])

        // console.log('viewUsers: ', viewUsers.rows);
        const userView = viewUsers.rows[0];
        const addressView = viewAddress.rows[0];

        res.json({ userView, addressView });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

adminData.put('/updateStatus/:userId', async (req, res) => {
    const userId = req.params.userId;
    console.log('updateStatus: ', userId);
    const { status } = req.body;

    try {
        await poolReadyPromise;
        let updateStatus;

        if (status === 'disable') {
            updateStatus = await pool.query(`UPDATE users_accounts SET status = 'disable' WHERE user_id = $1`, [userId]);
        } else if (status === 'enable') {
            updateStatus = await pool.query(`UPDATE users_accounts SET status = 'enable' WHERE user_id = $1`, [userId]);
        }

        if (updateStatus.rowCount !== 1) {
            return res.status(401).json({ message: 'Status Updation Failed' });
        } else {
            return res.status(200).json({ message: 'Status Updated Successfully' });
        }

        // res.json({ userVuew, addressView });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


adminData.get('/moviesDetails', async (req, res) => {

    try {
        await poolReadyPromise;
        // console.log("This is a userDetails");

        const moviesDetail = await pool.query(`SELECT 
        m.movie_id,
        m.title,
        m.description,
        m.release_date,
        m.duration,
        m.poster_url,
        m.director,
        g.name,
        STRING_AGG(c.category_name::TEXT, ', ') AS category_name
        FROM 
            movies m
        LEFT JOIN 
            movies_category mc ON m.movie_id = mc.movie_id
        LEFT JOIN 
            category c ON mc.category_id = c.category_id
        JOIN 
            movie_genres mg ON m.movie_id = mg.movie_id
        JOIN 
            genres g ON mg.genre_id = g.genre_id
        GROUP BY 
            m.movie_id,
            m.title,
            m.description,
            m.release_date,
            m.duration,
            m.poster_url,
            m.director,
            g.name`);


        const TrendingMovies = await pool.query(`SELECT
        m.title,
        m.release_date,
        m.average_rating,
        array_agg(g.name) as genres
    FROM
        movies m
    JOIN
        movie_genres mg ON m.movie_id = mg.movie_id
    JOIN
        genres g ON mg.genre_id = g.genre_id
    JOIN
        movies_category mc ON m.movie_id = mc.movie_id
    JOIN
        category c ON mc.category_id = c.category_id
    WHERE
        c.category_name = 'Trending'
        AND TO_DATE(m.release_date, 'YYYY-MM-DD') >= CURRENT_DATE - INTERVAL '30 days'::interval
    GROUP BY
        m.movie_id, m.title, m.release_date, m.average_rating
    ORDER BY
        m.total_views DESC
    LIMIT 10`);

        const RevenueStatistics = await pool.query(`SELECT 
       ua.user_id, 
       ua.firstname, 
       sc.price, 
       sc.name
   FROM 
       users_accounts ua
   JOIN 
       subscriptions s ON ua.subscription_id = s.subscription_id
   JOIN 
       subscriptions_cat sc ON s.subscription_cat_id = sc.subscription_cat_id`);


        const BasicReven = await pool.query(`select count(subscription_id) from users_accounts where  subscription_id = 1`);
        const StandardReven = await pool.query(`select count(subscription_id) from users_accounts where  subscription_id = 2`);
        const PremiumdReven = await pool.query(`select count(subscription_id) from users_accounts where  subscription_id = 3`);


        const revenueBasic = BasicReven.rows[0].count
        const revenueStandard = StandardReven.rows[0].count
        const revenuePremium = PremiumdReven.rows[0].count


        const revenueMovies = RevenueStatistics.rows

        // console.log('viewUsers: ', viewUsers.rows);
        const trandMovies = TrendingMovies.rows;
        const adminMoviesList = moviesDetail.rows;
        res.json({ adminMoviesList, trandMovies, revenueMovies, revenueBasic, revenueStandard, revenuePremium });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
adminData.get('/moviesDetail/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    console.log('movieId : ', movieId);
    try {
        await poolReadyPromise;
        // console.log("This is a userDetails");

        const moviesDetail = await pool.query(`SELECT 
        m.movie_id,
        m.title,
        m.description,
        m.release_date,
        m.duration,
        m.poster_url,
        m.director,
        g.name,
        STRING_AGG(c.category_name::TEXT, ', ') AS category_name
        FROM 
            movies m
        LEFT JOIN 
            movies_category mc ON m.movie_id = mc.movie_id
        LEFT JOIN 
            category c ON mc.category_id = c.category_id
        JOIN 
            movie_genres mg ON m.movie_id = mg.movie_id
        JOIN 
            genres g ON mg.genre_id = g.genre_id
        WHERE
            m.movie_id = $1
        GROUP BY 
            m.movie_id,
            m.title,
            m.description,
            m.release_date,
            m.duration,
            m.poster_url,
            m.director,
            g.name`, [movieId]);



        // console.log('viewUsers: ', viewUsers.rows);
        const adminMoviesList = moviesDetail.rows[0];
        res.json({ adminMoviesList });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


adminData.get('/category_genres', async (req, res) => {
    try {
        await poolReadyPromise;
        const categoryDetail = await pool.query(`SELECT	* from category`);

        const genresDetails = await pool.query(`SELECT	* from genres`);
        const detailsGenres = genresDetails.rows;

        const detailsCategory = categoryDetail.rows;
        res.json({ detailsCategory, detailsGenres });
    } catch (error) {
        console.error('Error fetching details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})





module.exports = adminData