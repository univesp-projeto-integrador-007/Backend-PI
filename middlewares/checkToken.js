const jwt = require("jsonwebtoken");

function checkToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if(!token) {
    return res.status(401).json({msg: 'Acesso Negado!'})
  }

  try{

    const secret = process.env.SECRET;
    jwt.verify(token, secret)
    next(); // Chama o próximo middleware ou rota

  } catch(err){
    return res.status(400).json({msg: 'Token Inválido!'})
  }
}

module.exports = checkToken;