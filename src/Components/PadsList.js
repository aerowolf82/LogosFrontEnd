import { useRouteMatch } from "react-router";
import { Switch, Route, NavLink } from 'react-router-dom';
import Pads from './Pads.js'
import "react-widgets/styles.css";
import './SpaceCraftList.css';
import Combobox from "react-widgets/Combobox";

async function getPadByName(e) {
    let res = await fetch(`http://localhost:3001/spacecraft?pad_name=${e}`);
    let data = await res.json();
    return data;
}

function PadsList({ padData, setIsFilteredPads, isFilteredPads, filteredPadData, setFilteredPadData }) {
    let match = useRouteMatch()

    async function handleSelect(e) {
        setIsFilteredPads(true);
        filteredPadData = await (getPadByName(e))
        setFilteredPadData(filteredPadData)
    }

    function resetFilter(){
        setIsFilteredPads(false);
    }

    return (

        <div>
            <br/> 
            
            {/* playing with these ideas of either break or h1 tag 
            <h1>
                Pads List
            </h1> */}
            <Combobox
                hideCaret
                hideEmptyPopup
                data={[...(new Set(padData.map((pad) => {
                    return pad.pad_name
                })))]}
                placeholder="Search for a family of spacecraft!"
                onSelect={handleSelect}
            />
            <button onClick={resetFilter}>Reset Filter</button>
            <div>
            { isFilteredPads?
                    filteredPadData.map((spaceData, index) => (
                        <NavLink className="NavLink" to={`${match.url}/${index}`} key={`nav${padData.id}`}>
                            {padData.pad_name} {isFilteredPads = false}
                        </NavLink>
                    )) :
                (padData.map((padData, index) => (
                    <NavLink className="NavLink" to={`${match.url}/${index}`} key={`nav${padData.id}`}>
                        {padData.pad_name}
                    </NavLink>
                )))}
            </div>
            <Switch>
                <Route path={`${match.path}/:padId`}>
                    <Pads padData={padData} key={padData.id} />
                </Route>
            </Switch>

        </div>
    );
}

export default PadsList;