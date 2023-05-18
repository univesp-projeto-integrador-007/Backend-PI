const OrderModel = require("../models/Order")

const orderController = {
    create: async (req, res) => {
        try {

            const order = {
                name: req.body.name,
                phoneNumber: req.body.phoneNumber,
                date: req.body.date,
                products: req.body.products,
                value: req.body.value 
            }
            const response = await OrderModel.create(order)
            res.status(201).json({response, msg: "Pedido enviado com sucesso!"})

        } catch(err){
            console.log(err);
        }
    },
    getAll: async (req, res) =>{
        try{
            const orders = await OrderModel.find();
            res.json(orders)
        } catch(err) {
            console.log(err);
        }
    },
    get: async (req, res) =>{
        try {
            const id = req.params.id;
            const order = await OrderModel.findById(id);
            if(!order){
                res.status(404).json({msg: "Festa não encontrada."})
                return
            }
            res.json(order)

        } catch(err) {
            console.log(err);
        }
    },
    delete: async (req, res) =>{
        try{
            const id = req.params.id;
            const order = await OrderModel.findById(id);
    
            if(!order){
                res.status(404).json({msg: "Festa não encontrada."})
                return
            }
    
            const deletedOrder = await OrderModel.findByIdAndDelete(id);
            res.status(200).json({deletedOrder, msg: "Festa excluída com sucesso!"})
        } catch(err) {
            console.log(err);
        }
    },
    update: async (req, res) =>{
        try {
            const id = req.params.id;
            const order = {
                name: req.body.name,
                address: req.body.address,
                description: req.body.description,
                neighborhood: req.body.neighborhood,
                date: req.body.date,
                products: req.body.products,
            }
            const updatedOrder = await OrderModel.findByIdAndUpdate(id, order);

            if(!updatedOrder) {
                res.status(404).json({msg: "Festa não encontrada."})
            }

            res.status(200).json({order, msg: "Festa atualizada com sucesso!"})

        } catch(err){
            console.log(err);
        }

    }



}

module.exports = orderController;