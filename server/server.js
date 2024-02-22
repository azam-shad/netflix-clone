const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const poolReadyPromise = require('./utils/db'); // import the promise
const router = require('./routes/jwtAuth');
const view = require('./routes/showData');
const updateDetail = require('./routes/upadeDetails')
const adminData = require('./routes/AdminData');
const uploadData = require('./routes/adminUploadData')
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

// const corsOptions = {
//     origin: 'http://localhost:3000',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     optionsSuccessStatus: 204,
// }
const corsOptions = {
    origin: ['http://localhost:3000', 'https://netflix-clone-nine-tawny.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200,
}
// MIDDLEWARE
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'client')));

//  ROUTERS (register and login)
app.use('/auth', router);
app.use('/view', view);
app.use('/updateDetails', updateDetail);
app.use('/adminData', adminData);
app.use('/adminUpload', uploadData);



// app.use(express.static('client'));

// Catch-all route handler
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
// });

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
// });



const PORT = process.env.PORT || 5000;
// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is up and running on http://localhost:${PORT}`);
});