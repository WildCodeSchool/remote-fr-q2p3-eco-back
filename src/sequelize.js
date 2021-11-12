const { Sequelize, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const AdminModel = require('./models/admin')

let sequelize



const Admin = AdminModel(sequelize, DataTypes)

const initDb = () => {
  return sequelize.sync().then(_ => {
       bcrypt.hash('pikachu', 10)
    .then(hash => Admin.create({ username: 'pikachu', password: hash }))
    .then(user => console.log(user.toJSON()))

    console.log('La base de donnée a bien été initialisée !')
  })
}

module.exports = { 
  initDb, Admin
}