import React, {useContext, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Card, HelperText, IconButton, Text} from 'react-native-paper';
import {useQuery} from '@apollo/client';
import {storeStyles} from './StoreStyles';
import {productStyles} from './subsections/ProductStyles';
import {ClientAuthenticationContext} from '../../context/ClientAuthenticationContext';
import {GET_CLIENT_ACCOUNT_BY_ID} from '../../graphql/queries/GetClientAccountById';
import {useTranslation} from 'react-i18next';
import Store from './Store';

export interface StoreProps {
  _id: string;
  name: string;
  address: string;
  isOpen: boolean;
}

const Stores = () => {
  const {t} = useTranslation('translation');

  // get client id from context
  const {clientId} = useContext(ClientAuthenticationContext);

  const [stores, setStores] = useState<StoreProps[]>([]);

  const {loading, error, refetch} = useQuery(GET_CLIENT_ACCOUNT_BY_ID, {
    variables: {
      idClient: clientId,
      distance: 15,
    },
    fetchPolicy: 'network-only',

    onCompleted(data) {
      setStores(data.getClientAccountById.clientAccount.nearbyShops);
      console.log('stores', stores);
    },
  });

  // const searchPlaceholder = t('stores.search.placeholder')

  const [currStoreId, setCurrStoreId] = useState('');
  const goBack = () => {
    setCurrStoreId('');
  };
  if (currStoreId) return <Store idStore={currStoreId} goBack={goBack}></Store>;
  return (
    <SafeAreaView style={storeStyles.root}>
      <View style={storeStyles.view}>
        <Text variant="headlineMedium" style={storeStyles.headline}>
          {t('stores.titlePart1')}
          <Text style={{color: '#FFAA55'}}>{t('stores.titlePart2')}</Text>
        </Text>
        <HelperText type="info">{t('stores.shownRadius')}</HelperText>
      </View>

      <SafeAreaView style={{flex: 1, marginVertical: 10}}>
        {loading ? (
          <View style={storeStyles.innerContainer}>
            <ActivityIndicator size="large" color="#FFA500"></ActivityIndicator>
          </View>
        ) : error ? (
          <View style={storeStyles.innerContainer}>
            <Text style={storeStyles.errorText}>{t('stores.data.error')}</Text>
            <IconButton
              icon="reload"
              iconColor="black"
              size={30}
              onPress={() => {
                refetch({idClient: clientId, distance: 15});
              }}
            />
          </View>
        ) : stores.length === 0 ? (
          <View style={storeStyles.innerContainer}>
          <Text>{t('stores.data.noStores')}</Text>
          <IconButton
              icon="reload"
              iconColor="orange"
              size={30}
              onPress={() => {
                console.log("refetching")
                refetch({idClient: clientId, distance: 15});
              }}
            />
          </View>
        ) : (
          <FlatList
            numColumns={2}
            data={stores}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => {
                  refetch({idClient: clientId, distance: 15});
                }}
              />
            }
            renderItem={({item}) => (
              <View style={productStyles.root}>
                <Card style={productStyles.cardStyle}>
                  <Text
                    variant="labelLarge"
                    style={[
                      {textAlign: 'center'},
                      item.isOpen ? {color: 'green'} : {color: 'red'},
                    ]}>
                    {item.isOpen
                      ? t('stores.store.open')
                      : t('stores.store.closed')}
                  </Text>
                  <View
                    // put buttons and stock in a row
                    style={{
                      flex: 1,
                      margin: '2%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={2}
                      variant="titleMedium">
                      {item.name}
                    </Text>
                  </View>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <HelperText type="info" style={{textAlign: 'center'}}>
                      {item.address.slice(0, item.address.indexOf(','))}
                    </HelperText>
                  </View>
                  <Text variant="labelMedium" style={{textAlign: 'center'}}>
                    {t('stores.store.category')}
                  </Text>
                  <View
                    // put buttons and stock in a row
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginTop: '4%',
                    }}>
                    <Button
                      style={{
                        backgroundColor: '#FFAA55',
                        marginHorizontal: '2%',
                      }}
                      onPress={() => {
                        setCurrStoreId(item._id);
                      }}>
                      {' '}
                      {t('stores.store.viewButton')}{' '}
                    </Button>
                  </View>
                </Card>
              </View>
            )}
          />
        )}
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default Stores;
