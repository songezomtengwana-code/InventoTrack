
import { useState, useEffect, useRef } from 'react';
import { Text, View, Platform, Button, ScrollView, StyleSheet, FlatList } from 'react-native';
import * as Notifications from 'expo-notifications';
import { theme } from '../../utils/theme';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { activeBusinessAccount, db, firebaseAuth, getActiveAccount } from '../../services/firebase';
import LoadingComponent from '../../components/LoadingComponent';

export default function ManageNotificationsScreen() {
  const navigation = useNavigation()
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState([]);

  function get_notifications() {
    getActiveAccount()
    setNotification(activeBusinessAccount)
    console.log(activeBusinessAccount)
  }

  useEffect(() => {
    console.log(activeBusinessAccount)
    get_notifications()
  }, [])

  if (notification.length < 1) {
    return <LoadingComponent text="Loading ..." />
  } else {
    return (
      <View>
        <Text style={{ color: theme.primary }}>IMDATNI**A</Text>
        {/* <FlatList
          data={notification}
          scrollEnabled={true}
          scrollsToTop={true}
          renderItem={({ source }) =>
            <Text style={{ color: theme.primary }}>{source.id}</Text>
          }
          key={source => source.id}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({

})
