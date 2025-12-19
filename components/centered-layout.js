import { View, KeyboardAvoidingView, ScrollView, Platform } from "react-native";

export const CenteredLayout = ({ children }) => {
  return <View style={{ flex: 1, justifyContent: "center", padding: 30, backgroundColor: "#fff" }}>{children}</View>
};

export const FormLayout = ({ children }) => {
  return (
    <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 30 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{
          gap: 10,
          borderRadius: 30,
          borderWidth: 1,
          borderColor: "#e0e0e0",
          padding: 20,
        }}>
          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
};