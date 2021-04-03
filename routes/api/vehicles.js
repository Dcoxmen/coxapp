const express = require('express');
const request = require('request');
const router = express.Router();

//@routes   Get api/vehicles
//@desc     Test route
//@access   Public

// router.get('/', (req, res) => res.send('Vehicles route'));



router.get('/', async (req, res) => {
    try {
        let response = await fetch('http://api.coxauto-interview.com/api/DBZZgkn22Ag/vehicles/941576665');
        res.json(response);
    }catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
    }
})

module.exports = router;