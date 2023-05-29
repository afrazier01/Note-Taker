const router = require('express').Router();
const { error } = require('console');
const { writeFile, read } = require('fs');
const {readFile} = require('fs/promises');
const util = require('util');
generateID = require('unique-id-generator');

router.get('/', (req,res) => {
    console.info(`${req.method} request received`);
    readFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

router.get('/:id', (req,res) => {
    console.info(`${req.method} request received`);
    readFile('./db/db.json').then((data) => {
        dataList = JSON.parse(data)
        const requestedID = req.body.id
        displayID = dataList.find(note => note.id === requestedID)
        res.json(displayID)
    });
});

router.post('/', (req,res) => {
    console.info(`${req.method} request received`);

    let response;
    let newList;
    
    if (req.body.text && req.body.title) {
        response = {
            status: 'success',
            data: req.body,
        };
        const note = req.body;
        const id = {id: generateID()};
        
        //use Object.assign to create new object that includes unique id
        newNote = Object.assign(note,id);
        console.info(newNote);
        

        readFile('./db/db.json').then((data) => {

            const listData  = JSON.parse(data);
            console.info(`\nThere are/is ${listData.length} notes currently`);
            listData.push(newNote);
            console.info(`You have added a new note! Now there are ${listData.length} notes\n`);
            
            //stringify new list
            const newList = JSON.stringify(listData);
        

            //overwrite db.json file
            writeFile('./db/db.json', newList , (err) => err ? console.error(err) : console.info('Data successfully written!'));
        });

        res.json(`${req.body.title} note was received.`);
    } else {
        res.status(404).json(`Request must include a title and a text description.`);
    }
    

});

router.delete('/:id', (req,res) => {
    console.info(`${req.method} request received`);
    
    if (req.params.id) {
        const userID = req.params.id
        readFile('./db/db.json').then((data) => {

        const accessData  = JSON.parse(data);
        const newList = accessData.filter(notes => notes.id !== userID);
        const OverridingList = JSON.stringify(newList)
 
        //overwrite db.json file
        writeFile('./db/db.json', OverridingList , (err) => {err ? console.error(err) : console.info('Operation completed successfully! :)')});
        });

        res.json(`${req.method} request was successful.`);
    } else {
        console.error('Request was unsuccessful');
        res.status(404).json('Request was unsuccessful')
    }
});

module.exports = router;