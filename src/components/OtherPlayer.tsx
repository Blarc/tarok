import {FunctionComponent} from "react";

export interface IOtherPlayer {
    position: string;
    playerId: number;
}

const OtherPlayer: FunctionComponent<IOtherPlayer> = props => {

    return (
        <>
            {
                <div
                    className={props.position}
                >
                    <p>Table position: {props.position}</p>
                    <p>Player id: {props.playerId}</p>
                </div>
            }
        </>
    )

}

export default OtherPlayer;
