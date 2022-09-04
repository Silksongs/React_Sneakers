import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "../../pages/home";
import Favorites from "../../pages/favorites";

function Navigation({items,searchValue,setSearchValue,onChangeSearchInput,onAddToFavorite,
                    onAddToCart,itemsForFav}
) {
    return (
        <Routes>
            <Route path="/" element={<Home
                items={items}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}/>}/>

            <Route path="/favorites" element={<Favorites
                items={itemsForFav}
                onAddToFavorite={onAddToFavorite}
            />}/>
        </Routes>
    );
}

export default Navigation;