const models = require('../models/index')

const submissionMiddleware = (req, res, next) => {
  models.User.findOne({
    where: {email: req.payload.email},
    include: [{
      model: models.Submission,
      order: [['createdAt', 'DESC']]
    }]
  })
    .then(user => {
      const lastSubmission = user.Submissions[0]
      // check if the waiting time between 2 submissions has expired
      if (lastSubmission && (new Date() - process.env.SUBMISSION_WAITING_TIME) < lastSubmission.createdAt) {
        return res.status(403).json()
      }
      return next()
    })
    .catch(err => res.status(500).json(err))
}

module.exports = submissionMiddleware
