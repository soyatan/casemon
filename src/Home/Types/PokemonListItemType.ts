export type PokemonListItemType = {
  base_experience: number;
  height: number;
  name: string;
  id: string;
};

export type PokemonListItemTypeWithImage = PokemonListItemType & {
  image: string;
};
