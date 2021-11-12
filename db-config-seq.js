require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize (
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'mysql'
  }
)

sequelize.authenticate()
.then(console.log('seq connexion ok'))
.catch(error => console.error(`Not able to connect: ${error}`))

module.exports = sequelize;

