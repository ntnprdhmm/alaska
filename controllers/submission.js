const models = require('../models/index')
const fileHelper = require('../helpers/file')

const post = (req, res) => {
  // if submission empty, return error
  if (!req.body.value) {
    return res.status(400).json()
  }

  // get the current challenge answer
  const currentDate = new Date().getTime() / 1000
  let challengeFile = null
  if (currentDate > process.env.STAGE_1_START && currentDate < process.env.STAGE_1_END) {
    challengeFile = process.env.STAGE_1_FILE
  } else if (currentDate > process.env.STAGE_2_START && currentDate < process.env.STAGE_2_END) {
    challengeFile = process.env.STAGE_2_FILE
  }

  // if no file, return error
  if (!challengeFile) {
    return res.status(410).json()
  }

  // read the content of the file
  fileHelper.read(challengeFile)
    .then(content => {
      // create the submission in database
      return models.Submission.create({
        UserId: req.user.id,
        value: req.body.value,
        remoteAddress: req.connection.remoteAddress
      })
    })
    .then(sub => res.status(201).json(sub))
    .catch(err => res.status(500).json(err))
}

module.exports = { post }
