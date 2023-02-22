import {Dimensions, Platform} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

export const {width, height} = Dimensions.get('screen');

export const isIphoneX = (): boolean => {
  const {width, height} = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    (height === 780 ||
      width === 780 ||
      height === 812 ||
      width === 812 ||
      height === 844 ||
      width === 844 ||
      height === 896 ||
      width === 896 ||
      height === 926 ||
      width === 926)
  );
};

export function heightPercentage(value: number) {
  const cc = isIphoneX() ? value : value + 1;
  return (height * cc) / 100;
}

export function widthPercentage(value: number) {
  return (width * value) / 100;
}

export const getWidth = (size: number) => {
  const percentage = (size * 100) / BASE_WIDTH;
  return wp(percentage);
};

export const getHeight = (size: number) => {
  const percentage = (size * 100) / BASE_HEIGHT;
  return hp(percentage);
};
