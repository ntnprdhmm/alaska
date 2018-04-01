const authController = require('../controllers/auth')

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('hello world !')
  })

  app.route('/api/auth/register')
    .post(authController.register)

  app.route('/api/auth/login')
    .post(authController.login)
}
