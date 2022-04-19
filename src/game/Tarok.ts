import {Game} from "boardgame.io";
import {IPlayer} from "../entities/Player";
import {ICard} from "../entities/Card";
import {deck} from "../entities/Deck";
import {TurnOrder} from "boardgame.io/core";
import middle from "../components/Middle";

export interface GameState {
    turn: number;
    players: IPlayer[];
    middle: ICard[];
    talon: ICard[];
    firstThrower: number;
}

export const Tarok: Game<GameState> = {
    name: 'Tarok',

    setup: (ctx) => ({
        turn: 0,
        players: [],
        middle: Array(ctx.numPlayers),
        talon: [],
        firstThrower: 0
    }),

    phases: {
        draw: {
            moves: {},
            onBegin: (G, ctx) => {
                const shuffledDeck = ctx.random?.Shuffle(deck);
                G.talon = shuffledDeck!.splice(0, 6);
                const numberOfCards = shuffledDeck!.length

                for (let i = 0; i < ctx.numPlayers; i++) {
                    G.players[i] = {
                        cards: shuffledDeck!
                            .splice(0, numberOfCards / ctx.numPlayers)
                            .sort((a, b) => a.sortNumber > b.sortNumber ? -1 : 1)
                        ,
                        points: [0]
                    }
                }
                ctx.events?.endPhase()
            },

            next: 'play',
            start: true
        },

        gameSelection: {
            moves: {},
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
                    G.middle[playerID] = card;
                    console.log('playCard');
                    // ctx.events?.endTurn();

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
}
