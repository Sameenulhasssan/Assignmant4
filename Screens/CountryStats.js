import React, { useContext, useState } from "react";
import { Container, Input, View } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";

import StatsScreen from "./StatsScreen";
import Header from "../components/shared/Header";
import { GlobalContext } from "../store/contexts/globalContext";
import theme from "../Theme";
import CountriesList from "../components/CountryStats/CountriesList";

const {
  COLORS: { SECONDARY },
} = theme;

const RootStack = createStackNavigator();

export const CountryStatsScreen = ({ navigation }) => {
  const {
    state: { countriesInfo },
  } = useContext(GlobalContext);

  const [filter, setFilter] = useState("");

  return (
    <Container>
      <Header onPress={() => navigation.openDrawer()} screenTitle="Country stats" />
      <View style={{ margin: 8, flex: 1 }}>
        <View style={{ height: 48, marginBottom: 8 }}>
          <Input
            style={{ borderWidth: 1, borderColor: SECONDARY }}
            value={filter}
            onChangeText={setFilter}
            placeholder="Search by name of country"
          />
        </View>
        {countriesInfo.length > 0 && (
          <CountriesList
            items={countriesInfo.filter(({ country }) => country.toLowerCase().includes(filter.toLowerCase()))}
            navigation={navigation}
          />
        )}
      </View>
    </Container>
  );
};

const CountryStatsStack = () => (
  <RootStack.Navigator headerMode="none" initialRouteName="countryStatsScreen">
    <RootStack.Screen name="countryStatsScreen" component={CountryStatsScreen} />
    <RootStack.Screen name="stats" component={StatsScreen} />
  </RootStack.Navigator>
);

export default CountryStatsStack;
