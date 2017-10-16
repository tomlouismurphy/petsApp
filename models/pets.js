const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
	name: String,
	animal: String,
	age: Number,
	isWellTrained: Boolean
});

module.exports = mongoose.model('Critters', PetSchema);