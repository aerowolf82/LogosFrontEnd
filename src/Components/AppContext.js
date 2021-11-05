import * as React from "react";
// this goes in the AppContext file
import { useState, useEffect, createContext } from "react";

export const AppContext = createContext(null);

function AppProvider({children}) {

    const [favorites, setFavorites] = useState([]);
    const [isFavorited, setIsFavorited] = useState([]);

    function addFavorite(dataObj){
        if (!favorites.includes(dataObj)) {
            setFavorites(favorites.concat(dataObj));
            setIsFavorited(isFavorited.concat(dataObj.name));
            console.log(`favorite added`, favorites)
        } 
    }
    function removeFavorite(dataObj){
        let index = favorites.indexOf(dataObj);
        let temp = [...favorites.slice(0, index), ...favorites.slice(index + 1)];
        setFavorites(temp);
        let index2 = isFavorited.indexOf(dataObj.name);
        let temp2 = [...isFavorited.slice(0, index2), ...isFavorited.slice(index2 + 1)];
        setIsFavorited(temp2);
        console.log(`favorite removed`, favorites)
    }
    const valueObj = {
        favorites,
        setFavorites,
        isFavorited,
        setIsFavorited,
        addFavorite, 
        removeFavorite
    };
    return (
        <div className="App-provider">
            <AppContext.Provider value={valueObj}>
                {children}
            </AppContext.Provider>
        </div>
    );
}
export default AppProvider;