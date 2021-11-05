import { useRouteMatch } from "react-router";
import { Switch, Route, NavLink } from 'react-router-dom';
import Pads from './Pads.js'
import "react-widgets/styles.css";
import './SpaceCraftList.css';
import Combobox from "react-widgets/Combobox";
import { Grid, Box, Card, CardContent, CardMedia, Typography, Modal, Button} from '@mui/material'

async function getPadByName(e) {
    let res = await fetch(`http://localhost:3001/spacecraft?pad_name=${e}`);
    let data = await res.json();
    return data;
}

function PadsList({ padData, setIsFilteredPads, isFilteredPads, filteredPadData, setFilteredPadData, isOpenPads, setIsOpenPads }) {
    let match = useRouteMatch()
    // console.log(padData)
    const handleOpen = (id) => setIsOpenPads(true);
    const handleClose = () => setIsOpenPads(false);

    async function handleSelect(e) {
        setIsFilteredPads(true);
        console.log(e);
        // console.log(data)
        filteredPadData = await (getPadByName(e))
        setFilteredPadData(filteredPadData)
    }

    function resetFilter(){
        setIsFilteredPads(false);
    }

    return (
        <div>
            <Typography fontFamily = 'Rockwell'>
                {/* <Box sx={{m: 3}}>
                    <Grid container justifyContent='flex-start'>
                        <Grid item xs = {4} sm = {4} md = {4} lg = {4}>
                            <Grid container justifyContent = 'center' alignItems = 'center'>
                                <Grid item xs = {8} sm = {8} md = {8} lg = {8}>
                                    <Combobox
                                        hideCaret
                                        hideEmptyPopup
                                        data={[...(new Set(padData.map((pad) => {
                                            let result = {name: pad.pad_name, id: pad.id}
                                            return result
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
                </Box> */}
                <div>
                <Switch>
                    <Route path={`${match.path}/:padId`}>
                        <Modal
                            open={isOpenPads}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{
                                m: 5,
                                bgcolor: '#B0BEC5',
                                border: '2px solid #000',
                                padding: '4px',
                                boxShadow: 24
                            }}>
                                <Pads padData={padData} key={padData.id} />
                            </Box>
                        </Modal>
                    </Route>
                </Switch>
                <Box sx={{m: 5}}>
                    <Grid container spacing = {2} justifyContent = 'center' alignItems = 'center'>
                        { isFilteredPads?
                            filteredPadData.map((padData) => (
                                <Grid item xs = {12} sm = {6} md = {4} lg = {3}>
                                    <CardMedia
                                                component="img"
                                                height="100"
                                                image={`${padData.map_image}`}
                                                alt="Launch Pad Image"
                                            />
                                    <Card variant = 'outlined' style={{backgroundColor: "lightgrey"}}>
                                        <CardContent>
                                            <NavLink className="NavLink" to={`${match.url}/${padData.id}`} key={`nav${padData.id}`} onClick={handleOpen}>
                                                {padData.pad_name} {isFilteredPads = false}
                                            </NavLink>
                                            <Typography variant="body2" color="text.secondary">
                                                {`Location: ${padData.pad_location} `}
                                            </Typography> 
                                        </CardContent>
                                    </Card>
                                </Grid>
                        )) :
                            (padData.map((padData, index) => (
                                <Grid item xs = {12} sm = {6} md = {4} lg = {3}>
                                    <CardMedia
                                                component="img"
                                                height="100"
                                                image={`${padData.map_image}`}
                                                alt="Launch Pad Image"
                                            />
                                    <Card variant = 'outlined' style={{backgroundColor: "lightgrey"}}>
                                        <CardContent>
                                            <NavLink className="NavLink" to={`${match.url}/${padData.id}`} key={`nav${padData.id}`} onClick={handleOpen}>
                                                {padData.pad_name}
                                            </NavLink>
                                            <Typography variant="body2" color="text.secondary">
                                                {`Location: ${padData.pad_location} `}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                        )))}
                    </Grid>
                </Box>
                </div>
            </Typography>
        </div>
    );
}

export default PadsList;