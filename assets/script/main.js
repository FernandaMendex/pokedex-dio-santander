//Trabalhando com o HTML no formato de objeto, chamando a lista do HTML antigo
const pokemonList = document.getElementById('listaJavaScrip')

//Paginação
const loadMoreButoon = document.getElementById('loadMoreButton')
const maxRecords = 151
const limit = 10
let offset = 0

//Executando a requisição em HTTP para buscar os Pokémons
function loadPokemons(offset, limit){
    //Instruções da função que irá converter a lista de Pokémons em uma lista de HTML
    pokeAPI.getPokemons(offset, limit).then((pokemons = []) => {
        ////Mapeando, convertendo essas informações em formato HTML e agrupando todos os elementos da lista em uma string
        const newHtml = pokemons.map((pokemon) =>
        `<li class="pokemon ${pokemon.type}">
                <span class="pokemonNumber">#00${pokemon.number}</span>
                <span class="pokemonName">${pokemon.name}</span>

                <div class="pokemonDetail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.image}" alt="${pokemon.name}">
                </div>
            </li>
            `).join('')
    pokemonList.innerHTML += newHtml
    })
}

loadPokemons(offset, limit)

loadMoreButoon.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemons(offset, newLimit)
        loadMoreButoon.parentElement.removeChild(loadMoreButoon)
    } else {
        loadPokemons(offset, limit)
    }
})
