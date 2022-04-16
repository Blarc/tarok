import React, {FunctionComponent} from 'react';
import {Route, Routes} from 'react-router';
import HomePage from "./pages/HomePage";
import {BrowserRouter} from "react-router-dom";
import Board from "./components/Board";

export interface IAppProps {}

const App : FunctionComponent<IAppProps> = (props) => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<HomePage />}/>
                <Route path="/demo" element={<Board playerID="0" demo="true" />} />
                <Route path="*" element={<HomePage />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
