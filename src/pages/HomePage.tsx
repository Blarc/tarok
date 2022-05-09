import {Trans} from "react-i18next";
import Layout from "../components/Layout";
import {FunctionComponent} from "react";
import {LobbyAPI} from "../api/LobbyAPI";

export interface IHomePageProps {
    history?: any
}

const HomePage: FunctionComponent<IHomePageProps> = (props) => {
    // const history = this.props.history;

    const api = new LobbyAPI()

    let state: {
        loading: boolean,
        redirect: null
    } = {
        loading: false,
        redirect: null
    }

    function createGame() {
        console.log('Create game.')
        if (state.loading) {
            return;
        } else {
            state.loading = true;
        }

        api.createRoom(4, true).then(
            roomId => {
                const history = props.history
                console.log(`Created room with room id = ${roomId}`);
                state.loading = false;
                history.push('/lobby/' + roomId);
            },
            err => {
                console.log(err);
                state.loading = false;
            }
        )
    }


    return (
        <Layout
            content={
                <div id="menu-button-wrapper">
                    <div
                        className="menu-button"
                        id="new-game"
                        onClick={() => createGame()}
                    >
                        <span>
                            <Trans>Private lobby</Trans>
                        </span>
                    </div>
                    <div
                        className="menu-button"
                        id="list-games"
                        // onClick={() => this.joinQueue()}
                    >
                      <span>
                        <Trans>Public lobby</Trans>
                      </span>
                    </div>
                    <div
                        className="menu-button"
                        id="join-game"
                        // onClick={() => {
                        //     history.push('/join');
                        // }}
                    >
                      <span>
                        <Trans>Join lobby</Trans>
                      </span>
                    </div>
                </div>
            }
        />
    );
}

export default HomePage;
