import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Home from './Components/Home'
import Header from './Components/Header'
//import FavoriteList from './Components/FavoriteList'
import { useEffect, useState } from 'react'
//import Context from './Context.js'
import background from "./assets/background.jpg";
// import spacecraft from './spacecraft.json';
import family from './Family.json';
import pads from './Pads.json';
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
  let [familyData, setFamilyData] = useState([]);
  let [padData, setPadData] = useState([]);
  let [isFilteredSpace, setIsFilteredSpace] = useState(false);
  let [isFilteredPads, setIsFilteredPads] = useState(false);

    
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

console.log('spacedata from app.js',spaceData)
  return (
  <Router>
    {/* <div className ="background" style={{backgroundImage: `url(${background})`, width: '100%'}} > */}
    <div className ="background" >
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <nav className="Nav">
            <Route path='/:page' component={Header} />  
            <Route exact path='/' component={Header} />
          </nav>
        </header>

        <Route path="/spacecraft">
          <SpaceCraftList 
            spaceData = {spaceData} 
            family = {familyData} 
            setFilteredSpaceData = {setFilteredSpaceData} 
            filteredSpaceData = {filteredSpaceData} 
            isFilteredSpace = {isFilteredSpace} 
            setIsFilteredSpace={setIsFilteredSpace}/>
        </Route>
        <Route path="/pads">
          <PadsList 
            padData = {padData}
            isFilteredPads = {isFilteredPads}
            setIsFilteredPads = {setIsFilteredPads}
            filteredPadData = {filteredPadData}
            setFilteredPadData = {setFilteredPadData}
          />
        </Route>
       {/*  <Route path="/favorites">
          <FavoriteList />
        </Route> */}
        <Route exact path="/">
          <Home spaceData = {spaceData} family = {familyData} padData = {padData}/>
        </Route>
        <Route exact path="/home">
          <Home spaceData = {spaceData} family = {familyData} padData = {padData}/>
        </Route>
      </div>
    </div>
  </Router>
  );
}

export default App;
