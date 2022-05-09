import React, {FunctionComponent} from 'react';
import {Route, Routes} from 'react-router';
import HomePage from "./pages/HomePage";
import {BrowserRouter} from "react-router-dom";
import Board from "./components/Board";
import Tarok from "./game/Tarok";
import {Client} from "boardgame.io/react";
import {Local} from "boardgame.io/multiplayer";
import {Debug} from "boardgame.io/debug";
import Lobby from "./components/Lobby";

const App : FunctionComponent = () => {

    const TarokClient = Client({
        game: Tarok,
        board: Board,
        numPlayers: 4,
        multiplayer: Local(),
        debug: { impl: Debug }
    });


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<HomePage />}/>
                <Route path="/demo" element={<TarokClient playerID="0" />} />
                <Route path="/lobby" element={<Lobby match={"asdasd"} isPublic={false} />} />
                <Route path="*" element={<HomePage />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
