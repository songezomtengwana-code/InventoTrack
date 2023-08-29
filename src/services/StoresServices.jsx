import { arrayUnion, doc, getDoc, updateDoc, addDoc, arrayRemove } from "firebase/firestore";
import { db, firebaseAuth } from "./firebase";
import * as Notifications from 'expo-notifications';

export async function getStoresCount() {
    const uid = firebaseAuth.currentUser.uid
    const businessRef = db.collection('clients').doc(uid);
    const storeCollectionRef = businessRef.collection('stores');
    const storeCollectionSnapshot = await storeCollectionRef.get();

    storeCollectionSnapshot.forEach((storeDoc) => {
        if (storeDoc.exists) {
            console.log({ count: storeDoc.data() })
        } else {
            console.log('boom');
        }
    });
}

export async function createNewStore(config, navigation) {
    const buid = firebaseAuth.currentUser.uid

    try {
        const businessRef = db.collection('clients').doc(buid);
        const newStoreRef = businessRef.collection('stores').doc();
        const storeId = newStoreRef.id;
        storeData = { ...config, store_id: storeId };
        await newStoreRef.set(storeData);
        navigation.navigate('stores')
        console.log('New Store ID:', storeId);
    } catch (error) {
        console.error('Error creating store:', error);
        throw error;
    }
}

/**
 * @param {*} store_id store id to identify which store inventory to update
 * @param {*} config inventory item data that will be added to db
 */
export async function uploadToInventory(store_id, config, navigation) {
    const buid = firebaseAuth.currentUser.uid
    const store = { store_id: store_id }
    try {
        const businessRef = db.collection('clients').doc(buid);
        const storeRef = businessRef.collection('stores').doc(store_id);

        await storeRef.update({ inventory: arrayUnion(config) })

        console.log('Inventory updated successfully.');
        navigation.navigate('stores')
    } catch (error) {
        console.error('Error updating inventory:', error);
        throw error;
    }
}

export async function update_store_product(sid, pid, price, quantity, name) {
    const businessId = firebaseAuth.currentUser.uid;
    const storeId = sid;
    const businessRef = db.collection('clients').doc(businessId);
    const storeRef = businessRef.collection('stores').doc(storeId);

    storeRef
        .get()
        .then((documentSnapshot) => {
            if (documentSnapshot.exists) {
                const responseData = documentSnapshot.data();
                const itemsArray = responseData.inventory; // Assuming your array field is named 'items'
                const stockNotificationProperties = {
                    title: "Stock Quantity",
                    body: `${name}'s stock is lower than the set threshold, please make sure you check it out`,
                    data: { data: 'goes here', route: 'stores' },
                }
                // Find the index of the item you want to update
                const itemIndexToUpdate = itemsArray.findIndex((item) => item.id === pid);

                if (quantity < 50) {
                    console.log('stock quantity is not safe');

                    Notifications.scheduleNotificationAsync({
                        content: stockNotificationProperties,
                        trigger: { seconds: 2 },
                    });

                } else {
                    console.log('stock quantity is safe');
                }

                if (itemIndexToUpdate !== -1) {
                    itemsArray[itemIndexToUpdate] = {
                        ...itemsArray[itemIndexToUpdate],
                        price: price,
                        quantity: quantity
                    };

                    // Update the document with the updated array
                    return storeRef.update({ inventory: itemsArray });
                } else {
                    console.log('Item not found in the array.');
                }
            } else {
                console.log('Document does not exist.');
            }
        })
        .catch((error) => {
            console.error('Error updating document:', error);
        });

}

export async function get_single_store_product(sid) {
    const businessId = firebaseAuth.currentUser.uid;
    const storeId = sid;
    const businessRef = db.collection('clients').doc(businessId);
    const storeRef = businessRef.collection('stores').doc(storeId);

    return storeRef.get()
}

/**
 * @param {*} iid 
 * @param {*} navigation 
 * @param {*} sid 
 */
export async function delete_store_product(iid, sid, navigation) {
    const businessId = firebaseAuth.currentUser.uid;
    const storeId = sid;
    const itemIdToDelete = iid;

    // Reference to the specific inventory document
    const inventoryRef = db.collection('clients').doc(businessId)
        .collection('stores').doc(storeId);

    // Delete the item from the array
    inventoryRef.update({
        inventory: arrayRemove({ id: itemIdToDelete })
    })
        .then(() => {
            console.log('Item deleted from the array successfully');
            navigation.goBack()
            console.log(itemIdToDelete, storeId, businessId)
        })
        .catch((error) => {
            console.error('Error deleting item from array:', error);
        });
}

export async function get_stores_count(uid) {

    const clientsCollectionRef = db.collection(' clients');
    const storesCollectionRef = clientsCollectionRef.doc(uid).collection('stores');

    storesCollectionRef.get().then((querySnapshot) => {
        const numberOfDocuments = querySnapshot.size;
        // console.log(`Number of documents in subcollection: ${numberOfDocuments}`);
        return numberOfDocuments
    }).catch((error) => {
        console.error("Error getting subcollection documents: ", error);
        return "NaN"
    });

}