import React from 'react';
import {Link} from "react-router-dom";
import AppContext from "../contextx";
import './style.scss';

import logo from '../../assets/logo.png'
import cart from '../../assets/cart.svg'
import heart from '../../assets/heart.svg'
import user from '../../assets/user.svg'


function Header(props) {

    const {cartItems} = React.useContext(AppContext);
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

    return (
        <header className='header'>
            <Link to={'/'}>
                <div className='logo'>
                    <img className='headerImg' width={40} height={40} src={logo} alt={'Logo'}/>
                    <div>
                        <h3 className='label'>React Sneakers</h3>
                        <p className='point'>Магазин лучших кроссовок</p>
                    </div>

                </div>
            </Link>

            <ul className='headerEnd'>
                <li onClick={props.onClickCart} className='list'>
                    <img className='headerImg' width={18} height={18} src={cart} alt='Корзина'/>
                    <span>{totalPrice} руб.</span>
                </li>

                <li className='list'>
                    <Link to={'/favorites'}>
                        <img className='headerImg' width={18} height={18} src={heart} alt='Закладки'/>
                    </Link>
                </li>

                <li>
                    <img className='headerImg' width={18} height={18} src={user} alt='Пользователь'/>
                </li>
            </ul>
        </header>
    );
}

export default Header;