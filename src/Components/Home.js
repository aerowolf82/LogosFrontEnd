import { Switch, Route, Link} from "react-router-dom";
 import SpaceCraftList from './SpaceCraftList.js'
// import FavoriteList from './FavoriteList.js'
import {useState} from "react"

function Home({spaceData}) {
    // let [favorites,setFavorites] = useState([]);
    // console.log('home favorites', favorites)
    
        return (

        <div>
            <h1>
                Space Launch Database
            </h1>
            <Link to="./spacecraft">Space Craft List</Link>
            <Switch>
                <Route path="/spacecraft">
                    <SpaceCraftList spaceData = {spaceData}/>
                </Route>
                {/* <Route path="/favorites">
                    <FavoriteList />
                </Route> */}
            </Switch>   

        </div>
    );
}

export default Home;