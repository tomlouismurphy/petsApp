const express = require('express');
const router = express.Router();
const petList = require('../models/pets');

console.log(petList);
router.get('/', (req, res) => {
	petList.find((err, pet) => {
		if (err) {
			res.send('database error');
		} else {
			res.render('index', {critters: pet});
		}
	})
});

router.get('/new', (req, res) => {
	res.render('new', {})
});

router.post('/create', (req, res) => {
	if (req.body.isWellTrained === 'on'){
		req.body.isWellTrained = true;
	} else {
		req.body.isWellTrained = false;
	}
	petList.create(req.body, (err, fruit) => {
		if (err) {
			res.send('error creating pet');
		} else {
			console.log(petList);
			res.redirect('/pets');
		}
	})
})

router.get('/:index', (req, res) => {
	petList.find((err, tasks) => {
		res.render('show', {petList: tasks[req.params.index]});
	})
});

module.exports = router;