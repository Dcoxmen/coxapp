const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator');
const User = require('../../models/User');

//@routes   Get api/users
//@desc     Test route
//@access   Public

router.post('/',[
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password, image } = req.body;

    try {
        let user = await User.findOne({ email });
    
        if(user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists'}]});
        }

    user = new User({
        name,
        email,
        password,
        image
    })
    

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save()

    const payload = {
        user: {
            id: user.id
        }
    }

    jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }


});

module.exports = router;