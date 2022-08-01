const mongoose = require('mongoose');

const catalogsSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        type: String,
        required: true,
    }]
})
module.exports = mongoose.model('Catalogs', catalogsSchema);