import React, { useState } from "react";
import { TextInput, Button, Text, ActivityIndicator } from "react-native-paper";
import { FormLayout } from "../components/centered-layout";
import { AntDesign } from "@react-native-vector-icons/ant-design";
import { registerSchema } from "../schema/account";
import { View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { createUser, findUserByEmail } from "../services/database";
import { hashPassword } from "../services/auth";

const RegisterForm = ({ navigation }) => {
  const db = useSQLiteContext();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    setError("");
    setErrors({ firstName: "", lastName: "", email: "", password: "" });

    const validated = registerSchema.safeParse({ firstName, lastName, email, password });
    if (!validated.success) {
      setErrors(validated.error.issues.reduce((acc, issue) => {
        acc[issue.path[0]] = issue.message;
        return acc;
      }, {}));

      setError(validated.error.issues[0].message);
      return;
    }

    setLoading(true);

    try {
      const existingUser = await findUserByEmail(db, email.toLowerCase());
      if (existingUser) {
        setError("Un compte avec cet email existe deja");
        setLoading(false);
        return;
      }

      const hashedPassword = await hashPassword(password);
      await createUser(db, {
        firstName: validated.data.firstName,
        lastName: validated.data.lastName,
        email: validated.data.email.toLowerCase(),
        password: hashedPassword,
      });

      navigation.navigate("Home", {
        firstName: validated.data.firstName,
        lastName: validated.data.lastName,
      });
    } catch (err) {
      console.error("Registration error:", err);
      setError("Erreur lors de l'inscription. Veuillez reessayer.");
    } finally {
      setLoading(false);
    }
  };

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
            error={!!errors.firstName}
            disabled={loading}
          />

          <TextInput
            label="Prenom"
            value={lastName}
            onChangeText={setLastName}
            mode="flat"
            style={{ flex: 1 }}
            error={!!errors.lastName}
            disabled={loading}
          />
        </View>

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="flat"
          keyboardType="email-address"
          autoCapitalize="none"
          error={!!errors.email}
          disabled={loading}
        />

        <TextInput
          label="Mot de passe"
          value={password}
          onChangeText={setPassword}
          mode="flat"
          secureTextEntry
          error={!!errors.password}
          disabled={loading}
        />
        
        <Button mode="contained" onPress={handleRegister} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" size="small" /> : "Inscription"}
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