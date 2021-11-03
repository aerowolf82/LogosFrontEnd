import { useRouteMatch } from "react-router";
import { Switch, Route, NavLink } from 'react-router-dom';
import Pads from './Pads.js'
import "react-widgets/styles.css";
import './SpaceCraftList.css';
import Combobox from "react-widgets/Combobox";

function PadsList({ padData, favorites }) {
    let match = useRouteMatch()

    function handleSelect(e) {
        // async function getSpaceCraftDetails() {
        //     let res = await fetch(``); //fetch at localhost:3001/spacecraft
        //     let data = await res.json();
        //     return data;
        // }
        //route to a new page displaying only content from the get request
    }

    return (

        <div>
            <h1>
                Pads List
            </h1>
            <Combobox
                data={padData.map((pad) => {
                    return pad.pad_name
                })}
                placeholder="Search for a pad!"
                hideCaret
                hideEmptyPopup
                onSelect = {handleSelect}
            />
            <div>
                {(padData.map((padData, index) => (
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