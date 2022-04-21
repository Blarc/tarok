import {Ctx} from "boardgame.io";

export function getPlayerPosition(
    playerId: number,
    otherPlayerId: number,
    numberOfPlayers: number
) {
    const positions = ['bottom', 'center-left', 'top', 'center-right'];
    let playerPositionId = otherPlayerId - playerId;
    if (playerPositionId < 0) {
        return positions[numberOfPlayers + playerPositionId];
    }
    return positions[playerPositionId];
}

export function getPreviousPlayer(
    ctx: Ctx
) {
    let playerId = parseInt(ctx.currentPlayer);
    if (playerId === 0) {
        return ctx.numPlayers - 1;
    }
    return playerId - 1;
}
