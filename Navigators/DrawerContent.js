/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { View, StyleSheet } from "react-native";
import { Drawer } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const DrawerContent = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => <MaterialCommunityIcons name="earth" color={color} size={size} />}
              label="Global statistics"
              onPress={() => {
                props.navigation.navigate("globalStatsScreen");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => <MaterialCommunityIcons name="flag" color={color} size={size} />}
              label="Countries statistics"
              onPress={() => {
                props.navigation.navigate("countryStatsStack");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => <MaterialCommunityIcons name="heart" color={color} size={size} />}
              label="Favorites"
              onPress={() => {
                props.navigation.navigate("favouritesScreen");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  drawerSection: {
    marginTop: 15,
  },
});

export default DrawerContent;
