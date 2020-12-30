import React, { useContext } from "react";
import { View } from "native-base";
import { ScrollView } from "react-native";

import CustomHeader from "../components/shared/Header";
import Stats from "../components/stats/Stats";
import { GlobalContext } from "../store/contexts/globalContext";

const GlobalStatsScreen = ({ navigation }) => {
  const {
    state: {
      globalInfo: { cases, critical, deaths, recovered, updated, population },
    },
  } = useContext(GlobalContext);

  return (
    <ScrollView>
      <CustomHeader screenTitle="Global Stats" onPress={navigation.openDrawer} />
      <View style={{ paddingHorizontal: 8 }}>
        <Stats
          cases={cases}
          critical={critical}
          deaths={deaths}
          recovered={recovered}
          updated={updated}
          population={population}
        />
      </View>
    </ScrollView>
  );
};

export default GlobalStatsScreen;
