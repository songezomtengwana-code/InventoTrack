
import { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Pressable } from 'react-native';
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
        if (documentSnapshot.exists) {
          const data = []
          try {
            data.push({ ...documentSnapshot.data() })
            setNotification(data[0].notifications)
          } catch (error) {
            console.log('error report: ' + error);
          }
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

  if (notification?.length < 1) {
    return <LoadingComponent text="Loading ..." />
  } else {
    return (
      <View>
        <Appbar.Header
          mode='medium'
          elevated={2}
          collapsable={true}
        >
          <Appbar.BackAction onPress={() => { navigation.goBack() }} />
          <Appbar.Content title="Notifications" />
          <Appbar.Action icon="calendar" onPress={() => { }} />
        </Appbar.Header>
        <FlatList
          data={notification}
          scrollEnabled={true}
          scrollsToTop={true}
          renderItem={({ item }) =>
            <Pressable style={[styles.notification, { backgroundColor: item.readStatus ? theme.background : theme.third_faint }]} android_ripple={{ color: theme.grey }}>
              <Text style={styles.date}>{item.date.substring(8, 21)}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
            </Pressable>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  notification: { backgroundColor: theme.background, marginVertical: 15, padding: 25, elevation: 1, flexDirection: 'column', },
  date: { fontSize: 10, color: theme.third, fontWeight: 'bold', marginBottom: 10, textAlign: 'left' },
  title: { fontWeight: 'bold', fontSize: 20, textTransform: 'capitalize', marginBottom: 5 }
})
