const { Admin } = require('./src/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('./auth/auth')

module.exports = (app) => {
  app.post('/api/admins', auth, (req, res) => {
    Admin.create(req.body)
      .then(admin => {
        const message = `L'admin ${req.body.name} a bien été créé.`
        res.json({ message, data: admin })
      })
      .catch(error => {
        if(error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if(error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: 'error.message', data: error });
        }
        const message = `L'admin n'a pas pu être ajouté. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}