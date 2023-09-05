
import { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db, firebaseAuth } from '../../services/firebase';
import LoadingComponent from '../../components/LoadingComponent';
import { Appbar, Text } from 'react-native-paper';
import { theme } from '../../utils/theme';

export default function ManageNotificationsScreen() {
  const navigation = useNavigation()
  const [notification, setNotification] = useState([]);

  function get_notifications() {
    try {
      db.collection('clients').doc(firebaseAuth.currentUser.uid).get().then((documentSnapshot) => {
        console.log({ " account existance ": documentSnapshot.exists })
        if (documentSnapshot.exists) {
          const data = []
          data.push({ ...documentSnapshot.data() })
          setNotification(data[0].notifications)
          console.log(notification)
        } else {
          console.log('vice city - black hippy');
        }
      })
    } catch (error) {
      console.log('vice city - black hippy');
    }
  }

  useEffect(() => {
    get_notifications()

    if (notification.length < 1) {
      get_notifications()
      console.log(notification.length)
    } else {
      console.log('resolved')
    }
  }, [])

  if (notification?.length < 1.5) {
    return <LoadingComponent text="Loading ..." />
  } else {
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => { navigation.goBack() }} />
          <Appbar.Content title="Notifications" />
          <Appbar.Action icon="calendar" onPress={() => { }} />
        </Appbar.Header>
        <FlatList
          data={notification}
          scrollEnabled={true}
          scrollsToTop={true}
          renderItem={({ item }) =>
            <Text style={{ color: theme.primary }}>{item.date}</Text>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

})
