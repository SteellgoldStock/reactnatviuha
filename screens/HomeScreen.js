import React from "react";
import { Button, Text } from "react-native-paper";
import { CenteredLayout } from "../components/centered-layout";

const HomeScreen = ({ route, navigation }) => {
  const { firstName, lastName } = route.params;

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Welcome" }],
    });
  };

  return (
    <CenteredLayout>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 7, textAlign: 'center' }}>Vous êtes connecté</Text>

      <Text style={{ fontSize: 16, marginBottom: 20, textAlign: 'center' }}>
        Bienvenue <Text style={{ fontWeight: 'bold' }}>{firstName} {lastName.slice(0, 1).toUpperCase()}.</Text>{" "}
        sur notre application
      </Text>

      <Button mode="contained" onPress={handleLogout}>
        Déconnexion
      </Button>
    </CenteredLayout>
  );
};

export default HomeScreen;