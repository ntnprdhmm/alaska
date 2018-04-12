const expect = require('chai').expect
const app = require('../app')
const request = require('supertest')(app)
const jwtHelper = require('../helpers/jwt')
const models = require('../models/index')
const _data = require('./_data')

const monthInMS = 2592000000
const weekInS = 604800
const now = new Date().getTime()

const jwt = jwtHelper.create({ email: _data.email1 })

describe('submission routes', () => {
  // remove all submissions of the user, to avoid waiting time problems
  beforeEach(() => {
    return models.User.findOne({ where: {email: _data.email1} })
    .then(user => models.Submission.destroy({ where: {UserId: user.id} }))
  })

  describe('new submission, no previous submissions', () => {

    describe('stage 1', () => {
      // override env variables
      before(() => {
        env = process.env
        // - stage 1 started one month before now, and end in one month
        // - stage 2 start in 2 month and end 1 month later
        process.env = Object.assign({}, process.env, {
          STAGE_1_START: (now - monthInMS) / 1000,
          STAGE_1_END: (now + monthInMS) / 1000,
          STAGE_1_FILE: 'test/answers/1.txt',
          STAGE_2_START: (now + (2 * monthInMS)) / 1000,
          STAGE_2_END: (now + (3 * monthInMS)) / 1000,
          STAGE_2_FILE: 'test/answers/2.txt'
        })
      })

      it('should submit for stage 1', (done) => {
        request.post('/api/submission')
          .set('authorization', `Bearer ${jwt}`)
          .send({ value: 'img_1;img_2;img_3;img_4;img_5;img_6' })
          .expect(201, done)
      })

      it(`shouldn't submit before stage 1: value is undefined)`, (done) => {
        request.post('/api/submission')
          .set('authorization', `Bearer ${jwt}`)
          .send({})
          .expect(400, done)
      })

      it(`shouldn't submit in stage 1 without authentication`, (done) => {
        request.post('/api/submission')
          .send({})
          .expect(401, done)
      })

      // restoring env
      after(() => {
        process.env = env
      })
    })

    describe('stage 2', () => {
      // override env variables
      before(() => {
        env = process.env
        // - stage 1 ended 2 months ago
        // - stage 2 started 1 month ago and end in 1 month
        process.env = Object.assign({}, process.env, {
          STAGE_1_START: (now - (3 * monthInMS)) / 1000,
          STAGE_1_END: (now - (2 * monthInMS)) / 1000,
          STAGE_1_FILE: 'test/answers/1.txt',
          STAGE_2_START: (now - monthInMS) / 1000,
          STAGE_2_END: (now + monthInMS) / 1000,
          STAGE_2_FILE: 'test/answers/2.txt'
        })
      })

      it('should submit for stage 1', (done) => {
        request.post('/api/submission')
          .set('authorization', `Bearer ${jwt}`)
          .send({ value: 'img_1;img_2;img_3;img_4;img_5;img_6;img_7;img_8;img_9;' +
            'img_10;img_11;img_12;img_13;img_14;img_15;img_16;img_17;img_18;' +
            'img_19;img_20' })
          .expect(201, done)
      })

      it(`shouldn't submit before stage 1: value is undefined)`, (done) => {
        request.post('/api/submission')
          .set('authorization', `Bearer ${jwt}`)
          .send({})
          .expect(400, done)
      })

      it(`shouldn't submit in stage 2 without authentication`, (done) => {
        request.post('/api/submission')
          .send({})
          .expect(401, done)
      })

      // restoring env
      after(() => {
        process.env = env
      })
    })

  })

})
