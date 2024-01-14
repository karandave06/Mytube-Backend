const express = require('express');

const {signup, google} = require('../controler/Auth.js');
const {signin} = require('../controler/Auth.js');

const router = express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/google',google);


exports.router = router;