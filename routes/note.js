const router = require('express').Router();
const { writeFile } = require('fs');
const {readFile} = require('fs/promises')
const util = require('util')

router.get('/', (req,res) => {
    console.info(`${req.method} request received`)
    readFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

router.post('/', (req,res) => {
    console.info(`${req.method} request received`)

    let response;
    const data = req.body
    if (req.body) {
        response = {
            status: 'success',
            data: req.body,
        };

        writeFile('./db/db.json', JSON.stringify(data), (err) => {
            err ? console.error(err) : console.info('Data successfully written')
        });

        res.json(`A note containing the message '${response.data}' was received.`)
    } else {
        res.status(404).json(`Request must include at least a note.`)
    }
    

});

module.exports = router;