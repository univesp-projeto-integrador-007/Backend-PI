const mongoose = require('mongoose');

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

async function main(){
    try {
        await mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.a3dr1js.mongodb.net/?retryWrites=true&w=majority`)
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

module.exports = main