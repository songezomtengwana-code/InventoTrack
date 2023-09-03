import { ScrollView, StyleSheet, Text, View, ImageBackground, SafeAreaView } from 'react-native'
import React from 'react'
import { theme, windowHeight, windowWidth } from '../utils/theme'
import { environments } from '../utils/environment'
import { activeBusinessAccount } from '../services/firebase'
import StoreComponent from '../components/StoreComponents'

const StoresScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <ImageBackground
          source={{ uri: environments.stores }}
          resizeMode="cover"
          height={windowHeight}
          width={windowWidth}
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <View style={{ backgroundColor: '#000000a1', justifyContent: 'center', flexDirection: 'row', gap: 10, padding: 20, height: 'auto', alignItems: 'center' }}>
            <Text style={{ color: theme.text_light, fontWeight: '600', fontSize: 20 }}>{activeBusinessAccount.businessName}'s Stores</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.body}>
        <StoreComponent />
      </View>
    </SafeAreaView>
  )
}

export default StoresScreen

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    backgroundColor: theme.primary_faint,
    height: 'auto',
    alignItems: 'center',
    overflow: 'hidden'
  },
  body: {
    padding: 15,
    paddingBottom: 150
  }
})