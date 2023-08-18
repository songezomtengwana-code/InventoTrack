import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { theme } from '../utils/theme'
import ExclamationCircleFill from 'react-native-bootstrap-icons/icons/exclamation-circle-fill'

export default function StockTrackerBadges({ stockValue }) {
    if (stockValue < 1) {
        return (
            <View
                style={[styles.warning, {backgroundColor: '#ff0000'}]}
            >
                <ExclamationCircleFill fill={theme.background} />
                <Text style={styles.warning_text}>No stock is left</Text>
            </View>
        )
    } else if (stockValue < 50) {
        return (
            <View
                style={[styles.warning, {backgroundColor: '#eb6b34'}]}
            >
                <ExclamationCircleFill fill={theme.background} />
                <Text style={styles.warning_text}>Running low on stock</Text>
            </View>
        )
    } else {
        return (
            <View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    warning: {
        padding: 15,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        gap: 10,
        alignItems: 'center',
        // borderBottomEndRadius: 10,
        // borderBottomStartRadius: 10,
        paddingVertical: 10
    },
    warning_text: {
        color: theme.background
    }
})