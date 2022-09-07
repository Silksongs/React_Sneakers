import React from 'react';
import Card from "../../components/card";
import './style.scss';
import AppContext from "../../components/contextx";

import search from '../../assets/search.svg'
import btnRemove from '../../assets/btn-remove.svg'

function Home({}) {

    const {
        items,
        searchValue,
        setSearchValue,
        onChangeSearchInput,
        onAddToFavorite,
        onAddToCart,
        isLoading
    } = React.useContext(AppContext);

    const renderItems = () => {
        const filtredItems = items.filter(item =>
            item.title.toLowerCase().includes(searchValue.toLowerCase()));
        return (isLoading ? [...Array(10)] : filtredItems).map((item, index) => (
                <Card
                    key={index}
                    onFavorite={(obj) => onAddToFavorite(obj)}
                    onPlus={(obj) => onAddToCart(obj)}
                    loading={isLoading}
                    {...item}
                />
            )
        )
    }

    return (
        <div className='content'>
            <div className='page'>
                <h1 className='text'>{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}</h1>
                <div className='search-block'>
                    <img src={search} alt="Search"/>
                    {searchValue &&
                        <img onClick={() => setSearchValue('')} className='clear' src={btnRemove}
                             alt="Clear"/>}
                    <input className='headerInput' onChange={onChangeSearchInput} value={searchValue} placeholder='Поиск...'/>
                </div>
            </div>

            <div className="box">
                {renderItems()}
            </div>
        </div>
    );
}

export default Home;