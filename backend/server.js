import path from 'path';
import express from 'express'
import products from './data/products.js';
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
dotenv.config();
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from './routes/orderRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import uploadRoutes from './routes/uploadRoutes.js';



connectDB(); // connect to mongoDB
const port = process.env.PORT || 5000;

const app = express();

// Body parser middleware (lets us extract req.body)
app.use(express.json()); //raw json
app.use(express.urlencoded({ extended: true}));

// Cookie parser middleware
app.use(cookieParser())



const corsOptions = {
    origin: [
      'http://localhost:5173', // Local dev
      'https://melodious-taffy-f03687.netlify.app', // Netlify
    ],
    credentials: true, // Allows sending cookies
    methods: ['GET', 'POST'],
  };
  app.use(cors(corsOptions));
  
  


app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes) 

const __dirname = path.resolve(); // Set __dirname to current dir
app.use('/images', express.static(path.join(__dirname, 'frontend/public/images')));



app.get('/api/config/paypal', (req, res) => res.send({ clientId: process.env.PAYPAL_CLIENT_ID }))

// Production settings
if (process.env.NODE_ENV === 'production') {
    
  
    // Serve static files from the dist folder in production
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
  
    // Handle all unmatched routes by serving index.html
    app.get('*', (req, res) => 
      res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
  }


//overriding express error handler
app.use(notFound);
app.use(errorHandler);


app.listen(port, ()=> console.log(`server is running on port ${port}`))



