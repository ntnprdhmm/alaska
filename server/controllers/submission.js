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
    .then(r => {
      // each element is a boolean, that indicates if the image contains hidden things
      const content = Array.from(r)
      // array with the submission's images
      const value = req.body.value.split(';')
      // nb images with hidden things
      const nbImgHiddenData = content.filter(c => c === '1').length

      let falseAlarm = 0
      let probFalseAlarm = []
      let probMiss = []
      let minErrorRate = 100
      let missScore = 0
      let falseAlarmScore = 0
      for (let i = 0; i < r.length; i++) {
        if (r[parseInt(value[i]) - 1] === '0') {
          falseAlarm++
        }
        probFalseAlarm.push(falseAlarm / (r.length - nbImgHiddenData) * 100)
        probMiss.push(100 - (i - falseAlarm) / nbImgHiddenData * 100)
        if (probFalseAlarm[i] < process.env.FALSE_ALARM_THRESHOLD) {
          missScore = probFalseAlarm[i]
        }
        if (probFalseAlarm[i] < process.env.MISS_THRESHOLD) {
          falseAlarmScore = probFalseAlarm[i]
        }
        let errorRate = (falseAlarm + nbImgHiddenData - (i - falseAlarm)) / r.length * 100
        minErrorRate = Math.min(minErrorRate, errorRate)
      }

      // create the submission in database
      return models.Submission.create({
        UserId: req.user.id,
        value: req.body.value,
        remoteAddress: req.connection.remoteAddress,
        stage,
        errorRate: minErrorRate,
        falseAlarm: falseAlarmScore,
        miss: missScore
      })
    })
    .then(sub => res.status(201).json({ message: 'answer accepted', sub }))
    .catch(_ => res.status(500).json({ message: 'server error' }))
}

module.exports = { post }
