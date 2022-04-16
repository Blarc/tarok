import {FunctionComponent} from "react";
import {Link} from "react-router-dom";
import { Trans } from 'react-i18next';
import {LanguageSelect} from "./LanguageSelect";
import '../styles/layout.css'
import GithubCorner from "react-github-corner";

export interface ITemplatePageProps {
    content: any
}

const Layout: FunctionComponent<ITemplatePageProps> = (props) => {

    return (
        <div className="full_height">
            <Link to="/" style={{ textDecoration: 'none' }}>
                <div className="logo">
                    <img
                        src={'/images/briscolaLogoTransparentColor.png'}
                        alt={'briscola-logo'}
                    />
                </div>
            </Link>
            {props.content}
            <GithubCorner
                href={'https://github.com/Blarc/tarok'}
                target={'_blank'}
                bannerColor="#F0F0F0"
                octoColor="#696969"
                size={50}
                direction="left"
            />
            <div id="top-wrapper">
                <button
                    className="lang-button"
                    // onClick={() => this.toggleModal(true)}
                >
                    <Trans>Help</Trans>
                </button>
                <span id="slash">/</span>
                <LanguageSelect />
            </div>
            {/*<HelpModal*/}
            {/*    modalState={this.state.modalIsOpen}*/}
            {/*    toggleModal={this.toggleModal}*/}
            {/*/>*/}
        </div>
    );
}

export default Layout;
