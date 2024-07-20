import { ProductsData } from "../DAO/factory.js";

const productsData = new ProductsData();

export const getProductsService = async (limit, page, sort, query) => {
    const filter = query ? {category: query} : {};
    const options = {
        limit: limit || 10,
        page: page || 1,
        sort: sort ? {price: sort === "asc" ? 1 : -1} : {},
        lean: true
    };
    const products = await productsData.getProductsData(filter, options);
    return products;
};

export const getProductByIdService = async (productId) => {
    const product = await productsData.getProductByIdData(productId);
    return product;
};

export const createProductService = async (title, description, price, code, stock, category, thumbnail) => {
    if(!title, !description, !price, !code, !stock, !category) throw new Error("Incomplete fields");
    const verifyCode = await productsData.existCode(code);
    if(verifyCode) throw new Error("Assigned code already exists");
    const newProduct = {
        title: title,
        description: description,
        price: price,
        code: code,
        stock: stock,
        category: category,
        thumbnail: thumbnail
    };
    const product = await productsData.createProductData(newProduct);
    return product;
};

export const updateProductService = async (productId, productToReplace) => {
    const verifyId = await productsData.getProductByIdService(productId);
    if(!verifyId) throw new Error("Product with ID entered does not exist"); //Corregir
    const updatedProduct = await productsData.updateProductData(productId, productToReplace);
    return updatedProduct
};

export const deleteProductService = async (productId) => {
    const verifyId = await productsData.getProductByIdService(productId);
    if(!verifyId) throw new Error("Product with ID entered does not exist");
    const deletedProduct = await productsData.deleteProductData(productId);
    return deletedProduct;
};