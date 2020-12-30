import React from "react";
import { View, Text, Content } from "native-base";

import Stat from "./Stat";
import theme from "../../Theme";

const {
  COLORS: { DANGER, SUCCESS, WARNING, DEFAULT },
} = theme;

const Stats = ({ cases, population, recovered, critical, deaths, updated }) => {
  return (
    <Content>
      <Stat
        value={cases}
        label="Total cases"
        total={population}
        color={DANGER}
        percentageLabel={`of total pupulation(${population}) are infected`}
      />
      <Stat
        value={recovered}
        label="Recovered"
        total={cases}
        color={SUCCESS}
        percentageLabel="of total cases are recovered"
      />
      <Stat value={critical} label="Critical" total={cases} color={WARNING} percentageLabel="of total cases are critical" />
      <Stat value={deaths} label="Deaths" total={cases} color={DANGER} percentageLabel="of total cases are dead" />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 16,
          paddingTop: 16,
          borderTopColor: DEFAULT,
          borderTopWidth: 1,
        }}
      >
        <Text>Last updated at</Text>
        <Text>{`${new Date(updated).toLocaleDateString()} ${new Date(updated).toLocaleTimeString()}`}</Text>
      </View>
    </Content>
  );
};

export default Stats;
