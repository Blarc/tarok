
export enum CardColor {
    HEART = 'heart',
    DIAMOND = 'diamond',
    CLUB = 'club',
    SPADE = 'spade'
}
export enum CardType {
    COLOR,
    TAROK
}

export interface ICard {
    type: CardType;
    color: CardColor | undefined;
    strength: number;
    points: number;
    imgPath: string;
    alt: string;
}

// export class Card {
//     type: CardType;
//     color: CardColor | undefined;
//     strength: number;
//     points: number;
//     imgPath: string;
//     alt: string;
//
//     constructor(
//         type: CardType,
//         color: CardColor,
//         strength: number,
//         points: number,
//         imgPath: string,
//         alt: string
//     ) {
//         this.type = type;
//         this.color = color;
//         this.strength = strength;
//         this.points = points;
//         this.imgPath = imgPath;
//         this.alt = alt;
//     }
// }







