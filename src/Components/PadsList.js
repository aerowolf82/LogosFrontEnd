import { useRouteMatch } from "react-router";
import { Switch, Route, NavLink } from 'react-router-dom';
import Pads from './Pads.js'
import "react-widgets/styles.css";
import './SpaceCraftList.css';
import Combobox from "react-widgets/Combobox";
import { Grid, Box, Card, CardContent, CardMedia, Typography} from '@mui/material'

async function getPadByName(e) {
    let res = await fetch(`http://localhost:3001/spacecraft?pad_name=${e}`);
    let data = await res.json();
    return data;
}

function PadsList({ padData, setIsFilteredPads, isFilteredPads, filteredPadData, setFilteredPadData }) {
    let match = useRouteMatch()
    console.log(padData)

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
            <Box sx={{m: 3}}>
                <Grid container justifyContent='flex-start'>
                    <Grid item xs = {4} sm = {4} md = {4} lg = {4}>
                        <Grid container justifyContent = 'center' alignItems = 'center'>
                            <Grid item xs = {8} sm = {8} md = {8} lg = {8}>
                                <Combobox
                                    hideCaret
                                    hideEmptyPopup
                                    data={[...(new Set(padData.map((pad) => {
                                        return pad.pad_name
                                    })))]}
                                    placeholder="Search for a pad!"
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
                <Grid container spacing = {2} justifyContent = 'center' alignItems = 'center'>
                    { isFilteredPads?
                        filteredPadData.map((spaceData, index) => (
                            <Grid item xs = {12} sm = {6} md = {4} lg = {3}>
                                <Card variant = 'outlined'>
                                    <CardContent>
                                        <NavLink className="NavLink" to={`${match.url}/${index}`} key={`nav${padData.id}`}>
                                            {padData.pad_name} {isFilteredPads = false}
                                        </NavLink>
                                        <Typography variant="body2" color="text.secondary">
                                            {`Location: ${padData.location} `}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {`Latitude: ${padData.latitude} `}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {`Longitude: ${padData.longitude} `}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                    )) :
                        (padData.map((padData, index) => (
                            <Grid item xs = {12} sm = {6} md = {4} lg = {3}>
                                <Card variant = 'outlined'>
                                    <CardContent>
                                        <NavLink className="NavLink" to={`${match.url}/${index}`} key={`nav${padData.id}`}>
                                            {padData.pad_name}
                                        </NavLink>
                                        <Typography variant="body2" color="text.secondary">
                                            {`Location: ${padData.location} `}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {`Latitude: ${padData.latitude} `}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {`Longitude: ${padData.longitude} `}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                    )))}
                </Grid>
            </Box>
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