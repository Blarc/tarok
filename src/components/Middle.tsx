import {FunctionComponent} from "react";
import {useTransition, animated} from "react-spring";
import {GameState} from "../game/Tarok";
import {getPlayerPosition} from "../utils/Utils";
import {Ctx} from "boardgame.io";

export interface IMiddle {
    playerId: number;
    gameData: GameState;
    ctx: Ctx;
}

const Middle: FunctionComponent<IMiddle> = props => {

    const playerId = props.playerId
    const { middle } = props.gameData;
    const ctx = props.ctx;

    const transitions: {[key: string]: {
            from: {opacity: number, transform: string},
            enter: {opacity: number, transform: string},
            // leave: {opacity: number, transform: string},
        }} = {
        'bottom': {
            from: { opacity: 0, transform: 'translate3d(0, 300px, 0)' },
            enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
            // leave: { opacity: 0, transform: 'translate3d(0, 0, 0)' }
        },
        'center-left': {
            from: { opacity: 0, transform: 'translate3d(-100px, 0, 0)' },
            enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
            // leave: { opacity: 0, transform: 'translate3d(0, 0, 0)' }
        },
        'top': {
            from: { opacity: 0, transform: 'translate3d(0, -300px, 0)' },
            enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
            // leave: { opacity: 0, transform: 'translate3d(0, 0, 0)' }
        },
        'center-right': {
            from: { opacity: 0, transform: 'translate3d(100px, 0, 0)' },
            enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
            // leave: { opacity: 0, transform: 'translate3d(0, 0, 0)' }
        }
    }

    const newMiddle = middle.map((value, index) => {
        return {
            card: value,
            transition: transitions[getPlayerPosition(playerId, index, ctx.numPlayers)]
        }
    })



    const trans = useTransition(newMiddle, {
        from: ({card, transition}) => transition.from,
        enter: ({card, transition}) => transition.enter,
        // leave: ({card, transition}) => transition.leave,
    });

    return (
        <>
            <div className="center">
                {
                    trans((style, card, _t, _i) => {
                        return <div className="transform-wrapper">
                                <animated.img
                                    className="middle-playing-card"
                                    src={card.card.imgPath}
                                    alt={card.card.alt}
                                    key={card.card.alt}
                                    style={style}
                                />
                            </div>
                    })
                }
            </div>
        </>
    )
}

export default Middle;
