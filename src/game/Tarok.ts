import {Game} from "boardgame.io";
import {IPlayer} from "../entities/Player";
import {ICard} from "../entities/Card";
import {deck} from "../entities/Deck";

export interface GameState {
    turn: number;
    players: IPlayer[];
}

export const Tarok: Game<GameState> = {
    name: 'Tarok',

    setup: () => (prepareGame(4)),

    minPlayers: 4,
    maxPlayers: 4,
}

function prepareGame(numberOfPlayers: number) {

    let players: IPlayer[] = []

    for (let i = 0; i < numberOfPlayers; i++) {
        let cards: ICard[] = deck.slice(0, 12)
        players.push({
            cards: cards,
            points: [0]
        })
    }

    return {
        turn: 0,
        players: players
    }
}
