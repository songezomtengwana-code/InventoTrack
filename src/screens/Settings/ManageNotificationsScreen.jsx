
import { useState, useEffect, useRef } from 'react';
import { Text, View, Platform, Button, ScrollView, StyleSheet, FlatList } from 'react-native';
import * as Notifications from 'expo-notifications';
import { theme } from '../../utils/theme';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { db, firebaseAuth } from '../../services/firebase';

export default function ManageNotificationsScreen() {
  const navigation = useNavigation()
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState([]);

  const get_notifications = () => {
    try {
      db.collection('clients').doc(firebaseAuth.currentUser.uid).get().then((documentSnapshot) => {
        console.log('getting notifications...')
        const activeBusinessAccount = documentSnapshot.data()
        setNotification(activeBusinessAccount)
        console.log(notification)
      })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    get_notifications()
  }, [])

  return (
    <View>
     <Text style={{color:theme.primary}}>IMDATNI**A</Text>
      <FlatList
        data={notification}
        scrollEnabled={true}
        scrollsToTop={true}
        renderItem={({ source }) =>
          <Text style={{ color: theme.primary }}>{source.id}</Text>
        }
        key={({ source }) => source.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({

})
