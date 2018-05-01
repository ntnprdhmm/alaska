const models = require('../models/index')
const submissionHelper = require('../helpers/submission')

const submissionMiddleware = (req, res, next) => {
  // exclude the following routes
  if (req.method === 'GET') {
    return next()
  }

  // check if submissions are not blocked
  if (process.env.BLOCK_SUBMISSION.toLowerCase() === 'true') {
    return res.status(403).json({
      message: 'Submissions are blocked for the moment',
      cause: 'blocked'
    })
  }

  models.User.findOne({
    where: {email: req.payload.email},
    include: [{
      model: models.Submission
    }]
  })
    .then(user => {
      // get the last submission
      const lastSub = user.Submissions.sort((a, b) => {
        return new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime()
      })[0]
      // check if the waiting time has expired
      if (!submissionHelper.isWaitingTimeExpired(lastSub)) {
        return res.status(403).json({
          message: 'You have to wait to submit a new response',
          cause: 'time'
        })
      }
      // search all submission from this IP address
      return models.Submission.findAll({ where: {remoteAddress: req.connection.remoteAddress} })
        .then(submissions => {
          // check if any user with this IP address has sent a submission recently
          for (let submission of submissions) {
            if (!submissionHelper.isWaitingTimeExpired(submission)) {
              return res.status(403).json({
                message: 'You have to wait to submit a new response',
                cause: 'remote'
              })
            }
          }
          return next()
        })
        .catch(err => res.status(500).json(err))
    })
    .catch(err => res.status(500).json(err))
}

module.exports = submissionMiddleware
