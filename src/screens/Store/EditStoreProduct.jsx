import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, Alert } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { db, firebaseAuth } from '../../services/firebase';
import { getDocs, query, updateDoc, where } from 'firebase/firestore';
import { theme, windowWidth } from '../../utils/theme';
import { update_store_product } from '../../services/StoresServices';
import { useNavigation } from '@react-navigation/native';
import LoadingComponent from '../../components/LoadingComponent';

function EditStoreProduct({ route }) {
    const { id, product } = route.params
    const navigation = useNavigation()
    const [updatedQuantity, setUpdatedQuantity] = useState("0")
    const [updatedPrice, setUpdatedPrice] = useState(product.price);
    const [loading, setLoading] = useState(false)
    const resolvedQuantityValue = product.quantity.toString()

    const submit = () => {
        if (updatedPrice > 0) {
            update_store_product(id, product.id, updatedPrice, updatedQuantity).then(() => {
                console.log('update complete')
                navigation.navigate('update_store_product', { id: id, product: product });
                Alert.alert('Update completed', `${product.name} has been updated successfully`)
            })
        } else {
            Alert.alert('Low Pricing', 'Selected pricing is low for a suitable selling price at least somthing greater than 0')
        }
    }

    return (
        <>
            {
                loading ? <LoadingComponent text="Updating..." /> : <></>
            }
            <View style={{ padding: 25, backgroundColor: theme.background }}>
                <View style={styles.location}>
                    <TextInput
                        style={styles.input_location}
                        mode='outlined'
                        outlineColor={theme.primary}
                        activeOutlineColor={theme.primary}
                        value={resolvedQuantityValue}
                        label="Current Quantity"
                        editable={false}
                    />
                    <TextInput
                        style={styles.input_location}
                        mode='outlined'
                        outlineColor={theme.primary}
                        activeOutlineColor={theme.primary}
                        value={updatedQuantity}
                        keyboardType='numeric'
                        label="New Quantity"
                        onChangeText={(text) => { setUpdatedQuantity(text) }}
                    />
                </View>
                <View style={styles.location}>
                    <TextInput
                        style={styles.input_location}
                        mode='outlined'
                        outlineColor={theme.primary}
                        activeOutlineColor={theme.primary}
                        value={product.price}
                        label="Current Price"
                        editable={false}
                    />
                    <TextInput
                        style={styles.input_location}
                        mode='outlined'
                        outlineColor={theme.primary}
                        activeOutlineColor={theme.primary}
                        value={updatedPrice}
                        keyboardType='numeric'
                        label="New Price"
                        onChangeText={(text) => { setUpdatedPrice(text) }}
                    />
                </View>
                <Pressable android_ripple={{ color: theme.grey }} style={styles.submit} onPress={submit} >
                    <Text style={{ color: theme.background }}>Submit</Text>
                </Pressable>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    input_location: {
        minWidth: windowWidth - 240,
        width: 'auto',
        backgroundColor: theme.background
    },
    location: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25
    },
    subtitle: {
        marginVertical: 15,
        fontSize: 18,
        fontWeight: '600',
        color: theme.text_dark
    },
    submit: {
        marginVertical: 10,
        alignItems: 'center',
        padding: 20,
        backgroundColor: theme.primary,
        borderRadius: 5
    },
    submit_text: {
        color: theme.text_light,
        fontWeight: '600',
    }
})

export default EditStoreProduct;
