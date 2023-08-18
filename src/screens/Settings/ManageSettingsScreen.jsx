import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db, firebaseAuth, getAccount } from '../../services/firebase'
import { TextInput } from 'react-native-gesture-handler'
import { theme } from '../../utils/theme'

export default function ManageSettingsScreen() {
  const [business, setBusiness] = useState([])

  const get = () => {
    db.collection('clients').doc(firebaseAuth.currentUser.uid).get().then((documentSnapshot) => {
      if (documentSnapshot.exists) {
        const activeBusinessAccount = documentSnapshot.data()
        setBusiness(activeBusinessAccount)
      }
    })
  }

  useEffect(() => {
    get()
  }, [business])

  return (
    <View style={styles.container}>
      <FlatList
        data={business}
        renderItem={({ client }) =>
          <View>
            <TextInput
              style={styles.input}
              mode='outlined'
              outlineColor={theme.primary}
              activeOutlineColor={theme.primary}
              value={client.businessName}
              label="Current Quantity"
            />
            <TextInput
              style={styles.input}
              mode='outlined'
              outlineColor={theme.primary}
              activeOutlineColor={theme.primary}
              value={client.businessAddress}
              label="Current Quantity"
            />
          </View>
        }
        keyExtractor={client => client.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({})