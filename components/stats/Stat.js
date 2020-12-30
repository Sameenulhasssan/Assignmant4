import React from "react";
import { View, Text } from "react-native";

const Stat = ({ total, value, label, color, percentageLabel }) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: color,
        borderStyle: "solid",
        padding: 8,
        marginVertical: 8,
      }}
    >
      <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{ color, fontSize: 20 }}>{label}</Text>
        <Text style={{ color, fontSize: 20 }}>{value}</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 4,
        }}
      >
        <Text style={{ color }}>Percentage</Text>
        <Text style={{ color }}>{`${((value / total) * 100).toFixed(3)}% ${percentageLabel}`}</Text>
      </View>
    </View>
  );
};

export default Stat;
