import { Switch, Route, Link} from "react-router-dom";
// import PokemonList from './PokemonList.js'
// import FavoriteList from './FavoriteList.js'
import {useState} from "react"

function Home({pokeData}) {
    // let [favorites,setFavorites] = useState([]);
    // console.log('home favorites', favorites)
    
        return (

        <div>
            <h1>
                Home
            </h1>
            {/* <Link to="./pokemon">Pokemon List</Link> */}
            <Switch>
                {/* <Route path="/pokemon">
                    <PokemonList pokeData = {pokeData} favorites = {favorites}/>
                </Route>
                <Route path="/favorites">
                    <FavoriteList />
                </Route> */}
            </Switch>   

        </div>
    );
}

export default Home;