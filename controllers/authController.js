const Auth = require("../models/Auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const authController = {
    register: async (req, res) => {
        try {
          const auth = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
        }

        //validations         
            if(!auth.name) {
                res.status(422).json({msg: "O nome é obrigatório!"})
            }

            if(!auth.email) {
              res.status(422).json({msg: "O email é obrigatório!"})
            }

            if(!auth.password) {
                res.status(422).json({msg: "A senha é obrigatório!"})
            }

            if(!auth.confirmPassword) {
              res.status(422).json({msg: "A confirmação de senha é obrigatório!"})
            }

            if (auth.confirmPassword !== auth.password){
              res.status(422).json({msg: "As senhas não conferem!"})
            }


            //Check if user exists
            const userExists = await Auth.findOne({ email: auth.email })
            if(userExists) {
              res.status(422).json({msg: "Por favor, utilize outro email!"})
            }

            //create password 
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(auth.password, salt)


            //create user 
            const user = new Auth({
              name: auth.name,
              email: auth.email,
              password: passwordHash
            })

            try {
              await user.save()
            res.status(201).json({ msg: "Usuário criado com sucesso!"})

            } catch(err) {
            res.status(500).json({msg: err})
            }

        } catch(err){
            console.log(err);
        }
    },

    login: async (req, res) => {
      try {
        const auth = {
          email: req.body.email,
          password: req.body.password,
      }

      //validations         
          if(!auth.email) {
            res.status(422).json({msg: "O email é obrigatório!"})
          }

          if(!auth.password) {
              res.status(422).json({msg: "A senha é obrigatório!"})
          }

          //Check if user exists
          const user = await Auth.findOne({ email: auth.email })
          if(!user) {
            return res.status(404).json({msg: "Usuário não encontrado!"})
          }

          //Check if password is correct
          const checkPassword = await bcrypt.compare(auth.password, user.password)

          if (!checkPassword) {
            return res.status(422).json({msg: "Senha inválida"})
          }

          try {
              const secret = process.env.SECRET;

              const token = jwt.sign({
                id: user._id,
              },
              secret,
              )

              res.status(200).json({msg:"Autenticação realizada com sucesso", token})

          } catch(err){
            console.log(err);
            res.status(500).json({
              msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
            })
          }
      } catch(err){
          console.log(err);
      }
  },


      getUser: async (req, res) => {
        try {
          const id = req.params.id;
          const user = await Auth.findById(id, '-password');
          //check if user exists
          if(!user) {
            return res.status(404).json({msg: "Usuário não encontrado!"})
          }
          res.status(200).json({user})
        
        } catch(err){
            console.log(err);
        }
      }

}

module.exports = authController;