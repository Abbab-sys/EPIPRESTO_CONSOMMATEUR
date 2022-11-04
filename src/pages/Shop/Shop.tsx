import React, { useState } from "react";
import { ActivityIndicator, Alert, Button, FlatList, Image, Keyboard, SafeAreaView, TouchableOpacity, View } from "react-native";
import { IconButton, Searchbar, Text } from 'react-native-paper';
import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { shopStyles } from "./ShopStyles";
import Variant, { VariantProps } from "./subsections/Product";
import { GET_STORE_VARIANTS_BY_ID } from "../../graphql/queries/GetStoreVariantsById";

const Shop = ({ navigation }: any) => {

  const storeId = "STORE_ID"

  const [searchQuery, setSearchQuery] = useState('');

  //const { loading, error, data } = useQuery(GET_STORE_VARIANTS_BY_ID, {variables: {idStore: storeId, "offset": 0, "first": 20}})

  const [variants, setVariants] = useState<VariantProps[]>([])

  const [updateCount, setUpdateCount] = useState(0)

  const [updatedVariants, setUpdatedVariants] = useState<VariantProps[]>([])

  const {t} = useTranslation('translation')

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
        console.log("DATA",data)
        const products = data.getStoreById.store.products
        // get all variants of all products
        const variants = products.map((product: any) => {
            return product.variants
            })
        // flatten array of arrays
        const flattened = [].concat.apply([], variants)
        setVariants(flattened)
    },
  });

  const succesAddMessage = "Stock modifié avec succès!"
    const failAddMessage = "Une erreur est survenue lors de la modification du stock. Veuillez réessayer."
    
    const alertOnSave = (succes: boolean) =>
        Alert.alert(
        succes? "Succes" : "Erreur",
        succes? succesAddMessage: failAddMessage,
        succes? [
            { text: "OK", onPress: () =>{navigation.goBack()}}
        ] : [
            { text: "OK", onPress: () =>  {} }
        ]
    );

  const messageBack = "Voulez-vous vraiment quitter la page? Toutes les modifications non sauvegardées seront perdues."
    const backToInventory = () => {
      setUpdateCount(0)
      Keyboard.dismiss()
      if(submitButtonShouldBeDisabled()){
        navigation.goBack()
      }
      else{
        Alert.alert(
          "Alert",
          messageBack,
          [
            { text: "Quitter", onPress: () => navigation.goBack() },
            { text: "Annuler", onPress: () => {} }
          ]
        );
      }
    }


    const submitButtonShouldBeDisabled = () => {
        console.log("updateCount: " + updateCount)
        if (updateCount === 1) {
          return true
        }
        else if (updatedVariants.length > 0) {
          return false
        }
    }

    const searchPlaceholder = t('searchBarPlaceholder')


  return(
    <SafeAreaView style={shopStyles.root}>
      <View style={shopStyles.view}>
        <Text variant="headlineMedium" style={shopStyles.headline}>
          STOCK
        </Text>
      </View>
      <View>
      <TouchableOpacity
                    style={shopStyles.back_button}
                    onPress={() => backToInventory()}>
                    <Image
                        style={shopStyles.back_button_icon}
                        source={require('../../assets/icons/back.png')}
                    />
      </TouchableOpacity>
                
        <IconButton  style={{alignSelf:'flex-end'}}
          onPress={() => {}}
          disabled={submitButtonShouldBeDisabled()}
          mode="contained"
          containerColor="black"
          iconColor="#FFA500"
          icon="content-save-edit"
          size={30}/>
        <Searchbar style={{marginVertical: 10}} placeholder={searchPlaceholder} onChangeText={handleSearch} value={searchQuery}/>
      </View>

      <SafeAreaView style={{flex: 1}}>
        {loading ? (
            <View style={shopStyles.innerContainer}>
              <ActivityIndicator size="large" color="#FFA500"></ActivityIndicator>
            </View>
          ) : error ? (
            <View style={shopStyles.innerContainer}>
              <Text style={shopStyles.errorText}>OOPS UNE ERREUR EST SURVENUE</Text>
            </View>)
          : (
            variants.length === 0 ? 
            
              (<Text>YOUR RESEARCH DOES NOT MATCH ANY ITEM</Text>)
              : 
              (
                console.log("variants", variants),
                <FlatList
                numColumns={2}
                data={variants}

                renderItem={({item}) => 
                  <Variant
                    _id={item._id}
                    variantTitle={item.variantTitle}
                    // if no image, use default image
                    imgSrc={item.imgSrc ? item.imgSrc : "https://img.icons8.com/ios/452/no-image.png"}
                    stock={item.stock}
                    updateSelf={(newStock: number) => {
                        const newVariants = variants.map((variant) => {
                            if(variant._id === item._id) {
                                variant.stock = newStock
                            }
                            return variant
                        })
                        setVariants(newVariants)
                        setUpdateCount(updateCount + 1)
                        if(!updatedVariants.includes(item) && updateCount > 0) {
                            setUpdatedVariants([...updatedVariants, item]);
                        }
                    }}
                    /> 
                }
                keyExtractor={item => item._id}
                onEndReachedThreshold={1}
                  onEndReached={() => 
                    {
                      console.log("END REACHED")
                      fetchMore({
                        variables: {
                          offset: variants.length
                        },
                        updateQuery(previousQueryResult, { fetchMoreResult }) {
                          console.log("FETCH MORE RESULT", fetchMoreResult.getStoreById.store.products)
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
    </SafeAreaView>
  )
}

export default Shop