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
    const ctx = props.ctx;
    const playerId = props.playerId
    const { middle } = props.gameData
    const { previousMiddle } = props.gameData

    console.log(previousMiddle)
    console.log(middle)

    const transitions: {[key: string]: {
            from: {opacity: number, transform: string},
            enter: {opacity: number, transform: string},
            // leave: {opacity: number, transform: string},
        }} = {
        'bottom': {
            from: { opacity: 0, transform: 'translate3d(0, 24em, 0) rotate(210deg)' },
            enter: { opacity: 1, transform: 'translate3d(0, 16em, 0) rotate(0deg)' },
            // leave: { opacity: 0, transform: 'translate3d(0, 0, 0)' }
        },
        'center-left': {
            from: { opacity: 0, transform: 'translate3d(50em, 12em, 0) rotate(0deg)' },
            enter: { opacity: 1, transform: 'translate3d(6em, 12em, 0) rotate(90deg)' },
            // leave: { opacity: 0, transform: 'translate3d(0, 0, 0)' }
        },
        'top': {
            from: { opacity: 0, transform: 'translate3d(0, -50em, 0) rotate(200deg)' },
            enter: { opacity: 1, transform: 'translate3d(0, 6em, 0) rotate(-5deg)' },
            // leave: { opacity: 0, transform: 'translate3d(0, 0, 0)' }
        },
        'center-right': {
            from: { opacity: 1, transform: 'translate3d(-6em, 12em, 0) rotate(90deg)' },
            enter: { opacity: 1, transform: 'translate3d(-6em, 12em, 0) rotate(90deg)' },
            // leave: { opacity: 0, transform: 'translate3d(0, 0, 0)' }
        },
        'bottom-0': {
            from: { opacity: 1, transform: 'translate3d(0, 16em, 0) rotate(0deg)' },
            enter: { opacity: 1, transform: 'translate3d(0, 16em, 0) rotate(0deg)' },
            // leave: { opacity: 0, transform: 'translate3d(0, 0, 0)' }
        },
        'center-left-0': {
            from: { opacity: 1, transform: 'translate3d(6em, 12em, 0) rotate(90deg)' },
            enter: { opacity: 1, transform: 'translate3d(6em, 12em, 0) rotate(90deg)' },
            // leave: { opacity: 0, transform: 'translate3d(0, 0, 0)' }
        },
        'top-0': {
            from: { opacity: 1, transform: 'translate3d(0, 6em, 0) rotate(-5deg)' },
            enter: { opacity: 1, transform: 'translate3d(0, 6em, 0) rotate(-5deg)' },
            // leave: { opacity: 0, transform: 'translate3d(0, 0, 0)' }
        },
        'center-right-0': {
            from: { opacity: 1, transform: 'translate3d(-6em, 12em, 0) rotate(90deg)' },
            enter: { opacity: 1, transform: 'translate3d(-6em, 12em, 0) rotate(90deg)' },
            // leave: { opacity: 0, transform: 'translate3d(0, 0, 0)' }
        }
    }

    const newMiddle = middle.map((value, index) => {
        let playerPosition = getPlayerPosition(playerId, index, ctx.numPlayers);
        if (previousMiddle[index] !== undefined) {
            playerPosition += '-0'
        }
        return {
            card: value,
            transition: transitions[playerPosition]
        }
    })

    const trans = useTransition(newMiddle, {
        from: ({card, transition}) => transition.from,
        enter: ({card, transition}) => transition.enter,
        // leave: ({card, transition}) => transition.leave,
    });

    console.log(playerId)

    return (
        <>
            <div className="center">
                {
                    trans((style, card, _t, index) => {
                        return <div className="transform-wrapper">
                            <animated.img
                                className={`middle-playing-card`}
                                id={`mid-card-${index}`}
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
