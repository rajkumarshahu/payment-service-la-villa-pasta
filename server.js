const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');

// Load env variables
dotenv.config({ path: './config/config.env' });

const payments = require('./routes/payments');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
// app.use(cors({
// 	origin: '',
// 	method: 'GET, POST, PUT, DELETE,  PATCH, HEAD',
// 	credentials: true
// }));


app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept, Authorization'
		);
		res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
		return res.status(200).json({});
	}
	next();
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


// Mount routers

app.use('/payments', payments);

const PORT = process.env.PORT || 4000;

const server = app.listen(
	PORT,
	console.log(
		`Payment Service Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.green
			.bold
	)
);

module.exports = server
// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`.red);
	// Close server & exit process
	server.close(() => process.exit(1));
});
