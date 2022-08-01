const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderItems : [{
        type: String,
        required: true
    }],
    buyer_id: {
        type: String
    },
    seller_id: {
        type: String
    }

})



module.exports = mongoose.model('Order', orderSchema);