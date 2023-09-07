import { FlatList, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PlusCircleIcon from 'react-native-bootstrap-icons/icons/plus-circle-fill'
import PinIcon from 'react-native-bootstrap-icons/icons/map-fill'
import Globe from 'react-native-bootstrap-icons/icons/globe'
import { theme, windowHeight, windowWidth } from '../utils/theme'
import { db, firebaseAuth, get_stores } from '../services/firebase'
import { environments } from '../utils/environment'
import { useNavigation } from '@react-navigation/native'
import { ActivityIndicator, Button } from 'react-native-paper'
import BoxSeam from 'react-native-bootstrap-icons/icons/box-seam'
import CaretRightFill from 'react-native-bootstrap-icons/icons/caret-right-fill'

export default function StoreComponent() {
  const [stores, setStores] = useState([]);
  const buid = firebaseAuth.currentUser.uid
  const navigation = useNavigation()

  let mockstore = []

  const getStoreCollection = async (buid) => {
    try {
      const businessRef = db.collection('clients').doc(buid);
      const storeCollectionRef = businessRef.collection('stores');
      const storeCollectionSnapshot = await storeCollectionRef.get();

      const storeDataArray = [];

      storeCollectionSnapshot.forEach((storeDoc) => {
        const storeData = storeDoc.data();
        storeDataArray.push({ ...storeData });
        setStores(storeDataArray)
        mockstore = storeDataArray
        return console.log('getStoreCollection');
      });
    } catch (error) {
      console.error('Error fetching store collection:', error);
    }

  };

  useEffect(() => {
    if (stores.length < 1) {
      getStoreCollection(buid)
    }

    const unsubscribe = navigation.addListener('focus', () => {
      getStoreCollection(buid)
    });

    return unsubscribe;
  })

  if (stores.length > 0) {
    return (
      <SafeAreaView>
        <FlatList
          scrollEnabled={true}
          scrollsToTop={true}
          data={stores}
          renderItem={({ item }) =>
            <Pressable android_ripple={{ color: theme.grey }} style={styles.store} onPress={() => {
              navigation.navigate('store_dashboard', { store: item })
            }} >
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.store_info}>
                <PinIcon fill={theme.text_dark_faint} />
                <Text style={styles.info_title}>{item.location}</Text>
              </View>
              <View style={styles.store_info}>
                <BoxSeam fill={theme.text_dark_faint} />
                <Text style={styles.info_title}>{item.inventory.length}</Text>
              </View>
              <View style={styles.store_info}>
                <Globe fill={theme.text_dark_faint} />
                <Text style={styles.info_title}>{item.country}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 15, borderTopWidth: 1, borderTopColor: theme.text_dark_faint, marginVertical: 5 }}><Text style={{ color: theme.text_dark, fontWeight: 'bold' }}>View On Inventory</Text><CaretRightFill fill={theme.text_dark} /></View>
            </Pressable>
          }
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    )
  } else {
    return (
      <View style={{ marginVertical: 15 }}>
        <Text style={{
          marginVertical: 5,
          fontWeight: 'bold',
          fontSize: 16,
          marginTop: 15,
          color: theme.primary,
          textAlign: 'center'
        }}>Fetching Stores</Text>
        <ActivityIndicator size={30} color={theme.text_dark_faint} />
      </View>
    )
  }

}

export const AddStoreButton = () => {
  const navigation = useNavigation()
  return (
    <Pressable
      android_ripple={{ color: theme.black }}
      style={
        styles.new
      }
      onPress={() => { navigation.navigate('add_store') }}>
      <ImageBackground
        source={{ uri: environments.background_two }}
        resizeMode="cover"
        height={windowHeight}
        width={windowWidth}
        style={{ flex: 1, justifyContent: 'center' }}
      >
        <View style={{ justifyContent: 'center', flexDirection: 'row', gap: 10, padding: 15, borderRadius: 10, height: 200, alignItems: 'center' }}>
          <PlusCircleIcon fill={theme.text_light} />
          <Text style={{ color: theme.text_light, fontWeight: '600', fontSize: 20 }}>Create A New Store</Text>
        </View>
      </ImageBackground>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.text_dark,
    marginVertical: 20,
    marginBottom: 15
  },
  stores: {
    flexDirection: 'column',
    gap: 1,
    marginVertical: 15,
    overflow: 'scroll',
  },
  card: {
    flexDirection: 'column',
    gap: 20,
    overflow: 'scroll',
  },
  store: {
    padding: 24,
    borderColor: theme.secondary_faint,
    backgroundColor: theme.light,
    borderRadius: 10,
    marginBottom: 20
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: theme.text_dark,
    marginBottom: 20
  },
  store_info: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
    alignItems: 'center'
  },
  info_title: {
    fontSize: 14,
    color: theme.text_dark_faint,
    textTransform: 'capitalize'
  },
  add: {
    color: theme.text_dark
  },
  new: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    backgroundColor: theme.primary,
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    overflow: 'hidden'
  }
})