const express = require('express');
const router = express.Router();
const petList = require('../models/pets');

router.get('/all', (req, res) => {
	console.log(req);
	console.log(res);
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
	petList.create(req.body, (err, pet) => {
		if (err) {
			res.send('error creating pet');
		} else {
			console.log(pet);
			res.redirect('/pets/all');
		}
	})
})

router.get('/:index', (req, res) => {
	petList.find((err, tasks) => {
		res.render('show', {critters: tasks[req.params.index]});
	})
});

router.get('/:index/edit', (req, res) => {
	petList.find((err, tasks) => {
		res.render('edit', {i: req.params.index, critters: tasks[req.params.index]})
	})
})

router.put('/:index/edit', (req, res) => {
	const indicate = req.params.index;
	petList.find((err, tasks) => {
		if (req.body.isWellTrained === 'on'){
			req.body.isWellTrained = true;
		} else {
			req.body.isWellTrained = false;
		}
		tasks[indicate].name = req.body.name;
		tasks[indicate].animal = req.body.animal;
		tasks[indicate].age = req.body.age;
		petList.findByIdAndUpdate(tasks[indicate]._id, {name: tasks[indicate].name}, (err, task) => {
			console.log(task);
		});
		petList.findByIdAndUpdate(tasks[indicate]._id, {animal: tasks[indicate].animal}, (err, task) => {
			console.log(task);
		});
		petList.findByIdAndUpdate(tasks[indicate]._id, {isWellTrained: tasks[indicate].isWellTrained}, (err, task) => {
			console.log(task);
		});
		petList.findByIdAndUpdate(tasks[indicate]._id, {age: tasks[indicate].age}, (err, task) => {
			console.log(task);
		});
		res.redirect('/pets/all');
	})
})

router.delete('/:index', (req, res) => {
	const removes = req.params.index;
	petList.find((err, tasks) => {
		const identity = tasks[removes]._id;
		petList.findByIdAndRemove(identity, (err, task) => {
			if (err) {
				res.send('error deleting pet');
			} else {
				res.redirect('/pets/all');
			}
		})
	})
})

module.exports = router;