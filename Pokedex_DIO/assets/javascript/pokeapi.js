const pokeapi = {}

function convertPokeDetail(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.name=pokeDetail.name
    pokemon.number=pokeDetail.order
    const types=pokeDetail.types.map((typeSlot) =>typeSlot.type.name)
    const [type] = types
    pokemon.type = type
    pokemon.types = types
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    
    return pokemon

}


pokeapi.getPokemonDetail = (pokemon) =>{
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeDetail)
    
}

pokeapi.getPokemons = (offset = 1, limit = 10) =>{
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response)=> response.json())
        .then((responseJson)=>responseJson.results)
        .then((pokemons)=>pokemons.map(pokeapi.getPokemonDetail))
        .then((detailRequest)=>Promise.all(detailRequest))
        .then((pokemonDetails)=> (pokemonDetails))
        .catch((error)=> console.log(error))     
}