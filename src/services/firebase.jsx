import * as firebase from 'firebase/compat'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import { getAuth, onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import { getFirestore, setDoc, doc, arrayUnion, getDoc, } from 'firebase/firestore';
import { Alert } from 'react-native';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { updateLoginLogs } from './authentication/update-logs';

const firebaseConfig = {
  apiKey: 'AIzaSyCiSQj_UOC68vVNT64QIKZoZy0o0iKZpiQ',
  authDomain: 'pbms-7591f.firebaseapp.com',
  projectId: 'pbms-7591f',
  storageBucket: 'pbms-7591f.appspot.com',
  messagingSenderId: '1019923690377',
  appId: '1:1019923690377:web:5aaaa62242a54f1459e758',
  measurementId: 'G-7ETCGS7KN7',
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const db = firebase.firestore();

const firestoreDB = getFirestore(app);
const firebaseAuth = getAuth(app);
const storageDB = getStorage(app)

let authResponse;
let user = auth.currentUser
let activeBusinessAccount;
let inventory;

export function createaccount(email, password, businessName, navigation) {
  if (!email || !password || !businessName) {
    Alert.alert('Missing Fields', 'Some fields were missing  please check the form')
  } else {
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('welcome ' + businessName)
        authResponse = true
        auth.updateCurrentUser(user, {
          displayName: businessName
        })
        navigation.navigate('signin');
        try {
          sendEmailVerification(user)
          console.log(authResponse)
        } catch (e) {
          console.log({ name: "email verification", message: e.message, code: e.code })
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({
          name: 'authentication',
          errorCode: errorCode,
          errorMessage: errorMessage
        })
      });
  }
}

export async function createstorageaccount(config, navigation) {
  if (config) {
    console.log('connecting to firestore');
    const business_reference = config
    const user = firebaseAuth.currentUser
    const doc_ref = doc(firestoreDB, 'clients', user.uid);
    const mock_storage = {
      "id": "item_id",
      "name": "Item Name",
      "description": "Item Description",
      "category": "Item Category",
      "barcode": "Item Barcode",
      "quantity": 10,
      "price": 19.99,
      "location": {
        "aisle": "Aisle Number",
        "shelf": "Shelf Number"
      },
      "notes": "Additional Notes",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
    activeBusinessAccount = user

    db.collection('clients')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {

        if (documentSnapshot.exists) {
          return Alert.alert(
            `${business_reference.name} already exists`,
            'A business with the name ' + business_reference.name + 'already exists in our database',
          );
        } else {
          setDoc(doc_ref, business_reference).then(() => {
            console.log('user firestore account created !');
            setDoc(doc(firestoreDB, 'storage', user.uid), mock_storage).then(() => {

              navigation.navigate('home')
            })
          });
        }
      });
  } else {
    business_reference = undefined;
    console.log(
      `${Date().toLowerCase().substring(0, 21)}: No user info was retrieved, please try again`,
    );
  }
}

export function signin(email, password, navigation) {
  auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
    const user = userCredential.user
    updateLoginLogs(user.uid)
    db.collection('clients').doc(user.uid).get().then((documentSnapshot) => {
      if (documentSnapshot.exists) {
        activeBusinessAccount = documentSnapshot.data()
        if (activeBusinessAccount !== null || undefined) {
          navigation.navigate('home')
        } else {
          console.error('error - username not found');
        }
      } else {
        navigation.navigate('configure')
      }
    })
  })
}

export async function configure_store(id, config, navigation) {
  const reference = doc(db, 'clients', id)

  await updateDoc(reference, { stores: arrayUnion(config) }).then(() => {
    navigation.navigate('home')
  }).catch((e) => {
    console.error(e);
  })
}

export async function get_inventory() {
  const docRef = doc(db, "storage", firebaseAuth.currentUser.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    inventory = docSnap.data()
  } else {
    console.error('error - document does not exist');
  }
}

export function uuid() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });

  // console.log(uuid)
  return uuid;
}

export async function get_stores() {
  const uid = firebaseAuth.currentUser.uid
  const reference = doc(db, "clients", uid)
  getDoc(reference).then((snapshot) => {
    const stores = []
    if (snapshot.exists()) {
      stores.push(snapshot.data())
      const s = stores[0].stores;
      return s.length;
    } else {
      console.log('error collecting the stores');
      return;
    }
  })
}

export function is_logged_in(navigation) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      db.collection('clients').doc(uid).get().then((documentSnapshot) => {
        console.log({ " account existance ": documentSnapshot.exists })
        if (documentSnapshot.exists) {
          activeBusinessAccount = documentSnapshot.data()

          console.log('====================================');
          if (activeBusinessAccount !== null || undefined) {
            navigation.navigate('home')
          } else {
            console.log('Sorry Cant Find The User From Database');
          }
        } else {
          navigation.navigate('configure')
        }
      })
    } else {
      // User is signed out
      // ...
    }
  });

}

export function signOut(navigation) {
  firebaseAuth.signOut().then(() => {
    navigation.navigate('signin')
    activeBusinessAccount = null
  })
}

export function getActiveAccount() {
  const user = firebaseAuth.currentUser

  try {
    db.collection('clients').doc(user.uid).get().then((documentSnapshot) => {
      console.log({ " account existance ": documentSnapshot.exists })
      if (documentSnapshot.exists) {
        activeBusinessAccount = documentSnapshot.data()
        console.log('====================================');
      } else {
        signOut()
        Alert.alert('Session Expired', 'Please sign in again to continue')
        navigation.navigate('signin')
      }
    })
  } catch (error) {
    signOut()
    Alert.alert('Session Expired', 'Please sign in again to continue')
    navigation.navigate('signin')
  }
}

/**
 * @return a snapshot parameter for the store app in a then() method
 */
export async function getAccount() {
  await db.collection('clients').doc(firebaseAuth.currentUser.uid).get()
}

export async function firebaseUploadProductImage(uri, branch) {

  // const product_image_upload_path = `stores/${firebaseAuth.currentUser.uid}/${branch}`

  if (uri) {
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    console.log(filename)
    ref(storageDB, filename)
  } else {
    console.log('no image uploaded ke kodak black - versatile');
  }
  console.log('image added.')
};

/**
 * @param {*} imageUri contains a uri to the location where the image is situated
 */
export async function upload_store_product_image(imageUri) {
  if (imageUri) {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);

    const ref = firebase.storage(app).ref().child(`inventory/${Date.now()}${filename}`);
    await ref.put(blob);

    // Get the image download URL
    const imageUrl = await ref.getDownloadURL();
    console.log('Image URL:', imageUrl);

    // You can save the imageURL to a database or use it in your app
  }
};

export { authResponse, user, firebaseAuth, auth, activeBusinessAccount, inventory, db, storageDB } 