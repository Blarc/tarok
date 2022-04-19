
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
