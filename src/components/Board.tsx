import React, { FunctionComponent} from "react";
import {Client, BoardProps} from "boardgame.io/react";
import {Tarok, GameState} from "../game/Tarok";
import {Local} from "boardgame.io/multiplayer";
import {Debug} from "boardgame.io/debug";
import Player from "./Player";
import '../styles/board.css';

interface IBoardProps extends BoardProps<GameState> {}

export const renderBoard = ({ G, ctx, moves } : IBoardProps) =>  {

    for (let player in G.players) {
        console.log(player)
    }

    return (
        <div className="board">
            <Player demo="false" gameData={{turn: G.turn, players: G.players}}  />
        </div>
    )
}

export interface IBoardComponentProps {
    playerID: string;
    demo: string;
}

const Board: FunctionComponent<IBoardComponentProps> = (props) => {

    const TarokClient = Client({
        game: Tarok,
        board: renderBoard,
        multiplayer: Local(),
        debug: { impl: Debug }
    });

    return (
        <TarokClient />
    )
}

export default Board;
