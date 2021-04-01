const express = require('express');
const router = express.Router();

//@routes   Get api/datasetid
//@desc     Test route
//@access   Public

router.get('/', (req, res) => res.send('Dataset ID route'));

module.exports = router;