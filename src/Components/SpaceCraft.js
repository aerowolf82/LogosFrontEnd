import { useParams } from 'react-router';
import {useEffect, useState} from "react"



// async function getPokemonDetails(pokeId){
//     let realPokeId=parseInt(pokeId)+1;
//     let results = await fetch (`https://pokeapi.co/api/v2/pokemon/${realPokeId}`)
//     let individualPokemon = await results.json()
//     return individualPokemon
// }


const SpaceCraft = ( {spaceData}) =>{
    
    let { spaceId } = useParams();
    console.log(spaceId)
    console.log(spaceData[0].name)
    // const [indPoke, setPoke] = useState([])

    
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


    
    return (
        <>
            <h2>
                {spaceData[spaceId]?.name}
            </h2>
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
export default SpaceCraft;