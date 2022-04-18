import {FunctionComponent} from "react";
import {animated, useTransition} from "react-spring";
import {GameState} from "../game/Tarok";

export interface IMiddle {
    gameData: GameState;
}

const Middle: FunctionComponent<IMiddle> = props => {

    const { middle } = props.gameData

    const transitions = useTransition(middle, {
        from: { opacity: 0, transform: 'translate3d(0, 0px, 0)' },
        enter: { opacity: 1, transform: 'translate3d(0, 0px, 0)' },
        leave: { opacity: 0, transform: 'translate3d(-200px, 0px, 0)' },
    });

    return (
        <>
            <div className="battleground">
                {
                    transitions((style, card, _t, i) => {
                        return <div
                            className="card-wrapper"
                            id={`wrapped-card-${i}`}
                            key={card.alt}
                        >
                            <div className="transform-wrapper">
                                <animated.img
                                    className="middle-playing-card"
                                    src={card.imgPath}
                                    alt={card.alt}
                                    key={card.alt}
                                    style={style}
                                />
                            </div>
                        </div>
                    })
                }
            </div>
        </>
    )
}

export default Middle;
