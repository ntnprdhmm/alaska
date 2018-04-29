const expect = require('chai').expect
const app = require('../app')
const request = require('supertest')(app)
const hashHelper = require('../server/helpers/hash')
const models = require('../server/models/index')
const _data = require('./_data')

describe('password reset', () => {

  describe('first part', () => {

    it('should fail because no email provided', (done) => {
      request.post('/api/auth/reset')
        .send({})
        .expect(400)
        .end((_, res) => {
          expect(res.body).to.have.property('message')
          done()
        })
    })

    it('should fail because unknown email', (done) => {
      request.post('/api/auth/reset')
        .send({ email: `nobody@none.com` })
        .expect(404)
        .end((_, res) => {
          expect(res.body).to.have.property('message')
          done()
        })
    })

    it('should generate a reset token and send a mail', (done) => {
      request.post('/api/auth/reset')
        .send({ email: _data.email1 })
        .expect(200)
        .end((_, res) => {
          expect(res.body).to.have.property('message')
          done()
        })
    })

  })

  describe('second part', () => {

    it('should fail because no password provided', (done) => {
      request.post('/api/auth/reset/callback')
        .send({ resetToken: 'azeaz' })
        .expect(400)
        .end((_, res) => {
          expect(res.body).to.have.property('message')
          done()
        })
    })

    it('should fail because password empty', (done) => {
      request.post('/api/auth/reset/callback')
        .send({ resetToken: 'azeaz', password: '' })
        .expect(400)
        .end((_, res) => {
          expect(res.body).to.have.property('message')
          done()
        })
    })

    it(`should fail because the token doesn't exists'`, (done) => {
      request.post('/api/auth/reset/callback')
        .send({ resetToken: 'idontexists', password: 'password' })
        .expect(404)
        .end((_, res) => {
          expect(res.body).to.have.property('message')
          done()
        })
    })

    it('should change the password of user 1', (done) => {
      models.User.findOne({ where: {email: _data.email1} })
        .then(user => {
          request.post('/api/auth/reset/callback')
            .send({ token: user.resetToken, password: 'password987!' })
            .expect(200)
            .end((_, res) => {
              expect(res.body).to.have.property('message')
              models.User.findOne({ where: {email: _data.email1} })
                .then(user => {
                  expect(user.password).to.equal(hashHelper.hashSync('password987!', user.salt))
                  expect(user.resetToken).to.be.null
                  done()
                })
            })
        })
    })

  })

})
