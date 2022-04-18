import {Game} from "boardgame.io";
import {IPlayer} from "../entities/Player";
import {ICard} from "../entities/Card";
import {shuffledDeck} from "../entities/Deck";
import {TurnOrder} from "boardgame.io/core";

export interface GameState {
    turn: number;
    players: IPlayer[];
    middle: ICard[];
    talon: ICard[];
    firstThrower: number;
}

export const Tarok: ((numberOfPlayers: number) => Game<GameState>) = ((numberOfPlayers) => ({
    name: 'Tarok',

    setup: () => ({
        turn: 0,
        players: [],
        middle: [],
        talon: [],
        firstThrower: 0
    }),

    phases: {
        draw: {
            moves: {},
            onBegin: (G, ctx) => {
                const deck = shuffledDeck();
                G.talon = deck.splice(0, 6);
                const numberOfCards = deck.length

                for (let i = 0; i < numberOfPlayers; i++) {
                    G.players[i] = {
                        cards: deck.splice(0, numberOfCards / numberOfPlayers),
                        points: [0]
                    }
                }
                ctx.events?.endPhase()
            },

            next: 'play',
            start: true,
            endIf: G => G.players[0] && G.players[0].cards.length === 0,
        },

        play: {
            turn: {
                order: TurnOrder.ONCE
            },
            moves: {
                playCard: (G, ctx, index, card) => {
                    let playerID = parseInt(ctx.currentPlayer);
                    console.log(playerID)
                    let currentPlayer: IPlayer = G.players[playerID];
                    currentPlayer.cards.splice(index, 1);
                    G.middle.push(card);
                    console.log('playCard');
                    ctx.events?.endTurn();

                }
            },
            next: 'evaluate'
        },

        evaluate: {
            moves: {},
            onBegin: (G, ctx) => {
                console.log('evaluate')
                ctx.events?.endPhase()
            },
            onEnd: (G, ctx) => {
                console.log('cleanup')
            },
            next: 'play'
        }
    },
    minPlayers: 3,
    maxPlayers: 4,
}))
