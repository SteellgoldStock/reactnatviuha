import React from 'react';
import { Button, Text } from 'react-native-paper';
import { CenteredLayout } from '../components/centered-layout';

const WelcomeScreen = ({ navigation }) => {
  return (
    <CenteredLayout>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
        Que faire ?
      </Text>

      <Button mode="contained" onPress={() => navigation.navigate('Login')}>Connexion</Button>
      <Button onPress={() => navigation.navigate('Register')}>Inscription</Button>
    </CenteredLayout>
  );
};

export default WelcomeScreen;