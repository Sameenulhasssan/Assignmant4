import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import { ActivityIndicator } from "react-native-paper";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Alert } from "react-native";
import axios from "axios";

import DrawerContent from "./Navigators/DrawerContent";
import FavouritesScreen from "./Screens/Favrourites";
import CountryStatsStack from "./Screens/CountryStats";
import GlobalStatsScreen from "./Screens/GlobalStats";
import { GlobalContextProvider } from "./store/contexts/globalContext";
import { reducer as globalReducer, initialState as globalInitialState } from "./store/reducers/globalReducer";
import { GET_COUNTRIES_INFO, GET_GLOBAL_INFO } from "./store/actionTypes";

const SERVER_BASE_URL = "https://disease.sh/v3/covid-19";

const Drawer = createDrawerNavigator();
const { useEffect, useState, useReducer } = React;

function App() {
  const [loadingAssets, setLoadingAssets] = useState(true);

  const [globalState, globalDispatch] = useReducer(globalReducer, globalInitialState);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Roboto: require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
        Roboto_medium: require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
      });
      setLoadingAssets(false);
    };
    loadFonts();
  }, []);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const { data: globalInfo } = await axios.get(`${SERVER_BASE_URL}/all`);
        globalDispatch({
          type: GET_GLOBAL_INFO,
          payload: globalInfo,
        });

        const { data: countriesInfo } = await axios.get(`${SERVER_BASE_URL}/countries`);
        globalDispatch({ type: GET_COUNTRIES_INFO, payload: countriesInfo });
      };
      fetchData();
    } catch (e) {
      Alert.alert("Error", "Something went wrong", [{ text: "OK" }], { cancelable: true });
    }
  }, []);

  if (loadingAssets)
    return (
      <View style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color="#009cf5" size="large" />
      </View>
    );

  return (
    <NavigationContainer>
      <GlobalContextProvider value={{ state: globalState, dispatch: globalDispatch }}>
        <Drawer.Navigator
          screenOptions={{ header: (props) => <View {...props} headerShown={false} /> }}
          drawerContent={(props) => <DrawerContent {...props} />}
        >
          <Drawer.Screen name="globalStatsScreen" component={GlobalStatsScreen} />
          <Drawer.Screen name="countryStatsStack" component={CountryStatsStack} />
          <Drawer.Screen name="favouritesScreen" component={FavouritesScreen} />
        </Drawer.Navigator>
      </GlobalContextProvider>
    </NavigationContainer>
  );
}

export default App;
