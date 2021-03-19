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
app.use(cors({
	origin: '',
	method: 'GET, POST, PUT, DELETE,  PATCH, HEAD',
	credentials: true
}));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


// Mount routers

app.use('/payments', payments);

const PORT = process.env.PORT || 4000;

const server = app.listen(
	PORT,
	console.log(
		`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
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
