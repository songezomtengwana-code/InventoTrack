import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable
} from 'react-native';
import React, { useEffect } from 'react';
import { environments } from '../utils/environment';
import { TextInput, Button } from 'react-native-paper';
import { theme, windowHeight, windowWidth } from '../utils/theme';
import LoadingComponent from '../components/LoadingComponent';
import { is_logged_in, signin } from '../services/firebase';
import { useNavigation } from '@react-navigation/native'

const SignIn = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const navigation = useNavigation();

  function signinUser() {
    setLoading(true);
    signin(email, password, navigation);
    setTimeout(() => {
      setLoading(false)
    }, 15000);
  }

  useEffect(() => {
    is_logged_in(navigation)
  }, [])

  return (
    <ImageBackground
      source={{ uri: environments.pexels_inventory }}
      resizeMode="cover"
      height={windowHeight}
      width={windowWidth}
      style={{ flex: 1, justifyContent: 'center' }}>
      {loading ? (
        <LoadingComponent text="Signing In ..." />
      ) : (
        <></>
      )}
      <View style={styles.card}>
        <Image source={require('../images/logo_light.png')} style={styles.logo} />
        <Text style={styles.title}>Welcome Back</Text>
        <View style={styles.form}>
          <TextInput
            value={email}
            label="Business Email"
            outlineColor={theme.primary_light}
            activeOutlineColor={theme.primary}
            onChangeText={text => {
              setEmail(text);
            }}
            mode="outlined"
          />
          <TextInput
            value={password}
            label="Password"
            outlineColor={theme.primary_light}
            activeOutlineColor={theme.primary}
            onChangeText={text => {
              setPassword(text);
            }}
            mode="outlined"
            secureTextEntry
          />
          <Pressable android_ripple={{ color: theme.grey }} style={styles.submit} onPress={() => { signinUser() }} >
            <Text style={{ color: theme.background }}>Sign In</Text>
          </Pressable>
          {/* <Button buttonColor={theme.primary} textColor={theme.text_light} style={styles.button}> Sign In </Button> */}
          <TouchableOpacity onPress={() => {
            navigation.navigate('create')
          }}>
            <Text style={styles.redirector}>Don't Have An Account ? Create One</Text>
          </TouchableOpacity>
          <Text style={styles.copyrights}>{environments.signiture}</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  loading: {},
  card: {
    position: 'absolute',
    bottom: 25,
    left: 25,
    rirght: 25,
    width: windowWidth - 50,
    backgroundColor: theme.background,
    padding: 25,
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
  },
  submit: {
    marginVertical: 10,
    alignItems: 'center',
    padding: 20,
    backgroundColor: theme.primary,
    borderRadius: 5
  }
});
