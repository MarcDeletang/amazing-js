const chai = require('chai'),
  chaiAsPromised = require('chai-as-promised'),
  request = require('supertest'),
  expect = chai.expect

//Eventually
chai.use(chaiAsPromised)
//Result.should
chai.should()

const amazingModule = require('../index.js')


describe('Testing add', function () {

  it('Should return 4', function (done) {
    expect(amazingModule.add(1, 3)).to.be.equal(4)
    done()
  })


  it('Should throw an exception', function (done) {
    expect(() => amazingModule.add(1, '3')).to.throw(Error)
    done()
  })

})

describe('Testing promiseSubstract', function () {

  it('Should return 4', function () {
    return amazingModule.promiseSubstract(1, 3).should.eventually.equal(-4)
  })

  it('Should throw an exception', function () {
    return amazingModule.promiseSubstract(1, '3').should.be.rejectedWith(Error)
  })

})

const server = new amazingModule.Server(1337)
describe('Testing server', function () {

  it('Should throw an exception', function () {
    expect(() => new amazingModule.Server()).to.throw(Error)
  })

  it('Should create a new item', function (done) {
    request(server.app)
      .post('/item')
      .send({ 'firstName': 'michel' })
      .expect(200)
      .end(function (err, res) {
        expect(err).to.be.equal(null)
        expect(res.body.firstName).to.be.equal('michel')
        return done()
      })
  })

  it('Should find an item', function (done) {
    request(server.app)
      .get('/item/1')
      .expect(200)
      .end(function (err, res) {
        expect(err).to.be.equal(null)
        expect(res.body.firstName).to.be.equal('michel')
        return done()
      })
  })

})