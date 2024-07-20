//Desafio reestructuración de nuestro servidor

import express from "express";
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import bodyParser from "body-parser"
import socketManager from "./services/socketManager.js";
import cartsRouter from "./routes/carts.router.js"
import productsRouter from "./routes/products.router.js";
import sessionRouter from "./routes/sessions.router.js";
import viewsRouter from "./routes/views.router.js";
import __dirname from "./utils.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import config from "./config/config.js";

const app = express();
const PORT = config.port;

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));

app.use(session({
    secret: config.mongo_secret_key,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: config.mongo_url}),
}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const socketServer = new Server(httpServer);
socketManager(socketServer);