import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'
import { theme } from '../../utils/theme'
import SearchIcon from 'react-native-bootstrap-icons/icons/search'
import { ScrollView } from 'react-native-gesture-handler'
import ProductCard from '../../components/ProductCard'
import { get_inventory, inventory } from '../../services/firebase'

const InventoryScreen = () => {
return (
        <View style={styles.view}>
            <TextInput
                right={<SearchIcon fill={theme.primary_faint} />}
                mode='outlined'
                outlineColor={theme.primary}
                label='Search'
                activeOutlineColor={theme.primary}
                style={styles.input} />

            <ScrollView>
                <View style={styles.container}>
                    <ProductCard/>
                </View>
            </ScrollView>
        </View>
    )
}

export default InventoryScreen

const styles = StyleSheet.create({
    view: {
        padding: 25
    },
    input: {
        backgroundColor: theme.background,
        marginBottom: 25
    },
    container: {
        paddingBottom: 50
    }
})