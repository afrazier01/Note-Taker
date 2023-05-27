const router = require('express').Router();

router.get('/', (req,res) => {
    console.info(`${req.method} request received`)

    //test insomnia
    res.json(`${req.method} request received`)
});

router.post('/', (req,res) => {
    console.info(`${req.method} request received`)

    //test insomnia
    res.json(`${req.method} request received`)
});

module.exports = router;