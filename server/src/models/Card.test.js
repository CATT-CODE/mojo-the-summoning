const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Card, Attack } = require('./index')
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

describe('Card - Attack Association', () => {
    it('one card can have many attacks, one attack can have many cards', async () => {  
      let card2 = await Card.create({ name: 'Morphius', mojo: 20, stamina: 5, imgUrl: 'urlm' });

      let attack1 = await Attack.create({ title: 'Ice Shard', mojoCost: 10, staminaCost: 1 });
      let attack2 = await Attack.create({ title: 'Fire Ball', mojoCost: 30, staminaCost: 5 });
  
      await card.addAttack(attack1);
      await card.addAttack(attack2);
      await card2.addAttack(attack1);
      await card2.addAttack(attack2);
  
      let cardAttacks = await card.getAttacks();
      expect(cardAttacks.length).toBe(2);
      
      let attackCards = await attack2.getCards()
      expect(attackCards.length).toBe(2);
    })

    it('card can be loaded with its attacks', async () => {
        let cardAttacks = await Card.findOne({
          where: { name: card.name },
          include: Attack
        })  
        
        expect(cardAttacks.Attacks.length).toBe(2)
      })

    it('attacks can be loaded with its cards', async () => {
        let attackCards = await Attack.findOne({
          where: { title: 'Ice Shard' },
          include: Card
        })  
        
        expect(attackCards.Cards.length).toBe(2)
      })
  })
