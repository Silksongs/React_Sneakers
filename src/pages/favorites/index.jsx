import React from 'react';
import Card from "../../components/card";
import './style.scss';

function Favorites({items,onAddToFavorite}) {
    return (
        <div className='content p-40'>
            <div className='d-flex align-center mb-40 justify-between'>
                <h1>Мои закладки!</h1>

            </div>

            <div className="d-flex box">
                {
                    items.map((item, index) =>
                        (<Card
                            key={index}
                            favorited={true}
                            onFavorite={onAddToFavorite}
                            {...item}
                        />))
                }
            </div>
        </div>
    );
}

export default Favorites;