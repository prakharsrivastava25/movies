const express = require('express');
const router = express.Router();

const favourite = require('./favourite');

router.use((req, res, next) => {
	console.log('Reached routes index');
	next();
});

router.use('/favourite', favourite)

module.exports = router;
