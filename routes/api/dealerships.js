const express = require('express');
const router = express.Router();

//@routes   Get api/dealerships
//@desc     Test route
//@access   Public

router.get('/', (req, res) => res.send('Dealerships route'));

module.exports = router;