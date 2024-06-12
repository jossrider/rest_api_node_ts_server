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

router.get(
  '/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErros,
  getProductById
)

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

router.patch(
  '/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErros,
  updateAvailability
)

router.delete(
  '/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErros,
  deleteProduct
)

export default router
