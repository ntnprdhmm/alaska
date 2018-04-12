const expect = require('chai').expect
const app = require('../app')
const request = require('supertest')(app)
const jwtHelper = require('../helpers/jwt')
const models = require('../models/index')
const _data = require('./_data')

const jwt = jwtHelper.create({ email: _data.email1 })

describe('auth middleware', () => {
  it('should not pass the auth middleware without JWT', (done) => {
    request.post('/api/submission')
      .set('authorization', `Bearer `)
      .send({ value: 'yolo' })
      .expect(401, done)
  })

  it('should pass the auth middleware', (done) => {
    request.post('/api/submission')
      .set('authorization', `Bearer ${jwt}`)
      .send({ value: 'yolo' })
      .expect(201, done)
  })
})
