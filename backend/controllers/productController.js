import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

/**
* @desc         Get all products
* @route        Get /api/products
* @access       public
*/

const getProducts =  asyncHandler(async (req,res)=>{
    const products = await Product.find({});
    res.json(products);
});

/**
 * @desc        Get single product
 * @route       Get /api/products/:id
 * @access      public

*/ 

const getProductById =   asyncHandler(async (req ,res)=>{
    const product = await Product.findById(req.params.id);
    res.json(product);
});

/**
 * @desc		Delete a product
 * @route		DELETE /api/products/:id
 * @access	public/admin
 */

const deleteProduct = asyncHandler(async (req , res)=>{
    const product = await Product.findById(req.params.id);

    if(product){
        await Product.deleteOne(product);
        res.json({message : 'Product Deleted'});
    } else {
        res.status(404);
        throw new Error('Product not Found');
    }
});

/**
 * @desc		Create a product
 * @route		POST /api/products
 * @access	public/admin
 */

const createProduct = asyncHandler(async (req , res)=>{
    const product = new Product({
        name : 'Sample product',
        price : 0,
        user : req.user._id,
        image : '/images/sample.jpg',
        brand : 'Sample Brand',
        category : 'Sample Category',
        countInStock : 0,
        numReviews : 0,
        description : 'Sample description....',
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

 /**
 * @desc		Update a product
 * @route		PUT /api/products/:id
 * @access	public/admin
 */

 const updateProduct = asyncHandler(async (req , res)=>{
    const {name , price , description , image , brand , category , countInStock} = req.body;

    const product = await Product.findById(req.params.id);

    if(product){
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
 });

/**
 * @desc		Create new review
 * @route		POST /api/products/:id/reviews
 * @access	private
 */

const createProductReview = asyncHandler(async(req , res)=>{
    const{rating , comment} = req.body;

    const product = await Product.findById(req.params.id);

    if(product){
        const alreadyReviewed = product.reviews.find((review)=> review.user.toString()===req.user._id.toString()
        );

        if(alreadyReviewed){
            res.status(400);
            throw new Error('Product already reviewed');
        }

        const review = {
            name : req.user.name,
            rating : +rating,
            comment,
            user : req.user._id,
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = 
            product.reviews.reduce((acc , currVal)=>
            currVal.rating + acc , 0)/
            product.reviews.length;

        await product.save();
        res.status(201).json({message : 'Review added'});
    } else {
        res.status(404);
        throw new Error('Product not Found');
    }
});

export
 {
    getProductById , 
    getProducts , 
    deleteProduct , 
    createProduct ,
    updateProduct,
    createProductReview,
};
   
