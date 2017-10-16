const express = require('express');
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
require('./db/db');

const kennelController = require('./controllers/pets');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({extended: false}));

app.use(methodOverride('_method'));

app.get('/pets', (req, res) => {
	res.render('index');
});

app.use(express.static('public'));

app.use('/pets', kennelController);

app.listen(3000, () => {
	console.log('app is listening on port 3000');
});