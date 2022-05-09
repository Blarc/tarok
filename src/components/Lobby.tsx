import {FunctionComponent, useEffect} from "react";
import {LobbyAPI} from "../api/LobbyAPI";
import {APP_PRODUCTION, GAME_SERVER_URL, WEB_SERVER_URL} from "../config";
import {Client} from "boardgame.io/react";
import Tarok from "../game/Tarok";
import Board from "./Board";
import {SocketIO} from "boardgame.io/multiplayer";
import {Trans} from "react-i18next";
import {Link} from "react-router-dom";
import TemplatePage from "../pages/TemplatePage";

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
    match: any,
    isPublic: boolean
}

const Lobby: FunctionComponent<ILobbyProps> = props => {

    let gameLinkBox = undefined;
    let interval: NodeJS.Timer | undefined = undefined;
    const state:
        {
            id: number,
            joined: [],
            myId: number,
            userAuthToken: string,
            copied: boolean
        } = {
            id: 1,
            joined: [],
            myId: -1,
            userAuthToken: "",
            copied: false
        }

    useEffect(() => {
        checkRoomStateAndJoin();
        interval = setInterval(checkRoomState, 1000);

        return () => {
            api.leaveRoom(state.id, state.myId, state.userAuthToken);
            if (interval !== undefined) {
                clearInterval(interval)
            }
        }
    })

    function joinRoom(playerNumber: number) {
        const username = 'Player ' + playerNumber;
        if (state.id) {
            api.joinRoom(state.id, username, playerNumber).then(
                authToken => {
                    console.log('Joined the room. Your id is: ', playerNumber);
                    console.log(state);
                    state.myId = playerNumber;
                    state.userAuthToken = authToken;
                },
                error => {
                    console.log(error);
                }
            );
        }
    }

    function checkRoomStateAndJoin()  {
        if (state.id) {
            api.whoIsInRoom(state.id).then(
                players => {
                    const joinedPlayers = players.filter((p: any) => p.name);
                    state.joined = joinedPlayers;
                    const myPlayerNum = joinedPlayers.length;
                    joinRoom(myPlayerNum);
                },
                () => {
                    console.log('Room does not exist.');
                    state.id = -1;
                }
            );
        }
    }

    function checkRoomState() {
        if (state.id) {
            api.whoIsInRoom(state.id).then(
                players => {
                    const joinedPlayers = players.filter((p: any) => p.name);
                    state.joined = joinedPlayers;
                },
                _error => {
                    console.log('Room does not exist.');
                    state.id = -1;
                }
            )
        }
    }

    function getPlayerItem(player: any) {
        if (player) {
            if (player.id === state.myId) {
                return (
                    <div>
                        <div className="player-item">
                            <Trans>You [connected]</Trans>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div>
                        <div className="player-item">
                            {player.name}
                            <div className="player-ready"></div>
                        </div>
                    </div>
                );
            }
        } else {
            return (
                <div>
                    <div id="bars1">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            );
        }
    }

    function gameExistsView() {
        const players = [0, 1, 2, 3];
        const server = APP_PRODUCTION ? `https://${window.location.hostname}` : WEB_SERVER_URL;

        return (
            <>
                <div className="game-link">
                    <Trans>
                        {props.isPublic ? 'Public lobby text' : 'Private lobby text'}
                    </Trans>
                    <br />
                    <div
                        className="game-link-box"
                        // ref={(glb) => (gameLinkBox = glb)}
                    >
                        {`${server}/lobby/${state.id}`}
                    </div>
                    <div className="menu-button small">
                        {state.copied ? 'Copied️!' : ' Copy '}
                    </div>
                </div>
                {state.joined.length}{' '}
                <Trans>
                    Out of the 4 required players are in the{' '}
                    {props.isPublic ? 'public' : 'private'} lobby
                </Trans>
                <div className="game-code">{state.id}</div>:
                <div className="player-list">
                    {players.map((p) => {
                        const joinedPlayer = state.joined[p];
                        return getPlayerItem(joinedPlayer);
                    })}
                </div>
            </>
        )
    }

    function gameNotFoundView() {
        return (
            <>
                <div>
                    <Trans>Error 404. Lobby with this game code not found.</Trans>
                    <br />
                    <Link to="/">
                        <Trans>Go back and create a new lobby.</Trans>
                    </Link>
                </div>
            </>
        )
    }

    function getGameClient() {
        return (
            <TarokClient
                matchID={state.id!.toString()}
                playerID={state.myId!.toString()}
                credentials={state.userAuthToken}
                debug={false}
            />
        )
    }

    // @ts-ignore
    if (state.joined.length === 4) {
        return getGameClient()
    }
    return (
        <TemplatePage
            content={state.id ? gameExistsView() : gameNotFoundView()}
        />
    )
}

export default Lobby;
