import React, { useState } from "react";
import { TextInput, Button, Text } from "react-native-paper";
import { FormLayout } from "../components/centered-layout";
import { AntDesign } from "@react-native-vector-icons/ant-design";
import { registerSchema } from "../schema/account";
import { View } from "react-native";

const RegisterForm = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleRegister = () => {
    const validated = registerSchema.safeParse({ firstName, lastName, email, password });
    if (!validated.success) {
      setErrors(validated.error.issues.reduce((acc, issue) => {
        acc[issue.path[0]] = issue.message;
        return acc;
      }, {}));

      setError(validated.error.issues[0].message);
    } else {
      console.log(validated.data);
      navigation.navigate("Home", {
        firstName: validated.data.firstName,
        lastName: validated.data.lastName
      });
    }
  }

  return (
    <FormLayout>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Inscription</Text>

      <View style={{ gap: 10 }}>
        <View style={{ gap: 10, flexDirection: 'row' }}>
          <TextInput
            label="Nom"
            value={firstName}
            onChangeText={setFirstName}
            mode="flat"
            style={{ flex: 1 }}
            error={errors.firstName}
          />

          <TextInput
            label="Prénom"
            value={lastName}
            onChangeText={setLastName}
            mode="flat"
            style={{ flex: 1 }}
            error={errors.lastName}
          />
        </View>

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="flat"
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />

        <TextInput
          label="Mot de passe"
          value={password}
          onChangeText={setPassword}
          mode="flat"
          secureTextEntry
          error={errors.password}
        />
        
        <Button mode="contained" onPress={handleRegister}>
          Inscription
        </Button>
      </View>

      {error !== "" && (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', color: 'red', padding: 10, textAlign: 'center', backgroundColor: '#f8d7da', marginTop: 10, gap: 2 }}>
          <AntDesign name="alert" size={13} color="red" />
          <Text style={{ color: 'red', textAlign: 'center' }}>
            {error}
          </Text>
        </View>
      )}

      <Text style={{ marginTop: 10, textAlign: 'center' }}>
        Vous avez déjà un compte ?{" "}
        <Text style={{ textDecorationLine: 'underline', color: '#7B1FA2' }} onPress={() => navigation.navigate("Login")}>
          Connectez-vous ici
        </Text>
      </Text>
    </FormLayout>
  );
}

export default RegisterForm;