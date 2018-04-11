const authMiddleware = require('../middlewares/auth')

const authController = require('../controllers/auth')
const submissionController = require('../controllers/submission')

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
  app.route('/api/auth/register/callback')
    .post(authController.callback)
  app.route('/api/auth/login')
    .post(authController.login)

  // submissions routes
  app.route('/api/submission')
    .post(submissionController.post)
}
