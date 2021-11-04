import { useParams } from 'react-router';
import {useEffect, useState} from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



async function getSCDetails(spaceId){
    let realSCId=parseInt(spaceId);
    let results = await fetch (`http://localhost:3001/spacecraft/${realSCId}`)
    let individualSC = await results.json()
    return individualSC
}


const SpaceCraft = ( {spaceData}) =>{
    
    let { spaceId } = useParams();
    const [indSC, setSC] = useState([])

    
    useEffect(() => {
        let mounted = true;
        getSCDetails(spaceId)
            .then(items => {
                if(mounted) {
                    setSC(items)
                }
            })
            //console.log(indSC)
        return () => mounted = false;
      }, [spaceId])    
    //let test = "indPoke.sprites.other.official-artwork.front_default"
    //console.log(indPoke.sprites.front_default)
    console.log(indSC)
   


    
    return (
        <>
            <h2>
                {indSC[0]?.name}
            
            </h2>
             {/* <img src = {indSC[0]?.image_url} alt = {spaceData[spaceId]?.name}/> */}
           {/* <button>Add To Favorites</button> */}
            <p>Description: {indSC[0]?.description}</p>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>Details</TableCell>
            <TableCell align="right">Launch Date</TableCell>
            <TableCell align="right">Height</TableCell>
            <TableCell align="right">Diameter</TableCell>
            <TableCell align="right">Pad Info</TableCell>            
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
            {/* <p>ID: {indSC.id}</p> */}
            
            {/*type placeholder - indPoke.types[..].type.name 
            ART:
                indPoke.sprites.other.official-artwork.front_default*/}
            {/* {JSON.stringify(indPoke.sprites?.other)} */}
        </>
    )
}
export default SpaceCraft;