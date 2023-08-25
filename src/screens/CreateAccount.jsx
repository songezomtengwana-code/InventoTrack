import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import React, { useEffect } from 'react';
import { environments } from '../utils/environment';
import { TextInput, Checkbox, Button, Portal } from 'react-native-paper';
import { theme, windowHeight, windowWidth } from '../utils/theme';
import { createaccount, is_logged_in } from '../services/firebase';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CreateAccount = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [agreement, setAgreement] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const navigation = useNavigation();

  async function handleCreateAccount() {
    setLoading(true)
    createaccount(email, password, name, navigation);
    setTimeout(() => {
      setLoading(false)
    }, 15000)
  }

  useEffect(() => {
    is_logged_in(navigation)
  }, [])

  return (
    <>
      <ImageBackground
        source={{ uri: environments.pexels_inventory }}
        resizeMode="cover"
        height={windowHeight}
        width={windowWidth}
        style={{ flex: 1, justifyContent: 'center' }}>
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator />
          </View>
        ) : (
          <></>
        )}
        <View style={styles.card}>
          <Image source={require('../images/logo_light.png')} style={styles.logo} />
          <Text style={styles.title}>Create New Account</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              value={name}
              label="Business Name"
              outlineColor={theme.primary}
              activeOutlineColor={theme.primary}
              onChangeText={text => {
                setName(text);
              }}
              mode="outlined"
            />
            <TextInput
              style={styles.input}
              value={email}
              label="Business Email"
              outlineColor={theme.primary}
              activeOutlineColor={theme.primary}
              onChangeText={text => {
                setEmail(text);
              }}
              mode="outlined"
            />
            <TextInput
              style={styles.input}
              value={password}
              label="Password"
              outlineColor={theme.primary}
              activeOutlineColor={theme.primary}
              onChangeText={text => {
                setPassword(text);
              }}
              mode="outlined"
              secureTextEntry
            />
            <Button mode="contained" style={styles.button} buttonColor={theme.primary} onPress={() => { handleCreateAccount() }}>Create Account</Button>
            <View style={{ gap: 5, marginBottom: 10 }}>
              <Text style={{ fontSize: 10, color: theme.text_dark }}>By clicking create account you adhere that you have read and agree with the </Text><TouchableOpacity><Text style={{ textDecorationColor: theme.primary, color: theme.primary, fontSize: 10, fontWeight: 'bold', textDecorationLine: 'underline' }}>Terms & Condtions</Text></TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => {
              navigation.navigate('signin')
            }}>
              <Text style={styles.redirector}>Aready Have An Account ? Sign In</Text>
            </TouchableOpacity>
            <Text style={styles.copyrights}>{environments.signiture}</Text>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  loading: {},
  card: {
    position: 'absolute',
    bottom: 25,
    left: 25,
    rirght: 25,
    backgroundColor: theme.background,
    padding: 25,
    width: windowWidth - 50,
    borderRadius: 10,
  },
  container: {
    flexDirection: 'column',
    gap: 10,
  },
  logo: {
    height: 75,
    width: 75,
    marginBottom: 15
  },
  title: {
    fontWeight: 'bold',
    color: theme.text_dark,
    fontSize: 22,
    marginBottom: 25
  },
  form: {
    flexDirection: 'column',
    gap: 12.5,
    marginBottom: 20
  },
  redirector: {
    textAlign: 'center',
    color: theme.primary,
    textDecorationColor: theme.primary,
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
  copyrights: {
    marginTop: 10,
    fontSize: 5,
    color: theme.text_dark,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  button: {
    marginTop: 15,
    borderRadius: 5,
    alignItems: 'center',
    padding: 5
  }
});
