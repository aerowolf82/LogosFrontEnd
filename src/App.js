import backlogo from './assets/rocketworld.gif';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Home from './Components/Home'
import Header from './Components/Header'
import FavoritesList from './Components/FavoritesList'
import { useEffect, useState } from 'react'
import SpaceCraftList from './Components/SpaceCraftList';
import PadsList from './Components/PadsList.js'

async function getSpaceCraft() {
  let res = await fetch("http://localhost:3001/spacecraft"); 
  let data = await res.json();
  return data;
}

async function getPads() {
  let res = await fetch("http://localhost:3001/pads"); 
  let data = await res.json();
  return data;
}

function App() {
  let [filteredSpaceData, setFilteredSpaceData] = useState([]);
  let [filteredPadData, setFilteredPadData] = useState([]);
  let [spaceData, setSpaceData] = useState([]);
  let [padData, setPadData] = useState([]);
  let [isFilteredSpace, setIsFilteredSpace] = useState(false);
  let [isFilteredPads, setIsFilteredPads] = useState(false);
  let [isOpenSC,setIsOpenSC] = useState(false);
  let [isOpenPads,setIsOpenPads] = useState(false);
  let [favorites, setFavorites] = useState([])
  let [isFavorited, setIsFavorited] = useState(false)

    
  useEffect(() => {
    let mounted = true;
    getSpaceCraft()
      .then(items => {
        if(mounted) {
          setSpaceData(items);
        }
      })
      getPads()
      .then(items2 => {
        if(mounted) {
          setPadData(items2);
        }
      })
    return () => mounted = false;
  }, [])


  return (
  <Router>
    <div className ="background" >
      <div className="App">
        <header className="App-header">
          <img src={backlogo} className="App-logo" alt="logo" />
          <nav className="Nav">
            <Route path='/:page' component={Header} />  
            <Route exact path='/' component={Header} />
          </nav>
        </header>

        <Route path="/spacecraft">
          <SpaceCraftList
            spaceData = {spaceData} 
            setFilteredSpaceData = {setFilteredSpaceData} 
            filteredSpaceData = {filteredSpaceData} 
            isFilteredSpace = {isFilteredSpace} 
            setIsFilteredSpace={setIsFilteredSpace}
            isOpenSC = {isOpenSC}
            setIsOpenSC = {setIsOpenSC}
            isFavorited = {isFavorited}
            setIsFavorited = {setIsFavorited}
            favorites = {favorites}
            setFavorites = {setFavorites}
          />
        </Route>
        <Route path="/pads">
          <PadsList 
            padData = {padData}
            isFilteredPads = {isFilteredPads}
            setIsFilteredPads = {setIsFilteredPads}
            filteredPadData = {filteredPadData}
            setFilteredPadData = {setFilteredPadData}
            isOpenPads = {isOpenPads}
            setIsOpenPads = {setIsOpenPads}
          />
        </Route>
        <Route path="/favorites">
          <FavoritesList
            isOpenSC = {isOpenSC}
            setIsOpenSC = {setIsOpenSC}
          />
        </Route>
        <Route exact path="/">
          <Home spaceData = {spaceData} padData = {padData}/>
        </Route>
        <Route exact path="/home">
          <Home spaceData = {spaceData} padData = {padData}/>
        </Route>
      </div>
    </div>
  </Router>
  );
}

export default App;
