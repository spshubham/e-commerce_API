const express = require('express');
const router = express();
const User = require('../models/User');
const Order = require('../models/order');
const catalog = require("../models/catalogs");


router.get('/list-of-sellers', async (req, res) => {
    const sellerList = await User.find({type:"seller"})
    
    if (!sellerList) {
        res.status(500).json({ success: false })
    }
    res.send(sellerList)
})

router.get('/seller-catalog/:seller_id', async (req, res) => {
    try{
        const seller = await catalog.find({user_id: req.params.seller_id});

    if (!seller) {
        res.status(500).json({ success: false })
    }
    res.send(seller)
    }
    catch(e)
    {
        console.log(e)
    }
})

router.post('/create-order/:seller_id', async (req, res) => {
   try{

    let order = new Order({
        buyer_id: req.body.buyer_id,
        seller_id: req.params.seller_id,
        orderItems: req.body.orderItems
    })
    order = await order.save();
    if (!order)
        return res.status(404).send('Order cannot be created')
    res.send(order);
   }
   catch(e)
   {
    console.log("ERROR", e)
   }
})

module.exports = router;