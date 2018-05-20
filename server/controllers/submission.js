const models = require('../models/index')
const fileHelper = require('../helpers/file')

const get = (req, res) => {
  models.Submission.findAll({
    attributes: ['stage', 'createdAt', 'errorRate', 'missRate', 'falseAlarmRate'],
    include: [{
      model: models.User,
      attributes: ['email']
    }]
  })
    .then(submissions => res.json({ submissions }))
    .catch(_ => res.status(500).json({ message: 'server error' }))
}

const post = (req, res) => {
  // if submission empty, return error
  if (!req.body.value) {
    return res.status(400).json({ message: 'nothing to validate' })
  }

  // get the current challenge answer
  const currentDate = new Date().getTime() / 1000
  let stage = null
  if (currentDate > process.env.STAGE_1_START && currentDate < process.env.STAGE_1_END) {
    stage = 1
  } else if (currentDate > process.env.STAGE_2_START && currentDate < process.env.STAGE_2_END) {
    stage = 2
  } else {
    return res.status(403).json({ message: 'no stage in progress' })
  }

  // read the content of the file
  fileHelper.read(stage === 1 ? process.env.STAGE_1_FILE : process.env.STAGE_2_FILE)
    .then(r => {
      // each element is a boolean, that indicates if the image contains hidden things
      const correctAns = Array.from(r)
      // array with the submission's images
      const ans = req.body.value.split(';')
      // nb images with hidden things
      const nbStego = correctAns.filter(c => c === '1').length
      const nbCover = correctAns.length - nbStego

      let nbMD = nbStego + 0.0
      let nbFA = 0.0

      const datasetSize = nbStego + nbCover

      let pCD001 = 0.0 // Proba de Correct Detection pour un taux de Fausse alarme de 0.01
      let FPat50 = 0.0 // Proba de Faux Positif pour 50% de bonne detection
      let minPE = 1.0  // Valeur minimale proba FA + proba MD
      let TOP10FA = 0.0

      let ROC_pwr = [0.0]
      let ROC_pfa = [0.0]

      // On commence par supposer qu'ils sont tous cover (donc pFA=0 & pMD=0)
      for (let i = 0; i < datasetSize; i++) {

        if (correctAns[ans[i]] === '0') {
          nbFA++
        }
        if (correctAns[ans[i]] === '1') {
          nbMD--
        }
        let pFA = nbFA / nbCover
        let pMD = nbMD / nbStego
        let PE = (nbFA + nbMD) / (nbStego + nbCover)
        if (pFA <= 0.05) { // ici j'ai mis 5% car j'ai généré un petit jeu de données
          pCD001 = 1 - pMD
        }
        if (pMD >= 0.5) { // ici j'ai mis 5% car j'ai généré un petit jeu de données
          FPat50 = pFA
        }
        if (PE < minPE) {
          minPE = PE
        }
        if (i <= datasetSize * 0.1) {
          TOP10FA = pFA
        }

        ROC_pwr.push(1 - pMD)
        ROC_pfa.push(pFA)
      }
      // create the submission in database
      return models.Submission.create({
        UserId: req.user.id,
        value: req.body.value,
        remoteAddress: req.connection.remoteAddress,
        stage,
        errorRate: minPE,
        falseAlarmRate: FPat50,
        missRate: pCD001
      })
    })
    .then(sub => res.status(201).json({ message: 'answer accepted', sub }))
    .catch(_ => res.status(500).json({ message: 'server error' }))
}

module.exports = { post, get }
