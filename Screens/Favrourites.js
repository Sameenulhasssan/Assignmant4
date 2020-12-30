import React, { useEffect, useContext, useCallback } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GlobalContext } from "../store/contexts/globalContext";
import { REFRESH_FAVORITES } from "../store/actionTypes";
import CustomHeader from "../components/shared/Header";
import CountriesList from "../components/CountryStats/CountriesList";

const FavouritesScreen = ({ navigation }) => {
  const {
    state: { favourites: favorites },
    dispatch,
  } = useContext(GlobalContext);

  const setFavorites = useCallback(
    (favs) => {
      dispatch({ type: REFRESH_FAVORITES, payload: { items: favs } });
    },
    [dispatch]
  );

  useEffect(() => {
    const getStorageItems = async () => {
      const item = await AsyncStorage.getItem("favorites");
      setFavorites(JSON.parse(item));
    };
    getStorageItems();
  }, [setFavorites]);

  return (
    <View>
      <CustomHeader screenTitle="Favourites" onPress={() => navigation.openDrawer()} />
      <View style={{ marginHorizontal: 8 }}>
        <CountriesList items={favorites} navigation={navigation} />
      </View>
    </View>
  );
};

export default FavouritesScreen;
