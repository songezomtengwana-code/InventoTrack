import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button } from 'react-native-paper';
import { theme, windowHeight, windowWidth } from '../utils/theme';
import { useNavigation } from '@react-navigation/native';

const LoadingComponent = ({ text }) => {
  const [back, setBack] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    setTimeout(() => {
      
    }, 20000)
  }, [])

  return (
    <View style={styles.loading}>
      <ActivityIndicator color={theme.primary} size={'large'}  />
      <Text style={styles.text}>{text}</Text>
      {
        back ?
          <View style={{
            position: 'absolute', 
            bottom: 50, 
            gap: 20, 
            flexDirection: 'row', 
            alignItems: 'center', 
            backgroundColor: theme.secondary, 
            paddingHorizontal: 15,
            padding: 7.5,
            borderRadius: 5
          }}>
            <Text style={{ color: theme.background, fontSize: 14 }}>An error occured</Text>
            {/* <Button onPress={() => { navigation.goBack() }} textColor={theme.background} buttonColor={theme.secondary} style={{ borderRadius: 5 }}>Go Back</Button> */}
          </View>
          : <></>
      }
    </View>
  );
};

export default LoadingComponent;

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: '#ffffffd1',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  text: {
    marginVertical: 5,
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 15,
    color: theme.primary
  },
});
