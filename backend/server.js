import express from 'express'
import products from './data/products.js';
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
dotenv.config();
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import { notFound, errorHandler } from './middleware/errorMiddleware.js';



connectDB(); // connect to mongoDB
const port = process.env.PORT || 5000;

const app = express();

// Body parser middleware (lets us extract req.body)
app.use(express.json()); //raw json
app.use(express.urlencoded({ extended: true}));

// Cookie parser middleware
app.use(cookieParser())

app.use(cors());

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

//overriding express error handler
app.use(notFound);
app.use(errorHandler);


app.listen(port, ()=> console.log(`server is running on port ${port}`))



