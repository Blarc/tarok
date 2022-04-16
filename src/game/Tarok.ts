
export const Tarok = {
    name: 'Tarok',

    phases: {
        draw: {
            moves: {},
            onBegin: (G: any) => {},
            next: 'play',
            start: true,
            endIf: (G: any) => G.tarok !== null,
        },

        play: {
            turn: {
                order: {
                    first: (G: any) => G.winner,
                    next: (G: any) => G.loser,
                },
            },
            moves: { },
            next: 'compare',
        },

        compare: {
            moves: {},
            next: 'play',
        },
    },

    minPlayers: 4,
    maxPlayers: 4,
}
