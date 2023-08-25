import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Searchbar } from 'react-native-paper'
import { theme } from '../../utils/theme'
import LoadingComponent from '../../components/LoadingComponent'

export default function SearchStoreProduct() {
    const [searchQuery, setSearchQuery] = useState(null)
    return (
        <View>
            <View style={styles.searchbar_container}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={(text) => { setSearchQuery(text) }}
                    value={searchQuery}
                    style={styles.searchbar}
                    iconColor={theme.primary}
                    inputStyle={{ color: theme.primary }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    searchbar_container: {
        padding: 25
    },
    searchbar: {
        backgroundColor: theme.background,
        borderWidth: 1
    }
})