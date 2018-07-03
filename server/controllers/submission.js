const models = require('../models/index')
const fileHelper = require('../helpers/file')

const get = (req, res) => {
  models.Submission.findAll({
    attributes: ['stage', 'createdAt', 'errorRate', 'missRate', 'falseAlarmRate', 'FAtop10'],
    order: [ ['createdAt', 'DESC'],],
    include: [{
      model: models.User,
      attributes: ['email']
    }]
  })
    .then(submissions => res.json({ submissions }))
    .catch(err => res.status(500).json({ message: 'server error', err }))
}

const post = async (req, res) => {
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
  } else if (currentDate > process.env.STAGE_3_START && currentDate < process.env.STAGE_3_END) {
    stage = 3
  } else {
    return res.status(403).json({ message: 'no stage in progress' })
  }

  try {
    // read the content of the file
    const r = await fileHelper.read(stage === 1 ? process.env.STAGE_1_FILE : process.env.STAGE_2_FILE) 
    // each element is a boolean, that indicates if the image contains hidden things
    const correctAns = Array.from(r)
    // array with the submission's images
    const ans = req.body.value.split(';')

    // check that the answer has the same length as the true answer
    if (ans.length < correctAns.length) {
      return res.status(400).json({ 
        message: 'There are missing images in your answer' 
      })
    }
    if (ans.length > correctAns.length) {
      return res.status(400).json({ 
        message: 'There are more images than expected in your answer' 
      })
    }

    // check that each images in the answer is different
    if (ans.length !== new Set(ans).size) {
      return res.status(400).json({ 
        message: 'There are duplicates images in your answer' 
      })
    }

    // check that all elements of the answer are numerical values (indexes)
    if (ans.some(isNaN)) {
      return res.status(400).json({ 
        message: 'Image indexes can take only numerical values' 
      })
    }

    // check that images indexes are from 0 to correctAns.length-1 
    if (Math.max(...ans) > correctAns.length) {
      return res.status(400).json({ 
        message: 'Image indexes cannot be larger than total number of images' 
      })
    }
    if (Math.min(...ans) < 1) {
      return res.status(400).json({ 
        message: 'How did you come out with negative image indexes ?!?' 
      })
    }


    const mask = Array.from({length: correctAns.length}, () => Math.random() > 0.8 ? 0 : 1)

    let nbStego = 0.0
    let nbCover = 0.0
    for (let i = 0; i < correctAns.length; i++) {
      if (mask[i] === 1) {
        if (correctAns[ans[i]-1] === '0') {
          nbCover++
        }
        if ( correctAns[ans[i]-1] === '1') {
          nbStego++
        }
      }
    }

    const datasetSize = nbStego + nbCover
    let datasetIndex = 0
    
    let nbMD = nbStego + 0.0
    let nbFA = 0.0

    let pCD001 = 0.0 // Proba de Correct Detection pour un taux de Fausse alarme de 0.01
    let FPat50 = 0.0 // Proba de Faux Positif pour 50% de bonne detection
    let minPE = 1.0  // Valeur minimale proba FA + proba MD
    let TOP10FA = 0.0

    let ROC_pwr = [0.0]
    let ROC_pfa = [0.0]

    // On commence par supposer qu'ils sont tous cover (donc pFA=0 & pMD=0)
    for (let i = 0; i < correctAns.length; i++) {
      if (mask[i] === 1) {
        if (correctAns[ans[i]-1] === '0') {
          nbFA++
        }
        if (correctAns[ans[i]-1] === '1') {
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
        if (datasetIndex <= datasetSize * 0.1) {
          TOP10FA = pFA
        }

        ROC_pwr.push(1 - pMD)
        ROC_pfa.push(pFA)

        datasetIndex++
      }

    }
    
    // create the submission in database
    const sub = await models.Submission.create({
      UserId: req.user.id,
      value: req.body.value,
      remoteAddress: req.connection.remoteAddress,
      stage,
      errorRate: Math.round(minPE*10000)/100,
      falseAlarmRate: Math.round(FPat50*10000)/100,
      missRate: Math.round((1-pCD001)*10000)/100,
      FAtop10: Math.round((TOP10FA)*10000)/100
    })
    return res.status(201).json({ message: 'answer accepted', sub })
  } catch (err) {
    return res.status(500).json({ message: 'server error' })
  }
}

module.exports = { post, get }
