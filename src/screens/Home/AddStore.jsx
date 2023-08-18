import { Alert, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput, Portal, Dialog, MD3LightTheme as DefaultTheme, Provider } from 'react-native-paper'
import { alertLightMode, theme, windowHeight, windowWidth } from '../../utils/theme';
import LoadingComponent from '../../components/LoadingComponent';
import { configure_store, firebaseAuth, uuid } from '../../services/firebase';
import { useNavigation } from '@react-navigation/native';
import { environments } from '../../utils/environment';
import { currentLocation } from '../../services/LocationService';

// icons
import ShopIcon from 'react-native-bootstrap-icons/icons/shop'
import { createNewStore } from '../../services/StoresServices';

export default function AddStore() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [number, setNumber] = useState('');
  const [disabled, setDisable] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [visible, setVisble] = useState(false)

  const dialogTheme = {
    ...DefaultTheme
  }

  const navigation = useNavigation()

  const config = {
    id: uuid(),
    name: name,
    location: address,
    city: city,
    state: state,
    country: country,
    geoLocation: {},
    inventory: []
  };

  const add_store = async () => {
    if (!name || !address || !city || !state || !country || !number) {
      setVisble(true)
    } else {
      setIsLoading(true)
      createNewStore(config, navigation)
      setTimeout(() => {
        setIsLoading(false)
      }, 10000);
    }
  }

  React.useEffect(() => {
  }, [])

  return (
    <Provider>
      <ScrollView>
        {isLoading ? <LoadingComponent text='Creating A New Store...' /> : <></>}
        <View style={styles.header}>
          <ImageBackground
            source={{ uri: environments.background_3 }}
            resizeMode="cover"
            height={windowHeight}
            width={windowWidth}
            style={{ flex: 1, justifyContent: 'center' }}
          >
            <View style={{ backgroundColor: '#00000000', justifyContent: 'center', flexDirection: 'row', gap: 10, padding: 15, height: 200, alignItems: 'center' }}>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.view}>
          <TextInput
            style={styles.input}
            mode='outlined'
            outlineColor={theme.primary}
            activeOutlineColor={theme.primary}
            value={name}
            label='Branch Name'
            onChangeText={(text) => { setName(text) }}
          />
          <TextInput
            style={styles.input}
            mode='outlined'
            outlineColor={theme.primary}
            activeOutlineColor={theme.primary}
            label='Address'
            value={address}
            onChangeText={(text) => { setAddress(text) }}
          />
          <TextInput
            style={styles.input}
            mode='outlined'
            outlineColor={theme.primary}
            activeOutlineColor={theme.primary}
            label='City'
            value={city}
            onChangeText={(text) => { setCity(text) }}
          />
          <TextInput
            style={styles.input}
            mode='outlined'
            outlineColor={theme.primary}
            activeOutlineColor={theme.primary}
            label='State / Province'
            value={state}
            onChangeText={(text) => { setState(text) }}
          />
          <TextInput
            style={styles.input}
            mode='outlined'
            outlineColor={theme.primary}
            activeOutlineColor={theme.primary}
            label='Country'
            value={country}
            onChangeText={(text) => { setCountry(text) }}
          />
          <TextInput
            style={styles.input}
            mode='outlined'
            outlineColor={theme.primary}
            activeOutlineColor={theme.primary}
            label='Contact Number'
            value={number}
            inputMode='numeric'
            onChangeText={(text) => { setNumber(text) }}
          />
          <Pressable onPress={add_store}        >
            {
              disabled ? <Button style={styles.submit_disabled} textColor={theme.text_light} buttonColor={theme.primary} >Submit</Button> : <Button style={styles.submit} textColor={theme.text_light} buttonColor={theme.primary} onPress={add_store} >Submit</Button>
            }
          </Pressable>
          <Pressable onPress={() => { navigation.navigate('stores') }} style={styles.stores}>
            <ShopIcon fill={theme.text_dark} />
            <Text style={styles.stores_text}>View Available Stores</Text>
          </Pressable>
        </View>


        <Portal theme={dialogTheme} style={{ height: windowHeight }}>
          <Dialog visible={visible} onDismiss={() => { setVisble(false) }} style={alertLightMode}>
            <Dialog.Title>Empty Field</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium" style={{ color: theme.text_dark }}>Please make sure you fill in all the fields </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => { setVisble(false) }} textColor={theme.text_dark}>Done</Button>
            </Dialog.Actions>
          </Dialog>

          {/* MODAL CONTENTS */}

        </Portal>
      </ScrollView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  view: {
    minHeight: windowHeight - 25,
    padding: 25
  },
  title: {
    marginVertical: 15,
    fontSize: 18,
    fontWeight: '600',
    color: theme.text_dark,
    textAlign: 'center'
  },
  input: {
    backgroundColor: theme.background,
    marginBottom: 18,
    color: theme.black
  },
  submit: {
    marginVertical: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5
  },
  submit_disabled: {
    marginVertical: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#c1c1c1'
  },
  header: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    height: 150,
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden'
  },
  stores: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.text_dark,
    gap: 10,
    flexDirection: 'row',
    borderRadius: 5,
    marginTop: 20
  },
  stores_text: {
    color: theme.text_dark,
    fontWeight: '400'
  }
})
