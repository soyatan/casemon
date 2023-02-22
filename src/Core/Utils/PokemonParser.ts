import {PokemonListItemType} from '../../Home/Types/PokemonListItemType';
import {PokemonDetailsType} from '../Redux/pokemonReducer';
import {
  GetPokemonDetailsAPIResponseType,
  GetPokemonsListAPIResponseType,
} from '../Types/APITypes';

export const PokemonParser = (
  data: GetPokemonsListAPIResponseType['results'][number],
): PokemonListItemType & {image: string} => {
  return {
    base_experience: data.base_experience,
    height: data.height,
    name: data.name,
    id: data.id,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
  };
};

export const PokemonDetailParser = ({
  data,
  image,
}: {
  data: GetPokemonDetailsAPIResponseType[];
  image: string;
}): PokemonDetailsType => {
  return {
    base_experience: data[0].base_experience,
    height: data[0].height,
    name: data[0].name,
    image: image,
    base_happiness: data[0].pokemon_v2_pokemonspecy.base_happiness,
    capture_rate: data[0].pokemon_v2_pokemonspecy.capture_rate,
    evolution_chain_id: data[0].pokemon_v2_pokemonspecy.evolution_chain_id,
    gender_rate: data[0].pokemon_v2_pokemonspecy.gender_rate,
    type_name: data[0].pokemon_v2_pokemontypes[0].pokemon_v2_type,
    moves: data[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.pokemon_v2_moves,
    weight: data[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.weight,
  };
};
