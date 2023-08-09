const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { User, Deck } = require('./index')
const { db } = require('../db/config')

// define in global scope
let user

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true })
  user = await User.create({ username: 'gandalf' })
})

// clear db after tests
afterAll(async () => await db.sync({ force: true }))

describe('User', () => {
  it('has an id', () => {
    expect(user).toHaveProperty('id')
  })

  it('has a username', () => {
    expect(user.username).toBe('gandalf')
  })
})

describe('User - Deck Association', () => {
  it('user has one deck', async () => {
    let deck = await Deck.create({ name: 'LOTR Deck', xp: 0 })

    await user.setDeck(deck)

    let userDeck = await User.findOne({
      where: { username: user.username },
      include: Deck
    })

    expect(userDeck.Deck.name).toBe('LOTR Deck')
  })
})
