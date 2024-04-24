const express = require("express");
const router = express.Router()

router.post("/api/carts/", (req, res) => {
    const cart = req.body;
    const {products} = cart;
    
});

router.get("/api/carts/:cid", (req, res) => {

});

router.post("/api/carts/:cid/product/:pid", (req, res) => {

});

module.exports = router;