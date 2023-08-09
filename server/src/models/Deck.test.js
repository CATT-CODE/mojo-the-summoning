const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Deck, Card } = require('./index')
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

describe('Deck - Card Association', () => {
    it('one deck has many cards', async () => {  
      let card1 = await Card.create({ name: 'Galadriel', mojo: 10, stamina: 7, imgUrl: 'urlg' });
      let card2 = await Card.create({ name: 'Morphius', mojo: 20, stamina: 5, imgUrl: 'urlm' });
  
      await deck.addCard(card1);
      await deck.addCard(card2);
  
      let deckCards = await deck.getCards();

      expect(deckCards.length).toBe(2);
      expect(deckCards[0].name).toBe('Galadriel');
      expect(deckCards[1].name).toBe('Morphius');
    })

    it('deck can be loaded with its cards', async () => {
      let deckCards = await Deck.findOne({
        where: { name: deck.name },
        include: Card
      })  
      
      expect(deckCards.Cards.length).toBe(2)
    })
  })