import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, View } from "react-native";
import { Button, Card, Searchbar, Snackbar, Text } from 'react-native-paper';
import { useQuery } from "@apollo/client";
import { storeStyles } from "./StoreStyles";
import { GET_STORE_VARIANTS_BY_ID } from "../../graphql/queries/GetStoreVariantsById";
import Product, { VariantProps } from "./subsections/Product";
import { productStyles } from "./subsections/ProductStyles";
import { ClientAuthenticationContext } from "../../context/ClientAuthenticationContext";

const Stores = ({ navigation }: any) => {

  const storeId = "6362d3db4506a1e7168c4cac"

  // get client id from context
const {clientId} = useContext(ClientAuthenticationContext);

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
    },
  });

    const searchPlaceholder = "Rechercher un magasin"

  return(
    <SafeAreaView style={storeStyles.root}>
      <View style={storeStyles.view}>
        <Text variant="headlineMedium" style={storeStyles.headline}>
          NEARBY STORES
        </Text>
        <Text variant="titleMedium">
            Only stores within a 15 km radius are shown
        </Text>
      </View>

      <SafeAreaView style={{flex: 1 , marginVertical:10}}>
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
            
              (<Text>YOUR RESEARCH DOES NOT MATCH ANY STORE</Text>)
              : 
              (
                <FlatList
                numColumns={2}
                data={variants}

                renderItem={({item}) => 
                <View style={productStyles.root}>
                <Card style={productStyles.cardStyle}>
                  <View 
                  // put buttons and stock in a row
                  style={{ marginTop: '4%', justifyContent: 'center'}}
                  >
                  <Text ellipsizeMode='tail' numberOfLines={2} variant="titleMedium" style={productStyles.productInfo}>
                    Nom store 
                  </Text>
                  <Text ellipsizeMode='tail' numberOfLines={2} variant="labelSmall" style={productStyles.productInfo}>
                    Adresse ici
                  </Text>
                  </View>                  
                  <View 
                  // put buttons and stock in a row
                  style={{flexDirection: 'row', justifyContent: 'center', marginTop: '4%'}}
                  >
                      <Button
                      onPress={() => {navigation.navigate('Store', {idStore: "6362d3db4506a1e7168c4cac"})}}
                      > View </Button>
                  </View>
                </Card>
              </View>
                }
                />
                
              )
          ) }

      </SafeAreaView>
    </SafeAreaView>
  )
}

export default Stores