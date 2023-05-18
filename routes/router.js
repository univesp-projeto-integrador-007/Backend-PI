const router =require("express").Router();

//Products router
const productsRouter = require("./products");
router.use("/", productsRouter);

//Orders routes
const orderRouter = require("./orders");
router.use("/", orderRouter);

//Auth routes
const authRouter = require("./auth");
router.use("/", authRouter);


module.exports = router;