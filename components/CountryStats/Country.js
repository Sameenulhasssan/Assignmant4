import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

const Country = function ({ flag, country, onPress }) {
  return (
    <View onPress={onPress} style={{ flexGrow: 1 }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image source={{ uri: flag }} style={{ width: 60, height: 40 }} />
        <Text style={{ marginLeft: 4, fontSize: 20, flex: 0 }}>{country}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Country;
