//core module
const express = require('express');
const path = require('path');

//local module
const userRouter = require('./E-commerce_shoe website/routes/userRoutes');
const { adminRouter } = require('./E-commerce_shoe website/routes/adminRoutes');
const rootDir = require('./E-commerce_shoe website/utils/pathUtils');
const { mongoConnect } = require('./E-commerce_shoe website/utils/databaseUtils');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'E-commerce_shoe website', 'views'));

// Serve static files from the 'public' folder
// Get the absolute path to your project folder
const projectRoot = path.join(__dirname, 'E-commerce_shoe website');

// Serve static files from both public and views folders
app.use(express.static(path.join(projectRoot, 'public'))); // CSS, images

app.use(express.urlencoded({ extended: true })); // For form data
app.use(express.json()); // For JSON data

app.use('/admin', adminRouter);
app.use('/user', userRouter);

app.use('/', (req, res) => {
    res.status(404).send('<h1>404 Page not found</h1>')
})

const port = 3000;
mongoConnect(() => {
    app.listen(port, (req, res) => {
        console.log(`server listening on port: ${port} `)
    })
});


