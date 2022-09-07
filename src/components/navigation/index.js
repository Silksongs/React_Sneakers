import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "../../pages/home";
import Favorites from "../../pages/favorites";

function Navigation({}) {

    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/favorites" element={<Favorites/>}/>
        </Routes>
    );
}

export default Navigation;