import React from "react";
import { TouchableOpacity } from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";

import theme from "../../Theme";

const {
  COLORS: { SECONDARY },
} = theme;

const FavoriteButton = ({ onPress, isFavorite }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <AntIcon color={SECONDARY} name={isFavorite ? "star" : "staro"} size={24} />
    </TouchableOpacity>
  );
};

export default FavoriteButton;
