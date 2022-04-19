import React, { FunctionComponent} from "react";
import {BoardProps} from "boardgame.io/react";
import {GameState} from "../game/Tarok";
import Player from "./Player";
import '../styles/board.css';
import Middle from "./Middle";
import OtherPlayer from "./OtherPlayer";
import {getPlayerPosition} from "../utils/Utils";

interface IBoardProps extends BoardProps<GameState> {}

const getPlayerId = (playerId: number, numberOfPlayers: number) => {
    if (playerId >= numberOfPlayers) {
        return playerId - numberOfPlayers;
    }
    return playerId;
}

const Board: FunctionComponent<IBoardProps> = ({ playerID, G, ctx, moves } : IBoardProps) =>  {

    const playerId = parseInt(playerID!);


    return (
        <div className="board">
            <Player
                demo="false"
                gameData={G}
                moves={moves}
                playerId={playerId}
            />

            {
                [...Array(ctx.numPlayers - 1)].map((_value, index) => {
                    const otherPlayerId = getPlayerId(playerId + index + 1, ctx.numPlayers)
                    return <OtherPlayer
                        key={`otherPlayer${index}`}
                        position={getPlayerPosition(playerId, otherPlayerId, ctx.numPlayers)}
                        playerId={otherPlayerId}
                    />
                })
            }
            <Middle gameData={G} ctx={ctx} playerId={playerId}/>
        </div>
    )
}

export default Board;
