import {CardColor, CardType, ICard} from "./Card";

const deck: ICard[] = []

const colorNamesPoints: { [key: string]: number} = {
    'Four Pip': 0,
    'Three Pip': 0,
    'Two Pip': 0,
    'One Pip': 0,
    'Valet': 2,
    'Cavalier': 3,
    'Queen': 4,
    'King': 5
}

for (let color in CardColor) {
    let strength = 1;
    for (let colorName in colorNamesPoints) {
        deck.push({
            type: CardType.COLOR,
            color: CardColor[color as keyof typeof CardColor],
            strength: strength,
            points: colorNamesPoints[colorName],
            imgPath: `/images/cards/${color}_${strength}.webp`,
            alt: colorName
        })
        strength += 1
    }
}

export { deck };
