import React, {useContext, useState} from 'react';
import {ActivityIndicator, FlatList, Image, RefreshControl, SafeAreaView, TouchableOpacity, View,} from 'react-native';
import {Button, Card, HelperText, IconButton, Modal, Portal, Text} from 'react-native-paper';
import {useQuery} from '@apollo/client';
import {storeStyles} from './StoreStyles';
import {productStyles} from './subsections/ProductStyles';
import {ClientAuthenticationContext} from '../../context/ClientAuthenticationContext';
import {GET_CLIENT_ACCOUNT_BY_ID} from '../../graphql/queries/GetClientAccountById';
import {useTranslation} from 'react-i18next';
import Store, {StoreProps} from './Store';

const Stores = ({route, goBack, navigation}: any) => {

  const {t} = useTranslation('translation')

  const daysOfWeek = [t('disponibility.days.MONDAY'),
    t('disponibility.days.TUESDAY'),
    t('disponibility.days.WEDNESDAY'),
    t('disponibility.days.THURSDAY'),
    t('disponibility.days.FRIDAY'),
    t('disponibility.days.SATURDAY'),
    t('disponibility.days.SUNDAY')];

  // get client id from context
  const {clientId} = useContext(ClientAuthenticationContext);

  const [visible, setVisible] = React.useState(false);

  const [disponibilities, setDisponibilities] = useState<string[]>([]);

  const showModal = (dispo: string[]) => {
    setVisible(true)
    setDisponibilities(dispo)
  };
  const hideModal = () => {
    setVisible(false)
    setDisponibilities([])
  };
  const containerStyle = {backgroundColor: 'white', padding: 20, elevation: 4, margin: "2%", borderRadius: 30};

  const [stores, setStores] = useState<StoreProps[]>([]);

  const handleCategoryIndex = (categoryNum: number) => {
    let mutationCategory = ''
    switch (categoryNum) {
      case 0:
        mutationCategory = 'FRUITS_AND_VEGETABLES'
        break;
      case 1:
        mutationCategory = 'FISH_AND_SEAFOOD'
        break;
      case 2:
        mutationCategory = 'HEALTHY'
        break;
      case 3:
        mutationCategory = 'KETO'
        break;
      case 4:
        mutationCategory = 'BAKERY'
        break;
      case 5:
        mutationCategory = 'WORLD_PRODUCTS'
        break;
      case 6:
        mutationCategory = 'BUTCHER'
        break;
      case 7:
        mutationCategory = 'OTHER'
        break;
      default:
        break;
    }
    return mutationCategory
  }

  const filterShopsByCategory = (nearbyShops: any) => {
    if (route?.params?.shopCategory) {
      console.log("CATEGORY")
      const currCategory = handleCategoryIndex(route.params.index)
      return nearbyShops.filter((shop: any) => {
        if (shop.shopCategory) return shop.shopCategory === currCategory
      })
    }
    return nearbyShops
  }


  const {loading, error, refetch} = useQuery(GET_CLIENT_ACCOUNT_BY_ID, {
    variables: {
      idClient: clientId,
      distance: 15,
    },
    fetchPolicy: 'network-only',

    onCompleted(data) {
      //format disponibilities to display
      const stores = data.getClientAccountById.clientAccount.nearbyShops
      const formattedStores = stores.map((store: any) => {
        const disponibilities = store.disponibilities.map((disponibility: any) => {
          if(disponibility.activesHours.length <1) return null
          // consider multiple actives hours
          const activesHours = disponibility.activesHours.map((activeHour: any) => {
            return `${activeHour.openingHour}-${activeHour.endingHour}`
          })
          return `${disponibility.day}~ ${activesHours.join(" , ")}`
        })
        return {...store, disponibilities: disponibilities}
      })
      setStores(filterShopsByCategory(formattedStores))
    },
  });

  // const searchPlaceholder = t('stores.search.placeholder')


  return (
    <SafeAreaView style={storeStyles.root}>
      <View style={storeStyles.view}>
        {route?.params?.goBack ? (<TouchableOpacity
          style={storeStyles.back_button}
          onPress={route?.params?.goBack}
        >
          <Image
            style={storeStyles.back_button_icon}
            source={require('../../assets/images/back.png')}
          />
        </TouchableOpacity>) : null}

        <Text variant="headlineSmall" style={storeStyles.headline}>
          {t('stores.titlePart1')}
          <Text style={{color: '#FFAA55'}}>{t('stores.titlePart2')}</Text>
        </Text>

        {route?.params?.shopCategory? 
          (<Text style={storeStyles.category} >{route.params.shopCategory}</Text>)
          : null}

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
            </View>)
          : (
            stores.length === 0 ? (
              <View style={storeStyles.innerContainer}>
                <Text>{t('stores.data.noStores')}</Text>
                <IconButton
                  icon="reload"
                  iconColor="orange"
                  size={30}
                  onPress={() => {
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

                renderItem={({item}) =>
                  <View style={productStyles.root}>
                    <Card style={[productStyles.cardStyle, item.isPaused ? {opacity: 0.6} : {opacity: 1}]}>
                      <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: '4%'}}>
                        <Text variant="labelLarge"
                              style={[{textAlign: 'center'}, (item.isOpen && !item.isPaused) ? {color: 'green'} : {color: 'red'}]}>
                          {(item.isOpen && !item.isPaused) ? t('stores.store.open') : (item.isPaused ? t('stores.store.paused') : t('stores.store.closed'))}
                        </Text>
                        <IconButton
                          onPress={() => {
                            showModal(item.disponibilities)
                          }}
                          mode="contained"
                          iconColor="grey"
                          icon="information"
                          style={{backgroundColor: 'F2F4F8', marginTop: '-3%'}}
                        />

                      </View>
                      <View
                        style={{
                          flex: 1,
                          margin: '2%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row'
                        }}
                      >
                        <Text ellipsizeMode='tail' numberOfLines={2} variant="titleMedium">
                          {item.name}
                        </Text>
                      </View>
                      <View style={{flex: 1, justifyContent: "center"}}>
                        <HelperText
                          type='info'
                          style={{textAlign: 'center'}}>{item.address.slice(0, item.address.indexOf(','))}</HelperText>
                      </View>
                      <Text variant="labelMedium" style={{textAlign: 'center'}}>{t("shopCategories." + item.shopCategory)}</Text>
                      <View
                        style={{flexDirection: 'row', justifyContent: 'center', marginTop: '4%'}}
                      >
                        <Button
                          style={{backgroundColor: '#FFAA55', marginHorizontal: '2%'}}
                          onPress={() => {
                            navigation.navigate('Store', {
                              idStore: item._id, goBack: () => {
                                navigation.goBack()
                              }
                            })
                          }}
                        >    {t('stores.store.viewButton')}   </Button>

                      </View>
                    </Card>
                  </View>
                }
              />

            )
          )}

      </SafeAreaView>

      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
      <SafeAreaView>
      <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
        <View style={{flex: 1}}>
          <Text variant="titleMedium" style={{textAlign:'center', marginBottom:'4%'}}>
            {t('disponibility.title')}
          </Text>
          {disponibilities.map((disponibility: string, index: number) => {
            return (
              <Text variant="labelMedium" style={{textAlign: 'center', margin:'0.5%'}} key={index}>
                {daysOfWeek[index]} : {disponibility !== null ? disponibility.split("~")[1] : t('stores.store.closed')}
              </Text>
            )
          })}


              </View>
            </View>
            <HelperText style={{textAlign: 'center', margin: '0.5%'}} type='info'>{t('product.closeModal')}</HelperText>

          </SafeAreaView>
        </Modal>
      </Portal>


    </SafeAreaView>
  );
};

export default Stores;
