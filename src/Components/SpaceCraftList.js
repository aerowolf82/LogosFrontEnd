import { Switch, Route, useRouteMatch, NavLink} from "react-router-dom";
import SpaceCraft from './SpaceCraft.js'
import './SpaceCraftList.css';

function SpaceCraftList({spaceData, favorites}) {
        let match = useRouteMatch()
    
        return (

        <div>
            <h1>
                Space Craft List
            </h1>
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