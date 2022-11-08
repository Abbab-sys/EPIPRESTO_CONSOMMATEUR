import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, View } from "react-native";
import { Button, Card, Searchbar, Snackbar, Text } from 'react-native-paper';
import { useQuery, useSubscription } from "@apollo/client";
import { storeStyles } from "./StoreStyles";
import { GET_STORE_VARIANTS_BY_ID } from "../../graphql/queries/GetStoreVariantsById";
import Product, { VariantProps } from "./subsections/Product";
import { productStyles } from "./subsections/ProductStyles";
import { ClientAuthenticationContext } from "../../context/ClientAuthenticationContext";
import { GET_CLIENT_ACCOUNT_BY_ID } from "../../graphql/queries/GetClientAccountById";

export interface StoreProps {
  _id: string;
  name: string;
  address: string;
  isOpen: boolean;
}


const Stores = ({ navigation }: any) => {

  const storeId = "6362d3db4506a1e7168c4cac"

  // get client id from context
const {clientId} = useContext(ClientAuthenticationContext);

console.log("client id", clientId)

  const [searchQuery, setSearchQuery] = useState('');

  /*const { data, loading } = useSubscription(
    COMMENTS_SUBSCRIPTION,
    { variables: { postID } }
  );*/

  const [stores, setStores] = useState<StoreProps[]>([])


  const {data, loading, error, fetchMore} = useQuery(GET_CLIENT_ACCOUNT_BY_ID, {
    variables: {
      idClient: clientId, distance: 15
    },
    fetchPolicy: 'network-only',
    onCompleted(data) {
        setStores(data.getClientAccountById.clientAccount.nearbyShops)
        console.log("stores", stores)
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
            stores.length === 0 ? 
            
              (<Text>YOUR RESEARCH DOES NOT MATCH ANY STORE</Text>)
              : 
              (
                <FlatList
                numColumns={2}
                data={stores}

                renderItem={({item}) => 
                <View style={productStyles.root}>
                <Card style={productStyles.cardStyle}>
                  <View 
                  // put buttons and stock in a row
                  style={{ marginTop: '4%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
                  >
                  <Text ellipsizeMode='tail' numberOfLines={2} variant="titleMedium" style={productStyles.productInfo}>
                    {item.name}
                  </Text>
                  <Text variant="labelLarge" style={item.isOpen ? {color: "green"} : {color: "red"}}>
                    {item.isOpen ? "  (Open)" : "  (Closed)"}
                  </Text>
                  </View>
                  <Text variant="labelMedium" style={productStyles.productInfo}>CATEGORY</Text>                  
                  <View 
                  // put buttons and stock in a row
                  style={{flexDirection: 'row', justifyContent: 'center', marginTop: '4%'}}
                  >
                      <Button
                      onPress={() => {navigation.navigate('Store', {idStore: item._id})}}
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