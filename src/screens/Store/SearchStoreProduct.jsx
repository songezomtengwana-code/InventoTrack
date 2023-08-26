import { Alert, FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Badge, Searchbar } from 'react-native-paper'
import { theme } from '../../utils/theme'
import BoxArrowRight from 'react-native-bootstrap-icons/icons/box-arrow-right'

export default function SearchStoreProduct({ route }) {
    const { products } = route.params
    const [searchQuery, setSearchQuery] = useState('')
    const [inventory, setInventory] = useState(products)
    const [filteredData, setFilteredData] = useState(products);
    const [recentSearches, setrecentSearches] = useState([]);

    const handleSearch = (query) => {
        setInventory(products)
        const filtered = inventory.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filtered);
        setSearchQuery(query);
    };

    const setSearchRecord = () => {
        const updatedArray = [...recentSearches, searchQuery];
        setrecentSearches(updatedArray);
        console.log(recentSearches)
    }

    return (
        <View>
            <View style={styles.searchbar_container}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={handleSearch}
                    value={searchQuery}
                    style={styles.searchbar}
                    iconColor={theme.primary}
                    inputStyle={{ color: theme.primary }}
                    onClearIconPress={setSearchRecord}
                />
            </View>
            <View style={styles.body}>
                {searchQuery.length < 1 ? <>
                    <Text style={{ color: theme.primary, fontSize: 18, fontWeight: 'bold', marginHorizontal: 25, marginBottom: 15 }}>Recent searches</Text>
                    <ScrollView horizontal={true} style={{ marginHorizontal: 25, marginVertical: 10 }}>
                        {recentSearches.map((value) => {
                            return (
                                <Pressable onPress={() => { Alert.alert('Comming soon !') }} android_ripple={{ color: theme.third }} key={value} style={{
                                    padding: 10,
                                    backgroundColor: theme.third_faint,
                                    borderRadius: 5,
                                    marginRight: 10,
                                    paddingHorizontal: 15
                                }}><Text style={{ color: theme.primary }}>{value}</Text></Pressable>
                            )
                        })}
                    </ScrollView>
                </> :
                    <>
                        <Text style={{ color: theme.primary, fontSize: 18, fontWeight: 'bold', marginHorizontal: 25, marginBottom: 15 }}>Search Results</Text>
                        <FlatList
                            data={filteredData}
                            keyExtractor={(item) => item.id} // Replace with your document ID field
                            renderItem={({ item }) =>
                                <TouchableOpacity style={styles.item} android_ripple={theme.grey} onPress={() => { console.log(item.name); }}>
                                    <Text style={{ color: theme.primary }}>{item.name}</Text>
                                </TouchableOpacity>
                            } // Replace with your display logic
                        />
                        {filteredData.length < 1 ? <Text style={{ color: theme.primary, textAlign: 'center', marginVertical: 100, fontWeight: 'bold' }}>Item not found</Text> : <></>}
                    </>
                }
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
    },
    item: {
        padding: 20,
        marginHorizontal: 25,
        borderBottomWidth: 1
    },

})