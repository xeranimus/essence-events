var mongoose = require('mongoose');

var serviceSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
	price: {
        type: Number, 
        required: true
    },
    image_file: String

    });