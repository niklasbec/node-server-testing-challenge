const db = require('../data/db-config')
const Users = require('./user-model')

beforeEach(async () => {
  await db('users').truncate()
})

describe('users model', () => {
  describe('add()', () => {
    it('adds the correct number of users', async () => {
      await Users.add({ username: 'fdsuhsdf', password: 'heloo' })
      await Users.add({ username: 'frsdsfsdfdo', password: 'henlo' })
      const UserData = await db('users')
      expect(UserData).toHaveLength(2)
    })

    it('adds the users without breaking them', async () => {
      const UserData = await Users.add({ username: 'fdsuhsdf', password: 'heloo' })
      expect(UserData).toMatchObject({ username: 'fdsuhsdf', password: 'heloo' })
    })

    it('can find a user in the db', async () => {
    
      await db('users').insert({ username: 'fdsuhsdf', password: 'heloo' })
      const findUser = await Users.findById(1)
      expect(findUser).toMatchObject({ username: 'fdsuhsdf', password: 'heloo' })
    })
  })
})
