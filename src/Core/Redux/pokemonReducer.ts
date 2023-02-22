import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {PokemonListItemTypeWithImage} from '../../Home/Types/PokemonListItemType';
import {
  getPokemonDetailsByIDRequest,
  getPokemonsListRequest,
} from './pokemonActions';

export type PokemonDetailsType = {
  base_experience: number;
  height: number;
  name: string;
  image: string;
  base_happiness: number;
  capture_rate: number;
  evolution_chain_id: number;
  gender_rate: number;
  type_name: string;
  moves: {name: string}[];
  weight: number;
};

export type PokemonState = {
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  meta: {
    offset: number;
    limit: number;
  };
  pokemonDetail: PokemonDetailsType | null;
  pokemons: PokemonListItemTypeWithImage[];
};
export const initialState: PokemonState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  meta: {offset: 0, limit: 16},
  pokemons: [],
  pokemonDetail: null,
};

export const pokemonReducer = createSlice({
  name: 'global',
  initialState,
  reducers: {
    clearCoreReducer: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(getPokemonsListRequest.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(
        getPokemonsListRequest.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          if (action.payload.offset > 0) {
            state.pokemons = state.pokemons.concat(action.payload.data);
          } else {
            state.pokemons = action.payload.data;
          }
          state.meta = {
            ...state.meta,
            offset: action.payload.offset,
          };
        },
      )
      .addCase(getPokemonsListRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getPokemonDetailsByIDRequest.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(
        getPokemonDetailsByIDRequest.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.pokemonDetail = action.payload;
        },
      )
      .addCase(getPokemonDetailsByIDRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {clearCoreReducer} = pokemonReducer.actions;

export default pokemonReducer.reducer;
