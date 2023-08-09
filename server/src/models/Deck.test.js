const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Deck } = require('./index')
const { db } = require('../db/config')

// define in global scope
let deck

// clear db and create new deck before tests
beforeAll(async () => {
  await db.sync({ force: true })
  deck = await Deck.create({
    name: 'The Matrix',
    xp: 0,
  })
})

// clear db after tests
afterAll(async () => await db.sync({ force: true }))

describe('Deck', () => {
  it('has an id', () => {
    expect(deck).toHaveProperty('id')
  })

  it('has a name', () => {
    expect(deck.name).toBe('The Matrix')
  })

  it('has xp', () => {
    expect(deck.xp).toBe(0)
  })

})