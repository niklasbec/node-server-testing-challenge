const server = require('./server')
const request = require('supertest')

describe('server.js module', () => {
  it('has the right environment for DB_ENV', () => {
    expect(process.env.DB_ENV).toBe('testing')
  })

  describe('up endpoint', () => {

    it('returns a 200 OK async/await', async () => {
      const res = await request(server).get('/api/users')
      expect(res.status).toBe(200)
    })

    it('returns a 200 OK ES6 promises', () => {
      return request(server).get('/api/users')
        .then(res => {
          expect(res.status).toBe(200)
        })
    })

    it('returns a 200 OK supertest', () => {
      return request(server).get('/api/users')
        .expect(200)
    })

    it('returns the right body', () => {
      return request(server).get('/api/users')
        .expect([ { id: 1, username: 'fdsuhsdf', password: 'heloo' } ])
    })

    it('returns the right headers', () => {
      // multi-assertion test
      return request(server).get('/api/users')
        .expect('Content-Length', '51')
        .expect('Content-Type', /utf/)
        .expect('Content-Type', /json/)
    })
  })
})