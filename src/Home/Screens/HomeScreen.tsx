import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../Common/Constants/colors';
import {getHeight, getWidth} from '../../Common/Helpers/Responsive';
import {pokemonActions} from '../../Core/Redux/pokemonActions';
import {useAppDispatch, useAppSelector} from '../../Core/Redux/store';
import ListItemComponent from '../Components/ListItemComponent/ListItemComponent';
import {SearchContainer} from '../Components/SearchContainer/SearchContainer';
import {HomeStackParamList} from '../Types/HomeStackParamList';
import {PokemonListItemTypeWithImage} from '../Types/PokemonListItemType';

type Props = {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'Pokemons'>;
  route: RouteProp<HomeStackParamList, 'Pokemons'>;
};

const HomeScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<PokemonListItemTypeWithImage[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const {pokemons, meta, isLoading, isError} = useAppSelector(
    state => state.pokemon,
  );
  const [searching, setsearching] = useState(false);
  const [bottomRefreshing, setBottomRefreshing] = useState<boolean>(false);
  // const checkoutState = useAppSelector(state => state.checkout);

  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    setData(pokemons);
  }, [pokemons]);

  const onItemPressed = (params: {id: any; image: string}) => {
    navigation.navigate('PokemonDetailsScreen', {
      id: params.id,
      image: params.image,
    });
  };

  const renderListItem: ListRenderItem<PokemonListItemTypeWithImage> =
    useCallback(({item, index}) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow

      return (
        <ListItemComponent
          item={item}
          onItemPressed={() => onItemPressed({id: item.id, image: item.image})}
        />
      );
    }, []);

  const getData = useCallback(
    async ({offset, searchValue}: {offset: number; searchValue?: string}) => {
      return dispatch(
        pokemonActions.getPokemonsListRequest({
          offset: offset,
          limit: meta.limit,
        }),
      );
    },
    [dispatch],
  );

  const onRefresh = useCallback(() => {
    setSearchText('');
    getData({
      offset: 0,
    });
  }, [dispatch, getData]);

  const refreshControl = useMemo(
    () => (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        tintColor={colors.transparent}
        children={refreshing && <Text>YOYO</Text>}
      />
    ),
    [onRefresh, refreshing],
  );

  const onEndReached = useCallback(() => {
    if (
      data.length > 0 &&
      // distanceFromEnd > 0 &&
      !isLoading &&
      !refreshing &&
      !isError &&
      meta
    ) {
      setBottomRefreshing(true);
      if (refreshing) {
        setRefreshing(false);
      }
      getData({
        offset: meta.offset + meta.limit,
      }).then(() => setBottomRefreshing(false));
    }
  }, [data.length, getData, isError, isLoading, meta, refreshing]);

  useEffect(() => {
    getData({offset: 0}).then(() => {
      setRefreshing(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = useCallback(
    (_searchText?: string) => {
      getData({
        offset: 0,
        searchValue: _searchText,
      });
    },
    [getData],
  );

  const handleSearchText = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.searchContainerBox}>
        <SearchContainer
          onSearch={handleSearch}
          showDivider={true}
          searchText={searchText}
          showFilterButton={false}
          setSearchText={setSearchText}
          onChangeText={handleSearchText}
          searchFromParent
          placeholder={'Search for a Pokemon'}
        />
      </View>

      <FlatList
        data={data}
        scrollEventThrottle={16}
        refreshControl={refreshControl}
        onEndReached={onEndReached}
        contentContainerStyle={{
          backgroundColor: colors.white,
        }}
        renderItem={renderListItem}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.liteGray,
    paddingHorizontal: getWidth(10),
  },
  fulfilmentStatusList: {
    width: '100%',
    marginBottom: getHeight(1),
    height: getHeight(64),
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayishBlue,
    borderTopWidth: 1,
    borderTopColor: colors.grayishBlue,
  },
  searchContainerBox: {
    marginBottom: getHeight(15),
  },
});
