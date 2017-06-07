const express = require('express');
const router = express.Router();

const fs = require('fs');
const db = require('../db.json');

router.route('/')
	.get((req, res) => {
	fs.readFile('db.json', 'utf-8', (err, data) => {
			if(err) throw err;
			res.send(JSON.parse(data));
		});
	})
	
	.post((req, res) => {
		db.push(req.body.favourite);
		fs.writeFile('db.json', JSON.stringify(db), (err, data) => {
		if(err) throw err;
		res.send('Movie Added to Favourites');
		});
	});

router.route('/:id')
	.put((req, res) => {
    const newFavourite = req.body.favourite;
    db.forEach((favourite, index) => {
    	console.log("favourite id:"+favourite.id+" request.params.id:"+req.params.id);
      if (favourite.id == req.params.id) {
        db.splice(index, 1, newFavourite);
      }
    });
    fs.writeFile('db.json', JSON.stringify(db), (err, data) => {
      if (err) throw err;
      res.send('Favourite modified!');
    });
  })
	
	.delete((req, res) => {
    db.forEach((favourite, index) => {
      if (favourite.id == req.params.id) {
        db.splice(index, 1);
      }
    });
    fs.writeFile('db.json', JSON.stringify(db), (err, data) => {
      if (err) throw err;
      res.send('Favourite Deleted!');
    });
  });

module.exports = router;
