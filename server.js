console.log("You're connected!")
const routes = require('./routes/index')
const path = require('path');

const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', routes);

//CRUD
app.get('/', (req,res) => {
    console.info(`${req.method} request received`)

    res.sendFile(path.join(__dirname,'/public/index.html'))
});

app.get('/notes', (req,res) => {
    console.info(`${req.method} request received`)

    res.sendFile(path.join(__dirname,'/public/notes.html'))
});

app.get('*', (req,res) => {res.status(404).send('Page not found')})

app.listen(PORT, () => console.log(`App 🚀 at http://localhost:${PORT}`))