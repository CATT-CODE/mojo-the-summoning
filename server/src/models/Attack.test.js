const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Attack } = require('./index')
const { db } = require('../db/config')

// define in global scope
let attack

// clear db and create new attack before tests
beforeAll(async () => {
  await db.sync({ force: true })
  attack = await Attack.create({
    title: 'Ice Shard',
    mojoCost: 10,
    staminaCost: 1
  })
})

// clear db after tests
afterAll(async () => await db.sync({ force: true }))

describe('Attack', () => {
  it('has an id', () => {
    expect(attack).toHaveProperty('id')
  })

  it('has a title', () => {
    expect(attack.title).toBe('Ice Shard')
  })

  it('has mojoCost', () => {
    expect(attack.mojoCost).toBe(10)
  })

  it('has staminaCost', () => {
    expect(attack.staminaCost).toBe(1)
  })

})