import { createProductService, deleteProductService } from "./productsServices.js";
import { addToCartService } from "./cartsServices.js";
import { createTicketService } from "./ticketsServices.js";

const socketManager = (socketServer) => {
    socketServer.on("connection", (socket) => {
        console.log("Cliente conectado");

        //Admin options
        socket.on("newProduct", async (data) => {
            data.price = parseInt(data.price);
            data.stock = parseInt(data.stock);
            await createProductService(data);
        });
        socket.on("deleteProduct", async (productId) => {
            await deleteProductService(productId);
        });

        //User options
        socket.on("addToCart", async (cartId, productId) => {
            await addToCartService(cartId, productId);
        });
        socket.on("dataTicket", async (prices, email) => {
            await createTicketService(prices, email);
        });
    });
};

export default socketManager;