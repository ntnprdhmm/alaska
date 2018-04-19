const models = require('../models/index')
const fileHelper = require('../helpers/file')

const post = (req, res) => {
  // if submission empty, return error
  if (!req.body.value) {
    return res.status(400).json({ message: 'nothing to validate' })
  }

  // get the current challenge answer
  const currentDate = new Date().getTime() / 1000
  let stage = null
  if (currentDate > process.env.STAGE_1_START && currentDate < process.env.STAGE_1_END) {
    challengeFile = process.env.STAGE_1_FILE
    stage = 1
  } else if (currentDate > process.env.STAGE_2_START && currentDate < process.env.STAGE_2_END) {
    challengeFile = process.env.STAGE_2_FILE
    stage = 2
  }

  // if no file, return error
  if (!stage) {
    return res.status(403).json({ message: 'no stage in progress' })
  }

  // read the content of the file
  fileHelper.read(stage === 1 ? process.env.STAGE_1_FILE : process.env.STAGE_2_FILE)
    .then(contentString => {
      // each element is a boolean, that indicates if the image contains hidden things
      const content = Array.from(contentString)
      // array with the submission's images
      const value = req.body.value.split(';')
      // nb images with hidden things
      const nbImagesWithData = content.filter(c => c === '1').length

      let undetected = nbImagesWithData
      let falseAlarm = 0

      // create the submission in database
      return models.Submission.create({
        UserId: req.user.id,
        value: req.body.value,
        remoteAddress: req.connection.remoteAddress,
        undetected,
        falseAlarm,
        stage,
        accuracy: 0,
        errorRate: 0
      })
    })
    .then(sub => res.status(201).json({ message: 'answer validated', sub }))
    .catch(_ => res.status(500).json({ message: 'server error' }))
}

module.exports = { post }
