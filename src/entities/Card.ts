
export enum CardColor {
    SPADE = 'spade',
    DIAMOND = 'diamond',
    CLUB = 'club',
    HEART = 'heart'
}
export enum CardType {
    COLOR,
    TAROK
}

export interface ICard {
    id: string;
    type: CardType;
    color: CardColor | undefined;
    strength: number;
    points: number;
    imgPath: string;
    alt: string;
    sortNumber: number;
}






