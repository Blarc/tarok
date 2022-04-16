import {Trans} from "react-i18next";
import Layout from "../components/Layout";
import {FunctionComponent} from "react";

export interface IHomePageProps {}

const HomePage: FunctionComponent<IHomePageProps> = (props) => {
    // const history = this.props.history;
    return (
        <Layout
            content={
                <div id="menu-button-wrapper">
                    <div
                        className="menu-button"
                        id="new-game"
                        // onClick={() => this.createGame()}
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
