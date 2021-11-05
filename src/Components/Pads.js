import { useParams } from 'react-router';
import {useEffect, useState} from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { withStyles } from "@material-ui/core/styles";

const DarkTextTypography = withStyles({
  root: {
    color: "#101010"
  }
})(Typography);

async function getPadDetails(key){
    let realPadId=parseInt(key);
    let results = await fetch (`http://localhost:3001/pads/${realPadId}`)
    let individualPad = await results.json()
    return individualPad
}



const Pads = ( {padData}) =>{
    
    let { padId } = useParams();
      const [indPad, setPad] = useState([])

    useEffect(() => {
        let mounted = true;
        getPadDetails(padId)
            .then(items => {
                if(mounted) {
                    setPad(items)
                }
            })
        return () => mounted = false;
      }, [padId])
      
    // useEffect(() => {
    //     let mounted = true;
    //     getPokemonDetails(pokeId)
    //         .then(items => {
    //             if(mounted) {
    //                 setPoke(items)
    //             }
    //         })
    //     return () => mounted = false;
    //   }, [pokeId])    
    //let test = "indPoke.sprites.other.official-artwork.front_default"
    //console.log(indPoke.sprites.front_default)
    
    // let indPad= {
    //     name: `pad_name`,
    //     location: `pad_location`,
    //     latitude: `pad_latitude`,
    //     longitude: `pad_longitude`,
    // }

    return (
        <>
            <Grid container 
                spacing={2}
                direction="column"
            >
                <Grid item style={{ display: "flex", justifyContent: "center" }} xs = {12} sm = {12} md = {12} lg = {12}>
                    <DarkTextTypography>
                        <h1>{indPad[0]?.pad_name}</h1>
                    </DarkTextTypography>
                </Grid>
                <Grid item style={{ display: "flex", justifyContent: "center" }} xs = {12} sm = {12} md = {12} lg = {12}>
                    <img src = {indPad[0]?.map_image} alt = {indPad[0]?.pad_name} height="300em" />
                </Grid>
                    {/* <button>Add To Favorites</button> */}
                <Grid item style={{ display: "flex", justifyContent: "center"}} xs = {12} sm = {12} md = {12} lg = {12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Details</b></TableCell>
                                    <TableCell align="right"><b>Location</b></TableCell> 
                                    <TableCell align="right"><b>Latitude</b></TableCell>
                                    <TableCell align="right"><b>Longitude</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>          
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {/* {indPad[0]?.pad_name} */}
                                    </TableCell>              
                                    <TableCell align="right">{indPad[0]?.pad_location}</TableCell>
                                    <TableCell align="right">{indPad[0]?.latitude}</TableCell>
                                    <TableCell align="right">{indPad[0]?.longitude}</TableCell>
                                </TableRow>         
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                {/* <Grid item style={{ display: "flex", justifyContent: "flex-start" }} xs = {12} sm = {12} md = {12} lg = {12}>
                <DarkTextTypography><b>Launches: </b>{`add missions here`}</DarkTextTypography>
                </Grid> */}
            </Grid>



            {/* <img src = {indPoke.sprites?.other["official-artwork"].front_default} alt = 'pika...no?'/>
            <button>Add To Favorites</button>
            <p>BASE EXPERIENCE: {indPoke.base_experience}</p>
            <p>ID: {indPoke.id}</p>
            {indPoke.abilities?
            <div>
                {(indPoke.abilities.map((ability,index)=>(
                    <p key = {index}>ABILITY {index+1}: {ability.ability.name}</p>
                )))} 
            </div> : <></>}
            {indPoke.moves?
            <div>
                {(indPoke.moves.map((move,index)=>(
                    <p key = {index}>MOVE {index+1}: {move.move.name}</p>
                )))} 
            </div>: <></>}
            {/*type placeholder - indPoke.types[..].type.name 
            ART:
                indPoke.sprites.other.official-artwork.front_default*/}
            {/* {JSON.stringify(indPoke.sprites?.other)}  */}
        </>
    )
}
export default Pads;