import React from 'react';
import {ColorValue} from 'react-native';
import Svg, {G, Path} from 'react-native-svg';

type SearchProps = {
  width: number | string;
  height: number | string;
  color: ColorValue;
  viewBox: string;
};

const Search = ({width, height, color, viewBox}: SearchProps) => {
  return (
    <Svg width={width} height={height} viewBox={viewBox}>
      <G>
        <G>
          <G>
            <Path
              d="M1085.823 302.871a6.176 6.176 0 116.176-6.176 6.183 6.183 0 01-6.176 6.176zm0-11.061a4.885 4.885 0 104.885 4.885 4.89 4.89 0 00-4.885-4.885z"
              transform="translate(-1079.647 -290.519) translate(1079.647 290.519) translate(-1079.647 -290.519)"
              fill={color}
            />
          </G>
        </G>
        <G>
          <G>
            <Path
              transform="translate(-1079.647 -290.519) translate(1089.335 300.207) rotate(-45 1.732 .718)"
              fill={color}
              d="M0 0H2.029V6.901H0z"
            />
          </G>
        </G>
      </G>
    </Svg>
  );
};

Search.defaultProps = {
  width: 15,
  height: 15,
  color: '#4ca7d4',
  viewBox: '0 0 15 15',
};

export default Search;
