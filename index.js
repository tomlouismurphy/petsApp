const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/pets', (req, res) => {
	res.render('index');
});

app.listen(3000, () => {
	console.log('app is listening on port 3000');
});