/*
const fs = require('fs')

// esto FUNCIONA COMO UNA REPLICA A UN MODELO
// CUANDO USAS UNA BASE DE DATOS USAS ESTO 
const User = {
    //crea usuario
    // referencia a la base de datos

    fileName : './src/data/users.json',
    // metodo para iterar users.json

    getData : function (){
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8')) //recibe un nombre de archivo
        //json parse para que devuelva un array de objetos literales
    },

   findAll: function (){ // funcion para devolver todo lo users.js
        return this.getData()
    },
    
    create: function(userData){
        let allUsers = this.findAll() // aca recibo a todos los usuarios
        let newUser = {
            id : this.generateId(),
            ... userData // lleva toda la info que le llega
        }
        allUsers.push(userData) // para insertarlo en el json
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '))
        return true 
    },
    generateId: function(){
        let allUsers = this.findAll()
        let lastUser = allUsers.pop()
        if (lastUser){
            return lastUser.id + 1 
            }
        return 1
    },
    findByPk : function (id) { //buscar por ID
        let allUsers = this.findAll() // aca recibo a todos los usuarios
        let userFound = allUsers.find(oneUser => oneUser.id === id) //busca un usuario por id y lo devuelve 
        return userFound
    },
    findByField : function (field, text) { //buscar por campo
        let allUsers = this.findAll() // aca recibo a todos los usuarios
        let userFound = allUsers.find(oneUser => oneUser[field] === text) //busca un usuario por id y lo devuelve 
        return userFound
    },
    // para eliminar
    delete : function (id){
        let allUsers = this.findAll()
        let finaleUsers = allUsers.filter( oneUser => oneUser.id !== id) // recorre y devuelve al id distinto
        fs.writeFileSync(this.fileName, JSON.stringify(finaleUsers, null, ' '))
        return true
    }
}

console.log(User.findByPk(9)) // da todo el info del archivo

module.exports = User*/