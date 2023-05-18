const router = require("express").Router();
const checkToken = require("../middlewares/checkToken");

const productController = require('../controllers/productController')

router
    .route('/products')
    .post( checkToken, (req, res) => productController.create(req, res))

router
    .route("/products")
    .get((req, res) => productController.getAll(req, res))

router
    .route("/products/:id")
    .get((req, res) => productController.get(req, res))

router
    .route("/products/:id")
    .delete(checkToken, (req, res) => productController.delete(req, res))

router
    .route("/products/:id")
    .put( checkToken, (req, res) => productController.update(req, res))   
    
module.exports = router;