const uploadData = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const poolReadyPromise = require('../utils/db');
const pool = require('../utils/db');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploadsImageandVideo');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname)); // Use the original filename
    }
});

const dataUploads = multer({ storage: storage });

uploadData.post('/moviesUpload', async (req, res) => {
    try {
        const { title, description, director, duration, release_date } = req.body;
        await poolReadyPromise;
        console.log("title, description, director, duration, release_date", title, description, director, duration, release_date);

        const moviesData = await pool.query(`INSERT INTO movies(title, description, release_date, duration, director) values ($1, $2, $3, $4, $5) RETURNING movie_id`, [title, description, release_date, duration, director])

        const movieId = moviesData.rows[0].movie_id;
        console.log("moviesId", movieId);
        res.json({ message: 'Movies Upload Successfully', movieId });

        // if((await moviesData).rows.length > )
    } catch (error) {
        console.error('Error processing form data:', error);
        res.status(500).send('Internal server error');
    }
});

uploadData.post('/uploadMovie', dataUploads.fields([
    { name: 'poster_url' },
    { name: 'trailer_url' },
    { name: 'video_url' },
    { name: 'movieId' },
    { name: 'categoryID' },
    { name: 'genresID' }
]), async (req, res) => {
    try {
        const posterFile = req.files['poster_url'][0].filename;
        const trailerFile = req.files['trailer_url'][0].filename;
        const videoFile = req.files['video_url'][0].filename;
        const movieId = req.body.movieId;
        const categoryIDs = req.body.categoryID.split(',').map(Number);;
        const genresID = req.body.genresID;

        console.log('categoryID: ', categoryIDs)

        await poolReadyPromise;

        const moviesDataImage = pool.query(`UPDATE movies SET poster_url = $1, trailer_url = $2, video_url = $3 WHERE movie_id = $4`, [posterFile, trailerFile, videoFile, movieId]);

        for (const categoryId of categoryIDs) {
            await pool.query(`insert into movies_category (movie_id, category_id) values($1, $2)`, [movieId, categoryId])
        }

        await pool.query(`insert into movie_genres (movie_id, genre_id) values($1, $2)`, [movieId, genresID]);

        if (moviesDataImage) {
            res.json({ message: 'Movies Upload Successfully' });
        } else {
            res.status(500).json({ message: 'Error Movies updating database' });
        }

        console.log('posterFile: ', posterFile);
        console.log('trailerFile: ', trailerFile);
        console.log('videoFile: ', videoFile)

    } catch (error) {
        console.error('Error processing form data:', error);
        res.status(500).send('Internal server error');
    }
});

uploadData.post('/updateCatGen', async (req, res) => {
    const { movieId, categoryID, genresID } = req.body;
    console.log('movieId, categoryID, genresID : ', movieId, categoryID, genresID);
    try {
        await poolReadyPromise;
        if (Array.isArray(categoryID)) {
            for (const categoryId of categoryID) {
                // console.log();
                // Query to check if category_id already exists for any movie
                const checkCondition = await pool.query(`SELECT * FROM movies_category WHERE movie_id = $1 ORDER BY category_id ASC`, [movieId]);
                const existingCategoryIds = checkCondition.rows.map(row => row.category_id);

                console.log('existingMovieIds: ', existingCategoryIds)

                console.log('categoryID: ', categoryID)


                const sortedExistingCategoryIds = existingCategoryIds.slice().sort();
                const sortedCategoryID = categoryID.slice().sort();

                // Compare arrays element by element
                let equalArrays = true;
                let missingCategoryId;

                for (let i = 0; i < sortedCategoryID.length; i++) {
                    if (sortedExistingCategoryIds[i] !== sortedCategoryID[i]) {
                        equalArrays = false;
                        missingCategoryId = sortedCategoryID[i];
                        break;
                    }
                }

                if (!equalArrays) {
                    await pool.query(`insert into movies_category (movie_id, category_id) values($1, $2)`, [movieId, missingCategoryId]);
                }
            }
            res.json({ message: 'movies category update Successfully' });
        }
    } catch (error) {
        console.error('Error processing form data:', error);
        res.status(500).send('Internal server error');
    }
})
uploadData.post('/deleteCatGen', async (req, res) => {
    const { movieId } = req.body;
    console.log('movieId : ', movieId);
    try {
        await poolReadyPromise;
        await pool.query(`DELETE FROM movies_category WHERE movie_id = $1`, [movieId])
        res.json({ message: 'movies category Delete Successfully' });
    } catch (error) {
        console.error('Error processing form data:', error);
        res.status(500).send('Internal server error');
    }
})

module.exports = uploadData;
