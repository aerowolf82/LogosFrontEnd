import { useRouteMatch } from "react-router";
import { Route, NavLink } from 'react-router-dom';
import SpaceCraft from './SpaceCraft.js'
import "react-widgets/styles.css";
import './SpaceCraftList.css';
import Combobox from "react-widgets/Combobox";
import { Grid, Box, Card, CardContent, CardMedia, Typography, Modal, Button} from '@mui/material'
// import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AppContext } from "./AppContext.js";
import CardActions from "@mui/material/CardActions";
//this goes in any components to use the context/states
import { useState, useEffect, useContext } from "react";

async function getSpaceCraftByFamily(e) {
    let res = await fetch(`http://localhost:3001/spacecraft?family=${e}`);
    let data = await res.json();
    return data;
}

function SpaceCraftList({ spaceData, 
    filteredSpaceData, 
    setFilteredSpaceData, 
    isFilteredSpace, 
    setIsFilteredSpace, 
    isOpenSC, 
    setIsOpenSC,
    }) {

    const { favorites, setFavorites, isFavorited, setIsFavorited, removeFavorite, addFavorite } = useContext(AppContext);

    let match = useRouteMatch()
    
    async function handleSelect(e) {
        setIsFilteredSpace(true);
        filteredSpaceData = await (getSpaceCraftByFamily(e))
        setFilteredSpaceData(filteredSpaceData)
    }

    function resetFilter(){
        setIsFilteredSpace(false);
    }

    function handleFavorite(){
        console.log(spaceData)
        if (favorites.some(e => e.name === spaceData.name)) {
            removeFavorite(spaceData);
          } else {
            addFavorite(spaceData);
        }
    }
    
    const handleOpen = (id) => setIsOpenSC(true);
    const handleClose = () => setIsOpenSC(false);
    
    return (
        <div>
            <Typography fontFamily = 'Rockwell'>
                <Box sx={{m: 3}}>
                    <Grid container justifyContent='flex-start'>
                        <Grid item xs = {12} sm = {12} md = {8} lg = {4}>
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
                    <Route path={`${match.path}/:spaceId`}>
                        <Modal
                            open={isOpenSC}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{
                                m: 5,
                                bgcolor: '#587da5',
                                border: '2px solid #000',
                                padding: '4px',
                                boxShadow: 24
                            }}>
                                <SpaceCraft spaceData={spaceData} />
                            </Box>
                        </Modal>
                    </Route>
                    <Box sx={{m: 5}}>
                        <Grid container spacing = {4} justifyContent = 'center' alignItems = 'center'>
                            { isFilteredSpace?
                                filteredSpaceData.map((spaceData) => (
                                    <Grid item xs = {12} sm = {6} md = {4} lg = {3}>
                                            <CardMedia
                                                component="img"
                                                height="100"
                                                image={`${spaceData.image_url}`}
                                                alt="Spacecraft Image"
                                            />
                                            <Card variant = 'outlined' style={{backgroundColor: "lightgrey"}}>
                                                <CardContent >
                                                    <Box sx={{m: 1}}>
                                                        <NavLink className="NavLink" to={`${match.url}/${spaceData.id}`} key={`nav${spaceData.id}`} onClick={handleOpen}>
                                                            {spaceData.name} {isFilteredSpace = false}
                                                        </NavLink>
                                                    </Box>
                                                    <Grid container>
                                                        <Grid item xs = {10} sm = {10} md = {10} lg = {10}>                                          
                                                            <Typography variant="body2" color="text.secondary">
                                                            {`Launch Date: ${spaceData.launch_date} `}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs = {2} sm = {2} md = {2} lg = {2}>
                                                            <CardActions disableSpacing>
                                                                <IconButton
                                                                    onClick={() => {
                                                                        console.log(`clicked, spaceData:`, spaceData);
                                                                        handleFavorite()
                                                                    }}
                                                                    aria-label="add to favorites">
                                                                    <FavoriteIcon style={{ color: ( isFavorited.includes(spaceData.name) ) ?"pink" : "black" }} />          
                                                                </IconButton>
                                                            </CardActions>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                    </Grid>
                                )) :
                                spaceData.map((spaceData) => (
                                    <Grid item xs = {12} sm = {6} md = {4} lg = {3}>
                                        <CardMedia
                                            component="img"
                                            style={{
                                                height: "10em",
                                                // marginLeft: "113px",
                                                // paddingLeft: "56.25%",
                                                // paddingTop: "56.25%", // 16:9,
                                                // marginTop: "20px",
                                                // width: "30em"
                                            }}
                                            // height="100"
                                            image={`${spaceData.image_url}`}
                                            alt="Spacecraft Image"
                                        />
                                        <Card variant = 'outlined' style={{backgroundColor: "lightgrey"}}>
                                            <CardContent>
                                                <Box sx={{m: 1}}>
                                                    <NavLink className="NavLink" to={`${match.url}/${spaceData.id}`} key={`nav${spaceData.id}`} onClick={handleOpen}>
                                                        {spaceData.name}
                                                    </NavLink>
                                                </Box>
                                                <Grid container>
                                                    <Grid item xs = {10} sm = {10} md = {10} lg = {10}>
                                                        <Typography variant="body2" color="text.secondary">
                                                        {`Launch Date: ${spaceData.launch_date} `}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs = {2} sm = {2} md = {2} lg = {2}>
                                                        <CardActions disableSpacing>
                                                            <IconButton
                                                                onClick={() => handleFavorite()}
                                                                aria-label="add to favorites">
                                                                <FavoriteIcon style={{ color: ( isFavorited.includes(spaceData.name) ) ?"pink" : "black" }} />          
                                                            </IconButton>
                                                        </CardActions>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Box>
                </div>
            </Typography>
        </div>
    );
}

export default SpaceCraftList;