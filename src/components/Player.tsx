import {FunctionComponent} from "react";
import {animated, useTransition} from 'react-spring';
import {GameState} from "../game/Tarok";
import {ICard} from "../entities/Card";

export interface IPlayerProps {
    demo: string;
    playerId: number;
    gameData: GameState;
    moves: any;
}

const Player: FunctionComponent<IPlayerProps> = props => {

    const isDemo = props.demo;
    const { players } = props.gameData;
    const { moves } = props;
    const { playerId } = props;

    const cardsToRender: ICard[] = players[playerId].cards;
    const transitions = useTransition(cardsToRender, {
        from: { opacity: 0, transform: 'translate3d(100px, 0px, 0)' },
        enter: { opacity: 1, transform: 'translate3d(0, 0px, 0)' },
        leave: { opacity: 0.5, transform: 'translate3d(0, -30px, 0)' }
    });


    return (
        <>
            <div
                className='bottom'
                id='hero-two-cards'
            >
            {
                transitions((style, card, _t, i) => {
                    return <div
                        className="card-wrapper"
                        id={`wrapped-card-${i}`}
                        key={card.alt}
                    >
                        <div className="transform-wrapper">
                            <animated.img
                                className="hero-playing-card"
                                src={card.imgPath}
                                alt={card.alt}
                                key={card.alt}
                                style={style}
                                onClick={() => {
                                    moves.playCard(i, card);
                                }}
                            />
                        </div>
                    </div>
                })
            }
            </div>
        </>
    )
}

export default Player;
