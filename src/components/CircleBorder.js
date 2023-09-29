import { View } from "react-native";

const CircleBorder = ({ size, borderWidth, borderColor, children }) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderColor,
      borderWidth,
      textAlign: "center",
    }}
  >
    {children}
  </View>
);

export default CircleBorder;
