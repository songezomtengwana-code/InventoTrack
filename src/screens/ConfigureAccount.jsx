import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { theme, windowHeight, windowWidth } from '../utils/theme'
import { Button, TextInput, Checkbox, Switch } from 'react-native-paper'
import LoadingComponent from '../components/LoadingComponent'
import { createstorageaccount, firebaseAuth } from '../services/firebase'
import { environments } from '../utils/environment'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'

export function ConfigureAccount() {

  const [name, setName] = React.useState('');
  const [address, setaddress] = React.useState('');
  const [type, setType] = React.useState('');
  const [agreement, setAgreement] = React.useState(false);
  const [disable, setDisable] = React.useState(true)
  const [size, setSize] = React.useState('')
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation()

  const handleAgreementSwitch = () => {
    setAgreement(!agreement)
    setDisable(!disable)
  }

  // const { name, password, email } = route.params

  const user = firebaseAuth.currentUser;

  const account = {
    id: user.uid,
    name: name,
    email: user.email,
    logo: '',
    businessName: name,
    businessAddress: address,
    bussinessType: type,
    businessSize: size,
    logs: [
      {
        inDate: Date().substring(0, 16),
        inTime: Date().substring(16, 21),
      }
    ],
    storageid: user.uid,
    staff: [],
    createAt: Date(),
    upadatedAt: Date(),
    stores: [
    ],
    inventories: [
      
    ]
  }

  function handleConfigureAccount() {
    if (!type || !size || !address || address.length < 10) {
      console.log('info is incomplete')
    } else {
      setLoading(true)
      createstorageaccount(account, navigation)
      setTimeout(() => {
        setLoading(false)
      }, 5000);
      console.log({ config: account })
    }
  }

  useEffect(() => {
    console.log(Date().substring(0, 21))
    setName(user.displayName)
  }, [])

  return (
    <>
      <ImageBackground
        source={{ uri: environments.background }}
        resizeMode="cover"
        height={windowHeight}
        width={windowWidth}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* {loading ? (
          <LoadingComponent text="Configuring Account ..." />
        ) : (
          <></>
        )} */}
        <View style={styles.card}>
          <Text style={styles.title}>Set Up Your Account</Text>
          <Text style={styles.subtitle}>Complete setting up your account to continue</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              value={user.email}
              label="Business Email"
              outlineColor={theme.primary}
              activeOutlineColor={theme.primary}
              mode="outlined"
              editable={false}
            />
            {user.displayName ? <TextInput
              style={styles.input}
              value={user.displayName}
              label="Business Name"
              outlineColor={theme.primary}
              activeOutlineColor={theme.primary}
              mode="outlined"
              editable={false}
            /> : <TextInput
              style={styles.input}
              value={name}
              label="Business Name"
              outlineColor={theme.primary}
              activeOutlineColor={theme.primary}
              mode="outlined"
              onChangeText={(text) => {
                setName(text)
              }}
            />}
            <TextInput
              style={styles.input}
              value={address}
              label="Business Address"
              outlineColor={theme.primary}
              activeOutlineColor={theme.primary}
              onChangeText={text => {
                setaddress(text);
              }}
              mode="outlined"
            />
            <TextInput
              style={styles.input}
              value={type}
              label="Business Type"
              outlineColor={theme.primary}
              activeOutlineColor={theme.primary}
              onChangeText={text => {
                setType(text);
              }}
              mode="outlined"
            />
            <TextInput
              style={styles.input}
              value={size}
              inputMode='numeric'
              keyboardType='numbers-and-punctuation'
              label="Business Size"
              outlineColor={theme.primary}
              activeOutlineColor={theme.primary}
              onChangeText={text => {
                setSize(text);
              }}
              mode="outlined"
            />
            <View>
              <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', marginBottom: 10 }}>
                <Switch value={agreement} onValueChange={handleAgreementSwitch} color={theme.primary} thumbColor={theme.primary} trackColor={theme.primary_faint} /><Text style={{ fontSize: 10, color: theme.text_dark }}>I have read and agree with the </Text><TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}><Text style={{ textDecorationColor: theme.primary, color: theme.primary, fontSize: 10, fontWeight: 'bold', textDecorationLine: 'underline' }}>Terms & Condtions</Text></TouchableOpacity>
              </View>
              <Button mode="contained" disabled={disable} buttonColor={theme.primary} style={styles.button} onPress={() => {
                handleConfigureAccount()
              }}>Complete</Button>
            </View>
          </View>
        </View>
      </ImageBackground>
    </>
  )
}

export default ConfigureAccount

const styles = StyleSheet.create({
  loading: {

  },
  card: {
    position: 'absolute',
    bottom: 25,
    left: 25,
    rirght: 25,
    backgroundColor: theme.background,
    padding: 25,
    borderRadius: 10,
    width: windowWidth - 50
  },
  container: {
    flexDirection: 'column',
    gap: 10,
    backgroundColor: theme.background,
    padding: 25,
  },
  logo: {
    height: 50,
    width: 50,
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: theme.text_dark
  },
  subtitle: {
    marginBottom: 25,
    color: theme.text_dark_faint,
    fontSize: 12
  },
  form: {},
  input: {
    marginBottom: 15
  },
  redirector: {},
  copyrights: {},
  button: {
    marginVertical: 10,
    borderRadius: 5
  }
})