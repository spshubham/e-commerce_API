const express = require('express');
const router = express();

const Order = require('../models/order');
const catalog = require("../models/catalogs");


router.get('/orders', async (req, res) => {
    const orderList = await Order.find({seller_id: req.query["seller_id"]});
    

    if (!orderList) {
        res.status(500).json({ success: false })
    }
    res.send(orderList)
})



router.post('/create-catalog', async (req, res) => {

    try{
        let catalogs = new catalog({
            user_id: req.body.user_id,
            products: req.body.products,
    
        })
    
        catalogs = await catalogs.save();
    
        if (!catalogs)
            return res.status(404).send('Order cannot be created')
        res.send(catalogs);
    }
    catch(e)
    {
        console.log(e)
    }
})

module.exports = router;