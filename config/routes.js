const authController = require('../controllers/auth')
const authMiddleware = require('../middlewares/auth')

module.exports = (app) => {
  // apply middlewares
  app.use('/api', authMiddleware)

  // default route
  app.get('/', (req, res) => {
    res.send('hello world !')
  })

  // auth routes
  app.route('/api/auth/register')
    .post(authController.register)
  app.route('/api/auth/login')
    .post(authController.login)

  // submissions routes
  app.post('/api/submission', (req, res) => {
    res.send('submission ok')
  })
}
