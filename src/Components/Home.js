import { Switch, Route, Link} from "react-router-dom";
 import SpaceCraftList from './SpaceCraftList.js'
 import PadsList from './PadsList.js'
// import FavoriteList from './FavoriteList.js'
import {useState} from "react"

function Home({spaceData, family, padData}) {
    // let [favorites,setFavorites] = useState([]);
    // console.log('home favorites', favorites)
    
        return (

        <div>
            <h1>
                Space Launch Database
            </h1>
            <Link to="./spacecraft">Space Craft List</Link><br />
            <Link to="./pads">Pads Craft List</Link>            
            <Switch>
                <Route path="/spacecraft">
                    <SpaceCraftList spaceData = {spaceData} family = {family}/>
                </Route>
                <Route path="/pads">
                    <PadsList padData = {padData}/>
                </Route>
                {/* <Route path="/favorites">
                    <FavoriteList />
                </Route> */}
            </Switch>   

        </div>
    );
}

export default Home;