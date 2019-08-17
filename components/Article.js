import React from 'react'
import { StyleSheet, View, Text, Linking } from 'react-native'
import moment from 'moment';
import { Card, Button, Icon } from 'react-native-elements';

const Article = ({ article }) => {
    const onPressButtonReadMore = (url) => {
        Linking.canOpenURL(url).then(supported => {
          if (supported) {
            Linking.openURL(url);
          } else {
            console.log(`Don't know how to open URL: ${url}`);
          }
        });
      };

    return (
        <Card title={article.title} image={{ uri: article.urlToImage }}>
            <View style={styles.row}>
                <Text style={styles.label}>Source</Text>
                <Text style={styles.info}>{article.source.name}</Text>
            </View>
            <Text style={styles.info}>{article.content}</Text>
            <View style={styles.row}>
                <Text style={styles.label}>Published</Text>
                <Text style={styles.info}>
                    {moment(article.publishedAt).format('LLL')}
                </Text>
            </View>
            <Button icon={<Icon />} title="Read more" backgroundColor="#03A9F4" onPress={() => onPressButtonReadMore(article.url)}/>
        </Card>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    label: {
        fontSize: 16,
        color: 'black',
        marginRight: 10,
        fontWeight: 'bold'
    },
    info: {
        fontSize: 16,
        color: 'grey'
    }
});

export default Article
