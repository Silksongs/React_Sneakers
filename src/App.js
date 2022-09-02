import Card from "./components/card";
import Header from "./components/header";
import Drawer from "./components/drawer";
import React from "react";
import axios from "axios";


/*const arr = [
        {
            "title": "Мужские Кроссовки Nike Blazer Mid Suede",
            "price": 12999,
            "imageUrl": "/img/sneakers/1.jpg"
        },
        {
            "title": "Мужские Кроссовки Nike Air Max 270",
            "price": 15999,
            "imageUrl": "/img/sneakers/2.jpg"
        },
        {
            "title": "Мужские Кроссовки Nike Blazer Mid Suede",
            "price": 8500,
            "imageUrl": "/img/sneakers/3.jpg"
        },
        {
            "title": "Кроссовки Puma X Aka Boku Future Rider",
            "price": 8999,
            "imageUrl": "/img/sneakers/4.jpg"
        },
        {
            "title": "Мужские Кроссовки Under Armour Curry 8",
            "price": 15200,
            "imageUrl": "/img/sneakers/5.jpg"
        },
        {
            "title": "Мужские Кроссовки Nike Kyrie 7",
            "price": 11200,
            "imageUrl": "/img/sneakers/6.jpg"
        },
        {
            "title": "Мужские Кроссовки Jordan Air Jordan 11",
            "price": 10800,
            "imageUrl": "/img/sneakers/7.jpg"
        },
        {
            "title": "Мужские Кроссовки Nike LeBron XVIII",
            "price": 16500,
            "imageUrl": "/img/sneakers/8.jpg"
        }

]*/


function App() {

    const [searchValue, setSearchValue] = React.useState('');

    const [items, setItems] = React.useState([]);

    const [favorites, setFavorites] = React.useState([]);

    const [cartItems, setCartItems] = React.useState([]);

    const [cartOpened, setCartOpened] = React.useState(false);

    React.useEffect(() => {
        axios.get('https://630e91f337925634187f0c4f.mockapi.io/items').then(res => {
            setItems(res.data);
        });
        axios.get('https://630e91f337925634187f0c4f.mockapi.io/cart').then(res => {
            setCartItems(res.data);
        });
    }, []);

    const onAddToCart = (obj) => {
        axios.post('https://630e91f337925634187f0c4f.mockapi.io/cart', obj);
        setCartItems(prev => [...prev, obj]);

    }

    const onAddToFavorite = (obj) => {

        axios.post('https://630e91f337925634187f0c4f.mockapi.io/favorites', obj);
        setFavorites(prev => [...prev, obj]);
    }

    const onRemoveItem = (id) => {

        axios.delete(`https://630e91f337925634187f0c4f.mockapi.io/cart/${id}`);
        setCartItems(prev => prev.filter(item=>item.id !== id));
    }


    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    }


    return (
        <div className="wrapper clear">

            {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>}

            <Header onClickCart={() => setCartOpened(true)}/>

            <div className='content p-40'>
                <div className='d-flex align-center mb-40 justify-between'>
                    <h1 className=''>{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}</h1>
                    <div className='search-block d-flex'>
                        <img src="/img/search.svg" alt="Search"/>
                        {searchValue &&
                            <img onClick={() => setSearchValue('')} className='clear cu-p' src="/img/btn-remove.svg"
                                 alt="Clear"/>}
                        <input onChange={onChangeSearchInput} value={searchValue} placeholder='Поиск...'/>
                    </div>
                </div>

                <div className="d-flex box">
                    {
                        items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) =>
                            (<Card
                                key={index}
                                title={item.title}
                                price={item.price}
                                imageUrl={item.imageUrl}
                                onFavorite={(obj)=>onAddToFavorite(obj)}
                                onPlus={(obj) => onAddToCart(obj)}
                            />))
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
