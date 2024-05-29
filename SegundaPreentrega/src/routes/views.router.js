import { Router } from "express";
import productModel from "../dao/models/products.model.js";
import cartModel from "../dao/models/carts.model.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res) => {
    try {
        const products = await productModel.find().lean();
        res.render("home", {products});
    } catch (error) {
        console.log(error);
    }
})

viewsRouter.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts", {});
});

viewsRouter.get("/chat", (req, res) => {
    res.render("chat", {})
});

viewsRouter.get("/products", async (req, res) => {
    /* Mostrar productos con su paginación y resolver en una de las dos maneras:
        1. Que cada producto lleve a una nueva vista con su descripcion completa y un botón de agregar al carrito 
        2. Que este endpoint al visualizar el producto, ademas muestre el boton de agregar carrito sin llevarlo a otra vista
    */
   try {
        const page = req.query.page;
        const options = {
            page: page,
            limit: 5,
            lean: true
        }
        const products = await productModel.paginate({}, options);
        const {prevPage, nextPage, hasPrevPage, hasNextPage} = products
        
        const prevLink = hasPrevPage ? `http://localhost:8080/products?page=${prevPage}` : null;
        
        const nextLink = hasNextPage ? `http://localhost:8080/products?page=${nextPage}` : null;
        
        res.render("products", {products, prevLink, nextLink, page});
    } catch (error) {
        console.log(error);
    }
});

viewsRouter.get("/carts/:cid", async (req, res) => {
    //Visualizará un carrito en específico y su contenido
    const cartId = req.params.cid;
    const cart = await cartModel.findOne({_id: cartId}).populate("products.product");

    if (cart) {
        res.render("cart", {cart});
    } else {
        res.render({message: "El carrito con el ID ingresado no existe"});
    };
});
export default viewsRouter;