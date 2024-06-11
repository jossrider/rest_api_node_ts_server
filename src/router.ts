import { Router } from "express"
import { body, param } from "express-validator"
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateAvailability,
  updateProduct,
} from "./handlers/product"
import { handleInputErros } from "./middleware"

const router = Router()

// Routing
router.get("/", getProducts)

router.get(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErros,
  getProductById
)

router.post(
  "/",
  // Validacion
  body("name").notEmpty().withMessage("El nombre del producto no puede ir vacio"),
  body("price")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("El nombre del producto no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no válido"),
  handleInputErros,
  createProduct
)

router.put(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  body("name").notEmpty().withMessage("El nombre del producto no puede ir vacio"),
  body("price")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("El nombre del producto no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no válido"),
  body("availability").isBoolean().withMessage("Valor para disponibilidad no válido"),
  handleInputErros,
  updateProduct
)

router.patch(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErros,
  updateAvailability
)

router.delete(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErros,
  deleteProduct
)

export default router
