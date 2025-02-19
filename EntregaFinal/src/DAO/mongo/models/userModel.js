import mongoose from "mongoose";

const userCollection = "Users";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {type: String, unique: true},
    age: Number,
    password: String,
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Carts"
    },
    resetToken: String,
    tokenExpirantion: Date,
    role: {type: String, default: "user"},
    documents: [{
        name: String,
        reference: String
    }],
    last_connection: {type: Date, default: null}
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;