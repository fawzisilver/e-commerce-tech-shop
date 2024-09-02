import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors'
import users from "./data/users.js";
import products from "./data/products.js";
import User from './models/userModel.js';
import Product from "./models/productModel.js";
import Order from './models/orderModel.js'
import connectDB from "./config/db.js"

// load into process.env
dotenv.config();

//connect to database
connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        
        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        })

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!'.green.inverse)
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

const importDaata = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User
    } catch (error) {

    }
}



const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data destroyed!'.red.inverse);
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}


if (process.argv[2] === 'import') {
    importData();
} else if (process.argv[2] === 'destroy' || process.argv[2] === '-d') {
    destroyData();
} else {
    console.log('Invalid. Provide a valid argument');
    process.exit();
}
