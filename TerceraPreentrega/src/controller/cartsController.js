import {createCartService, getCartService, addToCartService, removeFromCartService, updateQuantityService, clearCartService} from "../services/cartsServices.js";

export const createCart = async (req, res) => {
    try {
        const newCart = await createCartService();
        res.send({status: "Success", message: "Cart created successfully", payload: newCart})
    } catch (error) {
        console.log(error);
        res.send({status: "Error", message: "Cart could not be created"});
    };
};

export const getCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await getCartService(cartId);
        res.send({status: "Success", payload: cart})
    } catch (error) {
        console.log(error);
        res.send({status: "Error", message: error.message});
    };
};

export const addToCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const cart = await addToCartService(cartId, productId);
        res.send({status: "Success", payload: cart})
    } catch (error) {
        console.log(error);
        res.send({status: "Error", message: error.message});
    };
};

export const removeFromCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const cart = await removeFromCartService(cartId, productId);
        res.send({status: "Success", payload: cart})
    } catch (error) {
        console.log(error);
        res.send({status: "Error", message: error.message});
    };
};

export const updateQuantity = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body;
        console.log(quantity);
        const cart = await updateQuantityService(cartId, productId, quantity);
        res.send({status: "Success", payload: cart})
    } catch (error) {
        console.log(error);
        res.send({status: "Error", message: error.message});
    };
};

export const clearCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const cart = await clearCartService(cartId, productId);
        res.send({status: "Success", payload: cart})
    } catch (error) {
        console.log(error);
        res.send({status: "Error", message: error.message});
    };
};

export const purchaseCart = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};