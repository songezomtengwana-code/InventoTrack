import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Dialog, PaperProvider, Portal, MD3LightTheme as DefaultTheme, Modal, TextInput, } from 'react-native-paper'
import { theme, windowHeight, windowWidth } from '../../utils/theme'
import LoadingComponent from '../../components/LoadingComponent'
import { environments } from '../../utils/environment'

// icons
import Pen from 'react-native-bootstrap-icons/icons/pen'
import Trash from 'react-native-bootstrap-icons/icons/trash'
import { useNavigation } from '@react-navigation/native'
import { delete_store_product, get_single_store_product } from '../../services/StoresServices'
import StockTrackerBadges from '../../components/StockTrackerBadges'

export default function UpdateStoreProduct({ route }) {
    const { product, id } = route.params
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const [item, setItem] = useState([])

    const storeProduct = []
    const updateLoaderMessage = `Fetching ${product.name} ...`

    const get_product = () => {
        const pid = product.id
        const sid = id
        get_single_store_product(sid).then((documentSnapshot) => {
            if (documentSnapshot.exists) {
                const responseData = documentSnapshot.data();
                const itemsArray = responseData.inventory;
                const product = []

                // Find the index of the item you want to update
                const itemIndexToUpdate = itemsArray.findIndex((item) => item.id === pid);

                if (itemIndexToUpdate !== -1) {
                    product.push({ ...itemsArray[itemIndexToUpdate] })
                    setItem(product);
                } else {
                    console.log('Item not found in the array.');
                }
            } else {
                console.log('Document does not exist.');
            }
        })
            .catch((error) => {
                console.error('Error finding document:', error);
            });
    }


    useEffect(() => {
        storeProduct.push(product)
        get_product()
    })

    if (item.length < 1) {
        return (
            <View style={{ backgroundColor: theme.background, }}>
                <LoadingComponent text={updateLoaderMessage} />
            </View>
        )
    } else {
        return (
            <>
                <ScrollView style={{ backgroundColor: theme.background, }}>
                    <PaperProvider>
                        {loading ? <LoadingComponent text="Loading " /> : <></>}
                        <View style={{ minHeight: windowHeight, marginBottom: 100 }}>
                            <StockTrackerBadges stockValue={item[0].quantity} />
                            <Image source={{ uri: environments.sample_barcode }} style={styles.sample_barcode} />
                            <Text style={[styles.barcode_text, styles.text]}>{item[0].barcode}</Text>
                            <View style={styles.view}>
                                <View style={styles.details}>
                                    <Text style={[styles.details_faint]}>Last Modified: {item[0].updatedAt.substring(0, 21)}</Text>
                                </View>
                                {item[0].imageurl ? <Image source={{ uri: item[0].imageurl }} style={styles.prouct_image} /> : <Image source={{ uri: environments.product_placeholder }} style={styles.prouct_image} />}
                                <Text style={[styles.text, styles.product_name]}>{item[0].name}</Text>
                                <Text style={styles.description}>{item[0].description}</Text>

                                <Text style={styles.name}>{item[0].name}</Text>
                                <View style={styles.horizontal}>
                                    <Text style={styles.title}>InventoTrack UUID:</Text>
                                    <Text style={styles.info}>{item[0].id}</Text>
                                </View>
                                <View style={styles.horizontal}>
                                    <Text style={styles.title}>Quantity:</Text>
                                    <Text style={styles.info}>{item[0].quantity}</Text>
                                </View>
                                <View style={styles.horizontal}>
                                    <Text style={styles.title}>Category:</Text>
                                    <Text style={styles.info}>{item[0].category}</Text>
                                </View>
                                <View style={styles.horizontal}>
                                    <Text style={styles.title}>Aisle:</Text>
                                    <Text style={styles.info}>{item[0].location.aisle}</Text>
                                </View>
                                <View style={styles.horizontal}>
                                    <Text style={styles.title}>Shelf:</Text>
                                    <Text style={styles.info}>{item[0].location.shelf}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    alignItems: 'baseline',
                                    gap: 5,

                                }}>
                                    <Text style={{ color: theme.primary, fontWeight: 'bold' }}>Price: </Text>
                                    <Text style={styles.price}>{item[0].price} ZAR</Text>
                                </View>

                            </View>
                        </View>
                    </PaperProvider>
                </ScrollView>
                <View
                    style={styles.bottom}
                >
                    <Pressable
                        android_ripple={{ color: theme.grey }}
                        style={styles.edit_button}
                        onPress={() => {
                            navigation.navigate('edit_store_product', { id: id, product: product })
                        }}
                    >
                        <Pen fill={theme.primary} />
                        <Text style={{ color: theme.primary, fontWeight: 'bold' }}>Edit Product</Text>
                    </Pressable>
                    <Pressable
                        android_ripple={{ color: theme.secondary_faint }}
                        style={styles.delete_button}
                        onPress={() => { delete_store_product(product.id, id, navigation) }}
                    >
                        <Trash fill={theme.background} />
                    </Pressable>
                </View>
            </>
        )
    }
}



const styles = StyleSheet.create({
    view: {
        padding: 25,
        paddingVertical: 10,
        backgroundColor: theme.background
    },
    dialog: {
        backgroundColor: theme.background,
        color: theme.text_dark,
        borderRadius: 10
    },
    text: {
        color: theme.text_dark
    },
    barcode: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    sample_barcode: {
        width: windowWidth,
        height: 50
    },
    barcode_text: {
        textAlign: 'center',
        fontSize: 20,
        letterSpacing: windowWidth / 16,
        marginVertical: 5,
        fontWeight: 'bold',
        color: theme.text_dark_faint
    },
    product_name: {
        fontSize: 28,
        fontWeight: '600',
        marginBottom: 8,
    },
    description: {
        color: theme.text_dark,
        fontSize: 18,
        marginBottom: 12
    },
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 5,
        marginVertical: 20
    },
    details_faint: {
        fontWeight: '400',
        color: theme.grey,
        fontSize: 14
    },
    horizontal: {
        flexDirection: 'column',
        alignItems: 'left',
        gap: 10,
        marginBottom: 12.5,
        borderBottomColor: theme.text_dark_faint,
        borderBottomWidth: 1,
        paddingBottom: 12.5
    },
    title: {
        color: theme.black,
        fontWeight: 'bold'
    },
    info: {
        color: theme.primary,
    },
    price: {
        fontWeight: 'bold',
        fontSize: 28,
        color: theme.primary,
        marginVertical: 20,
        textAlign: 'right'
    },
    edit_button: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: theme.primary,
        marginVertical: 10,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 5,
        width: '85%'
    },
    header: {
        fontSize: 18,
        color: theme.primary,
        marginBottom: 16
    },
    input: {
        marginBottom: 10,
        backgroundColor: theme.background
    },
    prouct_image: {
        height: 150,
        width: 150,
        marginBottom: 25
    },
    delete_button: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: theme.secondary,
        backgroundColor: theme.secondary,
        marginVertical: 10,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 5,
        width: '15%'
    },
    bottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.background,
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 25,
        paddingVertical: 10,
        zIndex: 99,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15
    }
})