import React, { useState } from "react";
import { TextInput, Button, Text } from "react-native-paper";
import { FormLayout } from "../components/centered-layout";
import { View } from "react-native";
import { loginSchema } from "../schema/account";
import { AntDesign } from "@react-native-vector-icons/ant-design";


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    const validated = loginSchema.safeParse({ email, password });
    if (!validated.success) {
      
      setErrors(validated.error.issues.reduce((acc, issue) => {
        acc[issue.path[0]] = issue.message;
        return acc;
      }, {}));
      
      setError(validated.error.issues[0].message);
    } else {
      navigation.navigate("Home", {
        nom: "John",
        prenom: "Doe"
      });
    }
  };

  return (
    <FormLayout>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" }}>Connexion</Text>

      <View style={{ gap: 10 }}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="flat"
          error={errors.email}
          keyboardType="email-address"
        />

        <TextInput
          label="Mot de passe"
          value={password}
          onChangeText={setPassword}
          mode="flat"
          secureTextEntry
          error={errors.password}
        />
        
        <Button mode="contained" onPress={handleLogin}>Connexion</Button>
      </View>

      
      {error !== "" && (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", color: "red", padding: 10, textAlign: "center", backgroundColor: "#f8d7da", marginTop: 10, gap: 2 }}>
          <AntDesign name="alert" size={13} color="red" />
          <Text style={{ color: "red", textAlign: "center" }}>
            {error}
          </Text>
        </View>
      )}

      <Text style={{ marginTop: 10, textAlign: "center" }}>
        Vous n&apos;avez pas de compte ? <Text style={{ textDecorationLine: "underline", color: "#7B1FA2" }} onPress={() => navigation.navigate("Register")}>S&apos;inscrire</Text>
      </Text>
    </FormLayout>
  );
};

export default LoginScreen;