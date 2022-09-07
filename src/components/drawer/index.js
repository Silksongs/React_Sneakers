import React from 'react';
import './style.scss';
import AppContext from "../contextx";

import btnRemove from '../../assets/btn-remove.svg'
import arrow from '../../assets/arrow.svg'


function Drawer({onClose, onRemove, items = []}) {
    const {cartItems} = React.useContext(AppContext);
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);


    return (
        <div className="overlay">
            <div className='drawer'>
                <h2 className='drawerLabel'>Корзина
                    <img onClick={onClose} className='removeBtn' src={btnRemove} alt="Remove"/>
                </h2>

                <div className="items">
                    {items.map((obj) => (
                        <div key={obj.id} className="cartItem">
                            <div style={{backgroundImage: `url(${obj.imageUrl})`}} className="cartItemImg"></div>
                            <div className='cartBox'>
                                <p className='cartBoxTitle'>{obj.title}</p>
                                <b className='cartBoxPrice'>{obj.price}</b>
                            </div>
                            <img onClick={() => onRemove(obj.id)} className='removeBtn' src={btnRemove}
                                 alt="Remove"/>
                        </div>
                    ))}
                </div>

                <div className="cartTotalBlock">
                    <ul className='cartUl'>
                        <li className='cartLi'>
                            <span>Итог:</span>
                            <div className='void'></div>
                            <b>{totalPrice} руб.</b>
                        </li>
                        <li className='cartLi'>
                            <span>Налог 5%:</span>
                            <div className='void'></div>
                            <b>{totalPrice * 0.05} руб.</b>
                        </li>
                    </ul>
                    <button className='greenButton'>Оформить заказ <img className='arrow' src={arrow} alt="Arrow"/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Drawer;