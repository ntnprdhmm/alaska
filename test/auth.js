const expect = require('chai').expect
const app = require('../app')
const request = require('supertest')(app)
const models = require('../server/models/index')
const _data = require('./_data')

describe('auth routes', () => {
  // remove the user we want to create before running the tests
  before(() => {
    return new Promise((resolve, reject) => {
      models.Submission.destroy({ where: {} })
        .then(_ => {
          return models.User.destroy({ where: {email: [_data.email1, _data.email3, _data.email2]} })
            .then(_ => resolve())
            .catch(_ => resolve())
        })
    })
  })

  it('should register user 1', (done) => {
    request.post('/api/auth/register')
      .send({ email: _data.email1, password: _data.password })
      .expect(201)
      .end((err, res) => {
        expect(err).to.be.a('null')
        expect(res.body).to.have.property('message')
        done()
      })
  })

  it('should failed to register user 2 without password', (done) => {
    request.post('/api/auth/register')
      .send({ email: _data.email2 })
      .expect(400, done)
  })

  it('should register user 2', (done) => {
    request.post('/api/auth/register')
      .send({ email: _data.email2, password: _data.password })
      .expect(201)
      .end((err, res) => {
        expect(err).to.be.a('null')
        expect(res.body).to.have.property('message')
        done()
      })
  })

  it('should register user 3', (done) => {
    request.post('/api/auth/register')
      .send({ email: _data.email3, password: _data.password })
      .expect(201)
      .end((err, res) => {
        expect(err).to.be.a('null')
        expect(res.body).to.have.property('message')
        done()
      })
  })

  it('should failed to register user 1 again (email already exists)', (done) => {
    request.post('/api/auth/register')
      .send({ email: _data.email1, password: _data.password })
      .expect(400, done)
  })

  it('should failed to register a user with no email', (done) => {
    request.post('/api/auth/register')
      .send({ password: _data.password })
      .expect(400, done)
  })

  it('should failed to register a user with an incorrect email', (done) => {
    request.post('/api/auth/register')
      .send({ email: _data.emailError, password: _data.password })
      .expect(400, done)
  })

  it(`should failed to authenticate a not validated account`, (done) => {
    request.post('/api/auth/login')
      .send({ email: _data.email1, password: _data.password })
      .expect(401)
      .end((err, res) => {
        expect(res.body.message).to.equal('You have to activate your account. Check your emails.')
        done()
      })
  })

  it(`should validate the account of user 1`, (done) => {
    models.User.findOne({ where: {email: _data.email1} })
      .then(user => {
        request.post('/api/auth/register/callback')
          .send({ token: user.verificationToken })
          .expect(200)
          .end((err, res) => {
            expect(err).to.be.a('null')
            expect(res.body).to.have.property('message')
            done()
          })
      })
  })

  it(`should validate the account of user 3`, (done) => {
    models.User.findOne({ where: {email: _data.email3} })
      .then(user => {
        request.post('/api/auth/register/callback')
          .send({ token: user.verificationToken })
          .expect(200)
          .end((err, res) => {
            expect(err).to.be.a('null')
            expect(res.body).to.have.property('message')
            done()
          })
      })
  })

  it(`shouldn't validate account if the token is invalid`, (done) => {
    models.User.findOne({ where: {email: _data.email1} })
      .then(user => {
        request.post('/api/auth/register/callback')
          .send({ token: 'yolo' })
          .expect(401, done)
      })
  })

  it('should have activate the account of user 1', (done) => {
    models.User.findOne({ where: {email: _data.email1} })
      .then(user => {
          expect(user.active).to.be.true
          done()
      })
  })

  it(`shouldn't have activate the account of user 2`, (done) => {
    models.User.findOne({ where: {email: _data.email2} })
      .then(user => {
          expect(user.active).to.be.false
          done()
      })
  })

  it('should have activate the account of user 3', (done) => {
    models.User.findOne({ where: {email: _data.email3} })
      .then(user => {
          expect(user.active).to.be.true
          done()
      })
  })

  it('should authenticate user 1', (done) => {
    request.post('/api/auth/login')
      .send({ email: _data.email1, password: _data.password })
      .expect(200)
      .end((err, res) => {
        expect(err).to.be.a('null')
        expect(res.body.token).to.be.a('string')
        done()
      })
  })

  it('should fail to authenticate user 1 with a wrong password', (done) => {
    request.post('/api/auth/login')
      .send({ email: _data.email1, password: `${_data.password}wrong` })
      .expect(401)
      .end((err, res) => {
        expect(res.body.message).to.equal('wrong password')
        done()
      })
  })

  it('should fail to authenticate user 2 because his account is not active', (done) => {
    request.post('/api/auth/login')
      .send({ email: _data.email2, password: `${_data.password}` })
      .expect(401)
      .end((err, res) => {
        expect(res.body.message).to.equal('You have to activate your account. Check your emails.')
        done()
      })
  })

  describe('resend confirmation email', () => {

    it('should fail because no email provided', (done) => {
      request.post('/api/auth/register/email')
        .send({ email: '' })
        .expect(400)
        .end((_, res) => {
          expect(res.body).to.have.property('message')
          done()
        })
    })

    it(`should fail because this email doesn't exists`, (done) => {
      request.post('/api/auth/register/email')
        .send({ email: 'nobody@none.com' })
        .expect(404)
        .end((_, res) => {
          expect(res.body).to.have.property('message')
          done()
        })
    })

    it(`should success`, (done) => {
      request.post('/api/auth/register/email')
        .send({ email: _data.email1 })
        .expect(200)
        .end((err, res) => {
          expect(err).to.be.a('null')
          expect(res.body).to.have.property('message')
          done()
        })
    })

  })

})
