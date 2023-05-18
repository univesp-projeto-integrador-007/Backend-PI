const { Product: ProductModel } = require("../models/Product");

const productController = {
    create: async(req, res) => {
        try {
            const product = {
                name:req.body.name,
                description: req.body.description,
                type: req.body.type,
                price: req.body.price,
                oldPrice: req.body.oldPrice,
                image: req.body.image,
                isEmphasis: req.body.isEmphasis
            };
            const response = await ProductModel.create(product);

            res.status(201).json({response, msg: "Serviço enviado com sucesso!"})
        }catch(err) {
            console.log(err);
        }
    },
    getAll: async (req, res) => {
        try{
            const products = await ProductModel.find();

            res.json(products)
        } catch(err){
            console.log(err)
        }
    },

    get: async (req, res) => {
        try{
            const id = req.params.id
            const product = await ProductModel.findById(id)
            
            if(!product){
                res.status(404).json({msg: "Serviço não encontrado!"})
                return
            }
            
            res.json(product)
        } catch(err){
            console.log(err)
        }
    },
    delete: async (req, res) => {
        try{
            const id = req.params.id

            const product = await ProductModel.findById(id)
            if(!product){
                res.status(404).json({msg: "Serviço não encontrado!"})
                return
            }
            const deletedProduct = await ProductModel.findByIdAndDelete(id)
            res.status(200).json({deletedProduct, msg: "Serviço excluído com sucesso!"})
        } catch(err) {
            console.log(err);
        }
    },
    update: async( req, res ) => {
        try {
            const id = req.params.id

            const product = {
                name:req.body.name,
                description: req.body.description,
                type: req.body.type,
                price: req.body.price,
                oldPrice: req.body.oldPrice,
                image: req.body.image,
                isEmphasis: req.body.isEmphasis
            };

            const updateProduct = await ProductModel.findByIdAndUpdate(id, product)

            if(!updateProduct){
                res.status(404).json({msg: "Serviço não encontrado!"})
                return
            }
            res.status(200).json({product, msg: "Serviço atualizado com sucesso!"})

        } catch(err) {
            console.log(err);
        }
    }
}

module.exports = productController