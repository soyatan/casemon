import {StyleSheet} from 'react-native';
import {colors} from '../../../Common/Constants/colors';
import {getHeight, getWidth} from '../../../Common/Helpers/Responsive';

export const styles = StyleSheet.create({
  inputsContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.white,
    paddingHorizontal: getWidth(15),
    paddingVertical: getHeight(10),
  },

  inputBox: {
    flex: 1,
  },
  searchIconContainer: {
    paddingHorizontal: 10,
    paddingVertical: 13,
  },
  verticalLine: {
    width: 1,
    height: '90%',
    marginHorizontal: 13,
    backgroundColor: colors.grayishBlue,
    alignSelf: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.silver,
  },
  buttonText: {
    fontSize: getHeight(12),
    fontFamily: 'bold',
    fontWeight: 'bold',
    color: colors.black,
    alignSelf: 'center',
    marginLeft: 5,
  },
  textBlue: {
    fontSize: getHeight(15),
    fontFamily: 'bold',
    fontWeight: 'bold',
    color: colors.blue,
  },
  numBox: {
    position: 'absolute',
    top: -3,
    right: -5,
    width: 17,
    height: 17,
    borderRadius: 10,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numText: {
    fontSize: getHeight(12),
    fontWeight: '500',
    bottom: 2,
    color: colors.white,
  },
});
