import React, { useContext } from "react";
import { View } from "native-base";
import { Image, ScrollView } from "react-native";

import CustomHeader from "../components/shared/Header";
import { GlobalContext } from "../store/contexts/globalContext";
import Stats from "../components/stats/Stats";

const StatsScreen = ({ navigation, route }) => {
  const {
    state: { countriesInfo },
  } = useContext(GlobalContext);

  const country = countriesInfo.find((c) => c.countryInfo.flag === route?.params?.flag);

  return (
    <ScrollView>
      <CustomHeader screenTitle="Stats" onPress={navigation.goBack} iconName="ios-arrow-dropleft" />
      <View style={{ paddingHorizontal: 8 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            width={200}
            height={150}
            source={{ uri: country?.countryInfo?.flag }}
            style={{ marginVertical: 8, width: 200, height: 150 }}
          />
        </View>
        <Stats {...country} />
      </View>
    </ScrollView>
  );
};

export default StatsScreen;
