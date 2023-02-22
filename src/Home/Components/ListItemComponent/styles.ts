import {StyleSheet} from 'react-native';

import {colors} from '../../../Common/Constants/colors';
import {getHeight, getWidth} from '../../../Common/Helpers/Responsive';

export const styles = StyleSheet.create({
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
  },
  textNormal: {
    fontSize: getWidth(13),
    fontWeight: '400',
  },

  image: {
    borderWidth: 1,
    borderRadius: getWidth(5),
    borderColor: colors.borderBlue,
    width: getWidth(80),
    height: getWidth(80),
  },
});
