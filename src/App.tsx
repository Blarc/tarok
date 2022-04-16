import React, {FunctionComponent} from 'react';
import {Route, Routes} from 'react-router';
import HomePage from "./pages/HomePage";
import {BrowserRouter} from "react-router-dom";

export interface IAppProps {}

const App : FunctionComponent<IAppProps> = (props) => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<HomePage />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
