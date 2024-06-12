import { Router } from 'express'
import { body, param } from 'express-validator'
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateAvailability,
  updateProduct,
} from './handlers/product'
import { handleInputErros } from './middleware'

const router = Router()
/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *          id:
 *            type: ineteger
 *            description: The Product ID
 *            example: 1
 *          name:
 *            type: string
 *            description: The Product name
 *            example: Monitor Curvo
 *          price:
 *            type: inetegr
 *            description: The Product price
 *            example: 300
 *          availability:
 *            type: boolean
 *            description: The Product availability
 *            example: true
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get a list of products
 *    tags:
 *      - Products
 *    description: Return a list of products
 *    responses:
 *        200:
 *          description: Successful response
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Product'
 */
router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get a product by ID
 *    tags:
 *      - Products
 *    description: Return a product based on its unique ID
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Successful Response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: Not found
 *      400:
 *        description: Bad Request - Invalid ID
 */
router.get(
  '/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErros,
  getProductById
)

/**
 * @swagger
 * /api/products:
 *  post:
 *    summary:
 *    tags:
 *      - Products
 *    description: Returns a new record in the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                name:
 *                  type: string
 *                  example: "Monitor Curvo"
 *                price:
 *                  type: number
 *                  example: 300
 *    responses:
 *      201:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Invalid input data
 */
router.post(
  '/',
  // Validacion
  body('name').notEmpty().withMessage('El nombre del producto no puede ir vacio'),
  body('price')
    .isNumeric()
    .withMessage('Valor no válido')
    .notEmpty()
    .withMessage('El nombre del producto no puede ir vacio')
    .custom((value) => value > 0)
    .withMessage('Precio no válido'),
  handleInputErros,
  createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Updates a product with user input
 *    tags:
 *    - Products
 *    description: Returns the updated product
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                name:
 *                  type: string
 *                  example: "Monitor Curvo Nuevo"
 *                price:
 *                  type: number
 *                  example: 250
 *                availability:
 *                  type: boolean
 *                  example: true
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad Request - Invalid ID or Ivalid input data
 *      404:
 *        description: Product not found
 */
router.put(
  '/:id',
  param('id').isInt().withMessage('ID no válido'),
  body('name').notEmpty().withMessage('El nombre del producto no puede ir vacio'),
  body('price')
    .isNumeric()
    .withMessage('Valor no válido')
    .notEmpty()
    .withMessage('El nombre del producto no puede ir vacio')
    .custom((value) => value > 0)
    .withMessage('Precio no válido'),
  body('availability').isBoolean().withMessage('Valor para disponibilidad no válido'),
  handleInputErros,
  updateProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *    summary: Update Product availability
 *    tags:
 *     - Products
 *    description: Return the updated availability
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad Request - Invalid ID
 *      404:
 *        description: Product not found
 */
router.patch(
  '/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErros,
  updateAvailability
)

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Delete a Product
 *    tags:
 *     - Products
 *    description: Return a confirmation message
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product delete
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              value: 'Producto Eliminado'
 *      400:
 *        description: Bad Request - Invalid ID
 *      404:
 *        description: Product not found
 */
router.delete(
  '/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErros,
  deleteProduct
)

export default router
