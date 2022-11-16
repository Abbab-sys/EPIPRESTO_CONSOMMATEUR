import React, {useContext, useState} from "react";
import {ActivityIndicator, FlatList, SafeAreaView, View} from "react-native";
import {Button, Card, HelperText, IconButton, Modal, Portal, Text} from 'react-native-paper';
import {useQuery} from "@apollo/client";
import {storeStyles} from "./StoreStyles";
import {productStyles} from "./subsections/ProductStyles";
import {ClientAuthenticationContext} from "../../context/ClientAuthenticationContext";
import {GET_CLIENT_ACCOUNT_BY_ID} from "../../graphql/queries/GetClientAccountById";
import {useTranslation} from "react-i18next";
import Store from "./Store";

export interface StoreProps {
  _id: string;
  name: string;
  address: string;
  isOpen: boolean;
  disponibilities: string[];
}


const Stores = () => {

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

  console.log("clientId",clientId)

  const [visible, setVisible] = React.useState(false);

  const [disponibilities, setDisponibilities] = useState<string[]>([]);

  const showModal = (dispo: string[]) => {setVisible(true)
  console.log("showModal")
  setDisponibilities(dispo)
  console.log("dispo",disponibilities)
};
  const hideModal = () => {setVisible(false), setDisponibilities([])};
  const containerStyle = {backgroundColor: 'white', padding: 20, elevation: 4, margin: "2%", borderRadius: 30};

  const [searchQuery, setSearchQuery] = useState('');

  /*const { data, loading } = useSubscription(
    COMMENTS_SUBSCRIPTION,
    { variables: { postID } }
  );*/

  const [stores, setStores] = useState<StoreProps[]>([])


  const {loading, error} = useQuery(GET_CLIENT_ACCOUNT_BY_ID, {
    variables: {
      idClient: clientId, distance: 15
    },
    fetchPolicy: 'network-only',
    onCompleted(data) {
      //format disponibilities to display
      const stores = data.getClientAccountById.clientAccount.nearbyShops
      const formattedStores = stores.map((store: any) => {
        const disponibilities = store.disponibilities.map((disponibility: any) => {
          return disponibility.day + " " + disponibility.activesHours[0].openingHour + "-" + disponibility.activesHours[0].endingHour
        })
        return {...store, disponibilities: disponibilities}
      })
      setStores(formattedStores)
    },
  });

  // const searchPlaceholder = t('stores.search.placeholder')

  const [currStoreId,setCurrStoreId] = useState('')
  const goBack = () => {
    setCurrStoreId('')
  }
  if (currStoreId)
    return <Store idStore={currStoreId} goBack={goBack}></Store>
  return (
    <SafeAreaView style={storeStyles.root}>
      <View style={storeStyles.view}>
        <Text variant="headlineMedium" style={storeStyles.headline}>
          {t('stores.titlePart1')}
          <Text style={{color: "#FFAA55"}}>
            {t('stores.titlePart2')}
          </Text>
        </Text>
        <HelperText type="info">
          {t('stores.shownRadius')}
        </HelperText>
      </View>

      <SafeAreaView style={{flex: 1, marginVertical: 10}}>
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
                  <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: '4%'}}>
                  <Text variant="labelLarge" style={[{textAlign:'center'}, item.isOpen? {color:'green'} : {color:'red'} ]}>
                    {item.isOpen ? t('stores.store.open') : t('stores.store.closed')}
                  </Text>
                    <IconButton 
                          onPress={() => {showModal(item.disponibilities)}}
                          mode="contained"
                          iconColor="grey"
                          icon="information"
                          style={{backgroundColor: 'F2F4F8', marginTop:'-3%'}}
                          />

                      </View>
                  <View 
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
                  style={{flexDirection: 'row', justifyContent: 'center', marginTop: '4%'}}
                  >
                      <Button
                            style={{backgroundColor: '#FFAA55', marginHorizontal: '2%'}}
                            onPress={() => {
                              setCurrStoreId(item._id)
                            }}
                          >    {t('stores.store.viewButton')}   </Button>

                  </View>
                </Card>
              </View>
                }
                />
                
              )
          ) }

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
                {daysOfWeek[index]} : {disponibility.split(" ")[1]}
              </Text>
            )
          })}

            
        </View>
      </View>
      <HelperText style={{textAlign: 'center', margin:'0.5%'}} type='info'>{t('product.closeModal')}</HelperText>

      </SafeAreaView>
        </Modal>
      </Portal>


    </SafeAreaView>
  )
}

export default Stores
