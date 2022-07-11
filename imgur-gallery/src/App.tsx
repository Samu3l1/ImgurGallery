import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HOME_PAGE_ROUTE} from "./api/routes";
import Home from "./pages/home";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path={HOME_PAGE_ROUTE} element={<Home/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
