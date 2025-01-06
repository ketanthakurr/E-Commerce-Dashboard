const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect('mongodb+srv://ketanthakur603:ketan%402003@products.ock7o.mongodb.net/?retryWrites=true&w=majority&appName=products');
        console.log('Connected to database successfully');
    } catch (error) {
        console.error('Database connection error:', error.message);
    }
};
 