import React from 'react';
import Card from "../../components/card";
import './style.scss';
import AppContext from '../../components/contextx';

function Favorites() {
    const {favorites, onAddToFavorite,onAddToCart } = React.useContext(AppContext);

    return (
        <div className='content'>
            <div className='favorites'>
                <h1 className='text'>Мои закладки!</h1>
            </div>

            <div className="box">
                {
                    favorites.map((item, index) =>
                        (<Card
                            key={index}
                            onFavorite={(obj) => onAddToFavorite(obj)}
                            onPlus={(obj) => onAddToCart(obj)}
                            {...item}
                        />))
                }
            </div>
        </div>
    );
}

export default Favorites;