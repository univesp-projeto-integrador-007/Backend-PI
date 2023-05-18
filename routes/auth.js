const router = require("express").Router();

const authController = require("../controllers/authController");
const checkToken = require("../middlewares/checkToken");

router
    .route('/auth/register')
    .post((req, res) => authController.register(req, res)) 

router
    .route('/auth/login')
    .post((req, res) => authController.login(req, res)) 

router
    .route('/users/:id')
    .get(checkToken,(req, res) => authController.getUser(req, res)) 

// router
//     .route('/orders')
//     .get((req, res) => authController.getAll(req, res))     

// router
//     .route('/orders/:id')
//     .get((req, res) => authController.get(req, res))

// router
//     .route('/orders/:id')
//     .delete((req, res) => authController.delete(req, res))   

// router
//     .route('/orders/:id')
//     .put((req, res) => authController.update(req, res))     

module.exports = router;