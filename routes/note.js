const router = require('express').Router();
const { writeFile, read } = require('fs');
const {readFile} = require('fs/promises')
const util = require('util')
generateID =require('unique-id-generator')

router.get('/', (req,res) => {
    console.info(`${req.method} request received`)
    readFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

const listData = [];
router.post('/', (req,res) => {
    console.info(`${req.method} request received`)

    let response;
    let newList;
    
    if (req.body) {
        response = {
            status: 'success',
            data: req.body,
        };

        newNote = req.body,generateID()
    
        console.info(newNote);
        

        readFile('./db/db.json').then((data) => {

            const listData  = JSON.parse(data);
            console.info(`\nThere are/is ${listData.length} notes currently`)
            listData.push(newNote)
            console.info(`You have added a new note! Now there are ${listData.length} notes`)
            
            //stringify new list
            const newList = JSON.stringify(listData);
            console.info(`:>>> See new stringify notes: ${newList}`)

            //overwrite db.json file
            writeFile('./db/db.json', newList , (err) => err ? console.error(err) : console.info('Data successfully written!'));
        });

        

        
        // writeFile('./db/db.json', JSON.stringify(data), (err) => {
        //     err ? console.error(err) : console.info('Data successfully written')
        // });

        res.json(`A note containing the message '${response.data}' was received.`)
    } else {
        res.status(404).json(`Request must include at least a note.`)
    }
    

});

module.exports = router;