import AsyncStorage from "@react-native-async-storage/async-storage";

export const getGlobalInfo = (state, action) => ({
  ...state,
  globalInfo: action.payload,
});

export const getCountriesInfo = (state, action) => ({
  ...state,
  countriesInfo: action.payload,
});

export const handleFavourite = async (state, action) => {
  const { flag } = action.payload;
  const { favourites } = state;
  const isFav = favourites.findIndex((country) => country.countryInfo.flag === flag) !== -1;

  if (isFav) {
    await AsyncStorage.setItem(
      "favorites",
      JSON.stringify(favourites.filter((country) => country.countryInfo.flag !== flag))
    );
    return {
      ...state,
      favourites: favourites.filter((country) => country.countryInfo.flag !== flag),
    };
  }

  await AsyncStorage.setItem(
    "favorites",
    JSON.stringify([...favourites, state.countriesInfo.find((country) => country.countryInfo.flag === flag)])
  );
  return {
    ...state,
    favourites: [...favourites, state.countriesInfo.find((country) => country.countryInfo.flag === flag)],
  };
};

export const refreshFavorites = (state, action) => {
  const { items } = action.payload;

  return { ...state, favourites: items };
};
