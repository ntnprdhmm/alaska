const authMiddleware = require('../middlewares/auth')
const submissionMiddleware = require('../middlewares/submission')

const authController = require('../controllers/auth')
const submissionController = require('../controllers/submission')
const stageController = require('../controllers/stage')

module.exports = (app) => {
  // apply middlewares
  app.use('/api', authMiddleware)
  app.use('/api/submission', submissionMiddleware)

  // auth routes
  app.route('/api/auth/register')
    .post(authController.register)
  app.route('/api/auth/register/callback')
    .post(authController.callback)
  app.route('/api/auth/register/email')
    .post(authController.resendConfirmationEmail)
  app.route('/api/auth/login')
    .post(authController.login)
  app.route('/api/auth/reset')
    .post(authController.reset)
  app.route('/api/auth/reset/callback')
    .post(authController.resetCallback)

  // submissions routes
  app.route('/api/submission')
    .post(submissionController.post)
    .get(submissionController.get)

  // stages routes
  app.route('/api/stage')
    .get(stageController.get)
}
