import ky from 'ky';
import {APP_PRODUCTION, GAME_NAME, GAME_SERVER_URL} from "../config";
const server = APP_PRODUCTION
    ? `https://${window.location.hostname}`
    : GAME_SERVER_URL;

export class LobbyAPI {
    private api: any;

    constructor() {
        this.api = ky.create({
            prefixUrl: `${server}/games/${GAME_NAME}`,
        })
    }

    async createRoom(numPlayers: number, unlisted: boolean) {
        const payload = { numPlayers: numPlayers, unlisted: unlisted };
        const data = await this.api.post('create', { json: payload }).json();
        return data.matchID;
    }

    async joinRoom(matchId: number, username: string, userId: number) {
        const payload = { playerID: userId, playerName: username };
        const data = await this.api
            .post(matchId + '/join', { json: payload })
            .json();
        const { playerCredentials } = data;
        return playerCredentials;
    }

    async leaveRoom(matchId: number, userId: number, playerCredentials: string) {
        const payload = { playerID: userId, credentials: playerCredentials };
        try {
            await this.api.post(matchId + '/leave', { json: payload }).json();
        } catch (error) {
            console.log('error in leaveRoom: ', error);
        }
    }

    async whoIsInRoom(matchId: number) {
        const data = await this.api.get(matchId).json();
        return data.players;
    }

    async playAgain(matchId: number, userId: number, playerCredentials: string) {
        const payload = { playerID: userId, credentials: playerCredentials };
        const data = await this.api
            .post(matchId + '/playAgain', { json: payload })
            .json();
        const { nextMatchID } = data;
        return nextMatchID;
    }

    async listAllPublicGames() {
        const data = await this.api.get('').json();
        return data;
    }
}
