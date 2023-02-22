import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import {Keyboard, Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Search from '../../../Common/Assets/SVGS/Search';
import {colors} from '../../../Common/Constants/colors';
import {styles} from './styles';

type SearchContainerProps = {
  onSearch?: (searchText: string | undefined) => void;
  onFilter?: () => void;
  searchText?: string;
  setSearchText?: (val: any) => void;
  searchFromParent?: boolean;

  showDivider?: boolean;
  showFilterButton?: boolean;
  filterText?: string;
  onChangeText?: any;
  placeholder: string;
};

export interface SearchContainerCompRef {
  clearSearchText: () => void;
}

const inputAccessoryViewID = 'uniqueID';

const SearchContainerComp: React.ForwardRefRenderFunction<
  SearchContainerCompRef,
  SearchContainerProps
> = (
  {
    onSearch = () => {},
    onFilter = () => {},

    showDivider = true,
    showFilterButton = true,
    searchText,
    searchFromParent,
    setSearchText,
    onChangeText,
    placeholder,
    filterText,
  },
  ref,
) => {
  const [searchValue, setSearchValue] = useState<string | undefined>('');
  //const [showAccessory, setShowAccessory] = useState(false);

  const inputRef = useRef<TextInput>();

  const initHandler = useCallback(function () {
    return {
      clearSearchText() {
        inputRef?.current?.clear();
        setSearchValue('');
      },
    };
  }, []);

  useImperativeHandle(ref, initHandler, [initHandler]);

  const handleSearch = useCallback(
    function () {
      onSearch(searchValue);
    },
    [onSearch, searchValue],
  );

  const onPressDone = useCallback(function () {
    Keyboard.dismiss();
  }, []);

  useEffect(() => {
    if (searchText === '' || searchText === undefined) {
      inputRef?.current?.clear();
    }
  }, [searchText]);

  const renderSearchLeftElement = useMemo(
    function () {
      return (
        <TouchableOpacity
          style={styles.searchIconContainer}
          onPress={handleSearch}>
          <Search
            width={16}
            height={16}
            viewBox="0 0 16 16"
            color={colors.liteBlack}
          />
        </TouchableOpacity>
      );
    },
    [handleSearch, styles.searchIconContainer],
  );

  const onSearchSubmit = useCallback(
    function (e: any) {
      onSearch?.(e.nativeEvent.text);
      searchFromParent && setSearchText
        ? setSearchText(e.nativeEvent.text ? e.nativeEvent.text : undefined)
        : setSearchValue(e.nativeEvent.text ? e.nativeEvent.text : undefined);
    },
    [onSearch, searchFromParent, setSearchText],
  );

  return (
    <View style={styles.inputsContainer}>
      <View style={styles.inputBox}>
        <TextInput
          placeholder={placeholder}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChangeText={onChangeText}
          inputAccessoryViewID={inputAccessoryViewID}
          returnKeyType="search"
          onSubmitEditing={onSearchSubmit}
        />
      </View>
      {showFilterButton && showDivider ? (
        <View style={styles.verticalLine} />
      ) : null}
      {showFilterButton ? (
        <View style={[styles.buttonContainer]}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={onFilter}>
            <Text style={styles.buttonText}>{'Filter'}</Text>
          </TouchableOpacity>
          {filterText && typeof +filterText === 'number' && +filterText > 0 ? (
            <View style={styles.numBox}>
              <Text style={styles.numText}>{filterText}</Text>
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

export const SearchContainer = React.forwardRef(SearchContainerComp);
