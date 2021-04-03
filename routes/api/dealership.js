const express = require('express');
const request = require('request');
const config = require('config');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/DealerPro');
const Users = require('../../models/User');

//@routes   Get api/dealership/me
//@desc     Get Current User Dealership
//@access   Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id}).populate('user', ['name', 'image']);

        if(!profile) {
            return res.status(400).json({ msg: 'There is no dealership for this user'});
        }
        res.json(profile)

    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');

    }
});

//@routes   POST api/dealership
//@desc     Create or Update User Dealership
//@access   Private
router.post('/',
[auth, 
    [
    body('dealerid', 'Dealer ID is required').not().isEmpty(),
    body('name', 'Name is required').not().isEmpty()
] ],
async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
  }
  const {  
    name,
    location,
    admin,
    dealerid,
    vehicleIds,
    local

} = req.body;

//Make Dealer Proile Object
const profileFields = {};
profileFields.user = req.user.id;
if(name) profileFields.name = name;
if(location) profileFields.location = location;
if(admin) profileFields.admin = admin;
if(dealerid) profileFields.dealerid = dealerid;
if(vehicleIds) {
    profileFields.vehicleIds = vehicleIds.split(',').map(vehicleIds => vehicleIds.trim());
}

try{
    let profile = await Profile.findOne({ user: req.user.id });
    if(profile) {
        //Update profile
        profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set:profileFields }, { new: true });

        return res.json(profile);
    }

    //Create profile
    profile = new Profile(profileFields);

    await profile.save();
    return res.json(profile)


}catch(err) {
console.error(err.message);
res.status(500).send('Server Error')
}

})

//@routes   GET api/dealership
//@desc     Get All Dealerships
//@access   Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'image']);
        res.json(profiles);
    }catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
    }
})

//@routes   GET api/dealership/user/user_id
//@desc     Get Dealership by user ID
//@access   Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'image']);

        if(!profile) return res.status(400).json({ msg: 'There is no dealership for this user'});

        res.json(profile);
    }catch(err) {
    console.error(err.message);
    if(err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'There is no dealership for this user'});
    }


    res.status(500).send('Server Error')
    }
})

// @route    DELETE api/dealership
// @desc     Delete dealership, user, and vehicle
// @access   Private
router.delete('/', auth, async (req, res) => {
    try {
  
      //Remove profile
      await Profile.findOneAndRemove({ user: req.user.id });
      //Remove user
      await User.findOneAndRemove({ _id: req.user.id });
  
      res.json({ msg: 'User deleted'});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


//@routes   GET api/dealership
//@desc     Get All Dealerships
//@access   Public
// router.get('/', async (req, res) => {
//     try {
//         const profiles = await Profile.find().populate('user', ['name', 'image']);
//         res.json(profiles);
//     }catch(err) {
//     console.error(err.message);
//     res.status(500).send('Server Error')
//     }
// })

module.exports = router;