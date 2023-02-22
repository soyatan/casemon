import {
  GetPokemonDetailsByIDServiceParamsType,
  GetPokemonsServiceParamsType,
} from '../Types/APITypes';

export const GetPokemonsList = async (data: GetPokemonsServiceParamsType) => {
  const headers = {
    'Content-Type': 'application/json',
    'X-Method-Used': 'graphiql',
  };

  const gqlQuery = `{
    pokemon_v2_pokemon(limit: ${data.limit}, offset: ${data.offset}) {
      id
      base_experience
      height
      name
    }
   
  }`;

  console.log('fetching' + gqlQuery);
  return fetch('https://beta.pokeapi.co/graphql/v1beta/', {
    credentials: 'omit',
    headers: headers,
    body: JSON.stringify({
      query: gqlQuery,
    }),
    method: 'POST',
  })
    .then(res => res.json())
    .then((response: any) => {
      if (!response.data) {
        throw response;
      }
      return response.data.pokemon_v2_pokemon;
    })
    .catch(error => {
      return error;
    });
};

export const GetPokemonDetailsByID = async (
  data: GetPokemonDetailsByIDServiceParamsType,
) => {
  const headers = {
    'Content-Type': 'application/json',
    'X-Method-Used': 'graphiql',
  };

  const gqlQuery = `{
    pokemon_v2_pokemon(where: {id: {_eq: ${data.ID}}}) {
      base_experience
      height
      name
      pokemon_v2_pokemonsprites {
        id
      }
      pokemon_v2_pokemonspecy {
        base_happiness
        capture_rate
        evolution_chain_id
        gender_rate
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
          pokemon_v2_moves(limit: 3) {
            name
          }
        }
      }
      weight
    }
  }`;

  return fetch('https://beta.pokeapi.co/graphql/v1beta/', {
    credentials: 'omit',
    headers: headers,
    body: JSON.stringify({
      query: gqlQuery,
    }),
    method: 'POST',
  })
    .then(res => res.json())
    .then((response: any) => {
      if (!response.data) {
        throw response;
      }
      return response.data.pokemon_v2_pokemon;
    })
    .catch(error => {
      return error;
    });
};

export const pokemonService = {GetPokemonsList, GetPokemonDetailsByID};
