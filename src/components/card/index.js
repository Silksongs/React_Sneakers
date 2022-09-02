import React from 'react';

import styles from './card.module.scss'

function Card({onFavorite, imageUrl, title, price, onPlus}) {

    const [isAdded, setIsAdded] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(false);

    const onClickPlus = () => {
        onPlus({title, imageUrl, price});
        setIsAdded(!isAdded);
    }
    const onClickFavorite = () => {
        onFavorite({title, imageUrl, price});
        setIsFavorite(!isFavorite);
    }


    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onFavorite}>
                <img onClick={onClickFavorite}
                    src={isFavorite ? '/img/heart-liked.svg' : '/img/heart-unliked.svg'} alt="heart-unliked"/>
            </div>
            <img width={133} height={112} src={imageUrl} alt='Sneakers'/>
            <h5>{title}</h5>
            <div className='d-flex justify-between align-center'>
                <div className='d-flex flex-column '>
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                <div>
                    <img className={styles.plus} onClick={onClickPlus}
                         src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
                         alt='Plus'/>
                </div>
            </div>
        </div>
    );
}

export default Card;