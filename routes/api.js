const express = require('express');
const rateLimit = require('express-rate-limit');
const apiLimiter = rateLimit({
    windowMs: 1000 * 60 * 3, // 3 minutes
    max: 10,
    message: 'Too many requests, please try again after 3 minutes'
});
const router = express.Router();
const customerController = require('../controllers/customers');
const orderController = require('../controllers/orders');
const productController = require('../controllers/products');
const authController = require('../controllers/auth');
const userController = require('../controllers/users');

// Orders
router.post('/orders', apiLimiter, orderController.createOrder);

// Products
router.post('/products', apiLimiter, productController.createProduct);
router.put('/products', apiLimiter, productController.updateProduct);
router.delete('/products/:id', apiLimiter, productController.deleteProduct);
router.get('/products/:id', apiLimiter, productController.getProduct);
router.get('/products', apiLimiter, productController.getProducts);
router.get('/products/q/:term', apiLimiter, productController.getProductsByTerm);

// Customers
router.post('/customers', apiLimiter, customerController.createCustomer);
router.put('/customers', apiLimiter, customerController.updateCustomer);
router.delete('/customers/:id', apiLimiter, customerController.deleteCustomer);
router.get('/customers/:id', apiLimiter, customerController.getCustomer);
router.get('/customers', apiLimiter, customerController.getCustomers);
router.get('/customers/q/:term', apiLimiter, customerController.getCustomersByTerm);
router.get('/customers', authController.verifyToken, customerController.getCustomers);

// Users and Auth
router.post('/users', userController.createUser);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;

/**
 * @swagger
 * /api/v1/customers/q/{term}:
 *   get:
 *     summary: Search customers by term
 *     tags: [Customers]
 *     description: Search customers by term
 *     parameters:
 *       - in: path
 *         name: term
 *         schema:
 *           type: string
 *         required: true
 *         description: The search term
 *     responses:
 *       200:
 *         description: A list of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     description: Get all customers
 *     responses:
 *       200:
 *         description: A list of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/customers/{id}:
 *   delete:
 *     summary: Delete a customer
 *     tags: [Customers]
 *     description: Delete a customer
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The customer id
 *     responses:
 *       200:
 *         description: Customer deleted
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/customers/{id}:
 *   get:
 *     summary: Get a customer by id
 *     tags: [Customers]
 *     description: Get a customer by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The customer id
 *     responses:
 *       200:
 *         description: A customer by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       properties:
 *         customer_id:
 *           type: integer
 *           description: The auto-generated id of the customer
 *         first_name:
 *           type: string
 *           description: The first name of the customer
 *         last_name:
 *           type: string
 *           description: The last name of the customer
 *         address:
 *           type: string
 *           description: The address of the customer
 *         email:
 *           type: string
 *           description: The email of the customer
 *         phone_number:
 *           type: string
 *           description: The phone number of the customer
 *       required:
 *        - none
 * 
 */

/**
 * @swagger
 * /api/v1/customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     description: Create a new customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: A list of customers
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/customers:
 *   put:
 *     summary: Update a customer
 *     tags: [Customers]
 *     description: Update a customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Customer updated
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         product_id:
 *           type: integer
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         category:
 *           type: string
 *           description: The category of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         image_url:
 *           type: string
 *           description: The image url of the product
 *       required: []
 */

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     description: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/products:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     description: Update a product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get a product by id
 *     tags: [Products]
 *     description: Get a product by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: A product by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     description: Get all products
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/products/q/{term}:
 *   get:
 *     summary: Search products by term
 *     tags: [Products]
 *     description: Search products by term
 *     parameters:
 *       - in: path
 *         name: term
 *         schema:
 *           type: string
 *         required: true
 *         description: The search term
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     description: Delete a product
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */