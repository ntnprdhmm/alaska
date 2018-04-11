const expect = require('chai').expect
const app = require('../app')
const request = require('supertest')(app)
const models = require('../models/index')

describe('auth routes', () => {
  const email = 'user1@utt.fr'
  const email2 = 'user2@utt.fr'
  const errorEmail = 'emailyolo'
  const password = 'azeaze123'

  // remove the user we want to create before running the tests
  before(() => {
    return new Promise((resolve, reject) => {
      models.User.destroy({ where: {email: [email, email2]} })
        .then(_ => resolve())
        .catch(_ => resolve())
    })
  })

  it('register a new user', (done) => {
    request.post('/api/auth/register')
      .send({ email, password })
      .expect(201)
      .end((err, res) => {
        expect(err).to.be.a('null')
        expect(res.body).to.eql('')
        done()
      })
  })

  it('should failed to register a user with existing email', (done) => {
    request.post('/api/auth/register')
      .send({ email, password })
      .expect(400, done)
  })

  it('should failed to register a user with no email', (done) => {
    request.post('/api/auth/register')
      .send({ password })
      .expect(400, done)
  })

  it('should failed to register a user with no password', (done) => {
    request.post('/api/auth/register')
      .send({ email: email2 })
      .expect(400, done)
  })

  it('should failed to register a user with an incorrect email', (done) => {
    request.post('/api/auth/register')
      .send({ email: errorEmail, password })
      .expect(400, done)
  })

  it(`should failed to login a non validated account`, (done) => {
    request.post('/api/auth/login')
      .send({ email, password })
      .expect(401)
      .end((err, res) => {
        expect(res.body.message).to.equal('You have to activate your account. Check your emails.')
        done()
      })
  })

  it(`validate the new user's account`, (done) => {
    models.User.findOne({ where: {email} })
      .then(user => {
        request.post('/api/auth/register/callback')
          .send({ token: user.verificationToken })
          .expect(204)
          .end((err, res) => {
            expect(err).to.be.a('null')
            expect(res.body).to.eql({})
            done()
          })
      })
  })

  it(`shouldn't validate account (fake token)`, (done) => {
    models.User.findOne({ where: {email} })
      .then(user => {
        request.post('/api/auth/register/callback')
          .send({ token: 'yolo' })
          .expect(401, done)
      })
  })

  it('should have activate the user account', (done) => {
    models.User.findOne({ where: {email} })
      .then(user => {
          expect(user.active).to.be.true
          done()
      })
  })

  it('should return a JWT', (done) => {
    request.post('/api/auth/login')
      .send({ email, password })
      .expect(200)
      .end((err, res) => {
        expect(err).to.be.a('null')
        expect(res.body.token).to.be.a('string')
        done()
      })
  })

  it('should fail to login, because of the password', (done) => {
    request.post('/api/auth/login')
      .send({ email, password: `${password}wrong` })
      .expect(401)
      .end((err, res) => {
        expect(res.body.message).to.equal('Wrong password')
        done()
      })
  })
})
