
//Manipulação do fetch
const pokeAPI = {}

//Convertendo os detalhes dos Pokémons para o nosso modelo
function convertPokeAPIDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.image = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

//Transformando essa lista de Pokémons em novas requisições para buscar os detalhes nas URLs e convertendo para json
pokeAPI.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeAPIDetailToPokemon)
}

//Executando a requisição em HTTP para buscar os Pokémons
pokeAPI.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        //Transformando response em uma promisse do body e convertendo em json
        .then((response) => response.json()) 

        //Recebendo esse body convertido e pegando o results, que é a lista de Pokémons (nomes e URLs de detalhe)
        .then((jsonBody) => jsonBody.results) 

        //Transformando essa lista de Pokémons em novas requisições para buscar os detalhes nas URLs e convertendo para json
        .then((pokemons) => pokemons.map(pokeAPI.getPokemonDetail)) 

        //Aguardando que todas as requisições terminem 
        .then((detailRequests) => Promise.all(detailRequests))

        //Retornando uma lista de detalhes de todos os Pokémons
        .then((pokemonsDetails) => pokemonsDetails)
}