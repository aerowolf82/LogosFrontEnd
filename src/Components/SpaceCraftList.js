import { useRouteMatch} from "react-router";
import {Switch, Route, NavLink} from 'react-router-dom';
import SpaceCraft from './SpaceCraft.js'
import "react-widgets/styles.css";
import './SpaceCraftList.css';
import Combobox from "react-widgets/Combobox";

function SpaceCraftList({spaceData, family, favorites}) {
        let match = useRouteMatch()
        console.log(family)
        
        return (

        <div>
            <h1>
                Space Craft List
            </h1>
            <Combobox
                hideCaret
                hideEmptyPopup
                data={family.map((fam) => {
                    return fam.name
                })}
                placeholder="Search for a family of spacecraft!"
            />
            <div>
                {(spaceData.map((spaceData,index)=>(
                    <NavLink className="NavLink" to={`${match.url}/${index}`} key={`nav${spaceData.id}`}>
                        {spaceData.name}
                    </NavLink>
                )))}
            </div>
                <Switch>
                    <Route path={`${match.path}/:spaceId`}>
                        <SpaceCraft spaceData = {spaceData} key={spaceData.id}/>
                    </Route>
                </Switch>

        </div>
    );
}

export default SpaceCraftList;