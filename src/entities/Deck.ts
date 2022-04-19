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

let colorIndex = 0;
for (let color in CardColor) {
    let strength = 1;
    for (let colorName in colorNamesPoints) {
        deck.push({
            id: `${color}_${strength}`,
            type: CardType.COLOR,
            color: CardColor[color as keyof typeof CardColor],
            strength: strength,
            points: colorNamesPoints[colorName],
            imgPath: `/images/cards/${color}_${strength}.webp`,
            alt: `${color}_${strength}`,
            sortNumber: colorIndex * 10 + strength
        })
        strength += 1
    }
    colorIndex += 1
}

for (let i = 1; i < 23; i++) {

    if (i === 1 || i === 21 || i === 22) {
        deck.push({
            id: `tarok_${i}`,
            type: CardType.TAROK,
            color: undefined,
            strength: i,
            points: 5,
            imgPath: `/images/cards/tarok_${i}.webp`,
            alt: `tarok_${i}`,
            sortNumber: 100 + i
        })
    }
    else {
        deck.push({
            id: `tarok_${i}`,
            type: CardType.TAROK,
            color: undefined,
            strength: i,
            points: 0,
            imgPath: `/images/cards/tarok_${i}.webp`,
            alt: `tarok_${i}`,
            sortNumber: 100 + i
        })
    }
}

export { deck };
