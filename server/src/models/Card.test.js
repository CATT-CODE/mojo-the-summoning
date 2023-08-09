const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Card } = require('./index')
const { db } = require('../db/config')

// define in global scope
let card

// clear db and create new card before tests
beforeAll(async () => {
  await db.sync({ force: true })
  card = await Card.create({
    name: 'Nimue Mistral',
    mojo: 100,
    stamina: 10,
    imgUrl: 'http://localhost:5000/img/nimue-mistral.jpg'
  })
})

// clear db after tests
afterAll(async () => await db.sync({ force: true }))

describe('Card', () => {
  it('has an id', () => {
    expect(card).toHaveProperty('id')
  })

  it('has a name', () => {
    expect(card.name).toBe('Nimue Mistral')
  })

  it('has mojo', () => {
    expect(card.mojo).toBe(100)
  })

  it('has stamina', () => {
    expect(card.stamina).toBe(10)
  })

  it('has an imgUrl', () => {
    expect(card.imgUrl).toBe('http://localhost:5000/img/nimue-mistral.jpg')
  })
})
