let offset = 0
const limit = 6
const loadMorePokemons = document.getElementById('loadingmore')
function convertePokemonHtml(pokemon){
    return `
       
        <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                       ${pokemon.types.map((type)=> `<li class="type">${type}</li>`).join('')}
                    </ol>
                    <img src=${pokemon.photo} alt="${pokemon.name}">
                </div>
             </li>
        `     
}
const pokemonhtml = document.getElementById('pokemonlist')


function loadMorePage(offset, limit){
    pokeapi.getPokemons(offset, limit).then((pokemonList) => {

        const newList = pokemonList.map((pokemon) => {
            return convertePokemonHtml(pokemon)    
        })  
        const newPokemon = newList.join('')
        pokemonhtml.innerHTML += newPokemon
    })
    

}
loadMorePage(offset,limit)

loadMorePokemons.addEventListener('click', () => {
    offset += limit
    loadMorePage(offset,limit)
})




