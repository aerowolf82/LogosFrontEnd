import { useParams } from 'react-router';
import {useEffect, useState, useContext} from "react"
import { AppContext } from "./AppContext.js";
import {Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography, 
  Grid,
  Box} from '@mui/material';
import { withStyles } from "@material-ui/core/styles";

const DarkTextTypography = withStyles({
  root: {
    color: "#101010"
  }
})(Typography);


async function getSCDetails(key){
    let realSCId=parseInt(key);
    let results = await fetch (`http://localhost:3001/spacecraft/${realSCId}`)
    let individualSC = await results.json()
    return individualSC
}

const SpaceCraft = ( {spaceData}) =>{
    const [indSC, setSC] = useState([])
    let { spaceId } = useParams();

    const { favorites, setFavorites, isFavorited, setIsFavorited, removeFavorite, addFavorite } = useContext(AppContext);

    useEffect(() => {
        let mounted = true;
        getSCDetails(spaceId)
            .then(items => {
                if(mounted) {
                    setSC(items)
                }
            })
        return () => mounted = false;
      }, [spaceId])


    
    return (
        <>
        <Grid container 
          spacing={2}
          direction="column"
        >
            <Grid item style={{ display: "flex", justifyContent: "center" }} xs = {12} sm = {12} md = {12} lg = {12}>
              <DarkTextTypography>
                <h1>{indSC[0]?.name}</h1>
              </DarkTextTypography>
            </Grid>
            <Grid item style={{ display: "flex", justifyContent: "center" }} xs = {12} sm = {12} md = {12} lg = {12}>
              <img src = {indSC[0]?.image_url} alt = {spaceData[spaceId]?.name} height="200em" />
            </Grid>
            <Grid item style={{ display: "flex", justifyContent: "center"}} xs = {12} sm = {12} md = {12} lg = {12}>
            <Box sx={{m: 1}}>
              <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell><b>Details</b></TableCell>
                    <TableCell align="right"><b>Launch Date</b></TableCell>
                    <TableCell align="right"><b>Height</b></TableCell>
                    <TableCell align="right"><b>Diameter</b></TableCell>
                    <TableCell align="right"><b>Pad Info</b></TableCell>          
                  </TableRow>
                </TableHead>
                <TableBody>          
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {indSC[0]?.name}
                    </TableCell>              
                    <TableCell align="right">{indSC[0]?.launch_date}</TableCell>
                    <TableCell align="right">{indSC[0]?.height}m</TableCell>
                    <TableCell align="right">{indSC[0]?.diameter}m</TableCell>
                    <TableCell align="right">{indSC[0]?.pad_id}</TableCell>
                  </TableRow>         
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
          <Grid item style={{ display: "flex", justifyContent: "flex-start" }} xs = {12} sm = {12} md = {12} lg = {12}>
            <DarkTextTypography><b>Description: </b>{indSC[0]?.description}</DarkTextTypography>
          </Grid>
          <Grid item style={{ display: "flex", justifyContent: "flex-start" }} xs = {12} sm = {12} md = {12} lg = {12}>
            <DarkTextTypography><b>History: </b>{indSC[0]?.history}</DarkTextTypography>
          </Grid>
      </Grid>
      </>
    )
}
export default SpaceCraft;