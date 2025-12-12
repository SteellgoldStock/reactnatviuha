import { View } from "react-native";

export const CenteredLayout = ({ children }) => {
  return <View style={{ flex: 1, justifyContent: "center", padding: 30, backgroundColor: "#fff" }}>{children}</View>
};

export const FormLayout = ({ children }) => {
  return (
    <CenteredLayout>
      <View style={{
        gap: 10,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        padding: 20,
      }}>
        {children}
      </View>
    </CenteredLayout>
  )
};