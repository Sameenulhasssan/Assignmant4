import { StyleSheet } from "react-native";
import theme from "./Theme";

const { COLORS } = theme;

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.SECONDARY,
  },
  headerScreenTitle: {
    marginLeft: 4,
    fontSize: 22,
  },
  headerLeft: {
    flex: 0,
  },
  headerBody: {
    flex: 1,
  },
});

export default styles;
