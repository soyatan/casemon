import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  GetPokemonDetailsByIDServiceParamsType,
  GetPokemonsListAPIResponseType,
  GetPokemonsServiceParamsType,
} from '../Types/APITypes';
import {PokemonDetailParser, PokemonParser} from '../Utils/PokemonParser';
import {pokemonService} from './pokemonServices';

export const getPokemonsListRequest = createAsyncThunk(
  'pokemon/getPokemonsList',
  async (data: GetPokemonsServiceParamsType, thunkAPI) => {
    try {
      const response = await pokemonService.GetPokemonsList(data);
      const updatedResponse = response.map(
        (i: GetPokemonsListAPIResponseType['results'][number]) =>
          PokemonParser(i),
      );
      return {data: updatedResponse, offset: data.offset};
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const getPokemonDetailsByIDRequest = createAsyncThunk(
  'pokemon/getPokemonDetailsByIDRequest',
  async (data: GetPokemonDetailsByIDServiceParamsType, thunkAPI) => {
    try {
      const response = await pokemonService.GetPokemonDetailsByID(data);

      return await PokemonDetailParser({data: response, image: data.image});
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const pokemonActions = {
  getPokemonsListRequest,
  getPokemonDetailsByIDRequest,
};
