import Header from "./components/header";
import Drawer from "./components/drawer";
import React from "react";
import axios from "axios";
import Navigation from "./components/navigation";


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
        axios.get('https://630e91f337925634187f0c4f.mockapi.io/favorites').then(res => {
            setFavorites(res.data);
        });
    }, []);

    const onAddToCart = (obj) => {
        axios.post('https://630e91f337925634187f0c4f.mockapi.io/cart', obj);
        setCartItems(prev => [...prev, obj]);

    }

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find(favObj => favObj.id === obj.id)) {
                axios.delete(`https://630e91f337925634187f0c4f.mockapi.io/favorites/${obj.id}`);
                setFavorites((prev) => prev.filter(item => item.id !== obj.id));
            } else {
                const {data} = await axios.post('https://630e91f337925634187f0c4f.mockapi.io/favorites', obj);
                setFavorites((prev) => [...prev, data]);
            }
        } catch (error) {

        }
    }

    const onRemoveItem = (id) => {

        axios.delete(`https://630e91f337925634187f0c4f.mockapi.io/cart/${id}`);
        setCartItems(prev => prev.filter(item => item.id !== id));
    }
    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    }

    return (
        <div className="wrapper clear">
            {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>}
            <Header onClickCart={() => setCartOpened(true)}/>
            <Navigation items={items}
                   searchValue={searchValue}
                   setSearchValue={setSearchValue}
                   onChangeSearchInput={onChangeSearchInput}
                   onAddToFavorite={onAddToFavorite}
                   onAddToCart={onAddToCart}
                   itemsForFav={favorites}

            />
        </div>
    );
}

export default App;
