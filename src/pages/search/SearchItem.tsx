import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Image, ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SearchResult} from '../../hooks/useSearch';
import ProductsInShopSearch from './subsections/ProductsInShopSearch';

const SearchItem = ({item}: { item: SearchResult }) => {
  const { t } = useTranslation('translation')
  const navigation = useNavigation()
  return (
    <View style={styles.root}>
      <View style={styles.productsView}>
        <ScrollView horizontal style={{flex:1}}>
          {item.matchingProducts.map(product => (
            <ProductsInShopSearch key={product._id} id={product._id} imgSrc={product.imgSrc} title={product.title} tags={product.tags} />
          ))}
        </ScrollView>
      </View>
      <View style={styles.verticalMargin}/>
      <View style={styles.storeView}>
        <View style={styles.storeNameView}>
        <Text style={styles.storeName}>{item.store.name}</Text>
        <Text style={[(item.store.isOpen && !item.store.isPaused) ? {color: 'green'} : {color: 'red'}]}>
        {(item.store.isOpen && !item.store.isPaused) ? t('stores.store.open') : (item.store.isPaused ? t('stores.store.paused') : t('stores.store.closed'))}
          </Text>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={()=>{
            navigation.navigate('Store' as never, {idStore: item.store.id,goBack:navigation.goBack} as never);
          }}>
            <Text style={styles.buttonText}>{t("searchPage.seeAll")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: 200,
    margin: '2%',
    padding: '2%',
    flexDirection: 'column',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
  },
  verticalMargin: {
    flex: 12,
  },
  productsView: {
    flex: 73,
    flexDirection: 'row',
  },
  storeView: {
    flex: 32,
    flexDirection: 'row',
  },
  storeNameView: {
    flex: 225,
  },
  buttonView: {
    flex: 82,
  },
  storeName: {
    fontFamily: 'Lato',
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'normal',
    color: 'black',
  },
  button: {
    backgroundColor: '#FFAA55',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    width: '100%',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
});

export default SearchItem;
