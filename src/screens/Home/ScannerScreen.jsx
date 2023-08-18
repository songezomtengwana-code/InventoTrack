import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { theme, windowWidth } from '../../utils/theme'
import { TextInput } from 'react-native-paper'
import { launchCamera } from 'react-native-image-picker'
import { firebaseUploadProductImage, uuid } from '../../services/firebase'
import { useNavigation } from '@react-navigation/native'
import LoadingComponent from '../../components/LoadingComponent'

// icons
import Camera from 'react-native-bootstrap-icons/icons/camera';
import { uploadToInventory } from '../../services/StoresServices'

function ScannerScreen({ route }) {
    const { branchName, store_id } = route.params;

    const navigation = useNavigation()
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [quantity, setQuantity] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [barcode, setBarcode] = React.useState('');
    const [aisle, setAisle] = React.useState('');
    const [shelf, setShelf] = React.useState('');
    const [disabled, setDisable] = React.useState(false);
    const [visiblity, setVisiblity] = React.useState(true)
    const [response, setResponse] = React.useState(undefined)
    const [image, setImage] = React.useState('https://firebasestorage.googleapis.com/v0/b/pbms-7591f.appspot.com/o/assets%2Fsystem-solid-18-autorenew.gif?alt=media&token=8a6d8601-33b2-43ac-8818-dead451a1974')
    const [uid, setUid] = React.useState(null)
    const [productImage, setProductImage] = React.useState(null)
    const [loading, setLoading] = useState(false)

    const inputs = [
        {
            key: 0,
            label: 'Product Name',
            editable: true,
            value: name,
        },
        {
            key: 1,
            label: 'Product Barcode',
            editable: true,
            value: barcode
        },
        {
            key: 2,
            label: 'Product Description',
            editable: true,
            value: description,
        },
        {
            key: 3,
            label: 'Product Category',
            editable: true,
            value: category,
        },
        {
            key: 4,
            label: 'Product Quantity',
            editable: true,
            value: quantity,
            type: 'numeric'
        },
        {
            key: 5,
            label: 'Product Price',
            editable: true,
            value: price,
            type: 'numeric'
        },

    ]
    const location = [
        {
            key: 10,
            label: 'Aisle',
            editable: true,
            value: aisle
        },
        {
            key: 11,
            label: 'Shelf',
            editable: true,
            value: shelf
        }
    ]

    const upload_product_image = async () => {
        let result = await launchCamera({
            saveToPhotos: true,
            mediaType: 'photo',
            includeBase64: false,
            quality: 1,
        }, setResponse)
        const source = result.assets[0].uri
        setImage(source)
        firebaseUploadProductImage(source, branchName)
    }

    const product = {
        id: uuid(),
        name: name,
        description: description,
        category: category,
        barcode: barcode,
        quantity: quantity,
        price: price,
        imageurl: productImage,
        location: {
            aisle: aisle,
            shelf: shelf
        },
        createdAt: Date(),
        updatedAt: Date()
    }

    const submit = async () => {
        if (!name || !category || !quantity || !price || !barcode || !aisle || !shelf) {
            setDisable(true)
            console.log('disable: ' + disabled);
        } else {
            setLoading(true)
            uploadToInventory(store_id, product, navigation)
        }
    }

    useEffect(() => {
    })

    return (
        <ScrollView>
            {loading ? <LoadingComponent text="Adding New Product..." /> : <></>}
            <View style={styles.screen}>
                {/* <View style={styles.options}>
                    <TouchableOpacity style={styles.button} onPress={upload_product_image}>
                        <Camera fill={theme.third} />
                        <Text style={styles.text}>Take Product Picture</Text>
                    </TouchableOpacity>
                </View> */}
                {
                    visiblity ? <View>
                        <Text style={styles.subtitle}>Additional Information</Text>
                        <TextInput
                            key={inputs[0].key}
                            style={styles.input}
                            mode='outlined'
                            inputMode={inputs[0]?.type}
                            outlineColor={theme.primary}
                            activeOutlineColor={theme.primary}
                            editable={inputs[0].editable}
                            value={inputs[0].value}
                            label={inputs[0].label}
                            onChangeText={(text) => { setName(text) }}
                        />
                        <TextInput
                            key={inputs[1].key}
                            style={styles.input}
                            mode='outlined'
                            inputMode={inputs[1]?.type}
                            outlineColor={theme.primary}
                            activeOutlineColor={theme.primary}
                            editable={inputs[1].editable}
                            value={inputs[1].value}
                            label={inputs[1].label}
                            onChangeText={(text) => { setBarcode(text) }}
                        /><TextInput
                            key={inputs[2].key}
                            style={styles.input}
                            mode='outlined'
                            inputMode={inputs[2]?.type}
                            outlineColor={theme.primary}
                            activeOutlineColor={theme.primary}
                            editable={inputs[2].editable}
                            value={inputs[2].value}
                            label={inputs[2].label}
                            onChangeText={(text) => { setDescription(text) }}
                        /><TextInput
                            key={inputs[3].key}
                            style={styles.input}
                            mode='outlined'
                            inputMode={inputs[3]?.type}
                            outlineColor={theme.primary}
                            activeOutlineColor={theme.primary}
                            editable={inputs[3].editable}
                            value={inputs[3].value}
                            label={inputs[3].label}
                            onChangeText={(text) => { setCategory(text) }}
                        /><TextInput
                            key={inputs[4].key}
                            style={styles.input}
                            mode='outlined'
                            inputMode={inputs[4]?.type}
                            outlineColor={theme.primary}
                            activeOutlineColor={theme.primary}
                            editable={inputs[4].editable}
                            value={inputs[4].value}
                            label={inputs[4].label}
                            onChangeText={(text) => { setQuantity(text) }}
                        /><TextInput
                            key={inputs[5].key}
                            style={styles.input}
                            mode='outlined'
                            inputMode={inputs[5]?.type}
                            outlineColor={theme.primary}
                            activeOutlineColor={theme.primary}
                            editable={inputs[5].editable}
                            value={inputs[5].value}
                            label={inputs[5].label}
                            onChangeText={(text) => { setPrice(text) }}
                        />
                        <Text style={styles.subtitle}>Location</Text>

                        <View style={styles.location}>
                            <TextInput
                                key={location[0].key}
                                style={styles.input_location}
                                mode='outlined'
                                outlineColor={theme.primary}
                                activeOutlineColor={theme.primary}
                                editable={location[0].editable}
                                value={location[0].value}
                                label={location[0].label}
                                onChangeText={(text) => { setAisle(text) }}
                            />
                            <TextInput
                                key={location[1].key}
                                style={styles.input_location}
                                mode='outlined'
                                outlineColor={theme.primary}
                                activeOutlineColor={theme.primary}
                                editable={location[1].editable}
                                value={location[1].value}
                                label={location[1].label}
                                onChangeText={(text) => { setShelf(text) }}
                            />
                        </View>
                        <Pressable android_ripple={{ color: theme.grey }} style={styles.submit} onPress={submit} >
                            <Text style={{ color: theme.background }}>Submit</Text>
                        </Pressable>
                    </View> : <></>
                }
            </View>
        </ScrollView>
    )
}

export default ScannerScreen

const styles = StyleSheet.create({
    screen: {
        padding: 25,
        flexDirection: 'column',
        gap: 10
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: theme.text_dark,
        marginBottom: 25
    },
    button: {
        padding: 15,
        flexDirection: 'row',
        gap: 10,
        borderWidth: 1,
        borderColor: theme.text_dark_faint,
        marginBottom: 15,
        borderRadius: 5,
        alignItems: 'center'
    },
    icon: {
        width: 22.5,
        height: 22.5
    },
    text: {
        color: theme.text_dark,
    },
    subtitle: {
        marginVertical: 15,
        fontSize: 18,
        fontWeight: '600',
        color: theme.text_dark
    },
    input: {
        backgroundColor: theme.background,
        marginBottom: 18
    },
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