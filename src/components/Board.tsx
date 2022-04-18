import React, { FunctionComponent} from "react";
import {BoardProps} from "boardgame.io/react";
import {GameState} from "../game/Tarok";
import Player from "./Player";
import '../styles/board.css';
import Middle from "./Middle";

interface IBoardProps extends BoardProps<GameState> {}

const Board: FunctionComponent<IBoardProps> = ({ playerID, G, ctx, moves } : IBoardProps) =>  {

    return (
        <div className="board">
            <Player
                demo="false"
                gameData={G}
                moves={moves}
                playerId={parseInt(playerID!)}
            />
            <Middle gameData={G}/>
        </div>
    )
}

export default Board;
