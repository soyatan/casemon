import {PokemonListItemType} from '../../Home/Types/PokemonListItemType';

export type GetPokemonsListAPIResponseType = {
  count: number;
  next: string;
  results: PokemonListItemType[];
};

export type GetPokemonsServiceParamsType = {
  offset: number;
  limit: number;
};

export type GetPokemonDetailsByIDServiceParamsType = {
  ID: string;
  image: string;
};

export type GetPokemonDetailsAPIResponseType = {
  base_experience: number;
  height: number;
  name: string;
  pokemon_v2_pokemonspecy: {
    base_happiness: number;
    capture_rate: number;
    evolution_chain_id: number;
    gender_rate: number;
  };
  pokemon_v2_pokemontypes: {
    pokemon_v2_type: any;
  }[];
  weight: number;
};
