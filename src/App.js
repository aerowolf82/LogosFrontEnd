import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Home from './Components/Home'
import Header from './Components/Header'
//import FavoriteList from './Components/FavoriteList'
import { useEffect, useState } from 'react'
//import Context from './Context.js'
import SpaceCraftList from './Components/SpaceCraftList';

async function getSpaceCraft() {
  let res = await fetch("https://lldev.thespacedevs.com/2.2.0/spacecraft/"); //fetch at localhost:3001/spacecraft
  let data = await res.json();
  return data;
}

function App() {

  let [spaceData, setSpaceData] = useState([]);
    
  useEffect(() => {
    let mounted = true;
    getSpaceCraft()
      .then(items => {
        if(mounted) {
          setSpaceData(items.results)
        }
      })
    return () => mounted = false;
  }, [])






  return (
<Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <nav className="Nav">
            <Route path='/:page' component={Header} />  
            <Route exact path='/' component={Header} />
          </nav>
        </header>

        <Route path="/spacecraft">
          <SpaceCraftList spaceData = {spaceData} />
        </Route>
       {/*  <Route path="/favorites">
          <FavoriteList />
        </Route> */}
        <Route exact path="/">
          <Home spaceData = {spaceData}/>
        </Route>
        <Route exact path="/home">
          <Home spaceData = {spaceData}/>
        </Route>
      </div>
    </Router>
  );
}

export default App;
