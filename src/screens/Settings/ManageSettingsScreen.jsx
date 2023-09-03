import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db, firebaseAuth, getAccount } from '../../services/firebase'

import { theme } from '../../utils/theme'
import { Appbar, Button, Modal, PaperProvider, Portal, TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

export default function ManageSettingsScreen() {
  const navigation = useNavigation()
  const [business, setBusiness] = useState([])
  const [visible, setVisible] = useState(false)
  const [deletePrompt, setDeletePrompt] = useState([])

  const get = () => {
    db.collection('clients').doc(firebaseAuth.currentUser.uid).get().then((documentSnapshot) => {
      if (documentSnapshot.exists) {
        const activeBusinessAccount = documentSnapshot.data()
        setBusiness(activeBusinessAccount)
      }
    })
  }

  const hideModal = () => {
    setVisible(false)
  }

  const openModal = () => {
    setVisible(true)
  }

  const handleDeleteAccount = () => {
    if (deletePrompt === business.email) {
      console.log('shid these niggas serious');
    } else {
      console.log('quit playin wit me');
    }
  }

  useEffect(() => {
    get()
  }, [business])

  const containerStyle = { backgroundColor: '#ffffff', paddingVertical: 30, paddingHorizontal: 25, margin: 25, borderRadius: 10 };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Profile Details</Text>
        <View>
          <TextInput
            style={styles.input}
            placeholderTextColor={theme.text_dark}
            mode='flat'
            underlineColor={theme.primary}
            textColor={theme.primary}
            activeUnderlineColor={theme.primary}
            underlineColorAndroid={theme.primary}
            value={business.businessName}
            editable={false}
            label="Business Name"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={theme.text_dark}
            mode='flat'
            underlineColor={theme.primary}
            textColor={theme.primary}
            activeUnderlineColor={theme.primary}
            underlineColorAndroid={theme.primary}
            value={business.businessAddress}
            editable={false}
            label="Business Address"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={theme.text_dark}
            mode='flat'
            underlineColor={theme.primary}
            textColor={theme.primary}
            activeUnderlineColor={theme.primary}
            underlineColorAndroid={theme.primary}
            value={business.email}
            editable={false}
            label="Business Email"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={theme.text_dark}
            mode='flat'
            underlineColor={theme.primary}
            textColor={theme.primary}
            activeUnderlineColor={theme.primary}
            underlineColorAndroid={theme.primary}
            value={business.bussinessType}
            editable={false}
            label="Business Type"
          />
        </View>
        <View style={styles.section}>
          <Text style={[styles.title, { color: theme.secondary }]}>Delete Account</Text>
          <Text style={styles.text}>You are free to delete your Account at any time. ZOFS InventoTrack reserves the right to delete your Account if it has been inactive for more than 365 calendar days. Notice will be provided to the registered e-mail address at least 14 days prior to deletion.</Text>
          <Button style={styles.delete_button} textColor={theme.background} buttonColor={theme.secondary} onPress={openModal}>Delete Account</Button>
        </View>
        <Portal >
          <Modal animationType={'fade'} visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: theme.secondary }}>Delete Account</Text>
            <Text style={{ marginBottom: 15, color: theme.primary }}>Please type in <Text style={{ fontWeight: 'bold', marginHorizontal: 2.5 }}>{business.email}</Text> in the text area and press confirm to delete a your account permanantly</Text>
            <TextInput
              style={[styles.input, { height: 55 }]}
              placeholderTextColor={theme.text_dark}
              mode='flat'
              underlineColor={theme.secondary}
              textColor={theme.secondary}
              activeUnderlineColor={theme.secondary}
              underlineColorAndroid={theme.secondary}
              value={deletePrompt}
              onChangeText={(text) => { setDeletePrompt(text) }}
            />
            <Button style={styles.delete_button} buttonColor={theme.secondary} textColor={theme.background} onPress={handleDeleteAccount} >Confirm</Button>
          </Modal>
        </Portal>
      </View>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  title: {
    color: theme.text_dark,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10
  },
  input: {
    color: theme.primary,
    marginBottom: 15,
    backgroundColor: theme.light,
    height: 65
  },
  text: {
    color: theme.primary,
  },
  container: {
    padding: 25,
    flexDirection: 'column',
    gap: 20
  },
  delete_button: {
    padding: 5,
    borderRadius: 5,
    marginVertical: 15
  }
})