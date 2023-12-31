import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { theme, windowHeight, windowWidth } from '../../utils/theme'
import { Button, Modal, PaperProvider, Portal, TextInput } from 'react-native-paper'
import { launchCamera } from 'react-native-image-picker'
import { firebaseUploadProductImage, upload_store_product_image, uuid } from '../../services/firebase'
import { useNavigation } from '@react-navigation/native'
import LoadingComponent from '../../components/LoadingComponent'
import { Camera } from 'expo-camera';

// icons
import UpcScan from 'react-native-bootstrap-icons/icons/upc-scan'
import NewProductModal from '../../components/NewProductModal'
import { environments } from '../../utils/environment'

function ScannerScreen({ route }) {
    const { branchName, store_id } = route.params;
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: '#00000030', paddingVertical: 30, paddingHorizontal: 25 };

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
    const [response, setResponse] = React.useState(null)
    const [scanner, setScanner] = React.useState(false)
    const [scanned, setScanned] = React.useState(false)
    const [image, setImage] = React.useState(environments.product_placeholder)
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
        upload_store_product_image(source)
    }

    const product = {
        id: uuid(),
        name: name,
        description: description,
        category: category,
        barcode: barcode,
        quantity: quantity,
        price: price,
        imageurl: image,
        location: {
            aisle: aisle,
            shelf: shelf
        },
        createdAt: Date(),
        updatedAt: Date()
    }

    const handleBarCodeScanned = () => {
        console.log('barcode scanned successfully')
    }

    const submit = async () => {
        if (!name || !category || !quantity || !price || !barcode || !aisle || !shelf) {
            setDisable(true)
            console.log('disable: ' + disabled);
            Alert.alert('Missing Information', 'Please make sure to fill in all of the fields')
        } else {
            showModal()
        }
    }

    return (
        <ScrollView>
            {loading ? <LoadingComponent text="Adding New Product..." /> : <></>}
            <PaperProvider>
                <View style={styles.screen}>
                    <Text style={styles.title}>Add a new product</Text>
                    {/* <View style={styles.options}>
                        <TouchableOpacity style={styles.button} onPress={upload_product_image}>
                            <Camera fill={theme.third} />
                            <Text style={styles.text}>Take Product Picture</Text>
                        </TouchableOpacity>
                    </View>
                    {response?.assets &&
                        response?.assets.map(image => (
                            <View key={image.uri}>
                                <View style={styles.image}>
                                    <Image
                                        resizeMode="cover"
                                        resizeMethod="scale"
                                        style={{ width: 150, height: 150 }}
                                        source={{ uri: image.uri }}
                                    />
                                </View>
                            </View>
                        ))} */}
                    {
                        visiblity ? <View>
                            <TextInput
                                key={inputs[0].key}
                                style={styles.input}
                                mode='outlined'
                                inputMode={inputs[0]?.type}
                                outlineColor={theme.primary}
                                textColor={theme.text_dark}
                                placeholderTextColor={theme.primary}
                                activeOutlineColor={theme.primary}
                                editable={inputs[0].editable}
                                value={inputs[0].value}
                                label={inputs[0].label}
                                onChangeText={(text) => { setName(text) }}
                            />
                            <TextInput
                                key={inputs[2].key}
                                style={styles.input}
                                mode='outlined'
                                inputMode={inputs[2]?.type}
                                outlineColor={theme.primary}
                                textColor={theme.text_dark}
                                placeholderTextColor={theme.primary}
                                activeOutlineColor={theme.primary}
                                editable={inputs[2].editable}
                                value={inputs[2].value}
                                label={inputs[2].label}
                                onChangeText={(text) => { setDescription(text) }}
                                multiline={true}
                                numberOfLines={5}

                            />
                            <View style={styles.pair}>
                                <TextInput
                                    style={[styles.input, { width: '80%', margin: 0 }]}
                                    mode='outlined'
                                    inputMode={inputs[1]?.type}
                                    outlineColor={theme.primary}
                                    textColor={theme.text_dark}
                                    placeholderTextColor={theme.primary}
                                    activeOutlineColor={theme.primary}
                                    editable={inputs[1].editable}
                                    value={inputs[1].value}
                                    label={inputs[1].label}
                                    onChangeText={(text) => { setBarcode(text) }}
                                />
                                <Pressable style={styles.pair_button} android_ripple={{ color: theme.third }} onPress={() => {
                                    setScanner(true)
                                }}>
                                    <UpcScan fill={theme.primary} />
                                </Pressable>
                            </View>
                            <TextInput
                                key={inputs[3].key}
                                style={styles.input}
                                mode='outlined'
                                inputMode={inputs[3]?.type}
                                outlineColor={theme.primary}
                                textColor={theme.text_dark}
                                placeholderTextColor={theme.primary}
                                activeOutlineColor={theme.primary}
                                editable={inputs[3].editable}
                                value={inputs[3].value}
                                label={inputs[3].label}
                                onChangeText={(text) => { setCategory(text) }}
                            />
                            <Text style={styles.subtitle}>Location</Text>
                            <View style={styles.location}>
                                <TextInput
                                    key={location[0].key}
                                    style={styles.input_location}
                                    mode='outlined'
                                    outlineColor={theme.primary}
                                    textColor={theme.text_dark}
                                    placeholderTextColor={theme.primary}
                                    activeOutlineColor={theme.primary}
                                    editable={location[0].editable}
                                    label={location[0].label}
                                    onChangeText={(text) => { setAisle(text) }}
                                />
                                <TextInput
                                    key={location[1].key}
                                    style={styles.input_location}
                                    mode='outlined'
                                    outlineColor={theme.primary}
                                    textColor={theme.text_dark}
                                    placeholderTextColor={theme.primary}
                                    activeOutlineColor={theme.primary}
                                    editable={location[1].editable}
                                    value={location[1].value}
                                    label={location[1].label}
                                    onChangeText={(text) => { setShelf(text) }}
                                />
                            </View>
                            <View style={styles.location}>
                                <TextInput
                                    key={inputs[4].key}
                                    style={styles.input_location}
                                    mode='outlined'
                                    inputMode={inputs[4]?.type}
                                    outlineColor={theme.primary}
                                    textColor={theme.text_dark}
                                    placeholderTextColor={theme.primary}
                                    activeOutlineColor={theme.primary}
                                    editable={inputs[4].editable}
                                    value={inputs[4].value}
                                    label={inputs[4].label}
                                    onChangeText={(text) => { setQuantity(text) }}
                                /><TextInput
                                    key={inputs[5].key}
                                    style={styles.input_location}
                                    mode='outlined'
                                    inputMode={inputs[5]?.type}
                                    outlineColor={theme.primary}
                                    textColor={theme.text_dark}
                                    placeholderTextColor={theme.primary}
                                    activeOutlineColor={theme.primary}
                                    editable={inputs[5].editable}
                                    value={inputs[5].value}
                                    label={inputs[5].label}
                                    onChangeText={(text) => { setPrice(text) }}
                                />
                            </View>

                            <Pressable android_ripple={{ color: theme.light }} style={styles.submit} onPress={submit} onLongPress={showModal} >
                                <Text style={{ color: theme.background }}>Complete</Text>
                            </Pressable>
                        </View> : <></>
                    }
                    <Portal>
                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                            <NewProductModal product={product} sid={store_id} />
                        </Modal>
                    </Portal>
                </View>
            </PaperProvider>
        </ScrollView>
    )
}

export default ScannerScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
      },
      camera: {
        flex:1,
        width: 100,
        height: 100
    },
    screen: {
        padding: 25,
        flexDirection: 'column',
        gap: 15,
        minHeight: windowHeight - 2.5
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.text_dark,
        marginBottom: 20
    },
    button: {
        padding: 15,
        flexDirection: 'row',
        gap: 10,
        borderWidth: 1,
        borderColor: theme.text_dark_faint,
        marginBottom: 15,
        borderRadius: 5,
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
        marginBottom: 18,
        color: theme.text_dark
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
    },
    pair: {
        flexDirection: 'row',
        gap: 15,
        alignItems:'center',
        justifyContent: 'space-between',
    },
    pair_button: {
        width: '15%',
        height: 50,
        borderRadius: 5,
        marginBottom: 15,
        borderColor: theme.third,
        backgroundColor: theme.third_faint,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})