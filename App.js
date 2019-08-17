import React, { useState, useEffect } from 'react';
import { StatusBar, FlatList, StyleSheet, Text, View, ActivityIndicator, Alert, BackHandler, Platform } from 'react-native';
import Article from './components/Article'
import FooterFLatList from './components/FooterFlatList'

export default function App() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setpageNumber] = useState(1);
  const [articles, setArticles] = useState([]);
  const [endPage, setEndPage] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const getNews = async () => {
    const API_KEY = 'f959f3ff2f1f408388fadd44e4ca31a7';
    const api = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + API_KEY + '&page=' + pageNumber;

    try {
      const response = await fetch(api);
      const jsonData = await response.json();

      if (jsonData.articles.length != 0) {
        setArticles(articles.concat(jsonData.articles));
        setpageNumber(pageNumber + 1);
      }
      else {
        setEndPage(true);
      }
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  const renderArticleItem = ({ item }) => {
    return (
      <Article key={item.publishedAt} article={item} />
    )
  };

  const LoadMoreNews = () => {
    getNews(articles);
  };

  useEffect( () => {
    setRefresh(true);
    setpageNumber(1);
    setArticles([]);
    getNews();
    setRefresh(false);
  }, [refresh]);

  if (!error)
    if (loading)
      return (
        <View style={styles.loading}>
          <ActivityIndicator size='large' animating={loading} />
          <Text>Loading data...</Text>
        </View>
      )
    else
      return (
        <View style={styles.container}>
          <View style={styles.countArticlesWrapper}>
            <Text style={styles.textCountArticles}>Articles Count: </Text>
            <Text style={styles.textCount}>{articles.length}</Text>
          </View>
          <FlatList
            style={styles.flatlistWrapper}
            data={articles}
            renderItem={renderArticleItem}
            keyExtractor={item => (item.publishedAt + item.source.name)}
            onRefresh={() => setRefresh(true)}
            refreshing={refresh}
            onEndReachedThreshold={0.3}
            onEndReached={() => LoadMoreNews()}
            ListFooterComponent={<FooterFLatList endPage={endPage}/>}
          />
        </View>
      );
  else {
    Alert.alert(
      'Warning',
      'Can not load data from newsapi.org\nPlease check your connection and try again.',
      [
        { text: 'OK', onPress: () => (Platform.OS === 'android' ? BackHandler.exitApp() : exit(9)) },
      ],
      { cancelable: false },
    );
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: '#e6e6e6'
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  countArticlesWrapper: {
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    flex: 0.05,
  },
  textCountArticles: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  textCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray'
  },
  flatlistWrapper: {
    flex: 0.95,
  }
});
