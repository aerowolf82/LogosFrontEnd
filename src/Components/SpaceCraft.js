import { useParams } from 'react-router';
import {useEffect, useState} from "react"



async function getSCDetails(spaceId){
    let realSCId=parseInt(spaceId)+1;
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
                {spaceData[spaceId]?.name}
            
            </h2>
             <img src = {spaceData[spaceId]?.image_url} alt = {spaceData[spaceId]?.name}/>
           {/* <button>Add To Favorites</button> */}
            <p>Description: {indSC.description}</p>
            {/* <p>ID: {indSC.id}</p> */}
            
            {/*type placeholder - indPoke.types[..].type.name 
            ART:
                indPoke.sprites.other.official-artwork.front_default*/}
            {/* {JSON.stringify(indPoke.sprites?.other)} */}
        </>
    )
}
export default SpaceCraft;