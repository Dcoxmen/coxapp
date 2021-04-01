const express = require('express');
const router = express.Router();

//@routes   Get api/vehicles
//@desc     Test route
//@access   Public

router.get('/', (req, res) => res.send('Vehicles route'));

module.exports = router;