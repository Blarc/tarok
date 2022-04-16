import {FunctionComponent} from "react";
import {Client} from "boardgame.io/react";
import {Tarok} from "../game/Tarok";
import {Local} from "boardgame.io/multiplayer";
import {Debug} from "boardgame.io/debug";

export interface IBoardComponentProps {
    playerID: string;
    demo: string;
}

function BoardFunction({...props } ) {
    return (
        <div className="board">
            <p>Hello</p>
        </div>
    )
}

const Board: FunctionComponent<IBoardComponentProps> = (props) => {

    const TarokClient = Client({
        game: Tarok,
        board: BoardFunction,
        multiplayer: Local(),
        debug: { impl: Debug }
    });

    return (
        <TarokClient playerID="0" />
    )
}

export default Board
