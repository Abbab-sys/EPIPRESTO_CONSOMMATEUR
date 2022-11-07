import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, View } from "react-native";
import { Searchbar, Snackbar, Text } from 'react-native-paper';
import { useQuery } from "@apollo/client";
import { storeStyles } from "./StoreStyles";
import { GET_STORE_VARIANTS_BY_ID } from "../../graphql/queries/GetStoreVariantsById";
import Product, { VariantProps } from "./subsections/Product";

const Store = ({ route,navigation }: any) => {

  console.log("route",route.params.idStore)

  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(true);

  const onDismissSnackBar = () => setVisible(false);

  const storeId = route.params.idStore
  //const storeId = "6362d3db4506a1e7168c4cac"

  const [searchQuery, setSearchQuery] = useState('');


  const [variants, setVariants] = useState<VariantProps[]>([])

  const handleSearch = (text: React.SetStateAction<string>) => {
    setSearchQuery(text)
    if(text.toString() === "") {
      setVariants([])
      if(data) {
        const products = data.getStoreById.store.products
        // get all variants of all products
        const variants = products.map((product: any) => {
            return product.variants
            })
        // flatten array of arrays
        const flattened = [].concat.apply([], variants)
        setVariants(flattened)
      }
    }
    else {
      const data = variants.filter(variant => {
        return variant.variantTitle.toLowerCase().includes(text.toString().toLowerCase())
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
        const products = data.getStoreById.store.products
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
        console.log("variants",variants.length)
    },
  });

    const searchPlaceholder = "Rechercher un produit"

    // close snackbar after 3 seconds
    useEffect(() => {
      if (visible) {
        const timeout = setTimeout(() => onDismissSnackBar(), 3000);
        return () => {
          clearTimeout(timeout);
        };
      }
    }, [visible]);


  return(
    <SafeAreaView style={storeStyles.root}>
      <View style={storeStyles.view}>
        <Text variant="headlineMedium" style={storeStyles.headline}>
          {data ? data.getStoreById.store.name : "Loading Store ..."}
        </Text>
        <Text variant="labelLarge" style={data ? data.getStoreById.store.isOpen ? {color: "green"} : {color: "red"} : {}}>
          {data ? data.getStoreById.store.isOpen ? "Ouvert" : "Fermé" : ""}
        </Text>
        <Text variant="labelSmall">
          {data ? data.getStoreById.store.address : ""}
        </Text>
      </View>
      <View>
        <Searchbar style={{marginVertical: 10, marginHorizontal:20}} placeholder={searchPlaceholder} onChangeText={handleSearch} value={searchQuery}/>
      </View>

      <SafeAreaView style={{flex: 1}}>
        {loading ? (
            <View style={storeStyles.innerContainer}>
              <ActivityIndicator size="large" color="#FFA500"></ActivityIndicator>
            </View>
          ) : error ? (
            <View style={storeStyles.innerContainer}>
              <Text style={storeStyles.errorText}>OOPS UNE ERREUR EST SURVENUE</Text>
            </View>)
          : (
            variants.length === 0 ? 
            
              (<Text>YOUR RESEARCH DOES NOT MATCH ANY ITEM</Text>)
              : 
              (
                <FlatList
                numColumns={2}
                data={variants}

                renderItem={({item}) => 
                  <Product
                    _id={item._id}
                    variantTitle={item.variantTitle}
                    // if no image, use default image
                    imgSrc={item.imgSrc ? item.imgSrc : "https://img.icons8.com/ios/452/no-image.png"}
                    stock={item.stock}
                    price={item.price}
                    byWeight={item.byWeight}
                    taxable={item.taxable}
                    relatedProduct={item.relatedProduct}
                    availableForSale={item.availableForSale}
                    addToCart={(quantity: number) => {
                      console.log("nb items", quantity)
                      onToggleSnackBar()
                  }}
                    /> 
                }
                keyExtractor={item => item._id}
                onEndReachedThreshold={1}
                  onEndReached={() => 
                    {
                      fetchMore({
                        variables: {
                          offset: variants.length
                        },
                        updateQuery(previousQueryResult, { fetchMoreResult }) {
                          const products = fetchMoreResult.getStoreById.store.products
                          // get all variants of all products
                          const newEntries = products.map((product: any) => {
                              return product.variants
                              })
                          // flatten array of arrays
                          const newEntriesFlattened = [].concat.apply([], newEntries)
                          setVariants(oldProducts => [...oldProducts, ...newEntriesFlattened])
                        },
                      })
                    }
                  }
                />
                
              )
          ) }

      </SafeAreaView>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Ok',
          onPress: () => {
            console.log('Pressed');
          },
        }}>
        Item added to cart!
      </Snackbar>
    </SafeAreaView>
  )
}

export default Store