import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { theme } from '../../utils/theme';
import MapFill from 'react-native-bootstrap-icons/icons/map-fill';
import BoxSeam from 'react-native-bootstrap-icons/icons/box-seam';
import Globe from 'react-native-bootstrap-icons/icons/globe';
import LoadingComponent from '../../components/LoadingComponent';
import UpcScan from 'react-native-bootstrap-icons/icons/upc-scan';
import ProductCard from '../../components/ProductCard';
import { useNavigation } from '@react-navigation/native';
import { db, firebaseAuth } from '../../services/firebase';
import Search from 'react-native-bootstrap-icons/icons/search';

export default function StoreDashboard({ route }) {
  const { store } = route.params
  const [fetching, setFetching] = useState(false)
  const [liveStore, setLiveStore] = useState(null)

  // navigation
  const navigation = useNavigation()

  const getStore = async () => {
    const buid = firebaseAuth.currentUser.uid
    console.log(store.store_id);

    try {
      const businessRef = db.collection('clients').doc(buid);
      const storeRef = businessRef.collection('stores').doc(store.store_id);
      const storeSnapshot = await storeRef.get();

      if (storeSnapshot.exists) {
        const storeData = storeSnapshot.data();
        setLiveStore(storeData)

      } else {
        console.log('Store does not exist.');
      }
    } catch (error) {
      console.error('Error fetching store:', error);
    }
  };

  function initialStartUps() {
    setFetching(true)
    setTimeout(() => {
      setFetching(false)
    }, 2500);

    // fetches the store from stores collection
    if (liveStore === null) {
      getStore()
    } else {
      setLiveStore(null)
      getStore()
    }
  }

  useEffect(() => {
    initialStartUps()
    const unsubscribe = navigation.addListener('focus', () => {
      initialStartUps()
    });

    return unsubscribe;
  }, [navigation])

  if (liveStore === null) {
    return <LoadingComponent text='Fetching Store Information ...' />;
  } else {
    return (
      <>
        {fetching ? <LoadingComponent text='Fetching Store Inforation ...' /> : <></>}
        <ScrollView>
          <View style={styles.header}>
            <Text style={{ color: theme.grey }}>{liveStore.store_id}</Text>
            <Text style={styles.header_text}>
              {liveStore.name}
            </Text>
            <View style={styles.store_info}>
              <MapFill fill={theme.third} />
              <Text style={styles.info_title}>{liveStore.location}, {liveStore.city}</Text>
            </View>
            <View style={styles.store_info}>
              <Globe fill={theme.third} />
              <Text style={styles.info_title}>{liveStore.state}, {liveStore.country}</Text>
            </View>
            <View style={styles.store_info}>
              <BoxSeam fill={theme.third} />
              <Text style={styles.info_title}>{liveStore.inventory.length}</Text>
            </View>
            <Pressable android_ripple={{ color: theme.grey }} style={styles.new} onPress={() => {
              navigation.navigate('add_store_product', { branchName: liveStore.name, store_id: liveStore.store_id })
            }}>
              <UpcScan fill={theme.text_dark} />
              <Text style={styles.new_text}> Add A New Product</Text>
            </Pressable>

          </View>

          <View style={styles.body}>
            <View style={styles.space_between}>
              <Text style={styles.title}>Products</Text>
              <TouchableOpacity style={styles.space_between_button} onPress={() => { navigation.navigate('search_store_product', {products: liveStore.inventory}) }}>
                <Search fill={theme.primary} />
              </TouchableOpacity>
            </View>
            {
              fetching ? <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 50 }}>
                <Text>Nothing in the inventory</Text>
              </View> : <ProductCard inventory={liveStore.inventory} id={liveStore.store_id} />
            }
          </View>
        </ScrollView>
      </>
    )
  }
}


const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.light,
    padding: 25,
    gap: 10,
    justifyContent: 'flex-start',
    color: theme.light,
  },
  header_text: {
    fontWeight: '600',
    color: theme.text_dark,
    fontSize: 28,
    marginBottom: 10
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
  new: {
    padding: 15,
    flexDirection: 'row',
    gap: 10,
    borderWidth: 1,
    borderColor: theme.third,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.third
  },
  new_text: {
    color: theme.primary,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.text_dark,
    marginVertical: 15
  },
  space_between: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 25
  },
  space_between_button: {
    padding: 5
  }
})