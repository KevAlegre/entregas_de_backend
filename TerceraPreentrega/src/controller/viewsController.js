import { getProductsService } from "../services/productsServices.js";
import { getCartService } from "../services/cartsServices.js";
import config from "../config/config.js";

export const renderLogin = (req, res) => {
    res.render("login");
};

export const renderRegister = (req, res) => {
    res.render("register");
};

export const renderUserDashboard = async (req, res) => {
    try {
        const { user } = req.session;
        const cartId = req.user.cart;
        const {limit, page, sort, query} = req.query;
        const products = await getProductsService(limit, page, sort, query);
        products.cart = cartId;
        // console.log(products);
        const profileLink = `http://localhost:${config.port}/current`;
        const cartLink = `http://localhost:${config.port}/carts`
        const {prevPage, nextPage, hasPrevPage, hasNextPage} = products;
        const prevLink = hasPrevPage ? `http://localhost:${config.port}/products?page=${prevPage}` : null;
        const nextLink = hasNextPage ? `http://localhost:${config.port}/products?page=${nextPage}` : null;
        res.render("products", {products, prevLink, nextLink, page, cartId, profileLink, cartLink});
    } catch (error) {
        console.log(error);
    };
};

export const renderAdminDashboard = async (req, res) => {
    try {
        const { user } = req.session;
        const {limit, page, sort, query} = req.query;
        const products = await getProductsService(limit, page, sort, query);
        const {prevPage, nextPage, hasPrevPage, hasNextPage} = products;
        const prevLink = hasPrevPage ? `http://localhost:${config.port}/realtimeproducts?page=${prevPage}` : null;
        const nextLink = hasNextPage ? `http://localhost:${config.port}/realtimeproducts?page=${nextPage}` : null;
        res.render("realtimeproducts", {products, prevLink, nextLink, page, user});
    } catch (error) {
        console.log(error);
    };
};

export const renderProfile = async (req, res) => {
    try {
        const { user } = req.session;
        const dashboardLink = `http://localhost:${config.port}/products?page=1`;
        res.render("current", {user, dashboardLink});
    } catch (error) {
        console.log(error);
    }
};

export const renderCart = async (req, res) => {
    try {
        const cartId = req.user.cart;
        const email = req.user.email;
        const cart = await getCartService(cartId);
        const dashboardLink = `http://localhost:${config.port}/products?page=1`;
        res.render("cart", {cart: cart, dashboardLink, email});
    } catch (error) {
        console.log(error);
    };
};