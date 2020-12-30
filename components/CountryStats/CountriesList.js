import React, { useEffect, useCallback, useContext } from "react";
import { FlatList, TouchableOpacity, View, Image, Text } from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";

import theme from "../../Theme";
import { GlobalContext } from "../../store/contexts/globalContext";
import { REFRESH_FAVORITES } from "../../store/actionTypes";

const {
  COLORS: { SECONDARY },
} = theme;

const CountriesList = ({ navigation, items }) => {
  const {
    state: { favourites },
    dispatch,
  } = useContext(GlobalContext);

  const setFavourites = useCallback(
    (favs) => {
      dispatch({ type: REFRESH_FAVORITES, payload: { items: favs } });
    },
    [dispatch]
  );

  const setStorageFavorites = useCallback(async () => {
    const itemsString = await AsyncStorage.getItem("favorites");
    if (itemsString) {
      setFavourites(JSON.parse(itemsString));
    }
  }, [setFavourites]);

  useEffect(() => {
    (async () => {
      await setStorageFavorites();
    })();
  }, [setStorageFavorites]);

  const renderItem = ({
    item: {
      countryInfo: { flag },
      country,
    },
    index,
  }) => {
    const setFavorites = async (item) => {
      const itemsString = await AsyncStorage.getItem("favorites");

      if (itemsString) {
        const parsedItems = JSON.parse(itemsString);

        const alreadyExists = parsedItems.findIndex((c) => c.countryInfo.flag === item.countryInfo.flag) !== -1;

        if (alreadyExists) {
          const filteredItems = parsedItems.filter((c) => c.countryInfo.flag !== item.countryInfo.flag);

          await AsyncStorage.setItem("favorites", JSON.stringify(filteredItems));
          setFavourites(filteredItems);
          return;
        }
        await AsyncStorage.setItem("favorites", JSON.stringify([...parsedItems, item]));
        setFavourites([...parsedItems, item]);
        return;
      }
      await AsyncStorage.setItem("favorites", JSON.stringify([item]));
      setFavourites([item]);
      await setStorageFavorites();
    };

    const isFavorite = favourites.findIndex((c) => c.countryInfo.flag === flag) !== -1;

    return (
      <View
        key={index}
        style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 8 }}
      >
        <View style={{ flexGrow: 1 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("countryStatsStack", { params: { flag }, screen: "stats" })}
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image source={{ uri: flag }} style={{ width: 60, height: 40 }} />
            <Text style={{ marginLeft: 4, fontSize: 20, flex: 0 }}>{country}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setFavorites(items.find((i) => i.countryInfo.flag === flag))}>
          <AntIcon color={SECONDARY} name={isFavorite ? "star" : "staro"} size={24} />
        </TouchableOpacity>
      </View>
    );
  };

  const ITEM_HEIGHT = 40;

  const getItemLayout = (data, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index });

  return (
    <FlatList
      getItemLayout={getItemLayout}
      data={items}
      keyExtractor={(item) => `${item.countryInfo.flag} - ${Date.now()}`}
      renderItem={renderItem}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={10}
      updateCellsBatchingPeriod={100}
    />
  );
};

export default CountriesList;
