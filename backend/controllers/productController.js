import asyncHandler from "../middleware/asyncHandler.js"
import Product from '../models/productModel.js'


/**
 * @desc Fetch all products
 * @route GET /api/products   & /api/products/page/:pageNumber
 * @access Public
 */
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 3;// number of products to be displayed per page

    const page = Number(req.query.pageNumber) || 1; // gets the current page number (/api/products?pageNumbers=3 then page=3) or 

    // For Search feature ($regex is part of mongoDb)
    const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' }} : {} // $options: 'i' (aka insensitive)

    //({...keyword}) to find or match only that matches keyword (same as below find({...keyword}))
    const count = await Product.countDocuments({...keyword}); //count the number of total products


    const products = await Product.find({...keyword})
    .limit(pageSize)    // limit the number of products returned (e.g. only 2 products if pageSize=2)
    .skip(pageSize * (page -1 )); 
    res.json({ products,                    // products fetched with pagination
               page,                        // current page number
               pages: Math.ceil(count/ pageSize)})  //total number of pages (ceil(), rounds up to next whole number)
});


/**
 * @desc Fetch a product
 * @route GET /api/products/:id
 * @access Public
 */
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(product) {
        res.json(product);
    } else {
        req.status(404);
        throw new Error('Resource not found');
    }
})

/**
 * @desc Create a product
 * @route POST /api/products
 * @access Private and Admin
 */
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    })

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
})

/**
 * @desc Update a product
 * @route PUT /api/products/:id
 * @acces private /admin
 */
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, image, brand, category, countInStock, description } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
        product.description = description;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Resource not found')
    }

})

/**
 * @desc Delete a product
 * @route DELETE /api/products/:id
 * @access Private/admin
 */
const deleteProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({ _id: product._id })
        res.status(200).json({ message: 'Product deleted'});
    } else {
        res.status(404);
        throw new Error('Resource not found')
    }


})

/**
 * @desc Create new review
 * @route POST /api/products/:id/reviews
 * @access Private
 */
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body; //user input of rating and comment

    const product = await Product.findById(req.params.id); //id from the url

    if (product) {
        const alreadyReviewed = product.reviews.find((review) => review.user.toString() === req.user._id.toString());

        if(alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        }

        const review = {
            name: req.user.name,
            comment,
            rating: Number(rating),
            user: req.user._id,
        }

        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Review added'})
    } else {
        res.status(404);
        throw new Error('Resource not found')
    }

    
})

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview }