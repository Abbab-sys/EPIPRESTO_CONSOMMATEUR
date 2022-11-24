import React from 'react';
import {FlatList, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, View,} from 'react-native';
import {ActivityIndicator, Searchbar} from 'react-native-paper';
import {useSearch} from '../../hooks/useSearch';
import SearchItem from './SearchItem';
import {useTranslation} from "react-i18next";

const Search = () => {
  const {search, results, loading, searchText, setSearchText} = useSearch();
  const {t} = useTranslation('translation')
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.root}>
        <View style={styles.header}>
          <View style={styles.headerTextWrapper}>
            <Text style={styles.headerText}>Search</Text>
          </View>
          <View style={styles.headerSearchBar}>
            <Searchbar onIconPress={() => {
              search(searchText)
            }} elevation={0} placeholder={t('dashboard.search')} onChangeText={setSearchText} value={searchText}/>
          </View>
        </View>
        <View style={styles.searchResults}>
          {loading ? (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color="#FFAA55"/>
            </View>
          ) : (
            <FlatList
              data={results}
              renderItem={({item}) => (
                <SearchItem item={item}/>
              )}
              keyExtractor={item => item.store.id}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: '2%',
  },
  searchBarColor: {},
  header: {
    flex: 144,
    justifyContent: 'space-evenly',
  },
  headerTextWrapper: {
    flex: 35,
  },
  headerText: {
    alignSelf: 'center',
    fontSize: 36,
    fontWeight: '700',
    fontFamily: 'Lato',
    color: '#000000',
    lineHeight: 40,
  },
  headerSearchBar: {
    flex: 32,
  },
  searchResults: {
    flex: 584,
    marginTop: '5%',
  },

  searchIcon: {
    border: '1px solid #F1F1F1',
    boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 10,
    // opacity: 0
  },
  searchBar: {
    flex: 50,
    marginBottom: '2%',
    marginTop: '1%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(242, 244, 248, 0.93)',
    elevation: 5,
  },
  epiprestoTitle: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 36,
    color: '#000000',
  },
  title: {
    // flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  categoriesTitle: {
    flex: 3,
    color: '#FFAA55',
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: 20,
  },
  subCategoriesTitle: {
    // flex: 277,
    color: '#FFAA55',
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: 20,
  },
  nearbyShopsContainer: {
    // backgroundColor: '#F2F4F8'
    flex: 207,
    flexDirection: 'column',
  },
  seeAll: {
    color: '#000000',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontSize: 15,
  },
  categoriesContainer: {
    flex: 131,
  },
  latestOrdersContainer: {
    flex: 177,
  },
});

export default Search;
