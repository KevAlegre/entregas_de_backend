const express = require("express");
const router = express.Router();
const ProductManager = require("../classes/ProductManager.js");
const productManager = new ProductManager("./src/data/products.json");

router.get("/api/products", async (req, res) => {
    const limit = req.query.limit;
    const products = await productManager.limitProducts(limit);
    res.send({products});
});

router.get("/api/products/:pid", async (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);
    if (product) {
        res.send({product});
    } else {
        res.send(`
        <h1>ERROR 404</h1>
        <p>El producto con el ID ingresado no existe.</p>
        `);
    };
});

router.post("/api/products/", (req, res) => {
    const product = req.body;
    const {} = product;

});

router.put("/api/products/:pid", (req, res ) => {

});

router.delete("/api/products/:pid", (req, res) => {

});

module.exports = router;