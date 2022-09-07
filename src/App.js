import Header from "./components/header";
import Drawer from "./components/drawer";
import React from "react";
import axios from "axios";
import Navigation from "./components/navigation";
import AppContext from './components/contextx'


function App() {


    const [searchValue, setSearchValue] = React.useState('');
    const [items, setItems] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [cartOpened, setCartOpened] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);


    React.useEffect(() => {
        async function fetchData() {
            const cartResponse = await axios.get(`${process.env.REACT_APP_cart}`);
            const favoritesResponse = await axios.get(`${process.env.REACT_APP_favorites}`);
            const itemsResponse = await axios.get(`${process.env.REACT_APP_items}`);
            setIsLoading(false);
            setCartItems(cartResponse.data);
            setFavorites(favoritesResponse.data);
            setItems(itemsResponse.data);
        }

        fetchData();
    }, []);


    const onAddToCart = (obj) => {
        try {
            if (cartItems.find(item => Number(item.id) === Number(obj.id))) {
                axios.delete( `${process.env.REACT_APP_cart}/${obj.id}`);
                setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
            } else {
                axios.post(`${process.env.REACT_APP_cart}`, obj);
                setCartItems(prev => [...prev, obj]);
            }

        } catch (error) {

        }

    }
    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
                axios.delete(`${process.env.REACT_APP_favorites}/${obj.id}`);
                setFavorites((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)));
            } else {
                await axios.post(`${process.env.REACT_APP_favorites}`, obj);
                setFavorites((prev) => [...prev, obj]);
            }
        } catch (error) {

        }
    }

    const onRemoveItem = (id) => {

        axios.delete(`${process.env.REACT_APP_cart}/${id}`);
        setCartItems(prev => prev.filter(item => item.id !== id));
    }
    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    }

    const isItemAdded = (id) => {
        return cartItems.some(obj => Number(obj.id) === Number(id))
    }
    const isItemFavorites = (id) => {
        return favorites.find(favObj => Number(favObj.id) === Number(id))
    }

    return (
        <AppContext.Provider value={{
            cartItems,
            favorites,
            items,
            searchValue,
            setSearchValue,
            onChangeSearchInput,
            onAddToFavorite,
            onAddToCart,
            isLoading,
            isItemAdded,
            isItemFavorites
        }}>
            <div className="wrapper">
                {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>}
                <Header onClickCart={() => setCartOpened(true)}/>

                <Navigation/>

            </div>

        </AppContext.Provider>

    );
}

export default App;
