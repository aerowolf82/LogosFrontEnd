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

function FavoritesList({
  isOpenSC, 
  setIsOpenSC,
  }) {

    const { favorites, setFavorites, isFavorited, setIsFavorited, removeFavorite, addFavorite } = useContext(AppContext);

    let match = useRouteMatch()

    function handleChange(spaceData){
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
                                <SpaceCraft spaceData={favorites} />
                            </Box>
                        </Modal>
                    </Route>
                    <Box sx={{m: 5}}>
                        <Grid container spacing = {4} justifyContent = 'center' alignItems = 'center'>
                            { favorites.map((spaceData) => (
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
                                                                onClick={() => handleChange(spaceData)}
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

export default FavoritesList;