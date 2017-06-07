const express = require('express');
const app = express();
const morgan = require('morgan'); //This is the library to be used for logging
const bodyParser = require('body-parser');

const fav = require('./routes/index');
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


app.use((req,res,next) => {
	console.log("App.use");
	next();
});

const PORT= process.env.PORT || 3333;

app.get('/',(req,res) =>{
	res.send("Hello World");
});

app.use('/fav',fav);

app.listen(PORT, () =>{
	console.log('express running on port ',PORT);
});
