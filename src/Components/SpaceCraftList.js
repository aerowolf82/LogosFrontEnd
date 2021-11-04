import { useRouteMatch } from "react-router";
import { Switch, Route, NavLink } from 'react-router-dom';
import SpaceCraft from './SpaceCraft.js'
import "react-widgets/styles.css";
import './SpaceCraftList.css';
import Combobox from "react-widgets/Combobox";
import { Grid, Box, Card, CardContent, CardMedia } from '@mui/material'

var filteredSpaceData = []

async function getSpaceCraftByFamily(e) {
    let res = await fetch(`http://localhost:3001/spacecraft?family=${e}`);
    let data = await res.json();
    return data;
}

function SpaceCraftList({ spaceData, filteredSpaceData, setFilteredSpaceData, isFilteredSpace, setIsFilteredSpace}) {
    let match = useRouteMatch()

    async function handleSelect(e) {
        setIsFilteredSpace(true);
        filteredSpaceData = await (getSpaceCraftByFamily(e))
        setFilteredSpaceData(filteredSpaceData)
    }

    function resetFilter(){
        setIsFilteredSpace(false);
    }

    return (
        <div>
            <Box sx={{m: 3}}>
                <Grid container justifyContent='flex-start'>
                    <Grid item xs = {4} sm = {4} md = {4} lg = {4}>
                        <Grid container justifyContent = 'center' alignItems = 'center'>
                            <Grid item xs = {8} sm = {8} md = {8} lg = {8}>
                                <Combobox
                                    hideCaret
                                    hideEmptyPopup
                                    data={[...(new Set(spaceData.map((craft) => {
                                        return craft.family
                                    })))]}
                                    placeholder="Search for a family of spacecraft!"
                                    onSelect={handleSelect}
                                />
                            </Grid>
                            <Grid item xs = {4} sm = {4} md = {4} lg = {4}>
                                <button onClick={resetFilter}>Reset Filter</button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <div>
                <Box sx={{m: 5}}>
                    <Grid container spacing = {4} justifyContent = 'center' alignItems = 'center'>
                        { isFilteredSpace?
                            filteredSpaceData.map((spaceData) => (
                                <Grid item xs = {12} sm = {6} md = {4} lg = {3}>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={`${spaceData.image_url}`}
                                        alt="Spacecraft Image"
                                    />
                                    <Card variant = 'outlined'>
                                        <CardContent>
                                            <NavLink className="NavLink" to={`${match.url}/${spaceData.id}`} key={`nav${spaceData.id}`}>
                                                {spaceData.name} {isFilteredSpace = false}
                                            </NavLink>
                                            <h3>{spaceData.description}</h3>
                                            <h3>{spaceData.history}</h3>
                                            <h3>{spaceData.launch_date}</h3>
                                            <h3>{spaceData.height}</h3>
                                            <h3>{spaceData.diameter}</h3>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )) :
                            spaceData.map((spaceData) => (
                                <Grid item xs = {12} sm = {6} md = {4} lg = {3}>
                                    <Card variant = 'outlined'>
                                        <CardMedia
                                            component="img"
                                            height="194"
                                            image={`${spaceData.image_url}`}
                                            alt="Spacecraft Image"
                                        />
                                        <CardContent>
                                            <NavLink className="NavLink" to={`${match.url}/${spaceData.id}`} key={`nav${spaceData.id}`}>
                                                {spaceData.name}
                                            </NavLink>
                                            <h3>{spaceData.description}</h3>
                                            <h3>{spaceData.history}</h3>
                                            <h3>{spaceData.launch_date}</h3>
                                            <h3>{spaceData.height}</h3>
                                            <h3>{spaceData.diameter}</h3>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>
            </div>
            <Switch>
                <Route path={`${match.path}/:spaceId`}>
                        <SpaceCraft spaceData={spaceData} key={spaceData.id} />
                </Route>
            </Switch>

        </div>
    );
}

export default SpaceCraftList;