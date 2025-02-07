import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../Common/Constants/colors';
import {getHeight, getWidth} from '../../Common/Helpers/Responsive';
import {pokemonActions} from '../../Core/Redux/pokemonActions';
import {PokemonDetailsType} from '../../Core/Redux/pokemonReducer';
import {useAppDispatch, useAppSelector} from '../../Core/Redux/store';
import {HomeStackParamList} from '../Types/HomeStackParamList';

type Props = {
  navigation: NativeStackNavigationProp<
    HomeStackParamList,
    'PokemonDetailsScreen'
  >;
  route: RouteProp<HomeStackParamList, 'PokemonDetailsScreen'>;
};

const PokemonDetailsScreen = ({navigation, route}: Props) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<PokemonDetailsType>();
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const {pokemonDetail, meta, isLoading, isError} = useAppSelector(
    state => state.pokemon,
  );
  const [searching, setsearching] = useState(false);
  const [bottomRefreshing, setBottomRefreshing] = useState<boolean>(false);
  // const checkoutState = useAppSelector(state => state.checkout);
  console.log(searching, 'HERE');

  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    if (pokemonDetail) {
      setData(pokemonDetail);
    }
  }, [pokemonDetail]);

  const getData = useCallback(async () => {
    return dispatch(
      pokemonActions.getPokemonDetailsByIDRequest({
        ID: route.params.id,
        image: route.params.image,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    getData().then(() => {
      setRefreshing(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(data, 'SADA');
  return (
    <SafeAreaView style={styles.main}>
      {data ? (
        <View>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{
              uri: data.image,
            }}
          />
          <Text style={styles.textBold}>
            Name: <Text style={styles.textNormal}>{data.name}</Text>
          </Text>
          <Text style={styles.textBold}>
            Base Experience:
            <Text style={styles.textNormal}>{data.base_experience}</Text>
          </Text>
          <Text style={styles.textBold}>
            Base Happiness:
            <Text style={styles.textNormal}>{data.base_happiness}</Text>
          </Text>
          <Text style={styles.textBold}>
            Capture Rate:
            <Text style={styles.textNormal}>{data.capture_rate}</Text>
          </Text>
          <Text style={styles.textBold}>
            Evolution Chain:
            <Text style={styles.textNormal}>{data.evolution_chain_id}</Text>
          </Text>
          <Text style={styles.textBold}>
            Gender Rate:
            <Text style={styles.textNormal}>{data.gender_rate}</Text>
          </Text>
          <Text style={styles.textBold}>
            Height:
            <Text style={styles.textNormal}>{data.height}</Text>
          </Text>
          <View style={styles.groupContainer}>
            <Text style={styles.textBold}>Moves:</Text>
            {data.moves &&
              data.moves.length > 0 &&
              data.moves.map((i, index) => {
                return (
                  <Text key={index.toString()} style={styles.textNormal}>
                    {i.name}
                  </Text>
                );
              })}
          </View>
        </View>
      ) : (
        <View style={styles.activityContainer}>
          <ActivityIndicator />
        </View>
      )}
    </SafeAreaView>
  );
};

export default PokemonDetailsScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.liteGray,
    paddingHorizontal: getWidth(10),
  },
  activityContainer: {
    height: getHeight(80),
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupContainer: {
    flexDirection: 'column',
  },
  listItemContainer: {
    flex: 1,
    backgroundColor: colors.primary,

    marginVertical: getHeight(5),
    padding: getWidth(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: getWidth(15),
  },
  mainTextContainer: {
    height: '80%',
    justifyContent: 'space-between',
  },
  textBold: {
    fontSize: getWidth(15),
    fontWeight: 'bold',
    paddingVertical: getHeight(10),
  },
  textNormal: {
    fontSize: getWidth(13),
    fontWeight: '400',
    marginLeft: getWidth(5),
  },

  image: {
    borderWidth: 1,
    borderRadius: getWidth(5),
    borderColor: colors.borderBlue,
    width: getWidth(80),
    height: getWidth(80),
  },
});
