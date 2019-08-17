import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'

const FooterFlatList = ({ endPage }) => {
    if (endPage) {
        return (
            <View style={styles.container}>
                <Text>---- THE END ----</Text>
            </View>
        )
    }
    else {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" loading={!endPage} />
                <Text>Load more...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default FooterFlatList
