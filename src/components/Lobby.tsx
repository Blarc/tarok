import {FunctionComponent, useEffect} from "react";
import {LobbyAPI} from "../api/LobbyAPI";
import {APP_PRODUCTION, GAME_SERVER_URL} from "../config";
import {Client} from "boardgame.io/react";
import {Tarok} from "../game/Tarok";
import Board from "./Board";
import {SocketIO} from "boardgame.io/multiplayer";

const api = new LobbyAPI();
const server = APP_PRODUCTION
    ? `https://${window.location.hostname}`
    : GAME_SERVER_URL;

const TarokClient = Client({
    game: Tarok,
    board: Board,
    numPlayers: 4,
    debug: false,
    multiplayer: SocketIO({
        server: server,
    })
});

interface ILobbyProps {
    match: any
}

const Lobby: FunctionComponent<ILobbyProps> = props => {
    const state:
        {
            id: number | null,
            joined: [],
            myId: number | null,
            userAuthToken: string | null
        } = {
            id: props.match.params.id,
            joined: [],
            myId: -1,
            userAuthToken: null
        }

    useEffect(() => {
        checkRoomStateAndJoin();
    })

    function joinRoom(playerNumber: number) {
        const username = 'Player ' + playerNumber;
        if (state.id) {
            api.joinRoom(state.id, username, playerNumber).then(
                (authToken) => {
                    console.log('Joined the room. Your id is: ', playerNumber);
                    console.log(state);
                    state.myId = playerNumber;
                    state.userAuthToken = authToken;
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }

    function checkRoomStateAndJoin()  {
        if (state.id) {
            api.whoIsInRoom(state.id).then(
                (players) => {
                    const joinedPlayers = players.filter((p: any) => p.name);
                    state.joined = joinedPlayers;
                    const myPlayerNum = joinedPlayers.length;
                    joinRoom(myPlayerNum);
                },
                () => {
                    console.log('Room does not exist.');
                    state.id = null;
                }
            );
        }
    }

    return <div></div>
}
