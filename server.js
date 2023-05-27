console.log("You're connected!")
const routes = require('./routes/index')
const path = require('path');

const express = require('express');

const PORT = process.env.port || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use('/api', routes);



//CRUD
app.get('/', (req,res) => {
    console.info(`${req.method} request received`)

    res.sendFile(path.join(__dirname,'/public/index.html'))
});

app.post('/', (req,res) => {
    console.info(`${req.method} request received`)

    //test insomnia
    res.json(`${req.method} request received`)
});

app.get('/notes', (req,res) => {
    console.info(`${req.method} request received`)

    res.sendFile(path.join(__dirname,'/public/notes.html'))
});

app.post('/notes', (req,res) => {
    console.info(`${req.method} request received`)

    //test insomnia
    res.json(`${req.method} request received`)
});

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`))