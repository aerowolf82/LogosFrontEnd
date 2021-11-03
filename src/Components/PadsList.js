import { useRouteMatch } from "react-router";
import { Switch, Route, NavLink } from 'react-router-dom';
import Pads from './Pads.js'
import "react-widgets/styles.css";
import './SpaceCraftList.css';
import Combobox from "react-widgets/Combobox";

function PadsList({ padData, favorites }) {
    let match = useRouteMatch()

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