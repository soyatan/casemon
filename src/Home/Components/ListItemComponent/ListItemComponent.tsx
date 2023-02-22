import React, {memo} from 'react';
import {Image, Pressable, Text, View} from 'react-native';

import {PokemonListItemTypeWithImage} from '../../Types/PokemonListItemType';
import {styles} from './styles';

type Props = {
  item: PokemonListItemTypeWithImage;
  onItemPressed: () => void;
};

const HomeListItem = ({item, onItemPressed}: Props) => {
  return (
    <Pressable style={styles.listItemContainer} onPress={onItemPressed}>
      <View style={styles.mainTextContainer}>
        <Text style={styles.textBold}>
          Name: <Text style={styles.textNormal}>{item.name}</Text>
        </Text>
        <Text style={styles.textBold}>
          Height: <Text style={styles.textNormal}>{item.height}</Text>
        </Text>
        <Text style={styles.textBold}>
          Base Experience:{' '}
          <Text style={styles.textNormal}>{item.base_experience}</Text>
        </Text>
      </View>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: item.image,
        }}
      />
    </Pressable>
  );
};

export default memo(HomeListItem);
