import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, View } from "react-native";
import { Button, Card, HelperText, Text } from 'react-native-paper';
import { useQuery, useSubscription } from "@apollo/client";
import { storeStyles } from "./StoreStyles";
import { productStyles } from "./subsections/ProductStyles";
import { ClientAuthenticationContext } from "../../context/ClientAuthenticationContext";
import { GET_CLIENT_ACCOUNT_BY_ID } from "../../graphql/queries/GetClientAccountById";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export interface StoreProps {
  _id: string;
  name: string;
  address: string;
  isOpen: boolean;
}


const Stores = () => {

  const {t} = useTranslation('translation')
  const navigation = useNavigation();

  // get client id from context
  const {clientId} = useContext(ClientAuthenticationContext);

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

    const searchPlaceholder = t('stores.search.placeholder')

  return(
    <SafeAreaView style={storeStyles.root}>
      <View style={storeStyles.view}>
        <Text variant="headlineMedium" style={storeStyles.headline}>
        {t('stores.titlePart1')} 
          <Text style={{color:"#FFAA55"}}>
          {t('stores.titlePart2')} 
          </Text>
        </Text>
        <HelperText type="info" >
        {t('stores.shownRadius')} 
        </HelperText>
      </View>

      <SafeAreaView style={{flex: 1 , marginVertical:10}}>
        {loading ? (
            <View style={storeStyles.innerContainer}>
              <ActivityIndicator size="large" color="#FFA500"></ActivityIndicator>
            </View>
          ) : error ? (
            <View style={storeStyles.innerContainer}>
              <Text style={storeStyles.errorText}>{t('stores.data.error')}</Text>
            </View>)
          : (
            stores.length === 0 ? 
            
              (<Text>{t('stores.data.noStores')}</Text>)
              : 
              (
                <FlatList
                numColumns={2}
                data={stores}

                renderItem={({item}) => 
                <View style={productStyles.root}>
                <Card style={productStyles.cardStyle}>
                  <Text variant="labelLarge" style={[{textAlign:'center'}, item.isOpen? {color:'green'} : {color:'red'} ]}>
                    {item.isOpen ? t('stores.store.open') : t('stores.store.closed')}
                  </Text>
                  <View 
                  // put buttons and stock in a row
                  style={{ flex: 1, margin: '2%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
                  >
                  <Text ellipsizeMode='tail' numberOfLines={2} variant="titleMedium" >
                    {item.name}
                  </Text>
                  </View>
                  <View style={{flex:1, justifyContent: "center"}}>
                    <HelperText
                    type='info' style ={{textAlign: 'center'}}>{item.address.slice(0, item.address.indexOf(','))}</HelperText>
                  </View>
                  <Text variant="labelMedium" style ={{textAlign: 'center'}}>{t('stores.store.category')}</Text>                  
                  <View 
                  // put buttons and stock in a row
                  style={{flexDirection: 'row', justifyContent: 'center', marginTop: '4%'}}
                  >
                      <Button
                      style={{backgroundColor: '#FFAA55', marginHorizontal: '2%'}}
                      onPress={() => {navigation.navigate('Store' as never, {idStore: item._id} as never)}}
                      >    {t('stores.store.viewButton')}   </Button>
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