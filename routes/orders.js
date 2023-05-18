const router = require("express").Router();
const checkToken = require("../middlewares/checkToken");

const orderController = require("../controllers/orderController");

router
    .route('/orders')
    .post((req, res) => orderController.create(req, res)) 

router
    .route('/orders')
    .get(checkToken, (req, res) => orderController.getAll(req, res))     

router
    .route('/orders/:id')
    .get(checkToken, (req, res) => orderController.get(req, res))

router
    .route('/orders/:id')
    .delete( checkToken, (req, res) => orderController.delete(req, res))   

router
    .route('/orders/:id')
    .put( checkToken, (req, res) => orderController.update(req, res))     

module.exports = router;