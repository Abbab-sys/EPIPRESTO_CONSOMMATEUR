import React, {useEffect, useState} from "react";
import {ActivityIndicator, FlatList, SafeAreaView, View} from "react-native";
import {Button, IconButton, Searchbar, Snackbar, Text} from 'react-native-paper';
import {useQuery} from "@apollo/client";
import {storeStyles} from "./StoreStyles";
import {GET_STORE_VARIANTS_BY_ID} from "../../graphql/queries/GetStoreVariantsById";
import Product, {VariantProps} from "./subsections/Product";
import {Float} from "react-native/Libraries/Types/CodegenTypes";
import {useTranslation} from "react-i18next";
import {useCartManager} from "../../hooks/management/useCartManager";

export interface StoreProps {
  _id: string;
  name: string;
  address: string;
  isOpen: boolean;
  isPaused: boolean;
  shopCategory: string;
  disponibilities: string[];
}

const Store = ({idStore, goBack,route}: any) => {

  let finalStoreId = idStore;
  if (route?.params?.idStore) {
    finalStoreId = route.params.idStore;
  }
  let finalGoBack = goBack;
  if (route?.params?.goBack) {
    finalGoBack = route.params.goBack;
  }

  const {t} = useTranslation('translation')

  console.log("route", finalStoreId)

  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(true);

  const onDismissSnackBar = () => setVisible(false);

  const storeId = finalStoreId
  //const storeId = "6362d3db4506a1e7168c4cac"

  const [searchQuery, setSearchQuery] = useState('');


  const [variants, setVariants] = useState<VariantProps[]>([])

  const [store, setStore] = useState<StoreProps>();

  const handleSearch = (text: React.SetStateAction<string>) => {
    setSearchQuery(text)
    if (text.toString() === "") {
      setVariants([])
      if (data) {
        const products = data.getStoreById.store.products
        // get all variants of all products
        const variants = products.map((product: any) => {
          return product.variants
        })
        // flatten array of arrays
        const flattened = [].concat.apply([], variants)
        setVariants(flattened)
      }
    } else {
      const data = variants.filter(variant => {
        return variant.displayName.toLowerCase().includes(text.toString().toLowerCase())
      })
      setVariants(data)
    }
  }

  const {data, loading, error, fetchMore} = useQuery(GET_STORE_VARIANTS_BY_ID, {
    variables: {
      idStore: storeId, "offset": 0, "first": 20
    },
    fetchPolicy: 'network-only',
    onCompleted(data) {
      // set store for only storeProps
      setStore(data.getStoreById.store)
      const products = data.getStoreById.store.products
      console.log("products", products)
      // consider only products that are published
      const publishedProducts = products.filter((product: any) => {
        return product.published
      })
      // get all variants of all products
      const variants = publishedProducts.map((product: any) => {
        return product.variants
      })
      // flatten array of arrays
      const flattened = [].concat.apply([], variants)
      // consider only variants that are available for sale
      const availableVariants = flattened.filter((variant: any) => {
        return variant.availableForSale
      })
      setVariants(availableVariants)
      console.log("variants", availableVariants.length)
    },
  });

  const searchPlaceholder = t('store.search.placeholder')

  // close snackbar after 3 seconds
  useEffect(() => {
    if (visible) {
      const timeout = setTimeout(() => onDismissSnackBar(), 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [visible]);

  //useCartManager
  const {addVariantToCart} = useCartManager();


  return (
    <SafeAreaView style={storeStyles.root}>
      <View style={storeStyles.view}>
        <View style={{flexDirection: 'row'}}>
          <IconButton 
                onPress={() => {finalGoBack()}}
                mode="contained"
                icon="arrow-left-circle"
                iconColor="#FFA500"
                style={{backgroundColor: '#F2F4F8',
              //place icon in the start of the row
              alignSelf: 'flex-start',
             }}

                />
          <Text variant="headlineMedium" style={storeStyles.headline}>
            {store ? store.name : t('store.data.loading')}
          </Text>
        </View>
        <Text variant="labelLarge"
              style={store ? (!data.getStoreById.store.isOpen || store.isPaused) ? 
              {color: "red"} : {color: "green"} : {}}>
          {store ? (store.isOpen && !store.isPaused) ? t('store.open') : (store.isPaused ? t('store.paused') :t('store.closed')) : ""}
        </Text>
        <Text variant="labelSmall">
          {store ? store.address : ""}
        </Text>
      </View>
      <View>
        <Searchbar style={storeStyles.searchBar} placeholder={searchPlaceholder} onChangeText={handleSearch}
                   value={searchQuery}/>
      </View>

      <SafeAreaView style={{flex: 1}}>
        {loading ? (
          <View style={storeStyles.innerContainer}>
            <ActivityIndicator size="large" color="#FFA500"></ActivityIndicator>
          </View>
        ) : error ? (
            <View style={storeStyles.innerContainer}>
              <Text style={storeStyles.errorText}>{t('store.data.error')}</Text>
            </View>)
          : (
            variants.length === 0 ?

              (<Text>{t('store.data.noProducts')}</Text>)
              :
              (
                <FlatList
                  numColumns={2}
                  data={variants}

                  renderItem={({item}) =>
                    <Product
                      _id={item._id}
                      displayName={item.displayName}
                      // if no image, use default image
                      imgSrc={item.imgSrc ? item.imgSrc : "https://img.icons8.com/ios/452/no-image.png"}
                      stock={item.stock}
                      price={item.price}
                      byWeight={item.byWeight}
                      taxable={item.taxable}
                      relatedProduct={item.relatedProduct}
                      availableForSale={item.availableForSale}
                      relatedStoreIsPaused={data.getStoreById.store.isPaused}
                      addToCart={(quantity: Float) => {
                        addVariantToCart({
                          variantId: item._id,
                          variantName: item.displayName,
                          storeId: storeId,
                          storeName: data.getStoreById.store.name,
                          price: item.price,
                          imageSrc: item.imgSrc ? item.imgSrc : "https://img.icons8.com/ios/452/no-image.png",
                          taxable: item.taxable,

                        }, quantity)
                        console.log("nb items", quantity)
                        onToggleSnackBar()
                      }}
                    />
                  }
                  keyExtractor={item => item._id}
                  onEndReachedThreshold={1}
                  onEndReached={() => {
                    fetchMore({
                      variables: {
                        offset: variants.length
                      },
                      updateQuery(previousQueryResult, {fetchMoreResult}) {
                        console.log("fetchMoreResult", fetchMoreResult)
                        const products = fetchMoreResult.getStoreById.store.products
                        // get all variants of all products
                        const newEntries = products.map((product: any) => {
                          return product.variants
                        })
                        // flatten array of arrays
                        const newEntriesFlattened = [].concat.apply([], newEntries)
                        setVariants(oldVariants => [...oldVariants, ...newEntriesFlattened])
                      },
                    })
                  }
                  }
                />

              )
          )}

      </SafeAreaView>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={{backgroundColor: "#F2F4F8"}}
        theme={{colors: {surface: 'black'}}}
        action={{
          label: 'Ok',
          onPress: () => {
            console.log('Pressed');
          },
        }}>
        {t('store.addProduct.success')}
      </Snackbar>
    </SafeAreaView>
  )
}

export default Store
